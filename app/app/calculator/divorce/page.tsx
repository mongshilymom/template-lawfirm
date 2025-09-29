import dynamic from 'next/dynamic';

const DivorceCalculator = dynamic(() => import('../../../components/calculators/DivorceCalculator'), { ssr: false });

export default function DivorcePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-4">이혼 위자료 계산기</h1>
      <p className="mb-6">기본 정보를 입력하여 예상 위자료를 계산해보세요.</p>
      <DivorceCalculator />
    </div>
  );
}