import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Image from 'next/image';

const onulHeugdan = localFont({
  src: [
    { path: '../../public/fonts/OnulHeugdan-Regular.woff', weight: '400', style: 'normal' },
    { path: '../../public/fonts/OnulHeugdan-Bold.woff', weight: '700', style: 'normal' },
    { path: '../../public/fonts/OnulHeugdan-Black.woff', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-onul-heugdan',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const metadata: Metadata = {
  title: '화톳불',
  description: '화톳불',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={onulHeugdan.variable}>
      <body className={onulHeugdan.className}>
        <main className="relative mx-auto min-h-svh max-w-xl overflow-hidden bg-[#ededec]">
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
  );
}
