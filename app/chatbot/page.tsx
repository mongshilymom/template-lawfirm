export default function Chatbot() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <h1 className="text-3xl font-heading">AI 법률 도우미</h1>
      <p>
        24시간 이용 가능한 AI 챗봇이 기본적인 법률 질문에 답변해드립니다. 사용자의 질문을 이해하고
        적절한 법률 정보를 제공하도록 설계되었습니다. 복잡한 법률 문제의 경우 전문가 상담을 추천드립니다.
      </p>
      {/* 실제 챗봇 위젯은 추후 API 연동을 통해 제공 */}
      <div className="p-4 border rounded-md bg-legend-platinum dark:bg-gray-900 text-center">
        AI 챗봇 기능은 현재 준비 중입니다.
      </div>
    </div>
  );
}