'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

/**
 * info tab
 * 전시 서문 tab
 * 전시 지도 tab
 */

function InfoTab({ state, onToggle }: { state: string; onToggle: () => void }) {
  return (
    <div
      className={cn(
        'absolute top-[120px] left-[-20%] flex h-[calc(100svh-100px)] min-h-[800px] w-[140%] origin-top-right -rotate-3 flex-col items-start justify-start overflow-hidden border-t border-black bg-[#D7D3CE] px-[calc(20%+18px)] py-3 transition-all duration-300',
        state === 'open' && 'translate-y-0',
        state === 'close' && 'translate-y-[calc(100svh-210px)]',
      )}>
      <button onClick={onToggle} className="mb-4 rounded border border-black bg-white px-4 py-2 hover:bg-gray-100">
        {state === 'open' ? '닫기' : '열기'}
      </button>
      <div className="grid grid-cols-3 gap-x-4">
        <p className="col-span-1">12.19-21</p>
        <p className="col-span-2">
          시드스페이스 <br /> 영등포구 버드나루로 12가길 43
        </p>
      </div>
      <img className="absolute bottom-[60px] left-[16%] w-4/5 max-w-[90%]" src="htb-0.svg" alt="info-icon" />
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
