"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";

export default function BillingRegisterPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiryYear, setCardExpiryYear] = useState("");
  const [cardExpiryMonth, setCardExpiryMonth] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cardPassword, setCardPassword] = useState("");
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push('/login');
        return;
      }
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setMessage(null);

    try {
      // 입력 검증
      if (cardNumber.length < 15 || cardNumber.length > 16) {
        throw new Error('카드번호를 확인해주세요.');
      }
      
      if (birthDate.length !== 6) {
        throw new Error('생년월일 6자리를 입력해주세요 (YYMMDD).');
      }

      if (cardPassword.length !== 2) {
        throw new Error('카드 비밀번호 앞 2자리를 입력해주세요.');
      }

      const customerKey = uuidv4();

      // 빌링키 발급 API 호출
      const response = await fetch('/api/billing/issue-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerKey,
          cardNumber: cardNumber.replace(/-/g, ''),
          cardExpirationYear: cardExpiryYear,
          cardExpirationMonth: cardExpiryMonth,
          customerIdentityNumber: birthDate,
          cardPassword,
          customerName: user.user_metadata?.full_name || user.email,
          customerEmail: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '카드 등록에 실패했습니다.');
      }

      setMessage({
        type: 'success',
        text: '카드가 성공적으로 등록되었습니다! 이제 정기결제를 이용하실 수 있습니다.',
      });

      // 3초 후 구독 페이지로 이동
      setTimeout(() => {
        router.push('/billing/subscribe');
      }, 2000);

    } catch (error: any) {
      console.error('Card registration error:', error);
      setMessage({
        type: 'error',
        text: error.message || '카드 등록 중 오류가 발생했습니다.',
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-slate-600 dark:text-slate-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 뒤로가기 */}
        <Link
          href="/dashboard"
          className="inline-block mb-6 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          ← 대시보드로 돌아가기
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            카드 등록
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            정기결제를 위해 카드를 등록해주세요. 카드 정보는 암호화되어 안전하게 보관됩니다.
          </p>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 카드 번호 */}
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                카드 번호 <span className="text-red-500">*</span>
              </label>
              <input
                id="cardNumber"
                type="text"
                value={cardNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 16) {
                    const formatted = value.match(/.{1,4}/g)?.join('-') || value;
                    setCardNumber(formatted);
                  }
                }}
                placeholder="1234-5678-9012-3456"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 유효기간 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryMonth" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  유효기간 (월) <span className="text-red-500">*</span>
                </label>
                <select
                  id="expiryMonth"
                  value={cardExpiryMonth}
                  onChange={(e) => setCardExpiryMonth(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">월 선택</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month.toString().padStart(2, '0')}>
                      {month}월
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="expiryYear" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  유효기간 (년) <span className="text-red-500">*</span>
                </label>
                <select
                  id="expiryYear"
                  value={cardExpiryYear}
                  onChange={(e) => setCardExpiryYear(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">년 선택</option>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                    <option key={year} value={year.toString().slice(-2)}>
                      {year}년
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 생년월일 */}
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                생년월일 (YYMMDD) <span className="text-red-500">*</span>
              </label>
              <input
                id="birthDate"
                type="text"
                value={birthDate}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setBirthDate(value);
                  }
                }}
                placeholder="901225"
                maxLength={6}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 카드 비밀번호 */}
            <div>
              <label htmlFor="cardPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                카드 비밀번호 앞 2자리 <span className="text-red-500">*</span>
              </label>
              <input
                id="cardPassword"
                type="password"
                value={cardPassword}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 2) {
                    setCardPassword(value);
                  }
                }}
                placeholder="••"
                maxLength={2}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 안내 사항 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                🔒 보안 안내
              </h3>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• 카드 정보는 암호화되어 안전하게 보관됩니다</li>
                <li>• 토스페이먼츠의 PCI-DSS 인증 시스템을 사용합니다</li>
                <li>• 언제든지 카드 등록을 해지할 수 있습니다</li>
                <li>• 자동결제는 구독 신청 후에만 진행됩니다</li>
              </ul>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-lg font-semibold rounded-lg transition-colors"
            >
              {processing ? '처리 중...' : '카드 등록하기'}
            </button>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              카드 등록만 진행되며, 구독 신청 전까지 결제되지 않습니다
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
