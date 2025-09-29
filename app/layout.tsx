import '../app/globals.css';
import DarkModeToggle from '../components/DarkModeToggle';
import Navigation from '../components/ui/Navigation';
import { siteConfig } from '../lib/siteConfig';

/**
 * 사이트 전역 메타데이터 설정
 * siteConfig에서 중앙화된 SEO 데이터를 사용합니다.
 */
export const metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords.join(', '),
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.siteUrl,
    images: [siteConfig.seo.ogImage],
    type: 'website',
    locale: 'ko_KR',
    siteName: siteConfig.name
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage]
  },
  icons: {
    icon: siteConfig.seo.favicon,
    apple: '/apple-touch-icon.png'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    naver: process.env.NAVER_SITE_VERIFICATION,
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteConfig.jsonLd)
          }}
        />
      </head>
      <body className="relative">
        {/* Global navigation */}
        <Navigation />
        {/* Page content offset by navigation height */}
        <div className="pt-20">{children}</div>
        {/* Global footer */}
        <footer className="mt-12 px-4 py-8 bg-legend-platinum dark:bg-gray-900 text-center">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="text-sm mt-2">
            <a href="/privacy" className="mr-4 hover:text-legend-gold">개인정보처리방침</a>
            <a href="/terms" className="hover:text-legend-gold">이용약관</a>
          </p>
          <p className="text-xs mt-2 opacity-60">
            {siteConfig.contact.address} | TEL: {siteConfig.contact.phone} | EMAIL: {siteConfig.contact.email}
          </p>
        </footer>
        {/* Dark mode toggle positioned bottom left */}
        <DarkModeToggle />
      </body>
    </html>
  );
}