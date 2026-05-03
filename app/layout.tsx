import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/primitives/ThemeProvider";
import { SiteHeader } from "@/components/primitives/SiteHeader";
import "./globals.css";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
  weight: "45 920",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "한국 초3~고3 인터랙티브 교육 플랫폼",
    template: "%s | 한국 인터랙티브 교육",
  },
  description: "2022 개정 교육과정 5과목 488 단원 인터랙티브 학습 자원",
  applicationName: "한국 인터랙티브 교육",
  authors: [{ name: "pollmap" }],
  keywords: ["교육", "초등", "중등", "고등", "수학", "과학", "국어", "영어", "사회", "인터랙티브"],
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${pretendard.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
