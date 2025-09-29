"use client";
import { useState } from 'react';

export default function DiagnosisWidget() {
  const [issue, setIssue] = useState('divorce');
  const [result, setResult] = useState<string | null>(null);

  const diagnose = () => {
    let message = '';
    switch (issue) {
      case 'divorce':
        message = '이혼 관련 문제는 재산분할, 위자료, 자녀 양육권 등을 고려해야 합니다.';
        break;
      case 'inheritance':
        message = '상속은 유언장 여부, 법정 상속 순위, 세금 등을 검토해야 합니다.';
        break;
      case 'criminal':
        message = '형사 사건은 초기 진술과 증거 확보가 중요합니다.';
        break;
      case 'corporate':
        message = '기업 법무는 계약 검토와 규정 준수가 핵심입니다.';
        break;
      default:
        message = '상담을 통해 자세한 진단을 받아보세요.';
    }
    setResult(message);
  };

  return (
    <div className="p-4 border rounded-md bg-legend-platinum dark:bg-gray-900">
      <h3 className="text-lg font-heading mb-2">30초 법률 진단</h3>
      <div className="flex flex-col gap-2 mb-2">
        <label htmlFor="issue">관심 분야 선택</label>
        <select id="issue" value={issue} onChange={(e) => setIssue(e.target.value)} className="p-2 border rounded-md dark:bg-gray-800">
          <option value="divorce">이혼</option>
          <option value="inheritance">상속</option>
          <option value="criminal">형사</option>
          <option value="corporate">기업</option>
        </select>
      </div>
      <button onClick={diagnose} className="btn-primary mb-2">진단하기</button>
      {result && <p className="text-sm mt-2">{result}</p>}
    </div>
  );
}