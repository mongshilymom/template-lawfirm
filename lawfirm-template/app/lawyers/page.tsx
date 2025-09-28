import LawyerCard, { Lawyer } from '../../components/LawyerCard';

const lawyers: Lawyer[] = [
  {
    name: '김지훈 변호사',
    title: '가사/가족법 전문',
    description: '20년 경력의 가사 전문 변호사로 수백 건의 이혼 및 상속 사건을 성공적으로 해결했습니다.',
    imageSrc: '/lawyer-placeholder.png',
  },
  {
    name: '이수민 변호사',
    title: '기업법무 전문',
    description: '국내외 대기업 자문과 M&A 경험이 풍부하며 스타트업 설립 지원을 제공합니다.',
    imageSrc: '/lawyer-placeholder.png',
  },
  {
    name: '박현우 변호사',
    title: '형사 전문',
    description: '형사 사건의 변론과 방어 전략에 정통하며 높은 무죄 판결률을 자랑합니다.',
    imageSrc: '/lawyer-placeholder.png',
  },
  {
    name: '정민서 변호사',
    title: '부동산/민사 전문',
    description: '부동산 분쟁 및 민사 소송에서 탁월한 성과를 거두고 있습니다.',
    imageSrc: '/lawyer-placeholder.png',
  },
];

export default function Lawyers() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-6">구성원 소개</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {lawyers.map((lawyer) => (
          <LawyerCard key={lawyer.name} lawyer={lawyer} />
        ))}
      </div>
    </div>
  );
}