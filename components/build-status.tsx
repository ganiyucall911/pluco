"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const REPO = "ganiyucall911/pluco";
const WORKFLOW = "build.yml";
const POLL_MS = 30_000;
const STALE_MS = 45 * 60_000;

type Run = {
  id: number;
  status: string;
  conclusion: string | null;
  created_at: string;
  updated_at: string;
  head_branch: string;
  head_sha: string;
  display_title: string;
  html_url: string;
};

type State =
  | { kind: "loading" }
  | { kind: "ok"; run: Run | null; checkedAt: number }
  | { kind: "private"; checkedAt: number }
  | { kind: "error"; message: string; checkedAt: number };

function ago(iso: string) {
  const s = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return s + "s ago";
  if (s < 3600) return Math.round(s / 60) + "m ago";
  if (s < 86400) return Math.round(s / 3600) + "h ago";
  return Math.round(s / 86400) + "d ago";
}

const COLORS: Record<string, string> = {
  success: "text-[#78EBC1] border-[#78EBC1]/30 bg-[#78EBC1]/10",
  failure: "text-[#ff8a8a] border-[#ff8a8a]/30 bg-[#ff8a8a]/10",
  pending: "text-[#ffd479] border-[#ffd479]/30 bg-[#ffd479]/10",
  none: "text-[#9EA6A2] border-white/15 bg-white/5",
};

function label(run: Run | null) {
  if (!run) return { text: "No runs yet", key: "none" };
  if (run.status !== "completed") return { text: "Building", key: "pending" };
  const key = run.conclusion || "none";
  const text = key === "success" ? "Passing" : key === "failure" ? "Failing" : key.replace(/_/g, " ");
  return { text, key: COLORS[key] ? key : "none" };
}

export function BuildStatus() {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [, setTick] = useState(0);
  const busy = useRef(false);

  const load = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    try {
      const res = await fetch(
        `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}/runs?branch=main&per_page=1`,
        { headers: { Accept: "application/vnd.github+json" }, cache: "no-store" }
      );
      if (res.status === 404) {
        setState({ kind: "private", checkedAt: Date.now() });
        return;
      }
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      setState({ kind: "ok", run: data.workflow_runs?.[0] ?? null, checkedAt: Date.now() });
    } catch (e) {
      setState({ kind: "error", message: e instanceof Error ? e.message : "unknown error", checkedAt: Date.now() });
    } finally {
      busy.current = false;
    }
  }, []);

  useEffect(() => {
    load();
    const poll = setInterval(load, POLL_MS);
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", load);
    const clock = setInterval(() => setTick((t) => t + 1), 1000);
    return () => {
      clearInterval(poll);
      clearInterval(clock);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", load);
    };
  }, [load]);

  const run = state.kind === "ok" ? state.run : null;
  const tag = label(run);
  const statusText = state.kind === "loading" ? "Checking" : state.kind === "private" ? "Unavailable" : state.kind === "error" ? "Unreachable" : tag.text;
  const statusKey = state.kind === "ok" ? tag.key : "none";
  const checked = state.kind === "loading" ? null : state.checkedAt;
  const stale = run ? Date.now() - new Date(run.updated_at).getTime() > STALE_MS : false;

  return (
    <div className="rounded-3xl border border-white/[.08] bg-white/[.02] p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[.2em] text-[#6f7873]">Build check · main</p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl">CI status</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#9EA6A2]">
            Live from GitHub Actions. Refreshes every 30 seconds while this page is open, and immediately when you return to the tab.
          </p>
        </div>
        <span className={`rounded-full border px-4 py-2 text-sm ${COLORS[statusKey]}`}>{statusText}</span>
      </div>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
        <a href={`https://github.com/${REPO}/actions/workflows/${WORKFLOW}`} target="_blank" rel="noreferrer" className="focus-ring inline-block rounded">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://github.com/${REPO}/actions/workflows/${WORKFLOW}/badge.svg?branch=main&t=${checked ?? 0}`}
            alt="Build check status"
            width={176}
            height={20}
            className="h-5 w-auto opacity-90"
          />
        </a>
        <div className="text-sm text-[#9EA6A2]">
          {run ? (
            <>
              <p className="text-white">{run.display_title}</p>
              <p className="mt-1">
                <span className="font-mono text-xs">{run.head_sha.slice(0, 7)}</span> · {run.head_branch} · updated {ago(run.updated_at)}
                {run.html_url ? (
                  <>
                    {" · "}
                    <a className="text-[#78EBC1] hover:underline" href={run.html_url} target="_blank" rel="noreferrer">
                      open run
                    </a>
                  </>
                ) : null}
              </p>
            </>
          ) : state.kind === "private" ? (
            "The repository is private, so the public status API and badge cannot be read yet. Once it is public (or on a paid plan with Pages), this panel turns live."
          ) : state.kind === "error" ? (
            "Could not reach GitHub right now. Retrying automatically."
          ) : state.kind === "loading" ? (
            "Loading the latest run…"
          ) : (
            "No workflow runs have been recorded yet."
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/[.07] pt-4 text-xs text-[#6f7873]">
        <span>{checked ? "Checked " + new Date(checked).toLocaleTimeString() : "Checking…"}</span>
        <span>Auto-refresh 30s</span>
        {stale ? <span className="text-[#ffd479]">Last run is old</span> : null}
        <button onClick={load} className="focus-ring rounded text-[#78EBC1] hover:underline">
          Refresh now
        </button>
      </div>
    </div>
  );
}
