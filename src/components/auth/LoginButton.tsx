"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { UserAvatar } from "./UserAvatar";
import { cn } from "@/lib/utils";

export function LoginButton() {
  const { user, loading, signIn, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("auth");
  const tNav = useTranslations("nav");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="h-9 w-9 rounded-full bg-surface-200 animate-pulse" />
    );
  }

  if (user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full p-0.5 hover:bg-surface-100 transition-colors cursor-pointer"
          aria-label={tNav("profile")}
        >
          <UserAvatar user={user} size="sm" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute end-0 top-full mt-2 w-56 rounded-xl bg-surface-0 border border-surface-200 shadow-lg overflow-hidden z-50"
            >
              <div className="p-3 border-b border-surface-200">
                <div className="flex items-center gap-3">
                  <UserAvatar user={user} size="md" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-text-muted truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-1">
                <button
                  onClick={async () => {
                    setOpen(false);
                    await signOut();
                  }}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer",
                    "text-text-secondary hover:text-text-primary hover:bg-surface-100 transition-colors",
                  )}
                >
                  <LogOut className="h-4 w-4" />
                  {t("sign_out")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md cursor-pointer",
          "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm hover:shadow-md transition-all duration-200",
        )}
      >
        <LogIn className="h-4 w-4" />
        {tNav("login")}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute end-0 top-full mt-2 w-64 rounded-xl bg-surface-0 border border-surface-200 shadow-lg overflow-hidden z-50"
          >
            <div className="p-2">
              <button
                onClick={async () => {
                  setOpen(false);
                  await signIn();
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg cursor-pointer",
                  "text-text-primary hover:bg-surface-100 transition-colors",
                )}
              >
                <User className="h-5 w-5 text-text-secondary" />
                {t("sign_in_google")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
