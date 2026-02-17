import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function CoachingPage() {
  const supabase = await createClient();
  
  // 코칭 코스 가져오기
  const { data: courses, error } = await supabase
    .from('coaching_courses')
    .select('*')
    .eq('is_active', true)
    .order('price', { ascending: true });

  // 로그인 상태 확인
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white">
              정현주
            </Link>
            <div className="flex gap-4">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    대시보드
                  </Link>
                  <form action="/auth/signout" method="post">
                    <button className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      로그아웃
                    </button>
                  </form>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            1:1 백엔드 개발 코칭
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-4 max-w-3xl mx-auto">
            5년 이상의 실무 경험을 가진 백엔드 개발자가 직접 멘토링해드립니다.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            코드 리뷰, 아키텍처 설계, 성능 최적화, 커리어 상담까지 모든 것을 다룹니다.
          </p>
        </div>
      </section>

      {/* 코칭 코스 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            코칭 코스
          </h2>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg mb-6">
              코스를 불러오는 중 오류가 발생했습니다.
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {courses?.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow relative overflow-hidden"
              >
                {/* 배지 */}
                <div className="absolute top-0 right-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4 py-1 rounded-bl-xl text-sm font-semibold">
                  {course.course_type === 'online' ? '온라인' : '오프라인'}
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                        {course.price.toLocaleString()}원
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">/ 세션</span>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      ⏱️ {course.duration_minutes}분
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {course.course_type === 'online' 
                          ? '화상 미팅 (Zoom, Google Meet)' 
                          : '서울 강남역 인근 스터디 카페'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span className="text-slate-600 dark:text-slate-400">
                        실시간 코드 리뷰
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span className="text-slate-600 dark:text-slate-400">
                        세션 후 정리 자료 제공
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span className="text-slate-600 dark:text-slate-400">
                        2주간 이메일 Q&A 지원
                      </span>
                    </div>
                  </div>

                  {user ? (
                    <Link
                      href={`/coaching/book/${course.id}`}
                      className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-center"
                    >
                      예약하기
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="block w-full py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors text-center hover:bg-slate-300 dark:hover:bg-slate-600"
                    >
                      로그인 후 예약
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            자주 묻는 질문
          </h2>

          <div className="space-y-6">
            <details className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
              <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
                어떤 내용을 준비해야 하나요?
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                질문하고 싶은 코드나 프로젝트, 막히는 부분을 정리해서 보내주시면 됩니다. 
                사전에 자료를 보내주시면 더 효율적인 세션이 가능합니다.
              </p>
            </details>

            <details className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
              <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
                환불이 가능한가요?
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                세션 시작 24시간 전까지 전액 환불이 가능합니다. 
                24시간 이내에는 50% 환불, 세션 시작 후에는 환불이 불가능합니다.
              </p>
            </details>

            <details className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
              <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer">
                일정은 어떻게 조율하나요?
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                예약 시 희망 날짜와 시간을 3개 정도 선택해주시면, 
                확인 후 이메일로 확정된 일정을 안내드립니다.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
