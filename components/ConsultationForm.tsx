"use client";
import { useState } from 'react';

/**
 * ConsultationForm collects visitor information and posts it to our API.
 * The API endpoint returns a success message and a generated ID.
 */
export default function ConsultationForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        setSuccess(json.message);
      } else {
        setError(json.message || '오류가 발생했습니다');
      }
    } catch (e) {
      setError('서버와 통신할 수 없습니다');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="p-6 border rounded-md bg-legend-platinum dark:bg-legend-black text-center">
        <h2 className="text-2xl font-heading mb-4">상담 신청 완료</h2>
        <p>{success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">성명</label>
        <input name="name" id="name" required className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <div>
        <label htmlFor="phone" className="block mb-1">연락처</label>
        <input name="phone" id="phone" required className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">이메일</label>
        <input type="email" name="email" id="email" className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <div>
        <label htmlFor="practiceArea" className="block mb-1">상담 분야</label>
        <select name="practiceArea" id="practiceArea" className="w-full p-2 border rounded-md dark:bg-gray-800">
          <option value="family">가사/가족법</option>
          <option value="corporate">기업법무</option>
          <option value="criminal">형사</option>
          <option value="civil">민사</option>
          <option value="realEstate">부동산</option>
        </select>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="preferredDate" className="block mb-1">희망일</label>
          <input type="date" name="preferredDate" id="preferredDate" className="w-full p-2 border rounded-md dark:bg-gray-800" />
        </div>
        <div className="flex-1">
          <label htmlFor="preferredTime" className="block mb-1">시간대</label>
          <select name="preferredTime" id="preferredTime" className="w-full p-2 border rounded-md dark:bg-gray-800">
            <option value="morning">오전</option>
            <option value="afternoon">오후</option>
            <option value="evening">저녁</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="urgency" className="block mb-1">긴급도</label>
        <select name="urgency" id="urgency" className="w-full p-2 border rounded-md dark:bg-gray-800">
          <option value="normal">보통</option>
          <option value="urgent">긴급</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block mb-1">상담 내용</label>
        <textarea name="message" id="message" rows={4} className="w-full p-2 border rounded-md dark:bg-gray-800" />
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="agreePrivacy" id="agreePrivacy" required className="mr-2" />
        <label htmlFor="agreePrivacy">개인정보 수집 및 이용에 동의합니다.</label>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="btn-primary" disabled={loading}>{loading ? '전송 중...' : '상담 신청'}</button>
    </form>
  );
}