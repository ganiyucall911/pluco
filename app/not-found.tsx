import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-6 pt-40 pb-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[.3em] text-[#78EBC1]">404</p>
        <h1 className="mt-6 text-5xl font-semibold sm:text-7xl">Nothing owned here.</h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#9EA6A2]">The page you were looking for isn&apos;t part of this collection.</p>
        <Link href="/" className="focus-ring mt-9 inline-flex min-h-12 items-center rounded-full bg-[#78EBC1] px-6 text-sm font-semibold text-[#050505]">
          Back to home
        </Link>
      </div>
    </main>
  );
}
