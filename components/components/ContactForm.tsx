"use client";

import { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  phone: string;
  email: string;
  practiceArea: string;
  message: string;
}

const practiceAreas = [
  { value: 'criminal', label: '형사사건' },
  { value: 'civil', label: '민사소송' },
  { value: 'family', label: '가사사건' },
  { value: 'corporate', label: '기업법무' },
  { value: 'other', label: '기타' },
];

/**
 * Enhanced ContactForm with CAPTCHA, validation, and notifications
 * Submits to the local consultation API with comprehensive error handling
 */
export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    practiceArea: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  // Environment variable for CAPTCHA site key
  const captchaSiteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;
  const captchaDisabled = process.env.NEXT_PUBLIC_CAPTCHA_DISABLED === 'true';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
  };

  const handleCaptchaError = () => {
    setCaptchaToken(null);
    toast.error('CAPTCHA 인증에 오류가 발생했습니다. 다시 시도해주세요.');
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
    toast.error('CAPTCHA가 만료되었습니다. 다시 인증해주세요.');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      practiceArea: '',
      message: '',
    });
    setCaptchaToken(null);
    if (captchaRef.current) {
      captchaRef.current.resetCaptcha();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Basic client-side validation
    if (!formData.name.trim()) {
      toast.error('성함을 입력해주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('연락처를 입력해주세요.');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('문의 내용을 입력해주세요.');
      return;
    }

    // CAPTCHA validation
    if (!captchaDisabled && !captchaToken) {
      toast.error('CAPTCHA 인증을 완료해주세요.');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('상담 신청을 처리 중입니다...');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken: captchaToken || undefined,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(result.message || '상담 신청이 완료되었습니다!', {
          id: loadingToast,
          duration: 5000,
        });
        resetForm();
      } else {
        throw new Error(result.message || '상담 신청 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : '네트워크 오류가 발생했습니다. 다시 시도해주세요.';
      toast.error(errorMessage, {
        id: loadingToast,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            성함 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="성함을 입력해주세요"
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 transition-colors"
            disabled={isSubmitting}
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="010-1234-5678"
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 transition-colors"
            disabled={isSubmitting}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            이메일 <span className="text-gray-500 text-xs">(선택사항)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@email.com"
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 transition-colors"
            disabled={isSubmitting}
          />
        </div>

        {/* Practice Area Field */}
        <div>
          <label htmlFor="practiceArea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            업무분야 <span className="text-gray-500 text-xs">(선택사항)</span>
          </label>
          <select
            id="practiceArea"
            name="practiceArea"
            value={formData.practiceArea}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 transition-colors"
            disabled={isSubmitting}
          >
            <option value="">업무분야를 선택해주세요</option>
            {practiceAreas.map((area) => (
              <option key={area.value} value={area.value}>
                {area.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            문의 내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            placeholder="구체적인 문의 내용을 입력해주시면 더 정확한 상담이 가능합니다."
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 resize-vertical transition-colors"
            disabled={isSubmitting}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formData.message.length}/1000자
          </p>
        </div>

        {/* CAPTCHA */}
        {!captchaDisabled && captchaSiteKey && (
          <div className="flex justify-center">
            <HCaptcha
              ref={captchaRef}
              sitekey={captchaSiteKey}
              onVerify={handleCaptchaVerify}
              onError={handleCaptchaError}
              onExpire={handleCaptchaExpire}
              theme="light" // You can make this dynamic based on theme
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || (!captchaDisabled && !captchaToken && !!captchaSiteKey)}
          className="w-full btn-primary py-3 text-center font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              처리 중...
            </span>
          ) : '상담 신청'}
        </button>
      </form>

      {/* Privacy and Disclaimer */}
      <div className="bg-gray-50 dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          개인정보 처리 및 이용 안내
        </h4>
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
          <p>
            • <strong>수집목적:</strong> 법률상담 및 업무처리를 위한 연락
          </p>
          <p>
            • <strong>수집항목:</strong> 성함, 연락처, 이메일(선택), 문의내용
          </p>
          <p>
            • <strong>보유기간:</strong> 상담완료 후 즉시 삭제 (최대 30일)
          </p>
          <p>
            • <strong>처리원칙:</strong> 최소한의 정보만 수집하며, 목적 외 사용하지 않습니다.
          </p>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-dark-600">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <strong>법적 고지:</strong> 본 상담신청은 정식 법률자문이 아니며,
            실제 사건 처리 시 별도의 위임계약이 필요합니다.
          </p>
        </div>
      </div>
    </div>
  );
}