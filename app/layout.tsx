import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
