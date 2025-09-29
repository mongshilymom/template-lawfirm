export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-4">오시는 길</h1>
      <p className="mb-4">서울시 강남구 테헤란로 152, 롯데월드타워 76~80층</p>
      <p className="mb-4">전화: 02-1234-5678</p>
      <p className="mb-4">이메일: info@premium-law.com</p>
      <div className="mt-6">
        {/* 지도는 외부 서비스 연동이 필요하므로 추후 통합 */}
        <iframe
          title="office location"
          className="w-full h-64 border"
          src="https://maps.google.com/maps?q=seoul%20lotte%20world%20tower&t=&z=15&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
        ></iframe>
      </div>

      {/* 음성 상담 예약 위젯 */}
      <div className="mt-8">
        {/* 동적 로딩을 사용하여 클라이언트 사이드에서만 렌더링 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div id="voice-consultation-widget">
          <h2 className="text-2xl font-heading mb-2">음성 상담 예약</h2>
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
      </div>
    </div>
  );
}