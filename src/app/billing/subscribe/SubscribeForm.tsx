"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface SubscribeFormProps {
  courseId: string;
  price: number;
  title: string;
  billingKey: string;
  customerKey: string;
}

export default function SubscribeForm({ courseId, price, title, billingKey, customerKey }: SubscribeFormProps) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubscribe = async () => {
    if (!confirm('정기 구독을 시작하시겠습니까? 매월 자동으로 결제됩니다.')) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // 사용자 정보 가져오기
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('로그인이 필요합니다.');
      }

      const orderId = uuidv4();

      // 첫 결제 실행
      const paymentResponse = await fetch('/api/billing/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          billingKey,
          customerKey,
          amount: price,
          orderId,
          orderName: `${title} - 정기구독`,
          customerEmail: user.email,
          customerName: user.user_metadata?.full_name || user.email,
        }),
      });

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(paymentData.message || '결제에 실패했습니다.');
      }

      // 결제 정보 저장
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          booking_id: null,
          order_id: orderId,
          payment_key: paymentData.paymentKey,
          amount: price,
          status: 'completed',
          method: 'billing',
          approved_at: paymentData.approvedAt,
        });

      if (paymentError) {
        console.error('Payment record error:', paymentError);
      }

      // 구독 정보 업데이트
      const nextPaymentDate = new Date();
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .update({
          course_id: courseId,
          amount: price,
          next_payment_date: nextPaymentDate.toISOString(),
          status: 'active',
        })
        .eq('customer_key', customerKey);

      if (subscriptionError) {
        throw new Error('구독 정보 저장에 실패했습니다.');
      }

      alert('정기 구독이 시작되었습니다! 첫 결제가 완료되었습니다.');
      router.push('/dashboard');
      router.refresh();

    } catch (error: any) {
      console.error('Subscribe error:', error);
      setError(error.message || '구독 처리 중 오류가 발생했습니다.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <button
        onClick={handleSubscribe}
        disabled={processing}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-lg font-semibold rounded-lg transition-colors"
      >
        {processing ? '처리 중...' : '구독 시작하기'}
      </button>
    </div>
  );
}
