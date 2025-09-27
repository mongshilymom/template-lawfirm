import '../app/globals.css';
import Link from 'next/link';
import DarkModeToggle from '../components/DarkModeToggle';

/**
 * Global metadata for the site.  This includes SEO friendly titles,
 * descriptions and Open Graph data used when sharing on social media.
 *
 * 변경 사항:
 * - 명칭을 "QUANTUM Legal" 브랜드로 업데이트했습니다.
 * - 상세 설명과 가격 정보를 메타데이터에 포함하여 검색엔진에서 노출될 수 있도록 했습니다.
 * - openGraph 정보를 정의하여 SNS 공유시 적절한 타이틀/설명이 표시됩니다.
 * - favicon 경로와 OG 이미지를 지정했습니다.
 */
export const metadata = {
  title: 'QUANTUM Legal - 프리미엄 법무법인 템플릿',
  description: '법무법인 홈페이지 제작 전문 | 7일 완성 | 390만원',
  metadataBase: new URL('https://template-lawfirm.vercel.app'),
  openGraph: {
    title: 'QUANTUM Legal - 프리미엄 법무법인 템플릿',
    description: '법무법인 홈페이지 제작 전문 | 7일 완성 | 390만원',
    url: 'https://template-lawfirm.vercel.app',
    images: ['/og-image.jpg'],
    type: 'website'
  },
  icons: { icon: '/favicon.ico' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="relative">
        {/* Global header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-legend-black shadow-sm">
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/" className="text-2xl font-heading text-legend-gold">Premium Law</Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/about">소개</Link>
              <Link href="/lawyers">구성원</Link>
              <Link href="/practice">업무분야</Link>
              <Link href="/cases">성공사례</Link>
              <Link href="/news">뉴스</Link>
              <Link href="/contact">오시는길</Link>
              <Link href="/consultation" className="btn-primary">상담신청</Link>
            </div>
          </nav>
        </header>
        {/* Page content offset by header height */}
        <div className="pt-16">{children}</div>
        {/* Global footer */}
        <footer className="mt-12 px-4 py-8 bg-legend-platinum dark:bg-gray-900 text-center">
          <p>&copy; {new Date().getFullYear()} Premium Law Firm. All rights reserved.</p>
          <p className="text-sm mt-2">
            <Link href="/privacy" className="mr-4">개인정보처리방침</Link>
            <Link href="/terms">이용약관</Link>
          </p>
        </footer>
        {/* Dark mode toggle positioned bottom left */}
        <DarkModeToggle />
      </body>
    </html>
  );
}