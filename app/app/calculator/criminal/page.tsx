import dynamic from 'next/dynamic';

const CriminalCalculator = dynamic(() => import('../../../components/calculators/CriminalCalculator'), { ssr: false });

export default function CriminalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-4">형량 예측기</h1>
      <p className="mb-6">범죄의 심각도와 전과 여부를 입력하여 예상 형량을 확인하세요.</p>
      <CriminalCalculator />
    </div>
  );
}