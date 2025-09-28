"use client";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm(){
  const formRef = useRef<HTMLFormElement>(null);
  const send = async (e:React.FormEvent)=>{
    e.preventDefault();
    if(!formRef.current) return;
    try{
      await emailjs.sendForm("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID", formRef.current, "YOUR_PUBLIC_KEY");
      alert("상담 요청이 전송되었습니다.");
      formRef.current.reset();
    }catch(e){ alert("전송에 실패했습니다. 설정을 확인해주세요."); }
  };
  return (
    <form ref={formRef} onSubmit={send} className="space-y-3">
      <input name="name" required placeholder="성함" className="input border p-3 rounded w-full" />
      <input name="phone" required placeholder="연락처" className="input border p-3 rounded w-full" />
      <input name="email" type="email" placeholder="이메일" className="input border p-3 rounded w-full" />
      <textarea name="message" placeholder="상담 내용" className="textarea border p-3 rounded w-full" />
      <button className="btn-primary w-full">상담 요청</button>
    </form>
  );
}
