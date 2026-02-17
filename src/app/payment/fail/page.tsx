"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PaymentFailContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">결제에 실패했습니다</h1>
        
        {message && (
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            {decodeURIComponent(message)}
          </p>
        )}
        
        {code && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            오류 코드: {code}
          </p>
        )}

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
            💡 문제 해결 방법
          </h3>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
            <li>• 카드 정보를 다시 확인해주세요</li>
            <li>• 카드 한도를 확인해주세요</li>
            <li>• 다른 결제 수단을 시도해보세요</li>
            <li>• 문제가 계속되면 고객센터로 문의해주세요</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/coaching"
            className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            다시 예약하기
          </Link>
          <Link
            href="/"
            className="block w-full py-3 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="text-xl text-slate-600 dark:text-slate-400">로딩 중...</div>
      </div>
    }>
      <PaymentFailContent />
    </Suspense>
  );
}
