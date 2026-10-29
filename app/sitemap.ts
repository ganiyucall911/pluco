import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://ganiyucall911.github.io/pluco";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/explore", priority: 0.9 },
  { path: "/collections", priority: 0.9 },
  { path: "/marketplace", priority: 0.9 },
  { path: "/creators", priority: 0.8 },
  { path: "/mint", priority: 0.8 },
  { path: "/verification", priority: 0.6 },
  { path: "/protocol", priority: 0.6 },
  { path: "/community", priority: 0.5 },
  { path: "/about", priority: 0.5 },
  { path: "/contact", priority: 0.4 },
  { path: "/legal", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  }));
}
