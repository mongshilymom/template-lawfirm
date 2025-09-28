import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues with useEffect
const ConsultationForm = dynamic(() => import('../../components/ConsultationForm'), { ssr: false });

export default function Consultation() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-4">상담 신청</h1>
      <p className="mb-6">아래 양식을 작성해주시면 담당 변호사가 신속하게 연락드리겠습니다.</p>
      <ConsultationForm />
      {/* 카카오톡 상담 버튼 */}
      <div className="mt-6">
        <a
          href="https://open.kakao.com/o/your-chat-link"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          카카오톡 상담하기
        </a>
      </div>
    </div>
  );
}