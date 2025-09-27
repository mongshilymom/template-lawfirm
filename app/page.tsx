import DarkModeToggle from '../components/DarkModeToggle';
import Link from 'next/link';
import ReviewSlider from '../components/ReviewSlider';
import PracticeAreaTabs from '../components/PracticeAreaTabs';
import DiagnosisWidget from '../components/DiagnosisWidget';
import FeeCalculator from '../components/FeeCalculator';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Dark mode toggle on all pages */}
      <DarkModeToggle />
      {/* Hero Section */}
      <section className="pt-24 pb-16 text-center bg-legend-platinum dark:bg-legend-black">
        <h1 className="text-4xl md:text-6xl font-heading mb-4">한국 최고의 법무법인 템플릿</h1>
        <p className="text-lg md:text-xl mb-8">프리미엄 디자인, 실시간 상담, 법률 계산기까지 모든 기능을 하나로</p>
        <Link href="/consultation" className="btn-primary">상담 신청하기</Link>
      </section>
      {/* Practice Areas */}
      <section className="px-4 py-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-heading mb-6 text-center">업무 분야</h2>
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