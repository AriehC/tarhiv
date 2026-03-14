import { cn } from "@/lib/utils";

type SkeletonVariant = "text" | "circle" | "rect";

interface SkeletonProps {
  variant?: SkeletonVariant;
  className?: string;
  width?: string | number;
  height?: string | number;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: "h-4 rounded-md",
  circle: "rounded-full",
  rect: "rounded-xl",
};

function Skeleton({ variant = "text", className, width, height }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-surface-200 animate-pulse",
        variantStyles[variant],
        className,
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
}

export { Skeleton, type SkeletonProps };
