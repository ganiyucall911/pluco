import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" aria-label="PLUCO home" className="focus-ring flex items-center rounded-full">
      <Image
        src="/brand/pluco-mark.png"
        alt="PLUCO"
        width={220}
        height={110}
        priority
        className="h-10 w-auto object-contain brightness-[1.6] saturate-150 drop-shadow-[0_0_12px_rgba(0,255,60,.45)] sm:h-11"
      />
    </Link>
  );
}
