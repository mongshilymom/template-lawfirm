import PracticeAreaTabs from '../../components/PracticeAreaTabs';

export default function Practice() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-4">업무 분야</h1>
      <p className="mb-4">다양한 전문 분야의 서비스를 만나보세요.</p>
      <PracticeAreaTabs />
    </div>
  );
}