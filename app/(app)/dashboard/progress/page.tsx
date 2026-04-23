import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

type Stage = 'briefing' | 'design' | 'development' | 'review' | 'delivered';

const STAGES: { key: Stage; labelPt: string; icon: string; description: string }[] = [
  { key: 'briefing',    labelPt: 'Briefing',       icon: '📝', description: 'Entendendo seus objetivos, público e diferenciais.' },
  { key: 'design',      labelPt: 'Design',         icon: '🎨', description: 'Criação da identidade visual e prototipagem.' },
  { key: 'development', labelPt: 'Desenvolvimento', icon: '⚡', description: 'Construção técnica com foco em performance.' },
  { key: 'review',      labelPt: 'Revisão',        icon: '🔍', description: 'Ajustes finais, testes e aprovação conjunta.' },
  { key: 'delivered',   labelPt: 'Entregue',       icon: '🚀', description: 'Projeto no ar, pronto para escalar.' },
];

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: project } = await supabase
    .from('projects')
    .select('current_stage, stage_note, updated_at')
    .eq('customer_id', user!.id)
    .maybeSingle();

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-[#6c3aff] mb-1">Progresso</p>
          <h1 className="text-3xl font-bold text-white">Projeto</h1>
          <p className="text-[#f0f0ff]/50 mt-1">Acompanhe cada etapa do seu projeto em tempo real.</p>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] to-[#1a0d2e] border border-dashed border-[#6c3aff]/25 rounded-2xl p-10 text-center">
          <div className="text-5xl mb-4">🚀</div>
          <p className="text-white font-semibold mb-2">Nenhum projeto iniciado ainda</p>
          <p className="text-[#f0f0ff]/40 text-sm max-w-md mx-auto mb-5">
            Assim que você assinar um plano e o briefing começar, o andamento aparecerá aqui.
          </p>
          <Link
            href="/dashboard/messages"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6c3aff] hover:bg-[#7c4aff] text-white text-sm font-semibold transition-colors"
          >
            Fale com a equipe →
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = STAGES.findIndex((s) => s.key === project.current_stage);
  const progress = Math.round(((currentIndex + 1) / STAGES.length) * 100);
  const updatedAt = project.updated_at
    ? new Date(project.updated_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    : null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-[#6c3aff] mb-1">Progresso</p>
        <h1 className="text-3xl font-bold text-white">Projeto</h1>
        <p className="text-[#f0f0ff]/50 mt-1">Acompanhe cada etapa do seu projeto em tempo real.</p>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] via-[#0d0d1a] to-[#1a0d2e] border border-[#6c3aff]/20 rounded-2xl p-6 mb-6">
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-[#6c3aff]/15 rounded-full blur-3xl" />
        <div className="relative flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#6c3aff] font-semibold mb-0.5">
              Progresso total
            </p>
            <p className="text-2xl font-bold text-white">{progress}%</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-[#f0f0ff]/40 font-semibold mb-0.5">
              Etapa
            </p>
            <p className="text-sm font-bold text-[#00d4ff]">
              {STAGES[currentIndex]?.labelPt ?? project.current_stage}
            </p>
          </div>
        </div>
        <div className="relative h-2 bg-[#111124] rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#6c3aff] to-[#00d4ff] rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-[#0d0d1a] border border-white/5 rounded-2xl p-7">
        <div className="relative">
          {STAGES.map((stage, index) => {
            const done = index < currentIndex;
            const active = index === currentIndex;

            return (
              <div key={stage.key} className="flex gap-5 last:mb-0 mb-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                      done
                        ? 'bg-[#6c3aff] text-white shadow-[0_0_20px_rgba(108,58,255,0.4)]'
                        : active
                        ? 'bg-[#050510] border-2 border-[#00d4ff] text-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                        : 'bg-[#111124] border border-white/5 text-[#444]'
                    }`}
                  >
                    {done ? '✓' : stage.icon}
                  </div>
                  {index < STAGES.length - 1 && (
                    <div
                      className={`w-0.5 flex-1 min-h-[48px] my-1.5 ${
                        done ? 'bg-gradient-to-b from-[#6c3aff] to-[#6c3aff]/30' : 'bg-white/5'
                      }`}
                    />
                  )}
                </div>
                <div className="pb-10 last:pb-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p
                      className={`font-bold text-base ${
                        done ? 'text-[#a47aff]' : active ? 'text-white' : 'text-[#555]'
                      }`}
                    >
                      {stage.labelPt}
                    </p>
                    {active && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 uppercase tracking-wider">
                        Em andamento
                      </span>
                    )}
                    {done && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 uppercase tracking-wider">
                        Concluído
                      </span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${active || done ? 'text-[#f0f0ff]/65' : 'text-[#555]'}`}>
                    {stage.description}
                  </p>
                  {active && project.stage_note && (
                    <div className="mt-3 rounded-xl bg-[#050510]/60 border border-[#00d4ff]/15 p-3.5">
                      <p className="text-[10px] uppercase tracking-widest text-[#00d4ff] font-semibold mb-1">
                        Atualização da equipe
                      </p>
                      <p className="text-sm text-[#f0f0ff]/75 leading-relaxed">{project.stage_note}</p>
                      {updatedAt && (
                        <p className="text-[10px] text-[#555] mt-2">Atualizado em {updatedAt}</p>
                      )}
                    </div>
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
