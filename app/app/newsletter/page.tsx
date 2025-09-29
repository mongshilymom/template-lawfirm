export default function Newsletter() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <h1 className="text-3xl font-heading mb-4">뉴스레터 구독</h1>
      <p>
        최신 판례와 법률 소식을 이메일로 받아보세요. 아래 이메일 주소를 입력하면 정기적으로 업데이트를
        보내드립니다.
      </p>
      {/* 구독 폼은 추후 메일 서비스와 연동 */}
      <form className="flex flex-col sm:flex-row gap-2">
        <input type="email" placeholder="you@example.com" className="flex-1 p-2 border rounded-md dark:bg-gray-800" />
        <button type="submit" className="btn-primary">구독하기</button>
      </form>
    </div>
  );
}