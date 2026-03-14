"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { useComments } from "@/hooks/useComments";
import { useAuth } from "@/hooks/useAuth";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

interface CommentSectionProps {
  postSlug: string;
}

function CommentSectionInner({ postSlug }: CommentSectionProps) {
  const { comments, loading, addComment, deleteComment, likeComment } =
    useComments(postSlug);
  const { user, signIn } = useAuth();
  const t = useTranslations("post");

  const { topLevel, repliesByParent } = useMemo(() => {
    const top = comments.filter((c) => !c.parentId);
    const replies: Record<string, typeof comments> = {};
    for (const comment of comments) {
      if (comment.parentId) {
        if (!replies[comment.parentId]) {
          replies[comment.parentId] = [];
        }
        replies[comment.parentId].push(comment);
      }
    }
    return { topLevel: top, repliesByParent: replies };
  }, [comments]);

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-text-secondary" />
        <h2 className="text-xl font-bold font-heading text-text-primary">
          {t("comments")}
        </h2>
        {!loading && (
          <span className="text-sm text-text-muted">
            ({comments.length})
          </span>
        )}
      </div>

      {/* Comment form or login prompt */}
      {user ? (
        <div className="mb-8">
          <CommentForm postSlug={postSlug} onSubmit={addComment} />
        </div>
      ) : (
        <div className="mb-8 rounded-xl border border-surface-200 bg-surface-50 p-6 text-center">
          <p className="text-sm text-text-secondary mb-3">
            {t("login_to_comment")}
          </p>
          <Button variant="primary" size="sm" onClick={signIn}>
            {t("login_to_comment")}
          </Button>
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton variant="circle" width={28} height={28} />
                <Skeleton width={120} />
              </div>
              <Skeleton width="80%" />
              <Skeleton width="60%" />
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-center text-sm text-text-muted py-8">
          {t("no_comments")}
        </p>
      ) : (
        <div className="space-y-1 divide-y divide-surface-100">
          {topLevel.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replies={repliesByParent[comment.id] || []}
              postSlug={postSlug}
              onAddComment={addComment}
              onDeleteComment={deleteComment}
              onLikeComment={likeComment}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export function CommentSection({ postSlug }: CommentSectionProps) {
  return (
    <AuthProvider>
      <CommentSectionInner postSlug={postSlug} />
    </AuthProvider>
  );
}
