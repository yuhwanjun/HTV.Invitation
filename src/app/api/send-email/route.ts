import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const getResendInstance = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
};

// 미리 정의된 이메일 내용
const EMAIL_SUBJECT = '안녕하세요, 화톳불(Hwatotvul) 전시에 초대합니다.';
const EMAIL_MESSAGE = `
안녕하세요,
화톳불(Hwatotvul) 전시에 초대합니다.
전시 오프닝날에는 VIDEO GAME BGM SET으로
가득 채워진 파티가 있을 예정입니다. 
또한, 화톳불 프로젝트에 사용된 라틴문자 타입
’HWATOTVUL’을 선물로 드립니다.
———————————————
《화톳불 둘러앉기 Hwatotvul sit around》
———————————————
2025.12.19.(금). 10:00-20:00, Opening Rave 20:00-Until dawn
2025.12.20.(토). 12:00-20:00
2025.12.21.(일). 10:00-18:00

시드 스페이스 @seedspace.gallery
(서울 영등포구 버드나루로2가길 43, 2층)
———————————————
‘화톳불(Hwatotvul)'은 모험가들이 모인 길드로,
길드원들은 각자 느낀 게임의 경험을 현실이라는 조건 아래
치밀하게 고민한 흔적과 전리품들을 선보인다.
…
현실 세계의 비가역성 속에서 내려진 감정과 판단은
지금의 세계를 더욱 깊고 입체적인 층위로 확장한다.
저장하고 불러올 수 없는 세계이기에, 우리가 지나온 순간들은
소멸되지 않은 채 남아 의미를 얻고, 각 선택은 더욱 선명한 무게를 갖게 된다.

이제 화톳불에 둘러앉아,
길드원들이 꺼내놓은 전리품과 이야기들에 천천히 귀를 기울여 보자.

-전시 서문 중
———————————————
<화톳불 잔치 Hwatotvul Opening Rave>
화톳불에 둘러 앉아 전시장을 가득 채울 바드(Bard)들의 VIDEO GAME BGM SET을 즐겨보세요!

Szlte - <a href="https://instagram.com/seizellte" style="color: #0066cc;">@seizellte</a>
Chokngbin - <a href="https://instagram.com/chokngbin" style="color: #0066cc;">@chokngbin</a>
Tabris - <a href="https://instagram.com/tabrisnet" style="color: #0066cc;">@tabrisnet</a>
Dubae - <a href="https://instagram.com/andgoodnessknows" style="color: #0066cc;">@andgoodnessknows</a>
Xëvi - <a href="https://instagram.com/nuee_o0o" style="color: #0066cc;">@nuee_o0o</a>
———————————————
https://drive.google.com/drive/u/0/folders/1PikT2WmzDrdMxkW0kiI0CLhWK-tYJ-pg
<< 라틴문자 타입 ’HWATOTVUL’ 다운로드 링크

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

    // Resend 인스턴스 확인
    const resend = getResendInstance();
    if (!resend) {
      return NextResponse.json({ error: '이메일 서비스가 설정되지 않았습니다.' }, { status: 500 });
    }

    // URL을 클릭 가능한 링크로 변환 (이미 <a> 태그 안에 있는 URL 제외)
    const urlRegex = /(?<!href=")(https?:\/\/[^\s<"]+)/g;
    const messageWithLinks = EMAIL_MESSAGE.replace(/\n/g, '<br>').replace(
      urlRegex,
      '<a href="$1" style="color: #0066cc;">$1</a>',
    );

    // Resend로 이메일 발송
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: EMAIL_SUBJECT,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>${EMAIL_SUBJECT}</h2>
        <p>${messageWithLinks}</p>
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
