import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await supabase
    .from('messages')
    .update({ read_at: new Date().toISOString() })
    .eq('customer_id', user.id)
    .eq('sender_role', 'admin')
    .is('read_at', null);

  return NextResponse.json({ ok: true });
}
