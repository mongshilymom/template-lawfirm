import "./globals.css";
import type { Metadata } from "next";
import Navigation from "../components/ui/Navigation";
import DebugBuild from "../components/DebugBuild";
import { FIRM_CONFIG } from "../lib/config";

export const metadata: Metadata = {
  title: "QUANTUM 법무법인 - 법률, 그 이상의 가치",
  description: "기업법무형사가사부동산 전문",
  metadataBase: new URL(FIRM_CONFIG.siteUrl),
  openGraph: { title: "QUANTUM 법무법인 - 법률, 그 이상의 가치", description: "기업법무형사가사부동산 전문", url: FIRM_CONFIG.siteUrl, images: ["/og-image.jpg"], type: "website" },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": FIRM_CONFIG.name,
    "url": FIRM_CONFIG.siteUrl,
    "telephone": FIRM_CONFIG.phone,
    "address": { "@type":"PostalAddress", "streetAddress": FIRM_CONFIG.address, "addressLocality":"서울", "addressCountry":"KR" }
  };
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Navigation />
        {children}
        <DebugBuild />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
