import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import type Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Webhook signature error' }, { status: 400 });
  }

  const supabase = await createClient();

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session.customer as string;
    const userId = session.client_reference_id;

    if (userId) {
      await supabase.from('customers').upsert({
        id: userId,
        stripe_customer_id: customerId,
        status: 'active',
        plan: session.metadata?.plan ?? 'starter',
      });
    }
  }

  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription;
    await supabase
      .from('subscriptions')
      .upsert({
        id: sub.id,
        status: sub.status,
        price_id: sub.items.data[0]?.price.id,
        current_period_end: new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000).toISOString(),
      });
  }

  return NextResponse.json({ received: true });
}
