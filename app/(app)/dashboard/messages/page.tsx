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
    new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="max-w-2xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-bold text-white mb-1">{t(c.title, lang)}</h1>
        <p className="text-[#f0f0ff]/50">{t(c.subtitle, lang)}</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#0d0d1a] border border-white/[0.05] rounded-2xl p-6 mb-4 flex flex-col gap-4 min-h-0">
        {messages.length === 0 && (
          <p className="text-center text-[#f0f0ff]/30 text-sm my-auto">{t(c.empty, lang)}</p>
        )}
        {messages.map((msg) => {
          const isClient = msg.sender_role === 'customer';
          return (
            <div key={msg.id} className={`flex gap-3 items-end ${isClient ? 'flex-row-reverse' : ''}`}>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isClient
                    ? 'bg-[#00d4ff]/15 border border-[#00d4ff]/25 text-[#00d4ff]'
                    : 'bg-[#6c3aff]/20 border border-[#6c3aff]/30 text-[#a47aff]'
                }`}
              >
                {isClient ? 'V' : 'CF'}
              </div>
              <div className={`max-w-[70%] flex flex-col gap-1 ${isClient ? 'items-end' : 'items-start'}`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isClient
                      ? 'bg-[#6c3aff]/12 border border-[#6c3aff]/20 text-[#e0d0ff] rounded-tr-sm'
                      : 'bg-[#111124] border border-[#6c3aff]/15 text-[#d0c0ff] rounded-tl-sm'
                  }`}
                >
                  {msg.content}
                </div>
                <span className={`text-[10px] text-[#555] ${isClient ? 'text-right' : ''}`}>
                  {isClient ? t(c.youLabel, lang) : t(c.teamLabel, lang)} · {formatTime(msg.created_at)}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-3 shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder={t(c.placeholder, lang)}
          className="flex-1 bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#f0f0ff]/20 focus:outline-none focus:border-[#6c3aff]/50 transition-colors text-sm"
        />
        <button
          onClick={send}
          disabled={isPending || !input.trim()}
          className="bg-[#6c3aff] hover:bg-[#7c4aff] disabled:opacity-40 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
        >
          {t(c.send, lang)}
        </button>
      </div>
    </div>
  );
}
