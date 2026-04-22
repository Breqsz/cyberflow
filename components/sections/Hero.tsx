'use client';

import dynamic from 'next/dynamic';
import { LinkButton } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const GradientBlinds = dynamic(() => import('@/components/background/GradientBlinds'), { ssr: false });

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* GradientBlinds background */}
      <div className="absolute inset-0 z-0">
        <GradientBlinds
          gradientColors={['#6C3AFF', '#00D4FF', '#050510', '#1a0040']}
          angle={0}
          noise={0.18}
          blindCount={10}
          blindMinWidth={60}
          spotlightRadius={0.6}
          spotlightSoftness={1.2}
          spotlightOpacity={0.85}
          mouseDampening={0.12}
          mixBlendMode="normal"
          distortAmount={0.4}
        />
      </div>

      {/* dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050510]/60 via-[#050510]/30 to-[#050510]/80" />

      {/* grid pattern overlay */}
      <div
        className="absolute inset-0 z-[2] opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(108,58,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(108,58,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
        <div className="flex justify-center mb-6">
          <Badge variant="primary">
            ✦ Agência de Presença Digital
          </Badge>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
          Sua empresa perde
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c3aff] via-[#a47aff] to-[#00d4ff]">
            clientes todo dia
          </span>
          <br />
          com presença fraca.
        </h1>

        <p className="text-xl md:text-2xl text-[#f0f0ff]/60 max-w-3xl mx-auto mb-10 leading-relaxed">
          Transformamos sua presença digital em motor de crescimento —
          sites rápidos, funis que convertem e estratégia que escala.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LinkButton href="#plans" variant="primary" size="lg">
            Quero mudar isso agora →
          </LinkButton>
          <LinkButton href="#how-it-works" variant="ghost" size="lg">
            Como funciona
          </LinkButton>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-[#f0f0ff]/40">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
            Resultados em 30 dias
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6c3aff] animate-pulse" />
            Projetos entregues no prazo
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#a47aff] animate-pulse" />
            Suporte direto sem intermediários
          </span>
        </div>
      </div>

      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050510] to-transparent z-[3]" />
    </section>
  );
};
