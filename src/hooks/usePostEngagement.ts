"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  incrementPostViews,
  togglePostLike,
  markPostAsViewed,
  onPostStatsSnapshot,
  onUserPostDataSnapshot,
  type PostStats,
} from "@/lib/firebase/firestore";
import { useAuth } from "./useAuth";

export function usePostEngagement(postSlug: string) {
  const { user } = useAuth();
  const [stats, setStats] = useState<PostStats>({ views: 0, likes: 0 });
  const [liked, setLiked] = useState(false);
  const [viewed, setViewed] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const viewTracked = useRef(false);

  // Listen to post stats (real-time)
  useEffect(() => {
    const unsub = onPostStatsSnapshot(postSlug, setStats);
    return unsub;
  }, [postSlug]);

  // Listen to user data (liked/viewed)
  useEffect(() => {
    if (!user) {
      setLiked(false);
      setViewed(false);
      return;
    }
    const unsub = onUserPostDataSnapshot(user.uid, (data) => {
      setLiked(data.likedPosts.includes(postSlug));
      setViewed(data.viewedPosts.includes(postSlug));
    });
    return unsub;
  }, [user, postSlug]);

  // Track view (once per session per post)
  useEffect(() => {
    if (viewTracked.current) return;
    viewTracked.current = true;
    incrementPostViews(postSlug).catch(() => {});
    if (user) {
      markPostAsViewed(postSlug, user.uid).catch(() => {});
    }
  }, [postSlug, user]);

  const handleLike = useCallback(async () => {
    if (!user || likeLoading) return;
    setLikeLoading(true);
    try {
      const nowLiked = await togglePostLike(postSlug, user.uid);
      setLiked(nowLiked);
    } finally {
      setLikeLoading(false);
    }
  }, [user, postSlug, likeLoading]);

  return { stats, liked, viewed, likeLoading, handleLike, user };
}
