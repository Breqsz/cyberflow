'use client';

import { useState, useEffect, useTransition } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams } from 'next/navigation';

type Message = { id: string; sender_role: string; content: string; created_at: string };
type Profile = { name: string | null; company_name: string | null; email: string | null };

const STAGES = [
  { key: 'briefing', label: 'Briefing' },
  { key: 'design', label: 'Design' },
  { key: 'development', label: 'Desenvolvimento' },
  { key: 'review', label: 'Revisão' },
  { key: 'delivered', label: 'Entregue' },
];

export default function AdminClientPage() {
  const { id: customerId } = useParams<{ id: string }>();
  const [tab, setTab] = useState<'progress' | 'messages'>('progress');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stage, setStage] = useState('briefing');
  const [note, setNote] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgInput, setMsgInput] = useState('');
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from('profiles').select('name, company_name, email').eq('id', customerId).single(),
      supabase.from('projects').select('current_stage, stage_note').eq('customer_id', customerId).single(),
      supabase.from('messages').select('id, sender_role, content, created_at').eq('customer_id', customerId).order('created_at', { ascending: true }),
    ]).then(([{ data: p }, { data: proj }, { data: msgs }]) => {
      setProfile(p);
      if (proj) { setStage(proj.current_stage); setNote(proj.stage_note ?? ''); }
      setMessages((msgs as Message[]) ?? []);
    });
  }, [customerId]);

  const saveStage = () => {
    startTransition(async () => {
      await fetch(`/api/admin/projects/${customerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_stage: stage, stage_note: note }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const sendMessage = () => {
    const text = msgInput.trim();
    if (!text) return;
    setMsgInput('');
    const optimistic: Message = {
      id: crypto.randomUUID(),
      sender_role: 'admin',
      content: text,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    startTransition(async () => {
      await fetch('/api/admin/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_id: customerId, content: text }),
      });
    });
  };

  const displayName = profile?.company_name || profile?.name || profile?.email || 'Cliente';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <a href="/admin" className="text-xs text-[#6c3aff] hover:text-[#a47aff]">← Clientes</a>
        <h1 className="text-2xl font-bold text-white mt-1">{displayName}</h1>
        {profile?.email && <p className="text-sm text-[#555]">{profile.email}</p>}
      </div>

      <div className="flex gap-1 mb-6 border-b border-white/[0.05]">
        {[{ key: 'progress', label: '🚀 Progresso' }, { key: 'messages', label: '💬 Mensagens' }].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key as typeof tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === key
                ? 'border-[#6c3aff] text-[#a47aff]'
                : 'border-transparent text-[#555] hover:text-[#888]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'progress' && (
        <div className="bg-[#0d0d1a] border border-white/[0.05] rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-xs text-[#f0f0ff]/40 mb-1.5">Etapa atual</label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] text-sm focus:outline-none focus:border-[#6c3aff]/50"
            >
              {STAGES.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-[#f0f0ff]/40 mb-1.5">Nota para o cliente (opcional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Ex: Wireframes enviados para aprovação…"
              className="w-full bg-[#050510] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] text-sm focus:outline-none focus:border-[#6c3aff]/50 resize-none"
            />
          </div>
          <button
            onClick={saveStage}
            disabled={isPending}
            className="w-full bg-[#6c3aff] hover:bg-[#7c4aff] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            {saved ? 'Salvo!' : isPending ? 'Salvando…' : 'Salvar etapa'}
          </button>
        </div>
      )}

      {tab === 'messages' && (
        <div className="flex flex-col gap-4">
          <div className="bg-[#0d0d1a] border border-white/[0.05] rounded-2xl p-5 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {messages.length === 0 && (
              <p className="text-center text-[#555] text-sm">Nenhuma mensagem ainda.</p>
            )}
            {messages.map((msg) => {
              const isAdmin = msg.sender_role === 'admin';
              return (
                <div key={msg.id} className={`flex gap-2 items-end ${isAdmin ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${isAdmin ? 'bg-[#6c3aff]/20 text-[#a47aff] border border-[#6c3aff]/30' : 'bg-[#00d4ff]/15 text-[#00d4ff] border border-[#00d4ff]/25'}`}>
                    {isAdmin ? 'CF' : 'C'}
                  </div>
                  <div className={`max-w-[70%] px-3 py-2 rounded-xl text-xs leading-relaxed ${isAdmin ? 'bg-[#6c3aff]/12 border border-[#6c3aff]/20 text-[#e0d0ff] rounded-tr-sm' : 'bg-[#111124] border border-white/[0.05] text-[#d0d0ff] rounded-tl-sm'}`}>
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-3">
            <input
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Enviar mensagem ao cliente…"
              className="flex-1 bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] text-sm focus:outline-none focus:border-[#6c3aff]/50"
            />
            <button
              onClick={sendMessage}
              disabled={!msgInput.trim()}
              className="bg-[#6c3aff] hover:bg-[#7c4aff] disabled:opacity-40 text-white font-semibold px-5 py-3 rounded-xl text-sm"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
