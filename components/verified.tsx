import { BadgeCheck } from "lucide-react";

/** Creator verification mark. Paired with the name it certifies, never used alone. */
export function Verified({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-white/90 ${className}`} title="Verified creator">
      <BadgeCheck size={size} strokeWidth={1.75} aria-hidden />
      <span className="sr-only">Verified creator</span>
    </span>
  );
}

export function VerifiedName({ name, size = 14 }: { name: string; size?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {name}
      <Verified size={size} />
    </span>
  );
}
