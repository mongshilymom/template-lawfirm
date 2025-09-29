export type Lawyer = {
  name: string;
  title: string;
  specialties: string[];
  image?: string;
};

export const lawyers: Lawyer[] = [
  { name: "김태준", title: "대표변호사",     specialties: ["M&A", "기업법무"],      image: "/images/lawyers/kim.jpg" },
  { name: "이수진", title: "가사전문 변호사", specialties: ["이혼", "상속"],        image: "/images/lawyers/lee.jpg" },
  { name: "박한우", title: "형사전문 변호사", specialties: ["영장", "공판"],        image: "/images/lawyers/park.jpg" },
  { name: "정민서", title: "부동산/민사",     specialties: ["개발", "분쟁"],        image: "/images/lawyers/jung.jpg" },
];