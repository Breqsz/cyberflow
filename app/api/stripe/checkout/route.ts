import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const PRICE_IDS: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER ?? '',
  growth: process.env.STRIPE_PRICE_GROWTH ?? '',
  pro: process.env.STRIPE_PRICE_PRO ?? '',
  onetime: process.env.STRIPE_PRICE_ONETIME ?? '',
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const { plan, email } = await req.json();

    if (!plan || !PRICE_IDS[plan]) {
      return NextResponse.json(
        { error: 'Plan not configured. Contact us at #contact.', fallback: `${APP_URL}/#contact` },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Checkout temporarily unavailable', fallback: `${APP_URL}/#contact` },
        { status: 503 }
      );
    }

    const priceId = PRICE_IDS[plan];
    const isRecurring = plan !== 'onetime';

    const session = await stripe.checkout.sessions.create({
      mode: isRecurring ? 'subscription' : 'payment',
      customer_email: email || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { plan },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      success_url: `${APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/#pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('checkout error:', err);
    return NextResponse.json(
      { error: 'Internal error', fallback: `${APP_URL}/#contact` },
      { status: 500 }
    );
  }
}
