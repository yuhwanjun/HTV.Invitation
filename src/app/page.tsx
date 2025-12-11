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
      onClick={onToggle}
      className={cn(
        'absolute top-full left-1/2 h-svh w-full -translate-x-1/2 overflow-hidden transition-all duration-800',
        state === 'open' && '-translate-y-full',
        state === 'close' && '-translate-y-[180px]',
      )}>
      <Image
        src="/paper.webp"
        width={800}
        height={1300}
        alt="paper background"
        className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 h-auto min-h-full w-[150%] min-w-full origin-top -translate-x-1/2 scale-120 object-cover object-top select-none xl:w-full"
        draggable={false}
      />
      <div className="mx-auto h-full w-full max-w-lg px-4 pt-[30%]">
        <div className="relative z-10 grid w-full grid-cols-3 gap-x-4 text-black">
          <p className="col-span-1">12.19-21</p>
          <p className="col-span-2">
            시드스페이스 <br /> 영등포구 버드나루로 12가길 43
          </p>
        </div>
        <Image
          src="htb-0.svg"
          width={1000}
          height={1000}
          alt="info-icon"
          className="absolute bottom-0 left-1/2 z-10 max-w-[90%] -translate-x-1/2 select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}

function IntroTab({ state, onToggle }: { state: string; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      className={cn(
        'absolute top-0 left-full h-svh w-full overflow-hidden transition-all duration-800',
        state === 'open' && '-translate-x-[calc(100%-40px)]',
        state === 'close' && '-translate-x-[120px]',
      )}>
      <Image
        src="/paper.webp"
        width={800}
        height={1300}
        alt="paper background"
        className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 h-auto min-h-full w-[150%] min-w-full origin-bottom-left -translate-x-1/2 scale-120 object-cover object-bottom-left select-none xl:w-full"
        draggable={false}
      />
      <div className="h-full w-[calc(100%-40px)] max-w-lg overflow-y-auto pt-8 pr-4 pb-20 pl-[23%]">
        <div className="relative z-10 pb-40 text-black">
          <p>
            화톳불(Hwatotvul)&apos;은 모험가들이 모인 길드로, 길드원들은 &apos;게임&apos;과는 철저히 다른 현실
            속에서,&apos;게임&apos;의 경험을 현실에 구축한다.
            <br />
            <br />
            게임이라는 세계 안에서는 &apos;나&apos;와 내가 조종하는 &apos;캐릭터&apos;로 나뉘며, 노동과 고통과 같은 육체
            감각은 화면 너머의 &apos;캐릭터&apos;에게 전가한다. 그러나 정신은 온전히 &apos;나&apos;의 것만은 아니다.
            &apos;캐릭터&apos;에 새겨진 서사와 우리가 함께 축적해온 경험이 간섭하며 하나의 복합적 정체성을 이룬다.
            <br />
            <br />
            이때 &apos;나&apos;는 게임 세계의 데이터를 저장하고, 불러오며, 때로는 덮어쓰는 과정에서 최근과 오래된 기록을
            뒤얽히게한다. 죽음 이후 과거의 저장 지점에서 되살아난 &apos;캐릭터&apos;는 — 사라졌더라도 — &apos;나&apos;의
            기억을 단서로 수수께끼를 돌파한다. 즉, &apos;캐릭터&apos;의 데이터와 &apos;나&apos;의 기억이 겹치지면서
            현실에서 도달하기 어려운 한계를 넘어 메타적인 돌파구를 찾아 나아가게 한다.
            <br />
            <br />
            그렇다면 지금 우리가 살아가는 세계는 어떨까. 게임처럼 &apos;캐릭터&apos;를 중심으로 모든 것들이
            렌더링(rendering)되지 않고, 과거의 데이터를 불러와 선택을 번복할 수도 없고, 휘황찬란한 액세서리로 능력치를
            올릴 수도 없고, 하나의 아이템 따위만으로 결혼을 약속할 수도 없다. 모든 결과는 &apos;캐릭터&apos;라는
            매질없이 곧바로 &apos;나&apos;에게 귀속되지만, 바로 그 비가역성 속에서만 진정한(authuentic)
            &apos;경험&apos;이 가능해진다.
            <br />
            <br />
            이러한 운명을 쥔 &apos;화톳불(Hwatotvul)&apos;의 길드원들은 게임의 문법을 현실로 불러와 공유하고자한다.
          </p>
        </div>
      </div>
    </div>
  );
}

function MapTab({ state, onToggle }: { state: string; onToggle: () => void }) {
  return (
    <div
      className={cn(
        'absolute transition-all duration-300',
        state === 'open' && 'visible opacity-100',
        state === 'close' && 'invisible opacity-0',
      )}>
      <button onClick={onToggle} className="rounded border border-black bg-white px-4 py-2 hover:bg-gray-100">
        {state === 'open' ? '닫기' : '열기'}
      </button>
      <div className="p-8">mapTab</div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // loading, open, close 3가지 상태
  const [isTabOpen, setIsTabOpen] = useState<Array<string>>(['close', 'close', 'close']);

  const toggleTab = (index: number) => {
    setIsTabOpen((prev) => {
      const newState = [...prev];
      newState[index] = prev[index] === 'open' ? 'close' : 'open';
      return newState;
    });
  };

  return (
    <>
      <IntroTab state={isTabOpen[1]} onToggle={() => toggleTab(1)} />
      <InfoTab state={isTabOpen[0]} onToggle={() => toggleTab(0)} />
      <MapTab state={isTabOpen[2]} onToggle={() => toggleTab(2)} />
    </>
  );
}
