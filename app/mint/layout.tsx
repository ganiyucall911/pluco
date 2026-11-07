import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Mint",
  description:
    "Mint a piece into a PLUCO collection on Base. Every fee is stated before you sign.",
  path: "/mint",
});

export default function MintLayout({ children }: { children: React.ReactNode }) {
  return children;
}
