import ReviewSlider from '../components/ReviewSlider';
import PracticeAreaTabs from '../components/PracticeAreaTabs';
import DiagnosisWidget from '../components/DiagnosisWidget';
import FeeCalculator from '../components/FeeCalculator';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import LawyersSection from '../components/sections/LawyersSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with animated counters and CTA */}
      <HeroSection />
      {/* Services Section listing practice areas */}
      <ServicesSection />
      {/* Lawyers preview section */}
      <LawyersSection />
      {/* Legacy practice tabs (optional) */}
      <section className="px-4 py-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-heading mb-6 text-center">업무 분야 상세</h2>
        <PracticeAreaTabs />
      </section>
      {/* 30초 진단 & 수임료 계산기 */}
      <section className="px-4 py-12 bg-legend-platinum dark:bg-gray-900">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <DiagnosisWidget />
          <FeeCalculator />
        </div>
      </section>
      {/* Reviews */}
      <section className="px-4 py-12 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-heading mb-6">고객 후기</h2>
        <ReviewSlider />
      </section>
    </main>
  );
}