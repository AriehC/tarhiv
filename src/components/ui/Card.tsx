import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  href?: string;
}

function Card({ className, children, href }: CardProps) {
  const cardClasses = cn(
    "rounded-2xl bg-surface-0/80 backdrop-blur-md border border-surface-200/50 overflow-hidden",
    "shadow-sm transition-all duration-500",
    "hover:shadow-[0_0_30px_var(--glow-brand)] hover:border-brand-500/20 hover:scale-[1.02]",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cn(cardClasses, "block")}>
        {children}
      </Link>
    );
  }

  return <div className={cardClasses}>{children}</div>;
}

export { Card, type CardProps };
