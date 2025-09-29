import ContactForm from '../../components/ContactForm';

export default function Consultation() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-4">상담 신청</h1>
      <p className="mb-6">아래 양식을 작성해주시면 담당 변호사가 신속하게 연락드리겠습니다.</p>

      {/* Main Contact Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <ContactForm />
      </div>

      {/* Additional Options */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/calculator"
          className="flex-1 p-4 bg-legend-gold/10 border border-legend-gold rounded-lg text-center hover:bg-legend-gold/20 transition-colors"
        >
          <h3 className="font-semibold text-legend-gold mb-2">수임료 계산기</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">예상 수임료를 미리 확인해보세요</p>
        </a>
        <a
          href="https://open.kakao.com/o/your-chat-link"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 p-4 bg-yellow-400/10 border border-yellow-400 rounded-lg text-center hover:bg-yellow-400/20 transition-colors"
        >
          <h3 className="font-semibold text-yellow-600 mb-2">카카오톡 상담</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">즉시 채팅으로 상담받기</p>
        </a>
      </div>
    </div>
  );
}