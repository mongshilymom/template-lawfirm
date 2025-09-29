"use client";
import ContactForm from "../../components/ContactForm";
import Link from "next/link";

export default function Page(){
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-2">상담 신청</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <section className="md:col-span-2"><ContactForm/></section>
        <aside className="space-y-2">
          <div className="border rounded p-4">
            <div className="font-semibold mb-2">빠른 링크</div>
            <ul className="list-disc pl-5 space-y-1">
              <li><Link href="/calculator/divorce" className="underline">이혼 위자료 계산기</Link></li>
              <li><Link href="/calculator/inheritance" className="underline">상속세 계산기</Link></li>
              <li><Link href="/calculator/criminal" className="underline">형량 예측기</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
