export default function News() {
  const news = [
    { title: '최신 판례 해설', date: '2025-09-20', excerpt: '최근 대법원 판례를 분석하고 주요 쟁점을 설명합니다.' },
    { title: '기업법무 세미나 개최', date: '2025-08-15', excerpt: '기업 고객을 위한 무료 법률 세미나를 개최했습니다.' },
    { title: '법률 아카데미 개강', date: '2025-07-01', excerpt: '일반인을 위한 법률 강의를 온라인으로 제공합니다.' },
  ];
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-6">뉴스 & 인사이트</h1>
      <div className="space-y-6">
        {news.map((item) => (
          <article key={item.title} className="border-b pb-4">
            <h3 className="text-xl font-heading mb-1">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.date}</p>
            <p>{item.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}