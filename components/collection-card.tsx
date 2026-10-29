import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Collection } from "@/lib/data";
import { Art } from "./art";
import { asset } from "@/lib/asset";

export function CollectionCard({ item }: { item: Collection }) {
  return (
    <Link
      href={`/collections/${item.slug}`}
      className="group focus-ring overflow-hidden rounded-none border border-white/[.09] bg-[#111] transition duration-500 hover:-translate-y-2 hover:border-white/25"
    >
      <div className="relative aspect-[4/3]">
        {item.image ? (
          <Image
            src={asset(item.image)}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain transition duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <Art accent={item.accent} label={item.category} />
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h3 className="text-2xl font-semibold">{item.name}</h3>
            <p className="mt-2 text-sm text-[#A6A6A6]">by {item.creator}</p>
          </div>
          <ArrowUpRight className="text-white" />
        </div>
        <p className="mt-5 line-clamp-2 text-sm leading-6 text-[#A6A6A6]">{item.description}</p>
        <p className="mt-6 border-t border-white/[.07] pt-4 text-xs uppercase tracking-[.15em] text-[#6E6E6E]">
          {item.members}
        </p>
      </div>
    </Link>
  );
}
