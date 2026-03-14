"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: {
    displayName: string | null;
    photoURL: string | null;
  };
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
} as const;

const imageSizeMap = {
  sm: 28,
  md: 36,
  lg: 48,
} as const;

function getInitials(name: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function UserAvatar({ user, size = "md", className }: UserAvatarProps) {
  const sizeClasses = sizeMap[size];
  const imageSize = imageSizeMap[size];

  if (user.photoURL) {
    return (
      <Image
        src={user.photoURL}
        alt={user.displayName || "User"}
        width={imageSize}
        height={imageSize}
        className={cn(
          "rounded-full object-cover shrink-0",
          sizeClasses,
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-medium shrink-0",
        sizeClasses,
        className,
      )}
    >
      {getInitials(user.displayName)}
    </div>
  );
}
