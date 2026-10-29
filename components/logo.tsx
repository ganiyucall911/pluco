import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/asset";

/**
 * The wordmark is always the image asset, never typed text — it is the brand.
 * Height is fixed so the header height never shifts between pages.
 */
export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="PLUCO home"
      className="focus-ring flex h-8 items-center"
    >
      <Image
        src={asset("/brand/pluco-white.png")}
        alt="PLUCO"
        width={2946}
        height={1474}
        priority
        className={small ? "h-5 w-auto object-contain" : "h-7 w-auto object-contain sm:h-[26px]"}
      />
    </Link>
  );
}
