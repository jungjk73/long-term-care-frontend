import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "방문요양 본인부담금 계산기",
  description: "2026년 수가 기준 방문요양 본인부담금 계산기",
};

export default function RootLayout({children}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
    <body className="min-h-full flex flex-col">
    {children}

    {/* Next.js 서버 사이드 에러를 방지하고 가장 안전하게 부모 창(티스토리)으로 높이를 보낼 수 있는 인라인 스크립트입니다. */}
    <Script id="iframe-resizer-script" strategy="afterInteractive">
      {`
            (function() {
              if (typeof window === 'undefined') return;

              function sendHeightToParent() {
                const height = document.documentElement.scrollHeight || document.body.scrollHeight;
                window.parent.postMessage({ type: 'resizeIframe', height: height }, '*');
              }

              // 초기 로드 및 리사이즈 이벤트 등록
              window.addEventListener('load', sendHeightToParent);
              window.addEventListener('resize', sendHeightToParent);
              
              // 계산기 특성상 사용자가 값을 입력할 때마다 화면 높이가 바뀔 수 있으므로 
              // DOM 변화를 감지하는 Observer를 실행합니다.
              const observer = new MutationObserver(sendHeightToParent);
              observer.observe(document.body, {
                attributes: true,
                childList: true,
                subtree: true
              });
              
              // 혹시 모를 예외 상황을 대비해 최초 즉시 실행
              sendHeightToParent();
            })();
          `}
    </Script>
    </body>
    </html>
  );
}