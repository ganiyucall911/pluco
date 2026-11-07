import type { Metadata } from "next";

/**
 * Single source of truth for the public origin. The site is a static export
 * served from a sub-path on GitHub Pages, so the base path is part of the URL
 * and every canonical, sitemap entry and OG image has to include it.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ganiyucall911.github.io/pluco"
).replace(/\/$/, "");

export const siteName = "PLUCO";

export const siteDescription =
  "An open art market on Base. Anyone can register a collection, mint a piece or buy one.";

export const ogImage = {
  url: `${siteUrl}/og/pluco.png`,
  width: 1200,
  height: 630,
  alt: "PLUCO — an open art market on Base",
};

/**
 * Per-page metadata: title, description, canonical and social card in one
 * call so no route ships a title without a description or a canonical.
 */
export function pageMeta({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName,
      title: `${title} | ${siteName}`,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [ogImage.url],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
