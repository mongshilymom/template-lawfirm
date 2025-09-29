"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  author: string;
  content: string;
}

const reviews: Review[] = [
  { author: '김변호사', content: '신속하고 친절한 상담 덕분에 큰 도움을 받았습니다.' },
  { author: '이의뢰인', content: '형사 사건이었지만 빠르게 해결되어 만족합니다.' },
  { author: '박사업가', content: '기업 법무 자문이 체계적이고 전문적이었습니다.' },
];

export default function ReviewSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden h-32">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col justify-center items-center text-center"
        >
          <p className="text-lg italic mb-2">“{reviews[index].content}”</p>
          <p className="text-sm font-semibold">— {reviews[index].author}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}