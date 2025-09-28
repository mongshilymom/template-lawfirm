"use client";

/**
 * ContactFloat renders fixed-position buttons for phone and KakaoTalk
 * consultations.  The phone number and Kakao channel link should be
 * customised to match your organisation's contact details.
 */
export default function ContactFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <a
        href="tel:02-6956-3434"
        className="btn-primary px-4 py-2 rounded-md shadow"
      >
        전화 상담
      </a>
      <a
        href="https://pf.kakao.com/_xXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary px-4 py-2 rounded-md shadow"
      >
        카톡 상담
      </a>
    </div>
  );
}