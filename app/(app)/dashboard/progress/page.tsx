import { createClient } from '@/lib/supabase/server';

type Stage = 'briefing' | 'design' | 'development' | 'review' | 'delivered';

const STAGES: { key: Stage; labelPt: string }[] = [
  { key: 'briefing',     labelPt: 'Briefing' },
  { key: 'design',       labelPt: 'Design' },
  { key: 'development',  labelPt: 'Desenvolvimento' },
  { key: 'review',       labelPt: 'Revisão' },
  { key: 'delivered',    labelPt: 'Entregue' },
];

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: project } = await supabase
    .from('projects')
    .select('current_stage, stage_note, updated_at')
    .eq('customer_id', user!.id)
    .single();

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Progresso do projeto</h1>
        <p className="text-[#f0f0ff]/50 mb-8">Acompanhe cada etapa do seu projeto.</p>
        <div className="bg-[#0d0d1a] border border-[#6c3aff]/20 rounded-2xl p-10 text-center">
          <div className="text-4xl mb-3">🚀</div>
          <p className="text-white font-semibold mb-2">Nenhum projeto iniciado ainda</p>
          <p className="text-[#f0f0ff]/40 text-sm">A equipe CyberFlow irá iniciar seu projeto em breve.</p>
        </div>
      </div>
    );
  }

  const currentIndex = STAGES.findIndex((s) => s.key === project.current_stage);
  const updatedAt = project.updated_at
    ? new Date(project.updated_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    : null;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Progresso do projeto</h1>
      <p className="text-[#f0f0ff]/50 mb-8">Acompanhe cada etapa do seu projeto.</p>

      <div className="bg-[#0d0d1a] border border-[#6c3aff]/20 rounded-2xl p-8">
        <div className="relative">
          {STAGES.map((stage, index) => {
            const done = index < currentIndex;
            const active = index === currentIndex;

            return (
              <div key={stage.key} className="flex gap-5 mb-0 last:mb-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      done
                        ? 'bg-[#6c3aff] text-white'
                        : active
                        ? 'bg-[#00d4ff]/15 border-2 border-[#00d4ff] text-[#00d4ff]'
                        : 'bg-[#111124] border border-[#222] text-[#444]'
                    }`}
                  >
                    {done ? '✓' : index + 1}
                  </div>
                  {index < STAGES.length - 1 && (
                    <div
                      className={`w-0.5 flex-1 min-h-[32px] my-1 ${
                        done ? 'bg-[#6c3aff]' : 'bg-[#1a1a2e]'
                      }`}
                    />
                  )}
                </div>
                <div className="pb-8 last:pb-0">
                  <p
                    className={`font-semibold text-sm mt-1 ${
                      done ? 'text-[#a47aff]' : active ? 'text-[#00d4ff]' : 'text-[#444]'
                    }`}
                  >
                    {stage.labelPt}
                  </p>
                  {active && project.stage_note && (
                    <p className="text-xs text-[#f0f0ff]/50 mt-1 leading-relaxed">
                      {project.stage_note}
                    </p>
                  )}
                  {active && updatedAt && (
                    <p className="text-[10px] text-[#555] mt-1">Atualizado em {updatedAt}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
