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
        variant === "primary" && "bg-[#f4f3f1] text-[#0a0a0a] hover:bg-white",
        variant === "secondary" &&
          "border border-white/15 text-[#f4f3f1] hover:border-white/35 hover:bg-white/[.04]",
        variant === "ghost" && "text-[#8f8f8f] hover:text-[#f4f3f1]",
        className,
      )}
    >
      {children}
      {arrow && <ArrowUpRight size={14} strokeWidth={1.75} />}
    </Link>
  );
}
