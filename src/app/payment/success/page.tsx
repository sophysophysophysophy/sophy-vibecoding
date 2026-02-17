"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    async function confirmPayment() {
      try {
        const paymentKey = searchParams.get('paymentKey');
        const orderId = searchParams.get('orderId');
        const amount = searchParams.get('amount');
        const bookingId = searchParams.get('bookingId');

        if (!paymentKey || !orderId || !amount || !bookingId) {
          throw new Error('결제 정보가 올바르지 않습니다.');
        }

        // 1. 토스페이먼츠 결제 승인 API 호출
        const response = await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: parseInt(amount),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '결제 승인에 실패했습니다.');
        }

        const paymentData = await response.json();

        // 2. 결제 정보 업데이트
        const { error: paymentUpdateError } = await supabase
          .from('payments')
          .update({
            toss_payment_key: paymentKey,
            toss_payment_status: 'done',
            payment_method: paymentData.method,
            paid_at: new Date().toISOString(),
          })
          .eq('toss_order_id', orderId);

        if (paymentUpdateError) throw paymentUpdateError;

        // 3. 예약 상태 업데이트
        const { error: bookingUpdateError } = await supabase
          .from('coaching_bookings')
          .update({ status: 'confirmed' })
          .eq('id', bookingId);

        if (bookingUpdateError) throw bookingUpdateError;

        // 4. 예약 정보 가져오기
        const { data: bookingData, error: bookingError } = await supabase
          .from('coaching_bookings')
          .select(`
            *,
            coaching_courses (*)
          `)
          .eq('id', bookingId)
          .single();

        if (bookingError) throw bookingError;
        setBooking(bookingData);

      } catch (error: any) {
        console.error('Payment confirmation error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    confirmPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400">결제를 확인하는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">결제 확인 실패</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <div className="space-y-3">
            <Link
              href="/coaching"
              className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              코칭 페이지로 돌아가기
            </Link>
            <Link
              href="/dashboard"
              className="block w-full py-3 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
            >
              대시보드로 이동
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
        {/* 성공 아이콘 */}
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 text-center">
          결제가 완료되었습니다!
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 text-center">
          코칭 예약이 성공적으로 완료되었습니다.
        </p>

        {/* 예약 정보 */}
        {booking && (
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6 mb-8 space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-slate-600 dark:text-slate-400">코스명</span>
              <span className="font-semibold text-slate-900 dark:text-white text-right">
                {booking.coaching_courses.title}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-slate-600 dark:text-slate-400">예약 날짜</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {new Date(booking.booking_date).toLocaleString('ko-KR')}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-slate-600 dark:text-slate-400">결제 금액</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400 text-lg">
                {booking.coaching_courses.price.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-slate-600 dark:text-slate-400">상태</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                예약 확정
              </span>
            </div>
          </div>
        )}

        {/* 안내 메시지 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            📧 다음 단계
          </h3>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
            <li>• 예약 확인 이메일이 발송되었습니다</li>
            <li>• 정확한 일정은 1-2일 내에 이메일로 안내드립니다</li>
            <li>• 대시보드에서 예약 내역을 확인하실 수 있습니다</li>
            <li>• 세션 후 정리 자료와 2주간 이메일 Q&A가 제공됩니다</li>
          </ul>
        </div>

        {/* 버튼들 */}
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-center"
          >
            내 예약 확인하기
          </Link>
          <Link
            href="/"
            className="block w-full py-4 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors text-center"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400">로딩 중...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
