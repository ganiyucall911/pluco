import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/asset";

/**
 * The wordmark is always the image asset, never typed text — it is the brand.
 * Height is fixed so the header height never shifts between pages. No badge is
 * attached here: verification belongs to a creator name, not to the app mark.
 * The artwork is white; light mode flips it through --logo-filter so the mark
 * keeps full contrast in both themes without a separate asset.
 */
export function Logo({
  small = false,
  className = "",
}: {
  small?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="PLUCO home"
      className={`focus-ring flex items-center justify-center ${className}`}
    >
      <Image
        src={asset("/brand/pluco-white.png")}
        alt="PLUCO"
        width={2946}
        height={1474}
        priority
        style={{ filter: "var(--logo-filter)" }}
        className={
          small
            ? "h-6 w-auto object-contain sm:h-7"
            : "h-8 w-auto object-contain sm:h-9"
        }
      />
    </Link>
  );
}
