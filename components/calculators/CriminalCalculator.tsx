"use client";
import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CriminalCalculation {
  crimeType: string;
  baseSentence: string;
  adjustedSentence: string;
  probationChance: number;
  fineAmount: number;
  legalFees: number;
}

const crimeTypes = [
  { id: 'theft', name: '절도', baseMonths: 6, baseFine: 1000000 },
  { id: 'assault', name: '폭행', baseMonths: 4, baseFine: 2000000 },
  { id: 'fraud', name: '사기', baseMonths: 12, baseFine: 5000000 },
  { id: 'embezzlement', name: '횡령', baseMonths: 18, baseFine: 10000000 },
  { id: 'traffic', name: '교통사고', baseMonths: 3, baseFine: 3000000 },
  { id: 'drug', name: '마약사용', baseMonths: 8, baseFine: 5000000 },
  { id: 'violence', name: '상해', baseMonths: 10, baseFine: 3000000 },
  { id: 'sexual', name: '성범죄', baseMonths: 24, baseFine: 0 },
  { id: 'homicide', name: '살인', baseMonths: 120, baseFine: 0 },
  { id: 'robbery', name: '강도', baseMonths: 36, baseFine: 0 }
];

export default function CriminalCalculator() {
  const [formData, setFormData] = useState({
    crimeType: '',
    damageAmount: '',
    previousConvictions: '',
    hasVictimAgreement: false,
    hasRestitution: false,
    isFirstOffense: false,
    isSelfSurrender: false,
    ageCategory: 'adult'
  });

  const [result, setResult] = useState<CriminalCalculation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      const numValue = parseFloat(value);
      if (numValue < 0 || isNaN(numValue)) return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const calculateCriminal = () => {
    const selectedCrime = crimeTypes.find(crime => crime.id === formData.crimeType);
    if (!selectedCrime) return;

    const damageAmount = parseFloat(formData.damageAmount) || 0;
    const previousCount = parseInt(formData.previousConvictions) || 0;

    let baseMonths = selectedCrime.baseMonths;
    let baseFine = selectedCrime.baseFine;

    if (damageAmount > 100000000) {
      baseMonths *= 1.5;
      baseFine *= 2;
    } else if (damageAmount > 50000000) {
      baseMonths *= 1.3;
      baseFine *= 1.5;
    }

    if (previousCount > 0) {
      baseMonths *= (1 + previousCount * 0.3);
      baseFine *= (1 + previousCount * 0.2);
    }

    let adjustedMonths = baseMonths;
    let probationChance = 30;

    if (formData.hasVictimAgreement) {
      adjustedMonths *= 0.6;
      probationChance += 40;
    }

    if (formData.hasRestitution) {
      adjustedMonths *= 0.8;
      probationChance += 20;
    }

    if (formData.isFirstOffense) {
      adjustedMonths *= 0.7;
      probationChance += 30;
    }

    if (formData.isSelfSurrender) {
      adjustedMonths *= 0.8;
      probationChance += 15;
    }

    if (formData.ageCategory === 'minor') {
      adjustedMonths *= 0.5;
      probationChance += 50;
    } else if (formData.ageCategory === 'elderly') {
      adjustedMonths *= 0.8;
      probationChance += 20;
    }

    probationChance = Math.min(probationChance, 90);

    let legalFees = 3000000;
    if (selectedCrime.id === 'sexual' || selectedCrime.id === 'homicide') {
      legalFees = 15000000;
    } else if (selectedCrime.id === 'robbery' || selectedCrime.id === 'drug') {
      legalFees = 8000000;
    } else if (damageAmount > 100000000) {
      legalFees = 10000000;
    }

    const baseSentenceText = baseMonths >= 12
      ? `${Math.floor(baseMonths / 12)}년 ${baseMonths % 12}개월`
      : `${baseMonths}개월`;

    const adjustedSentenceText = adjustedMonths >= 12
      ? `${Math.floor(adjustedMonths / 12)}년 ${Math.round(adjustedMonths % 12)}개월`
      : `${Math.round(adjustedMonths)}개월`;

    setResult({
      crimeType: selectedCrime.name,
      baseSentence: baseSentenceText,
      adjustedSentence: adjustedSentenceText,
      probationChance: Math.round(probationChance),
      fineAmount: Math.round(baseFine),
      legalFees: Math.round(legalFees)
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR');
  };

  const exportToPDF = async () => {
    if (!result) return;

    setIsCalculating(true);
    try {
      const element = document.getElementById('calc-result');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`형사사건_예상결과_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('PDF 생성 실패:', error);
      alert('PDF 생성 중 오류가 발생했습니다.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">사건 정보</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                범죄 유형
              </label>
              <select
                name="crimeType"
                value={formData.crimeType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md dark:bg-gray-700"
              >
                <option value="">선택하세요</option>
                {crimeTypes.map(crime => (
                  <option key={crime.id} value={crime.id}>
                    {crime.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                피해 금액 (원)
              </label>
              <input
                type="number"
                name="damageAmount"
                value={formData.damageAmount}
                onChange={handleInputChange}
                min="0"
                className="w-full p-2 border rounded-md dark:bg-gray-700"
                placeholder="예: 10000000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                전과 횟수
              </label>
              <input
                type="number"
                name="previousConvictions"
                value={formData.previousConvictions}
                onChange={handleInputChange}
                min="0"
                max="10"
                className="w-full p-2 border rounded-md dark:bg-gray-700"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                연령대
              </label>
              <select
                name="ageCategory"
                value={formData.ageCategory}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md dark:bg-gray-700"
              >
                <option value="adult">성인 (19세 이상)</option>
                <option value="minor">미성년자 (19세 미만)</option>
                <option value="elderly">고령자 (65세 이상)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">정상참작 사유</h3>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="hasVictimAgreement"
                checked={formData.hasVictimAgreement}
                onChange={handleInputChange}
                className="mr-2"
              />
              피해자 합의
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="hasRestitution"
                checked={formData.hasRestitution}
                onChange={handleInputChange}
                className="mr-2"
              />
              손해 배상
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFirstOffense"
                checked={formData.isFirstOffense}
                onChange={handleInputChange}
                className="mr-2"
              />
              초범
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isSelfSurrender"
                checked={formData.isSelfSurrender}
                onChange={handleInputChange}
                className="mr-2"
              />
              자수/자백
            </label>
          </div>

          <button
            onClick={calculateCriminal}
            disabled={!formData.crimeType}
            className="w-full mt-6 bg-legend-gold text-black py-2 px-4 rounded-md hover:bg-legend-gold/80 transition-colors disabled:opacity-50"
          >
            계산하기
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {result && (
          <div id="calc-result" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-center">예상 결과</h2>

            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span>범죄 유형</span>
                  <span className="font-semibold">{result.crimeType}</span>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span>기본 형량</span>
                  <span className="font-semibold">{result.baseSentence}</span>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span>예상 형량</span>
                  <span className="font-semibold text-red-600">{result.adjustedSentence}</span>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span>집행유예 가능성</span>
                  <span className="font-semibold text-green-600">{result.probationChance}%</span>
                </div>
              </div>

              {result.fineAmount > 0 && (
                <div className="border-b pb-3">
                  <div className="flex justify-between">
                    <span>예상 벌금</span>
                    <span className="font-semibold">{formatNumber(result.fineAmount)}원</span>
                  </div>
                </div>
              )}

              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>예상 변호사 비용</span>
                  <span className="text-legend-gold">{formatNumber(result.legalFees)}원</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                * 본 예측 결과는 참고용이며, 실제 판결과 다를 수 있습니다.<br/>
                * 정확한 상담을 위해 형사전문변호사와 상담하시기 바랍니다.
              </p>
            </div>

            <button
              onClick={exportToPDF}
              disabled={isCalculating}
              className="w-full mt-4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {isCalculating ? 'PDF 생성중...' : 'PDF 다운로드'}
            </button>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">형사사건 참고사항</h3>
          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            <li>• 피해자 합의시 형량 대폭 감경 가능</li>
            <li>• 초범의 경우 집행유예 가능성 높음</li>
            <li>• 전과가 있을 경우 실형 가능성 증가</li>
            <li>• 자수·자백시 정상참작 인정</li>
            <li>• 손해배상시 선처 고려</li>
          </ul>
        </div>
      </div>
    </div>
  );
}