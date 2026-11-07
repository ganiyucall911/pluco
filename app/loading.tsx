export default function Loading() {
  return (
    <main className="grid min-h-[60vh] place-items-center px-6 pt-24 pb-24" aria-busy="true">
      <div className="flex flex-col items-center gap-4">
        <span className="h-8 w-8 animate-spin rounded-full border border-line border-t-paper" />
        <p className="eyebrow" role="status">
          Loading
        </p>
      </div>
    </main>
  );
}
