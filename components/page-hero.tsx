export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/[.07]">
      <div className="grain" />
      <div className="wrap relative py-16 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-6 max-w-[880px] text-[36px] leading-[1.05] sm:text-[54px]">{title}</h1>
        <p className="mt-6 max-w-[620px] text-[15px] leading-7 text-[#a6a6a6]">{body}</p>
      </div>
    </section>
  );
}
