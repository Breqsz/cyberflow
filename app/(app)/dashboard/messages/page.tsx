'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/components/providers/LanguageProvider';
import { content, t } from '@/lib/i18n/content';

type Message = {
  id: string;
  sender_role: 'admin' | 'customer';
  content: string;
  created_at: string;
};

export default function MessagesPage() {
  const { lang } = useLang();
  const c = content.dashboard.messages;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data } = await supabase
        .from('messages')
        .select('id, sender_role, content, created_at')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: true });
      setMessages((data as Message[]) ?? []);
      fetch('/api/messages/read', { method: 'POST' });
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const optimistic: Message = {
      id: crypto.randomUUID(),
      sender_role: 'customer',
      content: text,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);

    startTransition(async () => {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      });
    });
  };

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const formatDay = (iso: string) => {
    const d = new Date(iso);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return 'Hoje';
    if (d.toDateString() === yesterday.toDateString()) return 'Ontem';
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const groupedByDay: { day: string; items: Message[] }[] = [];
  for (const m of messages) {
    const day = formatDay(m.created_at);
    const last = groupedByDay[groupedByDay.length - 1];
    if (last && last.day === day) last.items.push(m);
    else groupedByDay.push({ day, items: [m] });
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="mb-6 shrink-0 flex items-start gap-4 justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#6c3aff] mb-1">Atendimento</p>
          <h1 className="text-3xl font-bold text-white">{t(c.title, lang)}</h1>
          <p className="text-[#f0f0ff]/50 mt-1">{t(c.subtitle, lang)}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Equipe online
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#0d0d1a] border border-white/5 rounded-2xl p-6 mb-4 flex flex-col gap-5 min-h-0">
        {messages.length === 0 && (
          <div className="my-auto text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#6c3aff]/10 border border-[#6c3aff]/25 flex items-center justify-center text-2xl">
              💬
            </div>
            <p className="text-white font-semibold">Inicie a conversa</p>
            <p className="text-[#f0f0ff]/40 text-sm max-w-sm mx-auto">
              {t(c.empty, lang)}
            </p>
          </div>
        )}

        {groupedByDay.map((group) => (
          <div key={group.day} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-px bg-white/5 flex-1" />
              <span className="text-[10px] uppercase tracking-widest text-[#f0f0ff]/30 font-semibold">
                {group.day}
              </span>
              <div className="h-px bg-white/5 flex-1" />
            </div>
            {group.items.map((msg) => {
              const isClient = msg.sender_role === 'customer';
              return (
                <div key={msg.id} className={`flex gap-3 items-end ${isClient ? 'flex-row-reverse' : ''}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isClient
                        ? 'bg-gradient-to-br from-[#00d4ff] to-[#0088aa] text-[#050510]'
                        : 'bg-gradient-to-br from-[#6c3aff] to-[#4a20b5] text-white'
                    }`}
                  >
                    {isClient ? 'V' : 'CF'}
                  </div>
                  <div className={`max-w-[75%] flex flex-col gap-1 ${isClient ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
                        isClient
                          ? 'bg-gradient-to-br from-[#6c3aff]/20 to-[#6c3aff]/10 border border-[#6c3aff]/25 text-[#f0f0ff] rounded-tr-sm'
                          : 'bg-[#111124] border border-white/5 text-[#d0d0ff] rounded-tl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className={`text-[10px] text-[#555] px-1 ${isClient ? 'text-right' : ''}`}>
                      {isClient ? t(c.youLabel, lang) : t(c.teamLabel, lang)} · {formatTime(msg.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-3 shrink-0 bg-[#0d0d1a] border border-white/5 rounded-2xl p-2.5 focus-within:border-[#6c3aff]/35 transition-colors">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px';
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={1}
          placeholder={t(c.placeholder, lang)}
          className="flex-1 bg-transparent px-3 py-2 text-[#f0f0ff] placeholder-[#f0f0ff]/20 focus:outline-none text-sm resize-none"
        />
        <button
          onClick={send}
          disabled={isPending || !input.trim()}
          className="bg-gradient-to-br from-[#6c3aff] to-[#4a20b5] hover:from-[#7c4aff] hover:to-[#5a30c5] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-5 rounded-xl transition-all text-sm shrink-0 inline-flex items-center gap-2"
        >
          {t(c.send, lang)} <span>↗</span>
        </button>
      </div>
    </div>
  );
}
