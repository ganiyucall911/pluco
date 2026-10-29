"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/page-hero";
import {
  ART,
  CHAIN_NAME,
  EXPLORER,
  SEL,
  decodeAddress,
  decodeString,
  decodeUint,
  encodeUint,
  getEth,
  readCall,
  toGateway,
  type Artwork,
} from "@/lib/art";

export default function GalleryPage() {
  const [items, setItems] = useState<Artwork[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "unconfigured" | "offline">("loading");

  useEffect(() => {
    const eth = getEth();
    if (!eth) return;
    if (!ART) {
      setState("unconfigured");
      return;
    }
    let alive = true;
    (async () => {
      try {
        const total = Number(decodeUint(await readCall(eth, ART, SEL.totalMinted)));
        if (!alive) return;
        const ids = Array.from({ length: total }, (_, i) => total - i);
        const rows = await Promise.all(
          ids.map(async (id): Promise<Artwork> => {
            const [rawUri, owner] = await Promise.all([
              readCall(eth, ART, encodeUint(SEL.tokenURI, id)),
              readCall(eth, ART, encodeUint(SEL.ownerOf, id)),
            ]);
            const uri = decodeString(rawUri);
            let name = `PLUCO Originals #${id}`;
            let image = toGateway(uri);
            try {
              const res = await fetch(toGateway(uri));
              if (res.ok) {
                const meta = (await res.json()) as { name?: string; image?: string };
                if (meta.name) name = meta.name;
                if (meta.image) image = toGateway(meta.image);
              }
            } catch {
              // Metadata not pinned yet — show the placeholder tile.
            }
            return { id, uri, name, image, owner: decodeAddress(owner) };
          })
        );
        if (alive) {
          setItems(rows);
          setState("ready");
        }
      } catch {
        if (alive) setState("offline");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <main>
      <PageHero
        eyebrow="Collection"
        title="PLUCO Originals."
        body={`One-of-one works, read straight from the chain. Every piece carries its own metadata, its own provenance and a 7.5% royalty that follows it on every resale — including sales that settle here on ${CHAIN_NAME}.`}
      />

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-7xl">
          {state === "loading" ? (
            <p className="text-sm text-[#9EA6A2]">Reading the collection…</p>
          ) : state === "unconfigured" ? (
            <div className="rounded-3xl border border-white/10 bg-white/[.02] p-8 text-sm leading-6 text-[#9EA6A2]">
              No collection is configured for this network. Deploy with <span className="text-white">npm run deploy:base-sepolia</span> in contracts/art, then set
              NEXT_PUBLIC_PLUCO_ART_CONTRACT and rebuild.
            </div>
          ) : state === "offline" ? (
            <div className="rounded-3xl border border-white/10 bg-white/[.02] p-8 text-sm leading-6 text-[#9EA6A2]">
              Could not reach the collection. Check your wallet is on {CHAIN_NAME} and that the address is correct.
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[.02] p-8 text-sm leading-6 text-[#9EA6A2]">
              The collection is empty. Pieces appear here the moment they are minted.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((piece) => (
                <Link
                  key={piece.id}
                  href={`/art/piece?id=${piece.id}`}
                  className="focus-ring group overflow-hidden rounded-[28px] border border-white/[.08] bg-[#0e1110] transition-colors hover:border-[#78EBC1]/40"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#0a0c0b]">
                    {piece.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={piece.image}
                        alt={piece.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[.2em] text-[#4b544f]">
                        #{piece.id}
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-4 p-6">
                    <div>
                      <h2 className="text-base font-semibold">{piece.name}</h2>
                      <p className="mt-1 text-xs text-[#7f8984]">
                        Edition 1 of 1 · {piece.owner ? `${piece.owner.slice(0, 6)}…${piece.owner.slice(-4)}` : "unminted"}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[.16em] text-[#78EBC1]">
                      #{piece.id}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {state === "ready" && items.length > 0 ? (
            <p className="mt-8 text-xs text-[#6f7974]">
              Contract{" "}
              <a href={`${EXPLORER}/address/${ART}`} className="underline hover:text-[#78EBC1]" target="_blank" rel="noreferrer">
                {ART.slice(0, 10)}…{ART.slice(-6)}
              </a>{" "}
              on {CHAIN_NAME}. Verify ownership and provenance onchain — never trust a screenshot.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
