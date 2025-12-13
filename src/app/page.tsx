'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';

/**
 * info tab
 * 전시 서문 tab
 * 전시 지도 tab
 */

function InfoTab({ state, onToggle }: { state: string; onToggle: () => void }) {
  return (
    <div
      className={cn(
        'absolute top-full left-1/2 h-[calc(100svh-200px)] w-full -translate-x-1/2 transition-transform duration-800',
        state === 'open' && '-translate-y-[calc(100svh-200px)]',
        state === 'close' && 'translate-y-0',
      )}>
      <Image
        src="/paper.webp"
        width={800}
        height={1300}
        alt="paper background"
        className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 w-full origin-top -translate-x-1/2 -translate-y-[120px] scale-150 object-cover object-top select-none"
        draggable={false}
      />
      <div className="mx-auto h-full w-full overflow-hidden px-2 pb-[160px]">
        <div className="relative flex h-full w-full flex-col justify-between">
          <Image
            src="/date.webp"
            width={1000}
            height={1000}
            alt="info-icon"
            className="w-full object-contain select-none"
            draggable={false}
          />
          <Image
            src="/info.webp"
            width={1000}
            height={1000}
            alt="info"
            className="w-full translate-y-16 object-contain select-none"
            draggable={false}
          />
        </div>
      </div>
      <div
        onClick={onToggle}
        className="absolute top-[-100px] right-2 flex h-10 w-20 items-center justify-center bg-amber-300"></div>
    </div>
  );
}

function IntroTab({ state, onToggle }: { state: string; onToggle: () => void }) {
  return (
    <div
      className={cn(
        'absolute top-0 left-full h-svh w-[90%] overflow-hidden transition-all duration-400',
        state === 'open' && '-translate-x-[calc(100%)]',
        state === 'close' && '-translate-x-24',
      )}>
      <Image
        src="/paper.webp"
        width={800}
        height={1300}
        alt="paper background"
        className="pointer-events-none absolute top-0 left-0 z-0 h-full origin-bottom-left translate-y-30 scale-150 rotate-1 object-cover object-bottom-left select-none"
        draggable={false}
      />
      <div className="h-full w-full rotate-1 overflow-y-auto pt-12 pr-8 pb-20 pl-26">
        <div className="relative text-[14.8px] leading-[194%] font-bold text-black">
          <p>
            ‘화톳불(Hwatotvul)'은 모험가들이 모인 길드로, 길드원들은 각자 느낀 게임의 경험을 현실이라는 조건 아래
            치밀하게 고민한 흔적과 전리품들을 선보인다.
            <br />
            <br />
            나는 게임 세계의 데이터를 저장하고, 불러오며, 때로는 덮어쓰는 과정에서 최근과 오래된 기록을 뒤얽히게 한다.
            죽음 이후 과거의 저장 지점에서 되살아난 캐릭터는 – 죽어 사라졌더라도 – 나의 기억을 단서로 수수계끼를
            돌파한다. 다시말해 캐릭터의 데이터와 나의 기억이 겹쳐지며 현실에서 도달하기 어려운 한계를 넘어 메타적인
            돌파구를 찾아 나아가게 한다.
            <br />
            <br />
            그렇다면 지금 우리가 살아가는 세계는 어떨까. 게임처럼 캐릭터를 중심으로 모든 것들이 렌더링(Rendering) 되지
            않고, 과거의 데이터를 불러와 선택을 번복할 수도 없고, 하나의 아이템 따위만으로 결혼과 영원을 약속할 수도
            없다. 모든 행동의 결과는 캐릭터라는 매질없이 곧바로 나에게 귀속된다.
            <br />
            <br />
            현실 세계의 비가역성 속에서 내려진 감정과 판단은 지금의 세계를 더욱 깊고 입체적인 층위로 확장한다. 저장하고
            불러올 수 없는 세계이기에, 우리가 지나온 순간들은 소멸되지 않은 채 남아 의미를 얻고, 각 선택은 더욱 선명한
            무게를 갖게 된다.
            <br />
            <br />
            이제 화톳불에 둘러앉아, 길드원들이 꺼내놓은 전리품과 이야기들에 천천히 귀를 기울여 보자.
          </p>
        </div>
      </div>
      <div
        onClick={onToggle}
        className="absolute top-2/3 left-0 flex h-10 w-20 items-center justify-center bg-amber-300"></div>
    </div>
  );
}

function MapTab({ state, onToggle }: { state: string; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      className={cn(
        'absolute top-0 right-0 h-svh w-full origin-top-right transition-all duration-800',
        state === 'open' && 'translate-x-[-100px] translate-y-[40px] -rotate-10',
        state === 'close' && '-translate-x-[calc(100%-100px)] translate-y-[calc(100%-200px)] rotate-12',
      )}>
      <Image
        src="/map.webp"
        width={800}
        height={1300}
        alt="paper background"
        className="pointer-events-none absolute top-0 h-full origin-bottom-right translate-x-8 scale-115 object-contain select-none"
        draggable={false}
      />
    </div>
  );
}

function MailTab({ state, onToggle }: { state: string; onToggle: () => void }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: '이메일이 성공적으로 발송되었습니다!' });
        setEmail('');
      } else {
        setSubmitStatus({ type: 'error', message: data.error || '이메일 발송에 실패했습니다.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: '네트워크 오류가 발생했습니다.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        'top-0 left-0 flex h-svh w-full items-center justify-center transition-opacity duration-400',
        state === 'open' && 'opacity-100',
        state === 'close' && 'opacity-0',
      )}>
      <div className="relative w-full overflow-hidden px-16 text-center">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 text-black focus:outline-none"
              placeholder="example@email.com"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="border-b border-black px-2 pb-1 font-bold disabled:cursor-not-allowed disabled:opacity-50">
            {isSubmitting ? '발송 중...' : '발송'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // loading, open, close 3가지 상태 (InfoTab, IntroTab, MapTab, MailTab)
  const [isTabOpen, setIsTabOpen] = useState<Array<string>>(['open', 'open', 'open', 'open']);

  const toggleTab = (index: number) => {
    setIsTabOpen((prev) => {
      const newState = [...prev];
      newState[index] = prev[index] === 'open' ? 'close' : 'open';
      return newState;
    });
  };

  const openAllTabs = () => {
    setIsTabOpen(['open', 'open', 'open', 'open']);
  };

  return (
    <>
      <MailTab state={isTabOpen[3]} onToggle={() => toggleTab(3)} />
      <MapTab state={isTabOpen[2]} onToggle={() => toggleTab(2)} />
      <IntroTab state={isTabOpen[1]} onToggle={() => toggleTab(1)} />
      <InfoTab state={isTabOpen[0]} onToggle={() => toggleTab(0)} />
      <button onClick={openAllTabs} className="absolute top-2 left-2 cursor-pointer" type="button">
        <Image
          src="/logo.webp"
          width={800}
          height={1300}
          alt="logo"
          className="w-20 object-contain select-none"
          draggable={false}
        />
      </button>
    </>
  );
}
