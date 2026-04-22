import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const supabase = await createClient();
    const { error } = await supabase.from('leads').insert({ name, email, phone });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('leads route error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
