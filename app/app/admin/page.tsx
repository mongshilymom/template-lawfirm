"use client";
import { useState } from 'react';

/**
 * Admin page placeholder.  This page demonstrates a simple client-side
 * password prompt to restrict access.  In a real-world scenario you
 * would implement proper authentication and data fetching here.
 */
export default function AdminPage() {
  const [inputPassword, setInputPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Compare against an environment variable exposed to the browser.
    // NEXT_PUBLIC_ADMIN_PASSWORD should be defined in your .env file.
    if (inputPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthorized(true);
    } else {
      alert('비밀번호가 올바르지 않습니다');
    }
  };

  if (!authorized) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-2xl font-heading mb-4">관리자 로그인</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="관리자 비밀번호"
            className="w-full p-2 border rounded-md dark:bg-gray-800"
          />
          <button type="submit" className="btn-primary w-full">
            로그인
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading mb-6">관리자 대시보드</h1>
      <p>이곳은 관리자가 상담 신청을 검토하고 상태를 업데이트할 수 있는 공간입니다. 데이터베이스 연동 후 구현될 예정입니다.</p>
    </div>
  );
}