import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/asset";

/**
 * The wordmark is always the image asset, never typed text — it is the brand.
 * Height is fixed so the header height never shifts between pages. No badge is
 * attached here: verification belongs to a creator name, not to the app mark.
 * The mark is white on dark; in light mode it inverts so it stays legible.
 */
export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="PLUCO home"
      className="focus-ring flex items-center justify-center"
    >
      <Image
        src={asset("/brand/pluco-white.png")}
        alt="PLUCO"
        width={2946}
        height={1474}
            priority
            className={
              small
                ? "h-7 w-auto object-contain invert dark:invert-0"
                : "h-10 w-auto object-contain invert dark:invert-0 sm:h-11"
            }
      />
    </Link>
  );
}
