"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MAX_COMMENT_LENGTH = 2000;

interface CommentFormProps {
  postSlug: string;
  parentId?: string;
  onSubmit: (body: string, parentId?: string) => Promise<void>;
  onCancel?: () => void;
  autoFocus?: boolean;
}

export function CommentForm({
  postSlug: _postSlug,
  parentId,
  onSubmit,
  onCancel,
  autoFocus = false,
}: CommentFormProps) {
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const t = useTranslations("post");

  const charCount = body.length;
  const isOverLimit = charCount > MAX_COMMENT_LENGTH;
  const isEmpty = body.trim().length === 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isEmpty || isOverLimit || submitting) return;

    setSubmitting(true);
    try {
      await onSubmit(body.trim(), parentId);
      setBody("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setSubmitting(false);
    }
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setBody(e.target.value);
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={body}
          onChange={handleTextareaChange}
          placeholder={t("write_comment")}
          dir="auto"
          rows={3}
          autoFocus={autoFocus}
          disabled={submitting}
          className={cn(
            "w-full resize-none rounded-xl border bg-surface-0 px-4 py-3 text-sm text-text-primary",
            "placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all",
            isOverLimit
              ? "border-red-400 focus:ring-red-300"
              : "border-surface-200 focus:ring-brand-300 focus:border-brand-400",
            submitting && "opacity-60",
          )}
        />
      </div>

      <div className="flex items-center justify-between">
        <span
          className={cn(
            "text-xs",
            isOverLimit ? "text-red-500" : "text-text-muted",
          )}
        >
          {charCount}/{MAX_COMMENT_LENGTH}
        </span>

        <div className="flex items-center gap-2">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCancel}
              disabled={submitting}
            >
              {parentId ? "\u2715" : ""}
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={isEmpty || isOverLimit || submitting}
          >
            {submitting ? (
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {t("submit_comment")}
          </Button>
        </div>
      </div>
    </form>
  );
}
