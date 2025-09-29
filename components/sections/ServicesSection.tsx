import { Briefcase, Gavel, Scale, Building2 } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '../../lib/siteConfig';

/**
 * 법무법인의 주요 업무 분야를 4개 카드로 표시합니다.
 * siteConfig.services 데이터를 사용하여 중앙화된 관리를 합니다.
 */
export default function ServicesSection() {
  // 아이콘 맵핑 (siteConfig의 icon 문자열을 실제 아이콘 컴포넌트로)
  const iconMap: Record<string, React.ReactNode> = {
    '⚖️': <Gavel className="w-6 h-6" />,
    '📋': <Scale className="w-6 h-6" />,
    '👨‍👩‍👧‍👦': <Briefcase className="w-6 h-6" />,
    '🏢': <Building2 className="w-6 h-6" />
  };
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading mb-4">전문 업무분야</h2>
        <p className="text-lg opacity-80">각 분야별 전문 변호사가 최고의 서비스를 제공합니다</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {siteConfig.services.map((service, i) => (
          <Link
            key={service.id}
            href={`/practice#${service.id}`}
            className="group p-6 rounded-xl border bg-white dark:bg-zinc-900 transition-all duration-300 hover:shadow-xl hover:scale-105 relative overflow-hidden"
          >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-legend-gold/10 to-legend-crimson/10 transition-opacity duration-300 pointer-events-none" />

            {/* 아이콘 */}
            <div className="text-legend-gold mb-4 flex justify-center">
              {iconMap[service.icon] || <div className="text-2xl">{service.icon}</div>}
            </div>

            {/* 타이틀과 설명 */}
            <div className="relative z-10">
              <h3 className="font-semibold text-lg mb-2 text-center">{service.title}</h3>
              <p className="text-sm opacity-70 mb-4 text-center leading-relaxed">
                {service.description}
              </p>

              {/* 주요 서비스 목록 */}
              <div className="flex flex-wrap gap-1 mb-4 justify-center">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-legend-gold/10 text-legend-gold px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="text-sm text-legend-gold group-hover:underline text-center">
                자세히 보기 →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
