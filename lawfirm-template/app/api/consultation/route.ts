import { NextResponse } from 'next/server';

/**
 * This API endpoint simulates handling of consultation requests.
 * In a real implementation you would store the payload in a database
 * and trigger notifications (email/SMS). Here we just echo success.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Generate a fake ID using timestamp
    const id = `CONSULT_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    return NextResponse.json({
      success: true,
      message: '상담 신청이 완료되었습니다. 24시간 내에 연락드리겠습니다.',
      id
    });
  } catch (e) {
    return NextResponse.json({ success: false, message: '유효하지 않은 요청입니다.' }, { status: 400 });
  }
}