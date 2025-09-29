"use client";
import { useState } from 'react';

export default function FeeCalculator() {
  const [amount, setAmount] = useState('');
  const [complexity, setComplexity] = useState('low');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const value = parseFloat(amount) || 0;
    let rate = 0.1;
    if (complexity === 'medium') rate = 0.15;
    if (complexity === 'high') rate = 0.2;
    const fee = value * rate;
    setResult(fee);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">분쟁 또는 계약 금액 (₩)</label>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <div>
        <label className="block mb-1">사건 난이도</label>
        <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800">
          <option value="low">낮음</option>
          <option value="medium">보통</option>
          <option value="high">높음</option>
        </select>
      </div>
      <button onClick={calculate} className="btn-primary">예상 수임료 계산</button>
      {result !== null && (
        <div className="mt-4 p-4 border rounded-md bg-legend-platinum dark:bg-gray-900">
          예상 수임료: <strong>{result.toLocaleString()} ₩</strong>
        </div>
      )}
    </div>
  );
}