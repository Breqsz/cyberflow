import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const VALID_STAGES = ['briefing', 'design', 'development', 'review', 'delivered'] as const;

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { current_stage, stage_note } = await req.json();
  if (!VALID_STAGES.includes(current_stage))
    return NextResponse.json({ error: 'Invalid stage' }, { status: 400 });

  const { error } = await supabase
    .from('projects')
    .upsert(
      {
        customer_id: id,
        current_stage,
        stage_note: stage_note ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'customer_id' }
    );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
