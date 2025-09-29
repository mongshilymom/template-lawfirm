"use client";

/**
 * ContactForm is a simple contact form that posts submissions to
 * Formspree.  Replace the form action URL with your own Formspree
 * endpoint or another service such as Resend.  This component is
 * separate from the consultation form which posts to the local API.
 */
export default function ContactForm() {
  return (
    <form
      action="https://formspree.io/f/your-form-id" // TODO: replace with real Formspree ID
      method="POST"
      className="space-y-3"
    >
      <div>
        <label htmlFor="name" className="block mb-1">
          성함
        </label>
        <input
          name="name"
          id="name"
          required
          placeholder="성함"
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block mb-1">
          연락처
        </label>
        <input
          name="phone"
          id="phone"
          required
          placeholder="전화번호"
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">
          이메일
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
      </div>
      <div>
        <label htmlFor="message" className="block mb-1">
          문의 내용
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          placeholder="문의 내용을 적어주세요."
          className="w-full p-2 border rounded-md dark:bg-gray-800"
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        상담 요청
      </button>
    </form>
  );
}