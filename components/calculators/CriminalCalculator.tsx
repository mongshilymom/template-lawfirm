"use client";
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function CriminalCalculator() {
  const [severity, setSeverity] = useState('1');
  const [previous, setPrevious] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  // Reference to the result container for PDF generation
  const resultRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    const s = parseInt(severity) || 1;
    // Base sentence in months: severity * 6; previous convictions double the sentence
    let months = s * 6;
    if (previous) months *= 2;
    setResult(months);
  };

  // Generate a PDF of the result using html2canvas and jsPDF
  const downloadPdf = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
    pdf.save('criminal-estimate.pdf');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">범죄 심각도 (1-10)</label>
        <input type="number" min="1" max="10" value={severity} onChange={(e) => setSeverity(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <div className="flex items-center">
        <input id="previous" type="checkbox" checked={previous} onChange={(e) => setPrevious(e.target.checked)} className="mr-2" />
        <label htmlFor="previous">전과가 있음</label>
      </div>
      <button onClick={calculate} className="btn-primary">형량 예측</button>
      {result !== null && (
        <div
          ref={resultRef}
          id="calc-result"
          className="mt-4 p-4 border rounded-md bg-legend-platinum dark:bg-gray-900"
        >
          예상 형량: <strong>{result}개월</strong>
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