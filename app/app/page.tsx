import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import LawyersSection from '../components/sections/LawyersSection';
import DebugBuild from '../components/DebugBuild';

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section with animated counters and CTA */}
        <HeroSection />

        {/* Services Section - 4개 주요 업무분야 카드 */}
        <ServicesSection />

        {/* Lawyers Section - 4명 변호사 프로필 */}
        <LawyersSection />

        {/* 상담 문의 섹션 */}
        <section className="bg-legend-platinum/10 dark:bg-gray-900/50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">법률 상담이 필요하신가요?</h2>
            <p className="text-lg opacity-80 mb-8">전문 변호사가 신속하고 정확한 상담을 제공합니다</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/consultation"
                className="inline-block px-8 py-4 bg-legend-gold text-white rounded-lg font-semibold hover:bg-legend-gold/90 transition-colors"
              >
                온라인 상담신청
              </a>
              <a
                href="/calculator"
                className="inline-block px-8 py-4 border border-legend-gold text-legend-gold rounded-lg font-semibold hover:bg-legend-gold/10 transition-colors"
              >
                수임료 계산기
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Debug Build Component */}
      <DebugBuild />
    </>
  );
}