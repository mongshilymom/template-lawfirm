export const siteConfig = {
  // 법무법인 기본 정보
  name: "QUANTUM 법무법인",
  tagline: "법률, 그 이상의 가치",
  description: "법무법인 홈페이지 제작 전문 | 7일 완성 | 390만원",

  // 연락처 정보
  contact: {
    phone: "02-6956-3434",
    email: "contact@quantum-law.kr",
    address: "서울 강남구 테헤란로 152",
    kakao: "https://pf.kakao.com/_xXXXX",
  },

  // 사이트 URL
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://template-lawfirm.vercel.app",

  // Hero 섹션 KPI 데이터
  stats: {
    experience: 15, // 경력 년수
    cases: 2500,    // 처리 사건수
    clients: 1200,  // 고객 수
    successRate: 98, // 성공률
  },

  // 주요 업무 분야 (Services Section용)
  services: [
    {
      id: "criminal",
      title: "형사사건",
      description: "전문 형사변호사가 체계적이고 전략적인 변론을 통해 의뢰인의 권익을 보호합니다.",
      icon: "⚖️",
      features: ["구속 방어", "형사 항소", "성범죄 전문", "경제사범"]
    },
    {
      id: "civil",
      title: "민사소송",
      description: "복잡한 민사분쟁을 신속하고 정확하게 해결하여 의뢰인의 손해를 최소화합니다.",
      icon: "📋",
      features: ["손해배상", "계약분쟁", "부동산분쟁", "의료분쟁"]
    },
    {
      id: "family",
      title: "가사사건",
      description: "가족 간의 소중한 관계를 고려한 따뜻하면서도 전문적인 법률 서비스를 제공합니다.",
      icon: "👨‍👩‍👧‍👦",
      features: ["이혼소송", "양육권", "재산분할", "상속분쟁"]
    },
    {
      id: "corporate",
      title: "기업법무",
      description: "기업의 지속적인 성장을 위한 종합적인 법률 자문과 리스크 관리를 지원합니다.",
      icon: "🏢",
      features: ["계약검토", "컴플라이언스", "M&A", "노무관리"]
    }
  ],

  // SEO 메타데이터
  seo: {
    title: "QUANTUM Legal - 프리미엄 법무법인 템플릿",
    description: "법무법인 홈페이지 제작 전문 | 7일 완성 | 390만원",
    keywords: ["법무법인", "변호사", "법률상담", "홈페이지제작", "법률서비스"],
    ogImage: "/og-image.jpg",
    favicon: "/favicon.ico"
  },

  // JSON-LD 구조화 데이터
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "QUANTUM 법무법인",
    telephone: "02-6956-3434",
    email: "contact@quantum-law.kr",
    address: {
      "@type": "PostalAddress",
      streetAddress: "서울 강남구 테헤란로 152",
      addressCountry: "KR"
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://template-lawfirm.vercel.app",
    description: "법무법인 홈페이지 제작 전문 | 7일 완성 | 390만원",
    areaServed: "대한민국",
    serviceType: ["형사사건", "민사소송", "가사사건", "기업법무"]
  }
} as const;

// 기존 FIRM_CONFIG와의 호환성을 위한 alias
export const FIRM_CONFIG = siteConfig;