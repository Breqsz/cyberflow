import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, website, challenge } = body ?? {};

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // If Supabase isn't configured, accept silently so the UI still confirms
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('leads: supabase not configured — lead dropped:', { email });
      return NextResponse.json({ ok: true, persisted: false });
    }

    const supabase = await createClient();
    const { error } = await supabase.from('leads').insert({
      name: name ?? null,
      email,
      phone: phone ?? null,
      website: website ?? null,
      challenge: challenge ?? null,
    });

    if (error) {
      console.error('leads insert error:', error);
      return NextResponse.json({ error: 'Could not save lead' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    console.error('leads route error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
