import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Validation schema with proper Korean field validation
const consultationSchema = z.object({
  name: z.string()
    .min(2, '성함은 최소 2자 이상이어야 합니다')
    .max(50, '성함은 최대 50자까지 입력 가능합니다')
    .regex(/^[가-힣a-zA-Z\s]+$/, '성함은 한글 또는 영문만 입력 가능합니다'),
  phone: z.string()
    .min(10, '전화번호를 정확히 입력해주세요')
    .max(15, '전화번호 형식이 올바르지 않습니다')
    .regex(/^[0-9-+\s()]+$/, '전화번호 형식이 올바르지 않습니다'),
  email: z.string()
    .email('올바른 이메일 형식이 아닙니다')
    .max(100, '이메일은 최대 100자까지 입력 가능합니다')
    .optional()
    .or(z.literal('')),
  practiceArea: z.enum(['criminal', 'civil', 'family', 'corporate', 'other'], {
    message: '업무분야를 선택해주세요'
  }).optional(),
  message: z.string()
    .min(10, '문의 내용은 최소 10자 이상 입력해주세요')
    .max(1000, '문의 내용은 최대 1000자까지 입력 가능합니다'),
  captchaToken: z.string().min(1, 'CAPTCHA 인증이 필요합니다').optional()
});

// Initialize rate limiter with fallback
let ratelimit: Ratelimit;
try {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    analytics: true,
  });
} catch (e) {
  // Fallback to memory-based rate limiting if Upstash is not configured
  console.warn('Using memory-based rate limiting fallback');
  ratelimit = new Ratelimit({
    redis: undefined as any,
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    analytics: false,
  });
}

// Initialize Resend if configured
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// CAPTCHA verification function
async function verifyCaptcha(token: string): Promise<boolean> {
  if (process.env.CAPTCHA_DISABLED === 'true') {
    return true; // Skip CAPTCHA for local testing
  }

  if (!process.env.CAPTCHA_SECRET) {
    console.warn('CAPTCHA_SECRET not configured, skipping verification');
    return true;
  }

  try {
    // hCaptcha verification
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.CAPTCHA_SECRET,
        response: token,
      }),
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return false;
  }
}

// Send email notification
async function sendEmailNotification(data: z.infer<typeof consultationSchema>) {
  if (!resend || !process.env.RESEND_FROM || !process.env.CONTACT_TO) {
    console.warn('Email configuration missing, skipping email notification');
    return false;
  }

  const practiceAreaNames = {
    criminal: '형사사건',
    civil: '민사소송',
    family: '가사사건',
    corporate: '기업법무',
    other: '기타'
  };

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.CONTACT_TO,
      subject: `[상담신청] ${data.name}님의 법률상담 요청`,
      html: `
        <h2>새로운 상담 신청이 접수되었습니다</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">성함</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">연락처</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.phone}</td>
          </tr>
          ${data.email ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">이메일</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td>
          </tr>` : ''}
          ${data.practiceArea ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">업무분야</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${practiceAreaNames[data.practiceArea]}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">문의내용</td>
            <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${data.message}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">접수시간</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString('ko-KR')}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">
          본 메일은 홈페이지 상담신청 폼을 통해 자동으로 발송되었습니다.
        </p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

// Send Slack notification (optional)
async function sendSlackNotification(data: z.infer<typeof consultationSchema>) {
  if (!process.env.SLACK_WEBHOOK_URL) {
    return false;
  }

  const practiceAreaNames = {
    criminal: '형사사건',
    civil: '민사소송',
    family: '가사사건',
    corporate: '기업법무',
    other: '기타'
  };

  try {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: '새로운 상담 신청이 접수되었습니다',
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🔔 새로운 상담 신청'
            }
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*성함:*\n${data.name}`
              },
              {
                type: 'mrkdwn',
                text: `*연락처:*\n${data.phone}`
              },
              ...(data.email ? [{
                type: 'mrkdwn',
                text: `*이메일:*\n${data.email}`
              }] : []),
              ...(data.practiceArea ? [{
                type: 'mrkdwn',
                text: `*업무분야:*\n${practiceAreaNames[data.practiceArea]}`
              }] : []),
            ]
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*문의내용:*\n\`\`\`${data.message}\`\`\``
            }
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: `접수시간: ${new Date().toLocaleString('ko-KR')}`
              }
            ]
          }
        ]
      }),
    });
    return true;
  } catch (error) {
    console.error('Failed to send Slack notification:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

    // Rate limiting check
    try {
      const { success: rateLimitSuccess } = await ratelimit.limit(ip);
      if (!rateLimitSuccess) {
        return NextResponse.json(
          {
            success: false,
            message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.'
          },
          { status: 429 }
        );
      }
    } catch (rateLimitError) {
      console.error('Rate limit error:', rateLimitError);
      // Continue without rate limiting if there's an error
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = consultationSchema.parse(body);

    // CAPTCHA verification
    if (validatedData.captchaToken) {
      const captchaValid = await verifyCaptcha(validatedData.captchaToken);
      if (!captchaValid) {
        return NextResponse.json(
          {
            success: false,
            message: 'CAPTCHA 인증에 실패했습니다. 다시 시도해주세요.'
          },
          { status: 400 }
        );
      }
    } else if (process.env.CAPTCHA_DISABLED !== 'true') {
      return NextResponse.json(
        {
          success: false,
          message: 'CAPTCHA 인증이 필요합니다.'
        },
        { status: 400 }
      );
    }

    // Generate consultation ID
    const consultationId = `CONSULT_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // Send notifications
    const emailSent = await sendEmailNotification(validatedData);
    const slackSent = await sendSlackNotification(validatedData);

    if (!emailSent && !slackSent && (process.env.RESEND_API_KEY || process.env.SLACK_WEBHOOK_URL)) {
      console.warn('Failed to send any notifications');
    }

    return NextResponse.json({
      success: true,
      message: '상담 신청이 완료되었습니다. 24시간 내에 연락드리겠습니다.',
      id: consultationId,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      // Validation error
      const firstError = error.issues[0];
      return NextResponse.json(
        {
          success: false,
          message: firstError.message,
          field: firstError.path[0],
        },
        { status: 400 }
      );
    }

    console.error('Consultation API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      },
      { status: 500 }
    );
  }
}