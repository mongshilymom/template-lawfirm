import dynamic from 'next/dynamic';

const InheritanceCalculator = dynamic(() => import('../../../components/calculators/InheritanceCalculator'), { ssr: false });

export default function InheritancePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-4">상속세 계산기</h1>
      <p className="mb-6">재산 평가액과 상속인 수를 입력하여 예상 세액을 확인하세요.</p>
      <InheritanceCalculator />
    </div>
  );
}