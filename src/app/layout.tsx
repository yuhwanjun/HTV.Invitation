import type { Metadata } from 'next';
// import localFont from 'next/font/local';
import './globals.css';
import Image from 'next/image';

// const abcrom = localFont({
//   src: [
//     { path: '../../public/fonts/ABCROM-NormalRegular.woff2', weight: '400', style: 'normal' },
//     { path: '../../public/fonts/ABCROM-NormalMedium.woff2', weight: '500', style: 'normal' },
//     { path: '../../public/fonts/ABCROM-NormalBook.woff2', weight: '600', style: 'normal' },
//     { path: '../../public/fonts/ABCROM-NormalBold.woff2', weight: '700', style: 'normal' },
//   ],
//   display: 'swap',
//   variable: '--font-abcrom',
//   fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
//   adjustFontFallback: 'Arial', // 폰트 메트릭 조정으로 레이아웃 시프트 방지
//   preload: true, // 중요한 폰트 파일 자동 preload
// });

export const metadata: Metadata = {
  title: '화톳불',
  description: '화톳불',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <main className="relative mx-auto min-h-screen max-w-xl overflow-hidden bg-[#a08e80]">
          <Image
            src="/bg.webp"
            width={1000}
            height={1000}
            alt="bg"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-color-dodge select-none"
            draggable={false}
          />
          {children}
        </main>
      </body>
    </html>
    // <html lang="ko" className={abcrom.variable}>
    //   <body className={abcrom.className}>{children}</body>
    // </html>
  );
}
