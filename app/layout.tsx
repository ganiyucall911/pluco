import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { WalletProvider } from "@/components/wallet-provider";

const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const heading = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ganiyucall911.github.io/pluco"),
  title: {
    default: "PLUCO | Mint, buy and sell art on Base",
    template: "%s | PLUCO",
  },
  description:
    "An open art market on Base. Anyone can register a collection, mint a piece or buy one.",
  applicationName: "PLUCO",
  openGraph: {
    type: "website",
    siteName: "PLUCO",
    title: "PLUCO | Mint, buy and sell art on Base",
    description:
      "An open art market on Base. Anyone can register a collection, mint a piece or buy one.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "PLUCO | Mint, buy and sell art on Base",
    description:
      "An open art market on Base. Anyone can register a collection, mint a piece or buy one.",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
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
        <WalletProvider>
          <MotionProvider>
            <Navbar />
            {children}
            <Footer />
          </MotionProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
