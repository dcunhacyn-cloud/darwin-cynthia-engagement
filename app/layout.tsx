import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const metadataBase = new URL(`${protocol}://${host}`);
  return {
    metadataBase,
    title: "Cynthia & Darwin — We’re Getting Engaged",
    description: "Join Cynthia and Darwin in Kochi on September 26th, 2026, as they begin their forever.",
    openGraph: { title: "Cynthia & Darwin · 26.09.2026", description: "A love written in the stars. Join us in Kochi.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Cynthia and Darwin engagement invitation" }] },
    twitter: { card: "summary_large_image", title: "Cynthia & Darwin · 26.09.2026", description: "A love written in the stars. Join us in Kochi.", images: ["/og.png"] },
    icons: { icon: "/favicon.svg" },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#7d8b78" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.1.0/model-viewer.min.js" strategy="afterInteractive" /></body></html>;
}
