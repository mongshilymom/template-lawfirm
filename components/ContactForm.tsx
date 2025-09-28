"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm(){
  const formRef = useRef<HTMLFormElement>(null);
  const [loading,setLoading] = useState(false);

  async function send(e:React.FormEvent){
    e.preventDefault(); if(!formRef.current) return;
    setLoading(true);
    try{
      if(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID){
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          formRef.current!,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );
      } else {
        await fetch("/api/consultation", { method:"POST", body: new FormData(formRef.current!) });
      }
      alert("상담 요청이 전송되었습니다."); formRef.current!.reset();
    }catch{ alert("전송 실패. 잠시 후 다시 시도해주세요."); }
    finally{ setLoading(false); }
  }

  return (
    <form ref={formRef} onSubmit={send} className="space-y-3">
      <input name="name" required placeholder="성함" className="border p-3 rounded w-full" />
      <input name="phone" required placeholder="연락처" className="border p-3 rounded w-full" />
      <input name="email" type="email" placeholder="이메일" className="border p-3 rounded w-full" />
      <select name="practiceArea" className="border p-3 rounded w-full">
        <option value="">상담 분야 선택</option>
        <option value="corp">기업법무</option><option value="criminal">형사</option>
        <option value="family">가사/상속</option><option value="realestate">부동산</option>
      </select>
      <textarea name="message" placeholder="상담 내용" className="border p-3 rounded w-full" />
      <button disabled={loading} className="btn-primary w-full">{loading ? "전송 중..." : "상담 요청"}</button>
    </form>
  );
}
