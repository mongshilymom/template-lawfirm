import Link from 'next/link';

/**
 * CalculatorIndex displays a list of available legal calculators with
 * links to their dedicated pages.  This entry point makes it easy
 * for users to navigate to divorce, inheritance and criminal
 * calculators without guessing the URL structure.
 */
export default function CalculatorIndex() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-6">법률 계산기</h1>
      <p className="mb-4">세 가지 계산기를 선택하여 예상 비용 또는 형량을 확인하세요.</p>
      <ul className="space-y-3">
        <li>
          <Link href="/calculator/divorce" className="text-lg text-legend-crimson underline">
            이혼 위자료 계산기
          </Link>
        </li>
        <li>
          <Link href="/calculator/inheritance" className="text-lg text-legend-crimson underline">
            상속세 계산기
          </Link>
        </li>
        <li>
          <Link href="/calculator/criminal" className="text-lg text-legend-crimson underline">
            형량 예측기
          </Link>
        </li>
      </ul>
    </div>
  );
}