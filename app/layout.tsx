import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { WalletProvider } from "@/components/wallet-provider";
import { ogImage, siteDescription, siteName, siteUrl } from "@/lib/site";

const body = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-body",
  weight: "100 900",
});
const heading = localFont({
  src: "../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-heading",
  weight: "300 700",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PLUCO | Mint, buy and sell art on Base",
    template: "%s | PLUCO",
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "PLUCO" }],
  creator: "PLUCO",
  keywords: [
    "NFT",
    "Base",
    "art market",
    "mint",
    "marketplace",
    "ERC-721",
    "onchain art",
  ],
  openGraph: {
    type: "website",
    siteName,
    title: "PLUCO | Mint, buy and sell art on Base",
    description: siteDescription,
    url: "/",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "PLUCO | Mint, buy and sell art on Base",
    description: siteDescription,
    images: [ogImage.url],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      description: siteDescription,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable}`}>
      <body>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <WalletProvider>
          <MotionProvider>
            <Navbar />
            <div id="content">{children}</div>
            <Footer />
          </MotionProvider>
        </WalletProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
