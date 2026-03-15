"use client";

import { Eye, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { usePostEngagement } from "@/hooks/usePostEngagement";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";

function PostEngagementInner({ postSlug }: { postSlug: string }) {
  const { stats, liked, handleLike, user, likeLoading } =
    usePostEngagement(postSlug);

  return (
    <div className="flex items-center gap-4">
      {/* Views */}
      <div className="flex items-center gap-1.5 text-sm text-text-muted">
        <Eye className="h-4 w-4" />
        <span className="tabular-nums">{stats.views.toLocaleString()}</span>
      </div>

      {/* Like button */}
      <button
        onClick={handleLike}
        disabled={!user || likeLoading}
        className={cn(
          "flex items-center gap-1.5 text-sm transition-all duration-300 cursor-pointer",
          "disabled:cursor-default",
          liked
            ? "text-rose-500"
            : "text-text-muted hover:text-rose-400",
          !user && "opacity-50",
        )}
        title={user ? undefined : "התחבר כדי לעשות לייק"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={liked ? "liked" : "unliked"}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Heart
              className={cn("h-4 w-4", liked && "fill-current")}
            />
          </motion.div>
        </AnimatePresence>
        <span className="tabular-nums">{stats.likes.toLocaleString()}</span>
      </button>
    </div>
  );
}

export function PostEngagement({ postSlug }: { postSlug: string }) {
  return (
    <AuthProvider>
      <PostEngagementInner postSlug={postSlug} />
    </AuthProvider>
  );
}
