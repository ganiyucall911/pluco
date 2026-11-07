"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-[70vh] place-items-center px-6 pt-24 pb-24">
      <div className="text-center">
        <p className="eyebrow">Something broke</p>
        <h1 className="mt-6 text-5xl font-semibold sm:text-7xl">This page failed to load.</h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-body">
          The error was logged. Try again, or head back to the market.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="focus-ring inline-flex min-h-12 items-center rounded-full bg-paper px-6 text-sm font-semibold text-ink"
          >
            Try again
          </button>
          <Link
            href="/"
            className="focus-ring inline-flex min-h-12 items-center rounded-full border border-line px-6 text-sm font-semibold text-paper"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
