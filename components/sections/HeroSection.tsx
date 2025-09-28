"use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FIRM_CONFIG } from "../../lib/config";

export default function HeroSection(){
  const { ref, inView } = useInView({ triggerOnce:true, threshold:0.2 });
  return (
    <section className="relative" ref={ref}>
      <div className="h-[70vh] md:h-[85vh] bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
        <div className="h-full w-full bg-black/40 flex items-center">
          <div className="max-w-6xl mx-auto px-4 text-white">
            <h1 className="text-4xl md:text-6xl font-heading leading-tight">법률, 그 이상의 가치 — {FIRM_CONFIG.name}</h1>
            <p className="mt-4 opacity-90">기업형사가사부동산 원스톱</p>
            <div className="mt-6 flex gap-3">
              <a href={`tel:${FIRM_CONFIG.phone}`} className="btn-primary">전화상담</a>
              <a href={FIRM_CONFIG.kakao} className="btn-secondary">카톡상담</a>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl md:text-4xl font-bold">{inView ? <CountUp end={5000} duration={1.2}/> : 0}+</div>
                <div>누적 승소</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">{inView ? <CountUp end={98} duration={1.3}/> : 0}%</div>
                <div>승소율</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
