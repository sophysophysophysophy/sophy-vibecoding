"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  
  const [course, setCourse] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        // 사용자 정보 가져오기
        const { data: { user: userData }, error: userError } = await supabase.auth.getUser();
        if (userError || !userData) {
          router.push('/login');
          return;
        }
        setUser(userData);

        // 코스 정보 가져오기
        const { data: courseData, error: courseError } = await supabase
          .from('coaching_courses')
          .select('*')
          .eq('id', params.courseId)
          .single();

        if (courseError || !courseData) {
          alert('코스를 찾을 수 없습니다.');
          router.push('/coaching');
          return;
        }
        setCourse(courseData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params.courseId]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingDate || !bookingTime) {
      alert('예약 날짜와 시간을 선택해주세요.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. 예약 생성
      const bookingDateTime = new Date(`${bookingDate}T${bookingTime}`);
      const { data: booking, error: bookingError } = await supabase
        .from('coaching_bookings')
        .insert({
          user_id: user.id,
          course_id: course.id,
          booking_date: bookingDateTime.toISOString(),
          notes,
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // 2. 결제 정보 생성
      const orderId = uuidv4();
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert({
          booking_id: booking.id,
          user_id: user.id,
          amount: course.price,
          payment_type: 'one_time',
          toss_order_id: orderId,
        })
        .select()
        .single();

      if (paymentError) throw paymentError;

      // 3. 토스페이먼츠 결제창으로 리다이렉트
      const tossPayments = (window as any).TossPayments(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY);
      
      await tossPayments.requestPayment({
        method: 'CARD',
        amount: course.price,
        orderId: orderId,
        orderName: course.title,
        successUrl: `${window.location.origin}/payment/success?bookingId=${booking.id}`,
        failUrl: `${window.location.origin}/payment/fail?bookingId=${booking.id}`,
        customerEmail: user.email,
        customerName: user.user_metadata?.full_name || '고객',
      });
    } catch (error: any) {
      console.error('Booking error:', error);
      alert('예약 중 오류가 발생했습니다: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-slate-600 dark:text-slate-400">로딩 중...</div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 */}
        <button
          onClick={() => router.back()}
          className="mb-6 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          ← 돌아가기
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            코칭 예약하기
          </h1>

          {/* 코스 정보 */}
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {course.title}
                </h2>
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  {course.course_type === 'online' ? '온라인' : '오프라인'}
                </span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {course.price.toLocaleString()}원
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {course.duration_minutes}분
                </div>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              {course.description}
            </p>
          </div>

          {/* 예약 폼 */}
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                희망 날짜 <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                희망 시간 <span className="text-red-500">*</span>
              </label>
              <select
                id="time"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">시간 선택</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
              </select>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                * 정확한 일정은 예약 후 이메일로 조율됩니다
              </p>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                요청사항 (선택)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="질문하고 싶은 내용, 현재 상황, 준비물 등을 자유롭게 작성해주세요."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 안내 사항 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                📌 안내사항
              </h3>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• 예약 확정은 결제 완료 후 이루어집니다</li>
                <li>• 정확한 일정은 이메일로 별도 안내됩니다</li>
                <li>• 취소/환불은 세션 24시간 전까지 가능합니다</li>
                <li>• 세션 후 정리 자료와 2주간 이메일 Q&A를 제공합니다</li>
              </ul>
            </div>

            {/* 결제 버튼 */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg"
            >
              {isProcessing ? '처리 중...' : `${course.price.toLocaleString()}원 결제하기`}
            </button>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              결제는 토스페이먼츠를 통해 안전하게 처리됩니다
            </p>
          </form>
        </div>
      </div>

      {/* 토스페이먼츠 SDK */}
      <script src="https://js.tosspayments.com/v2/standard"></script>
    </div>
  );
}
