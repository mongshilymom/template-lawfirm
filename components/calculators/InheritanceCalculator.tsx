"use client";
import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InheritanceCalculation {
  totalAssets: number;
  basicDeduction: number;
  spouseDeduction: number;
  childDeduction: number;
  taxableAmount: number;
  inheritanceTax: number;
  legalFees: number;
}

export default function InheritanceCalculator() {
  const [formData, setFormData] = useState({
    totalAssets: '',
    debts: '',
    spouseCount: '',
    childrenCount: '',
    parentCount: '',
    hasRealEstate: false,
    hasStocks: false,
    hasBusiness: false,
    isContested: false
  });

  const [result, setResult] = useState<InheritanceCalculation | null>(null);
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

  const calculateInheritance = () => {
    const assets = parseFloat(formData.totalAssets) || 0;
    const debts = parseFloat(formData.debts) || 0;
    const spouse = parseInt(formData.spouseCount) || 0;
    const children = parseInt(formData.childrenCount) || 0;
    const parents = parseInt(formData.parentCount) || 0;

    const netAssets = Math.max(assets - debts, 0);

    let basicDeduction = 200000000;

    let spouseDeduction = 0;
    if (spouse > 0) {
      spouseDeduction = Math.min(Math.max(netAssets * 0.15, 500000000), 3000000000);
    }

    let childDeduction = children * 50000000;

    const totalDeduction = basicDeduction + spouseDeduction + childDeduction;
    const taxableAmount = Math.max(netAssets - totalDeduction, 0);

    let inheritanceTax = 0;
    if (taxableAmount > 0) {
      if (taxableAmount <= 100000000) {
        inheritanceTax = taxableAmount * 0.1;
      } else if (taxableAmount <= 500000000) {
        inheritanceTax = 10000000 + (taxableAmount - 100000000) * 0.2;
      } else if (taxableAmount <= 1000000000) {
        inheritanceTax = 90000000 + (taxableAmount - 500000000) * 0.3;
      } else if (taxableAmount <= 3000000000) {
        inheritanceTax = 240000000 + (taxableAmount - 1000000000) * 0.4;
      } else {
        inheritanceTax = 1040000000 + (taxableAmount - 3000000000) * 0.5;
      }
    }

    let legalFees = 5000000;
    if (formData.isContested) legalFees *= 2;
    if (formData.hasRealEstate) legalFees += 3000000;
    if (formData.hasStocks) legalFees += 2000000;
    if (formData.hasBusiness) legalFees += 5000000;
    if (netAssets > 1000000000) legalFees += netAssets * 0.01;

    setResult({
      totalAssets: netAssets,
      basicDeduction,
      spouseDeduction,
      childDeduction,
      taxableAmount: Math.round(taxableAmount),
      inheritanceTax: Math.round(inheritanceTax),
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
      pdf.save(`상속세_계산서_${new Date().toISOString().split('T')[0]}.pdf`);
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
          <h2 className="text-xl font-semibold mb-4">재산 정보</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                총 자산 (원)
              </label>
              <input
                type="number"
                name="totalAssets"
                value={formData.totalAssets}
                onChange={handleInputChange}
                min="0"
                className="w-full p-2 border rounded-md dark:bg-gray-700"
                placeholder="예: 1000000000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                부채 (원)
              </label>
              <input
                type="number"
                name="debts"
                value={formData.debts}
                onChange={handleInputChange}
                min="0"
                className="w-full p-2 border rounded-md dark:bg-gray-700"
                placeholder="예: 100000000"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">상속인 정보</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                배우자
              </label>
              <input
                type="number"
                name="spouseCount"
                value={formData.spouseCount}
                onChange={handleInputChange}
                min="0"
                max="1"
                className="w-full p-2 border rounded-md dark:bg-gray-700"
                placeholder="0 또는 1"
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
                className="w-full p-2 border rounded-md dark:bg-gray-700"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                직계존속 (부모) 수
              </label>
              <input
                type="number"
                name="parentCount"
                value={formData.parentCount}
                onChange={handleInputChange}
                min="0"
                max="2"
                className="w-full p-2 border rounded-md dark:bg-gray-700"
                placeholder="0"
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
                name="hasStocks"
                checked={formData.hasStocks}
                onChange={handleInputChange}
                className="mr-2"
              />
              주식/증권 포함
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
              상속 분쟁 예상
            </label>
          </div>

          <button
            onClick={calculateInheritance}
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
                  <span>순자산</span>
                  <span className="font-semibold">{formatNumber(result.totalAssets)}원</span>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span>기초공제</span>
                  <span className="font-semibold text-green-600">-{formatNumber(result.basicDeduction)}원</span>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span>배우자공제</span>
                  <span className="font-semibold text-green-600">-{formatNumber(result.spouseDeduction)}원</span>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span>자녀공제</span>
                  <span className="font-semibold text-green-600">-{formatNumber(result.childDeduction)}원</span>
                </div>
              </div>

              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span>과세표준</span>
                  <span className="font-semibold">{formatNumber(result.taxableAmount)}원</span>
                </div>
              </div>

              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>상속세</span>
                  <span className="text-red-600">{formatNumber(result.inheritanceTax)}원</span>
                </div>
              </div>

              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>예상 변호사 비용</span>
                  <span className="text-legend-gold">{formatNumber(result.legalFees)}원</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                * 본 계산 결과는 참고용이며, 실제 세액과 다를 수 있습니다.<br/>
                * 정확한 상담을 위해 전문 세무사·변호사와 상담하시기 바랍니다.
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
          <h3 className="font-semibold mb-3">상속세율 구간</h3>
          <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            <li>• 1억원 이하: 10%</li>
            <li>• 1억원 ~ 5억원: 20%</li>
            <li>• 5억원 ~ 10억원: 30%</li>
            <li>• 10억원 ~ 30억원: 40%</li>
            <li>• 30억원 초과: 50%</li>
          </ul>

          <h3 className="font-semibold mt-4 mb-3">주요 공제항목</h3>
          <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            <li>• 기초공제: 2억원</li>
            <li>• 배우자공제: 최대 30억원</li>
            <li>• 자녀공제: 1인당 5천만원</li>
          </ul>
        </div>
      </div>
    </div>
  );
}