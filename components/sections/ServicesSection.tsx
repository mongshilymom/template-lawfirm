import { Briefcase, Gavel, Scale, Building2 } from 'lucide-react';
import Link from 'next/link';

/**
 * Displays the firm's practice areas as interactive cards.  Each card uses
 * an icon from lucide-react and reveals a soft gradient overlay on hover.
 */
export default function ServicesSection() {
  const services = [
    {
      icon: <Briefcase />,
      title: '기업법무',
      desc: '회사자문·M&A·계약'
    },
    {
      icon: <Gavel />,
      title: '형사',
      desc: '수사·공판·보호'
    },
    {
      icon: <Scale />,
      title: '가사',
      desc: '이혼·상속·친권'
    },
    {
      icon: <Building2 />,
      title: '부동산',
      desc: '개발·임대·분쟁'
    }
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-heading mb-8">업무분야</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <Link
            key={i}
            href="/practice"
            className="p-5 rounded-xl border bg-white dark:bg-zinc-900 transition hover:shadow-xl relative overflow-hidden group"
          >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-legend-gold/20 to-legend-crimson/20 transition pointer-events-none" />
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className="font-semibold">{s.title}</div>
            <div className="text-sm opacity-80">{s.desc}</div>
            <div className="mt-3 text-sm underline">자세히 보기</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
