import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const allowed = ['name', 'company_name', 'phone', 'country'] as const;
  const updates: Record<string, string> = {};
  for (const key of allowed) {
    if (typeof body[key] === 'string') updates[key] = body[key];
  }

  const { error } = await supabase.from('profiles').upsert({ id: user.id, ...updates });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
