'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

/**
 * info tab
 * 전시 서문 tab
 * 전시 지도 tab
 */

function InfoTab({ state }: { state: string }) {
  return (
    <div
      className={cn(
        'absolute top-[120px] left-[-20vw] flex h-[calc(100svh-100px)] min-h-[800px] w-[140vw] origin-top-right -rotate-3 flex-col items-start justify-start overflow-hidden border-t border-black bg-[#D7D3CE] px-[calc(20vw+18px)] py-3 transition-all duration-300',
        state === 'open' && 'translate-y-0',
        state === 'close' && 'translate-y-[calc(100svh-210px)]',
      )}>
      <div className="grid grid-cols-3 gap-x-4">
        <p className="col-span-1">12.19-21</p>
        <p className="col-span-2">
          시드스페이스 <br /> 영등포구 버드나루로 12가길 43
        </p>
      </div>
      <img className="absolute bottom-[60px] left-[16vw] w-4/5 max-w-[90vw]" src="htb-0.svg" alt="info-icon" />
    </div>
  );
}

function IntroTab() {
  return <div>introTab</div>;
}

function MapTab() {
  return <div>mapTab</div>;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // loading, open, close 3가지 상태
  const [isTabOpen, setIsTabOpen] = useState<Array<string>>(['close', 'open', 'close']);

  return (
    <>
      <InfoTab state={isTabOpen[0]} />
      <IntroTab />
      <MapTab />
    </>
  );
}
