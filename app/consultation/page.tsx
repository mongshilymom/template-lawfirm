"use client";
import ContactForm from "../../components/ContactForm";
import Link from "next/link";

export default function ConsultationPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-2">상담 신청</h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-300">아래 양식을 작성해 주세요. 평균 응답 30분 이내.</p>
      <div className="grid md:grid-cols-3 gap-8">
        <section className="md:col-span-2"><ContactForm /></section>
        <aside className="space-y-3">
          <div className="rounded-lg border p-4">
            <div className="font-semibold mb-2">빠른 링크</div>
            <ul className="list-disc pl-5 space-y-1">
              <li><Link className="underline" href="/calculator/divorce">이혼 위자료 계산기</Link></li>
              <li><Link className="underline" href="/calculator/inheritance">상속세 계산기</Link></li>
              <li><Link className="underline" href="/calculator/criminal">형량 예측기</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
