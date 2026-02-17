import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { 
      customerKey,
      cardNumber, 
      cardExpirationYear, 
      cardExpirationMonth, 
      customerIdentityNumber,
      cardPassword,
      customerName,
      customerEmail
    } = await request.json();

    // 필수 파라미터 확인
    if (!customerKey || !cardNumber || !cardExpirationYear || !cardExpirationMonth || !customerIdentityNumber) {
      return NextResponse.json(
        { message: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 인증 확인
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { message: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 토스페이먼츠 빌링키 발급 API 호출
    const response = await fetch('https://api.tosspayments.com/v1/billing/authorizations/card', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerKey,
        cardNumber,
        cardExpirationYear,
        cardExpirationMonth,
        customerIdentityNumber,
        cardPassword,
        customerName,
        customerEmail,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Toss Payments Billing Key Issue Error:', data);
      return NextResponse.json(
        { 
          message: data.message || '빌링키 발급에 실패했습니다.',
          code: data.code 
        },
        { status: response.status }
      );
    }

    // 빌링키를 데이터베이스에 저장
    const { error: dbError } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: user.id,
        customer_key: customerKey,
        billing_key: data.billingKey,
        status: 'active',
        // course_id는 나중에 구독 시작할 때 설정
      });

    if (dbError) {
      console.error('DB Error:', dbError);
      return NextResponse.json(
        { message: '빌링키 저장에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      billingKey: data.billingKey,
      card: data.card,
      cardCompany: data.cardCompany,
    });
  } catch (error: any) {
    console.error('Billing key issue error:', error);
    return NextResponse.json(
      { message: '빌링키 발급 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
