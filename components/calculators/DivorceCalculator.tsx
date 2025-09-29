"use client";
import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DivorceCalculation {
  propertyDivision: number;
  alimony: number;
  childSupport: number;
  totalFees: number;
}

export default function DivorceCalculator() {
  const [formData, setFormData] = useState({
    totalAssets: '',
    monthlyIncome: '',
    spouseIncome: '',
    childrenCount: '',
    marriageDuration: '',
    hasRealEstate: false,
    hasBusiness: false,
    isContested: false
  });

  const [result, setResult] = useState<DivorceCalculation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      const numValue = parseFloat(value);
      if (numValue < 0 || isNaN(numValue)) return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const calculateDivorce = () => {
    const assets = parseFloat(formData.totalAssets) || 0;
    const income = parseFloat(formData.monthlyIncome) || 0;
    const spouseIncome = parseFloat(formData.spouseIncome) || 0;
    const children = parseInt(formData.childrenCount) || 0;
    const duration = parseInt(formData.marriageDuration) || 0;

    let propertyDivision = assets * 0.5;

    let alimony = 0;
    if (duration > 3 && income > spouseIncome) {
      alimony = (income - spouseIncome) * 0.3 * Math.min(duration / 10, 2);
    }

    let childSupport = 0;
    if (children > 0) {
      childSupport = children * Math.max(income * 0.15, 300000);
    }

    let baseFee = 3000000;
    if (formData.isContested) baseFee *= 1.5;
    if (formData.hasRealEstate) baseFee += 2000000;
    if (formData.hasBusiness) baseFee += 3000000;
    if (assets > 100000000) baseFee += assets * 0.02;

    const totalFees = Math.round(baseFee);

    setResult({
      propertyDivision: Math.round(propertyDivision),
      alimony: Math.round(alimony),
      childSupport: Math.round(childSupport),
      totalFees
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
      pdf.save(`이혼소송_비용계산서_${new Date().toISOString().split('T')[0]}.pdf`);
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
          <h2 className="text-xl font-semibold mb-4">기본 정보</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                총 재산 (원)
              </label>
              <input
                type="number"
                name="totalAssets"
                value={formData.totalAssets}
                onChange={handleInputChange}
                min="0"
                className="w-full p-2 border rounded-md dark:bg-gray-700"
                placeholder="예: 200000000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                월 소득 (원)
              </label>
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleInputChange}
                min="0"
                className="w-full p-2 border rounded-md dark:bg-gray-700"
                placeholder="예: 5000000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                배우자 월 소득 (원)
              </label>
              <input
                type="number"
                name="spouseIncome"
                value={formData.spouseIncome}
                onChange={handleInputChange}
                min="0"
                className="w-full p-2 border rounded-md dark:bg-gray-700"
                placeholder="예: 3000000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                자녀 수
              </label>
              <input
                type="number"
                name="childrenCount"
                value={formData.childrenCount}
                onChange={handleInputChange}
                min="0"
                max="10"
                className="w-full p-2 border rounded-md dark:bg-gray-700"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                결혼 기간 (년)
              </label>
              <input
                type="number"
                name="marriageDuration"
                value={formData.marriageDuration}
                onChange={handleInputChange}
                min="0"
                className="w-full p-2 border rounded-md dark:bg-gray-700"
                placeholder="예: 10"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">추가 사항</h3>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="hasRealEstate"
                checked={formData.hasRealEstate}
                onChange={handleInputChange}
                className="mr-2"
              />
              부동산 포함
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="hasBusiness"
                checked={formData.hasBusiness}
                onChange={handleInputChange}
                className="mr-2"
              />
              사업체 포함
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isContested"
                checked={formData.isContested}
                onChange={handleInputChange}
                className="mr-2"
              />
              합의이혼 불가 (조정/소송)
            </label>
          </div>

          <button
            onClick={calculateDivorce}
            className="w-full mt-6 bg-legend-gold text-black py-2 px-4 rounded-md hover:bg-legend-gold/80 transition-colors"
          >
            계산하기
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {result && (
          <div id="calc-result" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-center">계산 결과</h2>

            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span>재산분할</span>
                  <span className="font-semibold">{formatNumber(result.propertyDivision)}원</span>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span>위자료 (월)</span>
                  <span className="font-semibold">{formatNumber(result.alimony)}원</span>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span>양육비 (월)</span>
                  <span className="font-semibold">{formatNumber(result.childSupport)}원</span>
                </div>
              </div>

              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>예상 변호사 비용</span>
                  <span className="text-legend-gold">{formatNumber(result.totalFees)}원</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                * 본 계산 결과는 참고용이며, 실제 소송 결과와 다를 수 있습니다.<br/>
                * 정확한 상담을 위해 전문 변호사와 상담하시기 바랍니다.
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
          <h3 className="font-semibold mb-3">이혼소송 비용 안내</h3>
          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            <li>• 기본 변호사 비용: 300만원부터</li>
            <li>• 재산분할 사건: 재산가액의 2% 추가</li>
            <li>• 부동산 포함시: 200만원 추가</li>
            <li>• 사업체 관련: 300만원 추가</li>
            <li>• 조정/소송시: 기본비용의 1.5배</li>
          </ul>
        </div>
      </div>
    </div>
  );
}