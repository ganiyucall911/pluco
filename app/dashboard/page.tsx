import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BuildStatus } from "@/components/build-status";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <main>
      <PageHero
        eyebrow="Dashboard"
        title="Build health, always current."
        body="A small ops view for the repository behind this site: the latest Build check run, refreshed live so a green badge never goes stale."
      />
      <section className="px-5 sm:px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <BuildStatus />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Required check", "build", "Branch protection on main requires the Build check before merge."],
              ["Workflow", "Build check", ".github/workflows/build.yml — npm ci, npm audit, npm run build."],
              ["Repo", "ganiyucall911/pluco", "Status is read straight from the GitHub Actions API."],
            ].map(([k, v, d]) => (
              <div key={k} className="rounded-none border border-line p-5">
                <p className="text-xs uppercase tracking-[.18em] text-faint">{k}</p>
                <p className="mt-2 text-sm text-paper">{v}</p>
                <p className="mt-2 text-xs leading-5 text-body">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
