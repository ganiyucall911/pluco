import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/asset";

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" aria-label="PLUCO home" className="focus-ring flex items-center">
      <Image
        src={asset("/brand/pluco-white.png")}
        alt="PLUCO"
        width={1200}
        height={600}
        priority
        className={
          small
            ? "h-6 w-auto object-contain opacity-95"
            : "h-7 w-auto object-contain opacity-95 sm:h-8"
        }
      />
    </Link>
  );
}
