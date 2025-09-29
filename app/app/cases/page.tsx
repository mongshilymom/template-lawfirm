export default function Cases() {
  const cases = [
    {
      title: '재벌가 상속 분쟁 승소',
      description: '5조원 규모의 상속 분쟁에서 의뢰인의 권리를 확정하며 승소를 이끌었습니다.',
    },
    {
      title: '대형 기업 횡령 사건 무죄',
      description: '수백억대 횡령 혐의를 받은 기업 대표의 무죄를 입증했습니다.',
    },
    {
      title: '이혼 소송에서 최적의 합의 도출',
      description: '재산분할과 양육권 분쟁에서 의뢰인에게 유리한 합의를 이끌어냈습니다.',
    },
  ];
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-6">성공 사례</h1>
      <div className="space-y-6">
        {cases.map((c) => (
          <div key={c.title} className="p-4 border rounded-md bg-legend-platinum dark:bg-gray-900">
            <h3 className="text-xl font-heading mb-2">{c.title}</h3>
            <p>{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}