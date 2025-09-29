export interface Lawyer {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  experience: string;
  education: string[];
  achievements: string[];
  image: string;
  description: string;
  email?: string;
  phone?: string;
}

export const lawyers: Lawyer[] = [
  {
    id: "kim-senior",
    name: "김민수",
    title: "대표변호사",
    specialties: ["형사사건", "경제사범", "기업법무"],
    experience: "15년",
    education: [
      "서울대학교 법학과 졸업",
      "서울대학교 법학전문대학원 졸업",
      "제41회 사법고시 합격"
    ],
    achievements: [
      "대한변호사협회 우수변호사상 수상",
      "형사전문변호사 인증",
      "기업법무 전문 자격 보유"
    ],
    image: "/images/lawyers/lawyer-1.jpg",
    description: "15년간 형사사건과 기업법무 분야에서 2,500건 이상의 사건을 성공적으로 처리한 경험을 바탕으로, 의뢰인의 권익 보호를 최우선으로 하는 전문적인 법률 서비스를 제공합니다.",
    email: "kim@quantum-law.kr",
    phone: "02-6956-3434"
  },
  {
    id: "park-civil",
    name: "박지영",
    title: "선임변호사",
    specialties: ["민사소송", "부동산분쟁", "의료분쟁"],
    experience: "12년",
    education: [
      "연세대학교 법학과 졸업",
      "연세대학교 법학전문대학원 졸업",
      "제44회 사법고시 합격"
    ],
    achievements: [
      "민사소송 전문변호사 인증",
      "부동산분쟁 해결 우수사례 300건 이상",
      "의료분쟁조정중재원 전문위원"
    ],
    image: "/images/lawyers/lawyer-2.jpg",
    description: "복잡한 민사분쟁과 부동산 문제를 신속하고 정확하게 해결하여 의뢰인의 손해를 최소화하고 권익을 극대화하는 데 최선을 다하고 있습니다.",
    email: "park@quantum-law.kr",
    phone: "02-6956-3435"
  },
  {
    id: "lee-family",
    name: "이정호",
    title: "선임변호사",
    specialties: ["가사사건", "이혼소송", "상속분쟁"],
    experience: "10년",
    education: [
      "고려대학교 법학과 졸업",
      "고려대학교 법학전문대학원 졸업",
      "제47회 사법고시 합격"
    ],
    achievements: [
      "가사전문변호사 인증",
      "이혼·상속 전문 상담 1,000건 이상",
      "가정법원 조정위원 경력"
    ],
    image: "/images/lawyers/lawyer-3.jpg",
    description: "가족 간의 소중한 관계를 고려하면서도 의뢰인의 법적 권익을 확실히 보호할 수 있는 따뜻하고 전문적인 법률 서비스를 제공합니다.",
    email: "lee@quantum-law.kr",
    phone: "02-6956-3436"
  },
  {
    id: "choi-corporate",
    name: "최윤아",
    title: "변호사",
    specialties: ["기업법무", "계약법", "노동법"],
    experience: "8년",
    education: [
      "성균관대학교 법학과 졸업",
      "성균관대학교 법학전문대학원 졸업",
      "제50회 변호사시험 합격"
    ],
    achievements: [
      "기업법무 전문 자격 보유",
      "중소기업 법률자문 200개사 이상",
      "노동법 세미나 강사 활동"
    ],
    image: "/images/lawyers/lawyer-4.jpg",
    description: "기업의 지속적인 성장과 발전을 위한 종합적인 법률 자문과 체계적인 리스크 관리를 통해 기업 가치 향상에 기여하고 있습니다.",
    email: "choi@quantum-law.kr",
    phone: "02-6956-3437"
  }
];