"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import { Heart, Reply, Trash2 } from "lucide-react";
import { UserAvatar } from "@/components/auth/UserAvatar";
import { CommentForm } from "./CommentForm";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { Comment } from "@/lib/firebase/firestore";
import type { Timestamp } from "firebase/firestore";

interface CommentItemProps {
  comment: Comment;
  replies: Comment[];
  postSlug: string;
  onAddComment: (body: string, parentId?: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onLikeComment: (commentId: string) => Promise<void>;
  depth?: number;
}

function formatTimeAgo(timestamp: Timestamp | null, locale: string): string {
  if (!timestamp) return "";

  const now = Date.now();
  const then = timestamp.toMillis();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  const isHe = locale === "he";

  if (diffSec < 60) return isHe ? "ממש עכשיו" : "just now";
  if (diffMin < 60) return isHe ? `לפני ${diffMin} דקות` : `${diffMin}m ago`;
  if (diffHour < 24) return isHe ? `לפני ${diffHour} שעות` : `${diffHour}h ago`;
  if (diffDay < 30) return isHe ? `לפני ${diffDay} ימים` : `${diffDay}d ago`;

  return new Intl.DateTimeFormat(isHe ? "he-IL" : "en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(then));
}

export function CommentItem({
  comment,
  replies,
  postSlug,
  onAddComment,
  onDeleteComment,
  onLikeComment,
  depth = 0,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [liking, setLiking] = useState(false);
  const { user } = useAuth();
  const locale = useLocale();
  const t = useTranslations("post");

  const isOwner = user?.uid === comment.authorUid;
  const maxDepth = 2;

  async function handleLike() {
    if (liking) return;
    setLiking(true);
    try {
      await onLikeComment(comment.id);
    } finally {
      setLiking(false);
    }
  }

  async function handleReply(body: string, parentId?: string) {
    await onAddComment(body, parentId);
    setShowReplyForm(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        depth > 0 && "border-s-2 border-surface-200 ps-4",
      )}
    >
      <div className="py-3">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <UserAvatar
            user={{
              displayName: comment.authorName,
              photoURL: comment.authorPhoto,
            }}
            size="sm"
          />
          <span className="text-sm font-medium text-text-primary">
            {comment.authorName}
          </span>
          <span className="text-xs text-text-muted">
            {formatTimeAgo(comment.createdAt, locale)}
          </span>
        </div>

        {/* Body */}
        <p className="text-sm text-text-secondary whitespace-pre-wrap break-words mb-2" dir="auto">
          {comment.body}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            disabled={liking}
            className={cn(
              "inline-flex items-center gap-1 text-xs text-text-muted cursor-pointer",
              "hover:text-red-500 transition-colors",
              liking && "opacity-50",
            )}
          >
            <Heart className={cn("h-3.5 w-3.5", comment.likes > 0 && "fill-red-500 text-red-500")} />
            {comment.likes > 0 && comment.likes}
          </button>

          {user && depth < maxDepth && (
            <button
              onClick={() => setShowReplyForm((prev) => !prev)}
              className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-brand-600 transition-colors cursor-pointer"
            >
              <Reply className="h-3.5 w-3.5" />
              {t("comments")}
            </button>
          )}

          {isOwner && (
            <button
              onClick={() => onDeleteComment(comment.id)}
              className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-red-500 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Reply form */}
        {showReplyForm && (
          <div className="mt-3">
            <CommentForm
              postSlug={postSlug}
              parentId={comment.id}
              onSubmit={handleReply}
              onCancel={() => setShowReplyForm(false)}
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="mt-1">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              replies={[]}
              postSlug={postSlug}
              onAddComment={onAddComment}
              onDeleteComment={onDeleteComment}
              onLikeComment={onLikeComment}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
