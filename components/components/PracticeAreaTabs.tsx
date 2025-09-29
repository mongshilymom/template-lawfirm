"use client";
import { useState } from 'react';

interface Area {
  key: string;
  label: string;
  description: string;
}

const areas: Area[] = [
  {
    key: 'family',
    label: '가사/가족법',
    description: '이혼, 상속, 친권 등 민감한 가족 문제를 전문적으로 처리합니다.'
  },
  {
    key: 'corporate',
    label: '기업법무',
    description: '기업 설립부터 M&A, 자문까지 비즈니스 전반을 지원합니다.'
  },
  {
    key: 'criminal',
    label: '형사',
    description: '형사 사건의 초기 대응부터 재판까지 철저하게 방어합니다.'
  },
  {
    key: 'realEstate',
    label: '부동산/민사',
    description: '부동산 거래, 분쟁 해결 등 안심할 수 있는 서비스를 제공합니다.'
  }
];

export default function PracticeAreaTabs() {
  const [active, setActive] = useState('family');

  const current = areas.find((a) => a.key === active)!;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {areas.map((area) => (
          <button
            key={area.key}
            onClick={() => setActive(area.key)}
            className={`px-4 py-2 rounded-md border transition-colors ${
              active === area.key
                ? 'bg-legend-gold text-legend-black'
                : 'bg-transparent dark:text-legend-platinum border-legend-gold'
            }`}
          >
            {area.label}
          </button>
        ))}
      </div>
      <div className="p-4 border rounded-md dark:border-gray-700 bg-legend-platinum dark:bg-gray-900">
        <h3 className="text-lg font-heading mb-2">{current.label}</h3>
        <p>{current.description}</p>
      </div>
    </div>
  );
}