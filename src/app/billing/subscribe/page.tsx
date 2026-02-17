import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import SubscribeForm from "./SubscribeForm";

export default async function SubscribePage() {
  const supabase = await createClient();
  
  // 인증 체크
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect('/login');
  }

  // 빌링키가 등록되어 있는지 확인
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // 코칭 코스 가져오기
  const { data: courses } = await supabase
    .from('coaching_courses')
    .select('*')
    .eq('is_active', true)
    .order('price', { ascending: true });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 뒤로가기 */}
        <Link
          href="/dashboard"
          className="inline-block mb-6 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          ← 대시보드로 돌아가기
        </Link>

        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            정기 코칭 구독
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            매월 자동으로 1:1 코칭 세션을 받아보세요
          </p>
        </div>

        {!subscription ? (
          // 빌링키 미등록
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              카드 등록이 필요합니다
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              정기결제를 이용하시려면 먼저 결제 카드를 등록해주세요.
              <br />
              카드 정보는 암호화되어 안전하게 보관됩니다.
            </p>
            <Link
              href="/billing/register"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors"
            >
              카드 등록하기
            </Link>
          </div>
        ) : subscription.course_id ? (
          // 이미 구독 중
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                구독 중입니다
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                현재 정기 코칭을 구독하고 계십니다
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600 dark:text-slate-400">구독 상태</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  subscription.status === 'active'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : subscription.status === 'paused'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                }`}>
                  {subscription.status === 'active' ? '활성' : subscription.status === 'paused' ? '일시정지' : '취소됨'}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600 dark:text-slate-400">월 결제 금액</span>
                <span className="font-semibold text-slate-900 dark:text-white">{subscription.amount?.toLocaleString()}원</span>
              </div>
              {subscription.next_payment_date && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">다음 결제일</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {new Date(subscription.next_payment_date).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              )}
            </div>

            <Link
              href="/dashboard"
              className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg font-medium transition-colors"
            >
              대시보드로 이동
            </Link>
          </div>
        ) : (
          // 빌링키 등록되어 있지만 구독 미신청
          <div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {courses?.map((course) => (
                <div
                  key={course.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 relative overflow-hidden"
                >
                  {/* 추천 배지 */}
                  {course.course_type === 'online' && (
                    <div className="absolute top-0 right-0 bg-gradient-to-br from-purple-500 to-pink-600 text-white px-4 py-1 rounded-bl-xl text-sm font-semibold">
                      인기
                    </div>
                  )}

                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm mb-4">
                      {course.course_type === 'online' ? '온라인' : '오프라인'}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                      {course.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {course.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                        {course.price.toLocaleString()}원
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">/ 월</span>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      세션당 {course.duration_minutes}분
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span className="text-slate-600 dark:text-slate-400">월 1회 세션 자동 예약</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span className="text-slate-600 dark:text-slate-400">세션 후 정리 자료 제공</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span className="text-slate-600 dark:text-slate-400">이메일 Q&A 무제한</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span className="text-slate-600 dark:text-slate-400">언제든지 구독 해지 가능</span>
                    </div>
                  </div>

                  <SubscribeForm 
                    courseId={course.id} 
                    price={course.price}
                    title={course.title}
                    billingKey={subscription.billing_key}
                    customerKey={subscription.customer_key}
                  />
                </div>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                📋 정기 구독 안내
              </h3>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <li>• 매월 1회 1:1 코칭 세션이 자동으로 진행됩니다</li>
                <li>• 결제는 매월 구독일에 자동으로 이루어집니다</li>
                <li>• 세션 일정은 이메일로 별도 조율됩니다</li>
                <li>• 구독은 언제든지 해지 가능하며, 다음 결제일부터 적용됩니다</li>
                <li>• 미사용 세션에 대한 환불은 불가능합니다</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
