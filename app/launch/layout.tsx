import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Launch a collection",
  description:
    "Launch a collection on PLUCO: register the contract, set royalties and publish on Base.",
  path: "/launch",
});

export default function LaunchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
