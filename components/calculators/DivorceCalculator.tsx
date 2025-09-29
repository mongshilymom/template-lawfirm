"use client";
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function DivorceCalculator() {
  const [husbandIncome, setHusbandIncome] = useState('');
  const [wifeIncome, setWifeIncome] = useState('');
  const [years, setYears] = useState('');
  const [children, setChildren] = useState('0');
  const [result, setResult] = useState<number | null>(null);

  // Ref to the result container for PDF generation
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    const h = parseFloat(husbandIncome) || 0;
    const w = parseFloat(wifeIncome) || 0;
    const y = parseFloat(years) || 0;
    const c = parseInt(children) || 0;
    const diff = Math.abs(h - w);
    // simplistic formula: base 10% of income difference per year + 5M per child
    const compensation = diff * 0.1 * y + c * 5000000;
    setResult(compensation);
  };

  // Generates a PDF of the current calculation result.  The
  // html2canvas library renders the referenced DOM node to a canvas,
  // which is then embedded in a jsPDF document.  The PDF is
  // automatically downloaded when created.
  const downloadPdf = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
    pdf.save('divorce-estimate.pdf');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">남편 연소득 (₩)</label>
        <input value={husbandIncome} onChange={(e) => setHusbandIncome(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <div>
        <label className="block mb-1">아내 연소득 (₩)</label>
        <input value={wifeIncome} onChange={(e) => setWifeIncome(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <div>
        <label className="block mb-1">혼인 기간 (년)</label>
        <input value={years} onChange={(e) => setYears(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <div>
        <label className="block mb-1">자녀 수</label>
        <input value={children} onChange={(e) => setChildren(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <button onClick={calculate} className="btn-primary">위자료 계산</button>
      {result !== null && (
        <div ref={resultRef} id="calc-result" className="mt-4 p-4 border rounded-md bg-legend-platinum dark:bg-gray-900">
          예상 위자료: <strong>{result.toLocaleString()} ₩</strong>
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