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

export const metadata: Metadata = {
  title: "정현주 - Backend Developer",
  description: "확장 가능하고 효율적인 백엔드 시스템을 설계하고 구축하는 개발자 정현주의 포트폴리오 웹사이트입니다.",
  keywords: ["Backend Developer", "백엔드 개발자", "정현주", "Portfolio", "Java", "Python", "Spring Boot", "API Development"],
  authors: [{ name: "정현주" }],
  openGraph: {
    title: "정현주 - Backend Developer",
    description: "확장 가능하고 효율적인 백엔드 시스템을 설계하고 구축하는 개발자",
    type: "website",
    locale: "ko_KR",
  },
  other: {
    "google-adsense-account": "ca-pub-2093032460854682",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
