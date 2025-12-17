'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const LOADING_FRAME_COUNT = 51; // 0 ~ 50

function LoadingAnimation({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  // 첫 번째 이미지 먼저 로드 후 나머지 이미지 로드
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    // 첫 번째 이미지 로드
    const firstImg = new window.Image();
    firstImg.src = `/loading/loading-0.webp`;
    firstImg.onload = () => {
      images[0] = firstImg;

      // 첫 번째 이미지를 캔버스에 표시
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = firstImg.width;
          canvas.height = firstImg.height;
          ctx.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
        }
      }
      setIsFirstLoaded(true);

      // 나머지 이미지 로드
      let loadedCount = 1;
      for (let i = 1; i < LOADING_FRAME_COUNT; i++) {
        const img = new window.Image();
        img.src = `/loading/loading-${i}.webp`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === LOADING_FRAME_COUNT) {
            imagesRef.current = images;
            setIsAllLoaded(true);
          }
        };
        images[i] = img;
      }
    };
  }, []);

  // 캔버스 애니메이션 (모든 이미지 로드 완료 후)
  useEffect(() => {
    if (!isAllLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = imagesRef.current;
    let lastTime = 0;
    const frameDuration = 1000 / 12; // 12fps

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameDuration) {
        lastTime = currentTime;

        const img = images[frameRef.current];
        if (img) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        frameRef.current++;

        // 애니메이션 완료 -> 1초 딜레이 후 페이드아웃
        if (frameRef.current >= LOADING_FRAME_COUNT) {
          setTimeout(() => {
            setIsFadingOut(true);
          }, 1000);
          return;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAllLoaded]);

  // 페이드아웃 완료 후 onComplete 호출
  const handleTransitionEnd = () => {
    if (isFadingOut) {
      onComplete();
    }
  };

  return (
    <div
      className={cn(
        'absolute inset-0 z-50 flex items-center justify-center bg-[#ededec] transition-opacity duration-600',
        isFadingOut ? 'opacity-0' : 'opacity-100',
      )}
      onTransitionEnd={handleTransitionEnd}>
      <canvas ref={canvasRef} className="h-auto max-w-full scale-130 rotate-90 object-contain" />
    </div>
  );
}

/**
 * info tab
 * 전시 서문 tab
 * 전시 지도 tab
 */

function InfoTab({ state, onToggle }: { state: string; onToggle: () => void }) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    onToggle();
  };
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
            className="w-full scale-[90%] object-contain select-none"
            draggable={false}
          />
          <Image
            src="/info.webp"
            width={1000}
            height={1000}
            alt="info"
            className="w-full translate-y-16 scale-[90%] object-contain select-none"
            draggable={false}
          />
        </div>
      </div>
      <div
        onClick={handleClick}
        className={cn('absolute top-[-70px] right-2 h-12 w-28 cursor-pointer', !clicked && 'shimmer-masked')}
        style={{ '--shimmer-mask': "url('/btn.webp')" } as React.CSSProperties}>
        <Image
          src="/btn.webp"
          width={100}
          height={64}
          alt="toggle button"
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
}

function IntroTab({ state, onToggle }: { state: string; onToggle: () => void }) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    onToggle();
  };
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
      <div className="h-full w-full rotate-1 overflow-y-auto pt-12 pr-8 pb-20 pl-26 sm:pl-[calc(3vw+7vh+20px)]">
        <div className="relative text-[14.8px] leading-[194%] font-bold text-black">
          <p>
            &apos;화톳불(Hwatotvul)&apos;은 모험가들이 모인 길드로, 길드원들은 각자 느낀 게임의 경험을 현실이라는 조건
            아래 치밀하게 고민한 흔적과 전리품들을 선보인다.
            <br />
            <br />
            나는 게임 세계의 데이터를 저장하고, 불러오며, 때로는 덮어쓰는 과정에서 최근과 오래된 기록을 뒤얽히게 한다.
            죽음 이후 과거의 저장 지점에서 되살아난 캐릭터는 – 죽어 사라졌더라도 – 나의 기억을 단서로 수수께끼를
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
        onClick={handleClick}
        className={cn('absolute top-2/3 left-0 h-12 w-28 -rotate-90 cursor-pointer', !clicked && 'shimmer-masked')}
        style={{ '--shimmer-mask': "url('/btn.webp')" } as React.CSSProperties}>
        <Image
          src="/btn.webp"
          width={100}
          height={64}
          alt="toggle button"
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
}

function MapTab({ state, onToggle }: { state: string; onToggle: () => void }) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    onToggle();
  };
  return (
    <div
      className={cn(
        'absolute top-24 -left-13 h-fit max-h-svh min-h-0 w-full origin-top-right transition-all duration-800',
        state === 'open' && 'translate-x-[-5%] -rotate-8',
        state === 'close' && '-translate-x-[calc(100%-200px)] translate-y-[calc(65vh)] rotate-12',
      )}>
      <Image
        src="/party.webp"
        width={800}
        height={1300}
        alt="paper background"
        className="pointer-events-none relative top-0 origin-top-right translate-x-8 scale-115 object-contain select-none"
        draggable={false}
      />
      <div
        onClick={handleClick}
        className={cn('absolute -top-4 right-0 h-12 w-28 cursor-pointer', !clicked && 'shimmer-masked')}
        style={{ '--shimmer-mask': "url('/btn.webp')" } as React.CSSProperties}>
        <Image
          src="/btn.webp"
          width={100}
          height={64}
          alt="toggle button"
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
}

function MailTab() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        setEmail('');
      } else {
        // Handle error silently or show message if needed
        console.error('Email send failed:', data.error);
      }
    } catch {
      // Handle error silently or show message if needed
      console.error('Network error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="top-0 left-0 flex h-svh w-full items-center justify-center">
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
            className="border-b border-black px-2 pb-1 font-bold text-black transition-colors hover:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50">
            {isSubmitting ? '발송 중...' : '초대장 받기'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  // open, close 상태 (InfoTab, IntroTab, MapTab)
  const [isTabOpen, setIsTabOpen] = useState<Array<string>>(['close', 'close', 'close']);

  const toggleTab = (index: number) => {
    setIsTabOpen((prev) => {
      const newState = [...prev];
      newState[index] = prev[index] === 'open' ? 'close' : 'open';
      return newState;
    });
  };

  const openAllTabs = () => {
    setIsTabOpen(['open', 'open', 'open']);
  };

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // 순차적으로 탭 열기: Map -> Intro -> Info
    setTimeout(() => {
      setIsTabOpen((prev) => {
        const newState = [...prev];
        newState[2] = 'open'; // MapTab
        return newState;
      });
    }, 100);
    setTimeout(() => {
      setIsTabOpen((prev) => {
        const newState = [...prev];
        newState[1] = 'open'; // IntroTab
        return newState;
      });
    }, 500);
    setTimeout(() => {
      setIsTabOpen((prev) => {
        const newState = [...prev];
        newState[0] = 'open'; // InfoTab
        return newState;
      });
    }, 900);
    // 마지막 애니메이션 완료 후 상호작용 허용 (InfoTab 900ms + duration-800)
    setTimeout(() => {
      setIsAnimating(false);
    }, 1800);
  }, []);

  return (
    <>
      <MailTab />
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
      {isLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      {isAnimating && <div className="absolute inset-0 z-40" />}
    </>
  );
}
