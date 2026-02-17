import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await request.json();

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { message: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 토스페이먼츠 결제 승인 API 호출
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Toss Payments API Error:', data);
      return NextResponse.json(
        { 
          message: data.message || '결제 승인에 실패했습니다.',
          code: data.code 
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      { message: '결제 승인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
