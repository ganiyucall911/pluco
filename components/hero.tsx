"use client";

import { motion } from "framer-motion";
import { Button } from "./button";

export function Hero() {
  return (
    <section className="relative flex min-h-[86svh] items-center overflow-hidden px-6 pb-20 pt-28 sm:pb-28 sm:pt-36 lg:min-h-[820px]">
      <div className="grid-noise absolute inset-0 opacity-80" />
      <div className="pointer-events-none absolute right-[-15%] top-[5%] h-[420px] w-[420px] rounded-full bg-surface-2/35 blur-[120px] sm:h-[760px] sm:w-[760px]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[.3em] text-paper sm:text-xs">
            The NFT Ownership Network
          </p>
          <h1 className="text-[clamp(3rem,12vw,9.2rem)] font-semibold leading-[.86] sm:leading-[.82] lg:leading-[.79]">
            Own what
            <br />
            <span className="bg-gradient-to-r from-paper to-paper bg-clip-text text-transparent">
              matters.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-body sm:mt-8 sm:text-lg sm:leading-8">
            Discover collections, support creators and belong to communities shaping digital culture.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-9">
            <Button href="/collections">Explore collections</Button>
            <Button href="/creators" variant="secondary">
              Become a creator
            </Button>
          </div>
          <p className="mt-6 text-[10px] uppercase tracking-[.15em] text-faint sm:mt-7 sm:text-xs">
            Curated demo content · no live sales
          </p>
        </motion.div>
        <div className="relative mx-auto hidden aspect-square w-full max-w-[560px] sm:block">
          <motion.div
            className="absolute inset-[5%] rounded-full border border-paper/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-[17%] rounded-full border border-dashed border-paper/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-[28%] grid place-items-center rounded-[38%] border border-line bg-gradient-to-br from-surface-2 via-surface-2 to-ink font-serif text-[clamp(5rem,14vw,11rem)] text-paper shadow-[0_0_100px_rgba(255,255,255,.16)]"
            animate={{ y: [0, -10, 0], rotate: [-2, 1, -2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            P
          </motion.div>
          <div className="absolute bottom-[6%] left-[4%] rounded-full border border-line bg-ink/50 px-3 py-2 text-[10px] uppercase tracking-[.2em] text-body backdrop-blur sm:left-[12%] sm:px-4 sm:text-xs">
            Ownership becomes culture
          </div>
        </div>
      </div>
    </section>
  );
}
