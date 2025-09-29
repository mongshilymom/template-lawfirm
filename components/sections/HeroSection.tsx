"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { siteConfig } from '../../lib/siteConfig';

/**
 * The hero section introduces the firm with a fullscreen background,
 * animated counters and prominent call to action buttons.  Counters
 * smoothly increment up to their target values when the component mounts.
 */
export default function HeroSection() {
  const [experience, setExperience] = useState(0);
  const [cases, setCases] = useState(0);
  const [clients, setClients] = useState(0);
  const [successRate, setSuccessRate] = useState(0);

  // 통계 애니메이션 (siteConfig.stats 사용)
  useEffect(() => {
    const experienceInterval = setInterval(() => {
      setExperience((v) => {
        const next = v + 1;
        return next >= siteConfig.stats.experience ? siteConfig.stats.experience : next;
      });
    }, 80);

    const casesInterval = setInterval(() => {
      setCases((v) => {
        const next = v + 25;
        return next >= siteConfig.stats.cases ? siteConfig.stats.cases : next;
      });
    }, 10);

    const clientsInterval = setInterval(() => {
      setClients((v) => {
        const next = v + 12;
        return next >= siteConfig.stats.clients ? siteConfig.stats.clients : next;
      });
    }, 10);

    const rateInterval = setInterval(() => {
      setSuccessRate((v) => {
        const next = v + 1;
        return next >= siteConfig.stats.successRate ? siteConfig.stats.successRate : next;
      });
    }, 40);

    return () => {
      clearInterval(experienceInterval);
      clearInterval(casesInterval);
      clearInterval(clientsInterval);
      clearInterval(rateInterval);
    };
  }, []);

  return (
    <section className="relative h-[80vh] md:h-[92vh] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="text-white max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl leading-tight"
          >
            {siteConfig.name}
            <br />
            <span className="text-legend-gold">{siteConfig.tagline}</span>
          </motion.h1>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            기업·형사·가사·부동산 전 분야 원스톱 솔루션
          </p>
          <div className="mt-6 flex gap-3">
            <a href={`tel:${siteConfig.contact.phone}`} className="btn-primary">
              전화상담
            </a>
            <a
              href={siteConfig.contact.kakao}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              카톡상담
            </a>
          </div>

          {/* 4개 통계 카운터 */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-legend-gold">
                {experience}년
              </div>
              <div className="text-sm opacity-90">경력</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-legend-gold">
                {cases.toLocaleString()}+
              </div>
              <div className="text-sm opacity-90">처리사건</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-legend-gold">
                {clients.toLocaleString()}+
              </div>
              <div className="text-sm opacity-90">고객 수</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-legend-gold">
                {successRate}%
              </div>
              <div className="text-sm opacity-90">성공률</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
