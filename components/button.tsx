import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type P = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  arrow?: boolean;
};

export function Button({ href, children, variant = "primary", className, arrow = true }: P) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[13px] font-medium tracking-[-0.01em] transition duration-200",
        variant === "primary" && "bg-paper text-ink hover:bg-paper",
        variant === "secondary" &&
          "border border-line-strong text-paper hover:border-line-strong hover:bg-paper/[.06]",
        variant === "ghost" && "text-mute hover:text-paper",
        className,
      )}
    >
      {children}
      {arrow && <ArrowUpRight size={14} strokeWidth={1.75} />}
    </Link>
  );
}
