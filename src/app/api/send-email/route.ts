import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// 미리 정의된 이메일 내용
const EMAIL_SUBJECT = '화톳불 초대장';
const EMAIL_MESSAGE = `
안녕하세요,

화톳불(Hwatotvul) 전시에 초대합니다.

전시 날짜와 시간, 장소 정보를 확인해주세요.

감사합니다.
`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // 입력 검증
    if (!email) {
      return NextResponse.json({ error: '이메일 주소를 입력해주세요.' }, { status: 400 });
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: '올바른 이메일 형식이 아닙니다.' }, { status: 400 });
    }

    // Resend로 이메일 발송
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: EMAIL_SUBJECT,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>${EMAIL_SUBJECT}</h2>
        <p>${EMAIL_MESSAGE.replace(/\n/g, '<br>')}</p>
      </div>`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: '이메일 발송에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
