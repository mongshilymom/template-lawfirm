"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FIRM_CONFIG } from '../../lib/config';
import { SITE_CONFIG, formatCases, formatSuccessRate } from '../../lib/siteConfig';

/**
 * The hero section introduces the firm with a fullscreen background,
 * animated counters and prominent call to action buttons.  Counters
 * smoothly increment up to their target values when the component mounts.
 */
export default function HeroSection() {
  const [wins, setWins] = useState(0);
  const [rate, setRate] = useState(0);

  // Simple count up animation for wins and rate.
  useEffect(() => {
    const targetRate = Math.round(SITE_CONFIG.SUCCESS_RATE * 100);
    const winInterval = setInterval(() => {
      setWins((v) => {
        const next = v + 50;
        return next >= SITE_CONFIG.TOTAL_CASES ? SITE_CONFIG.TOTAL_CASES : next;
      });
    }, 10);
    const rateInterval = setInterval(() => {
      setRate((v) => {
        const next = v + 1;
        return next >= targetRate ? targetRate : next;
      });
    }, 40);
    return () => {
      clearInterval(winInterval);
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
            {FIRM_CONFIG.name}
            <br />
            <span className="text-legend-gold">{FIRM_CONFIG.tagline}</span>
          </motion.h1>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            기업·형사·가사·부동산 전 분야 원스톱 솔루션
          </p>
          <div className="mt-6 flex gap-3">
            <a href={`tel:${FIRM_CONFIG.phone}`} className="btn-primary">
              전화상담
            </a>
            <a
              href={FIRM_CONFIG.kakao}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              카톡상담
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <div className="text-3xl md:text-4xl font-bold">
                {formatCases(wins)}
              </div>
              <div>누적 승소</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">{rate}%</div>
              <div>승소율</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
