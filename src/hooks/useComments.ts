"use client";

import { useState, useEffect, useCallback } from "react";
import {
  onCommentsSnapshot,
  addComment as addCommentToFirestore,
  deleteComment as deleteCommentFromFirestore,
  likeComment as likeCommentInFirestore,
  type Comment,
} from "@/lib/firebase/firestore";
import { useAuth } from "./useAuth";

interface UseCommentsReturn {
  comments: Comment[];
  loading: boolean;
  addComment: (body: string, parentId?: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  likeComment: (commentId: string) => Promise<void>;
}

export function useComments(postSlug: string): UseCommentsReturn {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onCommentsSnapshot(postSlug, (newComments) => {
      setComments(newComments);
      setLoading(false);
    });

    return unsubscribe;
  }, [postSlug]);

  const addComment = useCallback(
    async (body: string, parentId?: string) => {
      if (!user) {
        throw new Error("Must be logged in to comment");
      }
      await addCommentToFirestore(postSlug, user, body, parentId);
    },
    [postSlug, user],
  );

  const deleteComment = useCallback(async (commentId: string) => {
    await deleteCommentFromFirestore(commentId);
  }, []);

  const likeComment = useCallback(async (commentId: string) => {
    await likeCommentInFirestore(commentId);
  }, []);

  return { comments, loading, addComment, deleteComment, likeComment };
}
