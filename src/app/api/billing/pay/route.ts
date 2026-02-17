import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const { 
      billingKey,
      customerKey,
      amount,
      orderId,
      orderName,
      customerEmail,
      customerName
    } = await request.json();

    // 필수 파라미터 확인
    if (!billingKey || !customerKey || !amount || !orderName) {
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

    const finalOrderId = orderId || uuidv4();

    // 토스페이먼츠 자동결제 승인 API 호출
    const response = await fetch(`https://api.tosspayments.com/v1/billing/${billingKey}`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerKey,
        amount,
        orderId: finalOrderId,
        orderName,
        customerEmail: customerEmail || user.email,
        customerName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Toss Payments Billing Pay Error:', data);
      return NextResponse.json(
        { 
          message: data.message || '정기결제 승인에 실패했습니다.',
          code: data.code 
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      paymentKey: data.paymentKey,
      orderId: data.orderId,
      status: data.status,
      approvedAt: data.approvedAt,
    });
  } catch (error: any) {
    console.error('Billing payment error:', error);
    return NextResponse.json(
      { message: '정기결제 실행 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
