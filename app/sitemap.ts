import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/explore", priority: 0.9 },
  { path: "/collections", priority: 0.9 },
  { path: "/marketplace", priority: 0.9 },
  { path: "/collections/aeryn", priority: 0.8 },
  { path: "/creators", priority: 0.8 },
  { path: "/mint", priority: 0.8 },
  { path: "/sell", priority: 0.7 },
  { path: "/launch", priority: 0.7 },
  { path: "/verification", priority: 0.6 },
  { path: "/protocol", priority: 0.6 },
  { path: "/community", priority: 0.5 },
  { path: "/about", priority: 0.5 },
  { path: "/brand", priority: 0.4 },
  { path: "/contact", priority: 0.4 },
  { path: "/legal", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    // trailingSlash: true — every exported route is served with a slash.
    url: path === "/" ? `${siteUrl}/` : `${siteUrl}${path}/`,
    lastModified,
    changeFrequency: "weekly",
    priority,
  }));
}
