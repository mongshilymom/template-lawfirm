export default function VoiceConsultation() {
  return (
    <div className="p-4 border rounded-md bg-legend-platinum dark:bg-gray-900">
      <h3 className="text-lg font-heading mb-2">음성 상담 예약</h3>
      <p>
        저희 변호사와 음성으로 직접 상담하고 싶으시면 아래 링크를 통해 예약하세요.
      </p>
      <a
        href="https://calendly.com/your-lawfirm/voice-consultation"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-legend-crimson underline"
      >
        Calendly에서 예약하기
      </a>
    </div>
  );
}