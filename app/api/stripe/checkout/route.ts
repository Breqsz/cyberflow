import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const PRICE_IDS: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER ?? '',
  growth: process.env.STRIPE_PRICE_GROWTH ?? '',
  pro: process.env.STRIPE_PRICE_PRO ?? '',
  onetime: process.env.STRIPE_PRICE_ONETIME ?? '',
};

export async function POST(req: NextRequest) {
  try {
    const { plan, email } = await req.json();
    const priceId = PRICE_IDS[plan];
    if (!priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });

    const isRecurring = plan !== 'onetime';
    const session = await stripe.checkout.sessions.create({
      mode: isRecurring ? 'subscription' : 'payment',
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#plans`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('checkout error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
