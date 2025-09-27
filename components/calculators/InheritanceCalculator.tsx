"use client";
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function InheritanceCalculator() {
  const [propertyValue, setPropertyValue] = useState('');
  const [heirs, setHeirs] = useState('1');
  const [result, setResult] = useState<number | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    const value = parseFloat(propertyValue) || 0;
    const n = parseInt(heirs) || 1;
    // Simple inheritance tax: 10% of estate minus basic deduction of 100M KRW / heir
    const deduction = 100000000 * n;
    const taxable = Math.max(value - deduction, 0);
    const tax = taxable * 0.1;
    setResult(tax);
  };

  const downloadPdf = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
    pdf.save('inheritance-estimate.pdf');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">재산 평가액 (₩)</label>
        <input value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <div>
        <label className="block mb-1">상속인 수</label>
        <input value={heirs} onChange={(e) => setHeirs(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <button onClick={calculate} className="btn-primary">상속세 계산</button>
      {result !== null && (
        <div ref={resultRef} id="calc-result" className="mt-4 p-4 border rounded-md bg-legend-platinum dark:bg-gray-900">
          예상 상속세: <strong>{result.toLocaleString()} ₩</strong>
          <div className="mt-2">
            <button onClick={downloadPdf} className="btn-secondary">
              PDF 다운로드
            </button>
          </div>
        </div>
      )}
    </div>
  );
}