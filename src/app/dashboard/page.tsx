import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  // 인증 체크
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect('/login');
  }

  // 사용자 프로필 가져오기
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // 예약 내역 가져오기
  const { data: bookings, error: bookingsError } = await supabase
    .from('coaching_bookings')
    .select(`
      *,
      coaching_courses (*),
      payments (*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white">
              정현주
            </Link>
            <div className="flex gap-4 items-center">
              <Link
                href="/coaching"
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                코칭 예약
              </Link>
              <form action="/auth/signout" method="post">
                <button className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  로그아웃
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* 대시보드 컨텐츠 */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* 헤더 */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              대시보드
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              안녕하세요, {profile?.full_name || user.email}님! 👋
            </p>
          </div>

          {/* 통계 카드 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 dark:text-slate-400">전체 예약</span>
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-xl">📅</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {bookings?.length || 0}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 dark:text-slate-400">완료된 세션</span>
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {bookings?.filter(b => b.status === 'completed').length || 0}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 dark:text-slate-400">예정된 세션</span>
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 text-xl">⏰</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {bookings?.filter(b => b.status === 'confirmed').length || 0}
              </div>
            </div>
          </div>

          {/* 예약 내역 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                예약 내역
              </h2>
              <Link
                href="/coaching"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                새 예약하기
              </Link>
            </div>

            {bookingsError && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg mb-6">
                예약 내역을 불러오는 중 오류가 발생했습니다.
              </div>
            )}

            {bookings && bookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  예약 내역이 없습니다
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  1:1 코칭을 예약하고 전문가의 도움을 받아보세요!
                </p>
                <Link
                  href="/coaching"
                  className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  코칭 예약하기
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings?.map((booking: any) => (
                  <div
                    key={booking.id}
                    className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {booking.coaching_courses.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : booking.status === 'completed'
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                : booking.status === 'cancelled'
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                            }`}
                          >
                            {booking.status === 'confirmed'
                              ? '예약 확정'
                              : booking.status === 'completed'
                              ? '완료'
                              : booking.status === 'cancelled'
                              ? '취소됨'
                              : '대기 중'}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <span>📅</span>
                            <span>{new Date(booking.booking_date).toLocaleString('ko-KR')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>💰</span>
                            <span>{booking.coaching_courses.price.toLocaleString()}원</span>
                          </div>
                          {booking.payments && booking.payments[0] && (
                            <div className="flex items-center gap-2">
                              <span>💳</span>
                              <span>
                                {booking.payments[0].toss_payment_status === 'done'
                                  ? '결제 완료'
                                  : '결제 대기'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {booking.status === 'confirmed' && (
                          <button className="px-4 py-2 text-sm border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors">
                            일정 변경
                          </button>
                        )}
                        <button className="px-4 py-2 text-sm border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors">
                          상세보기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
