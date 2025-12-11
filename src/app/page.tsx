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
      <div className="mx-auto h-full w-full max-w-lg px-4 pt-30">
        <button
          onClick={onToggle}
          className="relative z-10 mb-4 rounded border border-black bg-white py-2 hover:bg-gray-100">
          {state === 'open' ? '닫기' : '열기'}
        </button>
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
          className="absolute bottom-[60px] left-1/2 z-10 max-w-[90%] -translate-x-1/2"
        />
      </div>
    </div>
  );
}

function IntroTab({ state, onToggle }: { state: string; onToggle: () => void }) {
  return (
    <div
      className={cn(
        'bg-sky absolute top-[-15%] left-[-15%] h-[130%] w-[130%] transition-all duration-300',
        state === 'open' && 'visible opacity-100',
        state === 'close' && 'invisible opacity-0',
      )}>
      <button
        onClick={onToggle}
        className="absolute top-4 left-4 z-10 rounded border border-black bg-white px-4 py-2 hover:bg-gray-100">
        {state === 'open' ? '닫기' : '열기'}
      </button>
      <div className="p-8">introTab</div>
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
      <InfoTab state={isTabOpen[0]} onToggle={() => toggleTab(0)} />
      <IntroTab state={isTabOpen[1]} onToggle={() => toggleTab(1)} />
      <MapTab state={isTabOpen[2]} onToggle={() => toggleTab(2)} />
    </>
  );
}
