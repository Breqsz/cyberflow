export type Lang = 'en' | 'pt';

export const content = {
  nav: {
    links: {
      en: ['How it works', 'Services', 'Work', 'Pricing'],
      pt: ['Como funciona', 'Serviços', 'Projetos', 'Planos'],
    },
    cta: { en: 'Get a free audit', pt: 'Auditoria gratuita' },
  },

  hero: {
    badge: {
      en: '2 SaaS live · 14 pages shipped · 0 projects abandoned',
      pt: '2 SaaS em produção · 14 páginas entregues · 0 projetos abandonados',
    },
    headline: {
      en: 'Your traffic is ready.\nYour website isn\'t.',
      pt: 'Seu tráfego está pronto.\nSeu site não está.',
    },
    sub: {
      en: 'We build the conversion machine behind your brand — pages that rank, funnels that close, and systems that work while you sleep.',
      pt: 'Construímos a máquina de conversão por trás da sua marca — páginas que ranqueiam, funis que fecham e sistemas que trabalham enquanto você dorme.',
    },
    cta1: { en: 'Get my free roadmap →', pt: 'Quero meu roadmap gratuito →' },
    cta2: { en: 'See our work', pt: 'Ver projetos' },
    micro: {
      en: 'Free · No pitch · Just a specific action plan',
      pt: 'Grátis · Sem pitch · Apenas um plano de ação específico',
    },
    trust: {
      en: ['No contracts. Cancel anytime.', 'Reply in under 24h', 'Built for founders, not corporations'],
      pt: ['Sem contratos. Cancele quando quiser.', 'Resposta em até 24h', 'Feito para founders, não para corporações'],
    },
    testimonial: {
      en: {
        quote: 'Launched our full SaaS in 3 weeks, fully production-ready.',
        author: 'Founder, Desafog.ai',
      },
      pt: {
        quote: 'Lançamos nosso SaaS completo em 3 semanas, totalmente em produção.',
        author: 'Founder, Desafog.ai',
      },
    },
  },

  problem: {
    badge: { en: 'The cost of doing nothing', pt: 'O custo de não fazer nada' },
    headline: {
      en: 'Your digital presence is leaking revenue. Every day.',
      pt: 'Sua presença digital está perdendo receita. Todo dia.',
    },
    sub: {
      en: 'Most businesses spend money driving traffic to a website that was never built to convert. That\'s not a traffic problem — it\'s a system problem.',
      pt: 'A maioria das empresas gasta dinheiro trazendo tráfego para um site que nunca foi construído para converter. Isso não é um problema de tráfego — é um problema de sistema.',
    },
    items: {
      en: [
        {
          stat: '70%',
          label: 'of visitors leave in under 8 seconds',
          detail: 'No hook, no clear value, no reason to stay. You paid for that click.',
        },
        {
          stat: '3×',
          label: 'more revenue lost without a funnel',
          detail: 'Sending traffic to a homepage instead of a structured funnel burns your ad budget silently.',
        },
        {
          stat: '$0',
          label: 'ROI from manual follow-ups',
          detail: 'Without automation and AI chat, leads go cold before your team ever responds.',
        },
      ],
      pt: [
        {
          stat: '70%',
          label: 'dos visitantes saem em menos de 8 segundos',
          detail: 'Sem gancho, sem proposta clara, sem motivo para ficar. Você pagou por esse clique.',
        },
        {
          stat: '3×',
          label: 'mais receita perdida sem funil',
          detail: 'Enviar tráfego para uma homepage em vez de um funil estruturado queima seu orçamento em silêncio.',
        },
        {
          stat: '$0',
          label: 'ROI com follow-ups manuais',
          detail: 'Sem automação e chat com IA, os leads esfriam antes da sua equipe responder.',
        },
      ],
    },
  },

  solution: {
    badge: { en: 'The CyberFlow system', pt: 'O sistema CyberFlow' },
    headline: {
      en: 'Every piece works together.\nOr it doesn\'t work at all.',
      pt: 'Cada peça funciona junta.\nOu não funciona mesmo.',
    },
    sub: {
      en: 'Most agencies build what you ask for. We build what you actually need — and connect it to everything else.',
      pt: 'A maioria das agências constrói o que você pede. Nós construímos o que você realmente precisa — e conectamos a tudo o mais.',
    },
    pillars: {
      en: [
        { icon: 'Zap', title: 'Speed & Performance', body: 'Sub-2s load times, optimized Core Web Vitals, and mobile-first architecture that Google rewards.' },
        { icon: 'Target', title: 'Conversion Architecture', body: 'Every page is built around a specific action. Copy, layout, and flow designed to move people forward.' },
        { icon: 'Bot', title: 'AI-Powered Systems', body: 'AI chat for lead qualification, 24/7 support, and automated follow-ups that never sleep.' },
        { icon: 'Link2', title: 'Deep Integrations', body: 'CRM, email automation, payment systems, analytics — everything connected and talking to each other.' },
        { icon: 'Database', title: 'Scalable Infrastructure', body: 'Supabase, Firebase, serverless APIs — the backend your product needs to grow without breaking.' },
        { icon: 'TrendingUp', title: 'Growth-Ready Funnels', body: 'Multi-step funnels with A/B-ready structure, lead capture, and conversion tracking baked in.' },
      ],
      pt: [
        { icon: 'Zap', title: 'Velocidade & Performance', body: 'Carregamento abaixo de 2s, Core Web Vitals otimizados e arquitetura mobile-first que o Google recompensa.' },
        { icon: 'Target', title: 'Arquitetura de Conversão', body: 'Cada página é construída em torno de uma ação específica. Copy, layout e fluxo projetados para avançar.' },
        { icon: 'Bot', title: 'Sistemas com IA', body: 'Chat com IA para qualificação de leads, suporte 24/7 e follow-ups automatizados que nunca dormem.' },
        { icon: 'Link2', title: 'Integrações Profundas', body: 'CRM, automação de email, sistemas de pagamento, analytics — tudo conectado e conversando.' },
        { icon: 'Database', title: 'Infraestrutura Escalável', body: 'Supabase, Firebase, APIs serverless — o backend que seu produto precisa para crescer sem quebrar.' },
        { icon: 'TrendingUp', title: 'Funis Prontos para Crescer', body: 'Funis com estrutura A/B-ready, captura de leads e rastreamento de conversão embutidos.' },
      ],
    },
  },

  howItWorks: {
    badge: { en: 'The process', pt: 'O processo' },
    headline: {
      en: 'Four steps. Zero ambiguity.',
      pt: 'Quatro etapas. Zero ambiguidade.',
    },
    steps: {
      en: [
        {
          n: '01',
          title: 'Audit',
          time: 'Day 1–2',
          body: 'We analyze your current digital presence, traffic sources, funnel structure, and conversion blockers.',
          deliverables: ['Conversion audit report', 'Funnel gap analysis', 'Priority fix list'],
        },
        {
          n: '02',
          title: 'Strategy',
          time: 'Day 3–5',
          body: 'We map out the exact system needed — pages, integrations, copy architecture, and tech stack.',
          deliverables: ['Project roadmap', 'Tech stack selection', 'Copy framework'],
        },
        {
          n: '03',
          title: 'Build',
          time: 'Day 5–14',
          body: 'We build and ship. Fast. Every component is tested for speed, UX, and conversion before going live.',
          deliverables: ['Live website or funnel', 'Integrations connected', 'Performance benchmarks'],
        },
        {
          n: '04',
          title: 'Scale',
          time: 'Day 15+',
          body: 'We monitor, iterate, and expand the system as your business grows — without rebuilding from scratch.',
          deliverables: ['Monthly performance reports', 'Continuous improvements', 'Growth roadmap'],
        },
      ],
      pt: [
        {
          n: '01',
          title: 'Auditoria',
          time: 'Dia 1–2',
          body: 'Analisamos sua presença digital atual, fontes de tráfego, estrutura de funil e bloqueadores de conversão.',
          deliverables: ['Relatório de auditoria de conversão', 'Análise de gaps no funil', 'Lista de prioridades'],
        },
        {
          n: '02',
          title: 'Estratégia',
          time: 'Dia 3–5',
          body: 'Mapeamos o sistema exato necessário — páginas, integrações, arquitetura de copy e stack tecnológico.',
          deliverables: ['Roadmap do projeto', 'Seleção da stack técnica', 'Framework de copy'],
        },
        {
          n: '03',
          title: 'Construção',
          time: 'Dia 5–14',
          body: 'Construímos e entregamos. Rápido. Cada componente é testado em velocidade, UX e conversão antes de ir ao ar.',
          deliverables: ['Site ou funil no ar', 'Integrações conectadas', 'Benchmarks de performance'],
        },
        {
          n: '04',
          title: 'Escala',
          time: 'Dia 15+',
          body: 'Monitoramos, iteramos e expandimos o sistema conforme seu negócio cresce — sem reconstruir do zero.',
          deliverables: ['Relatórios mensais de performance', 'Melhorias contínuas', 'Roadmap de crescimento'],
        },
      ],
    },
  },

  services: {
    badge: { en: 'What we build', pt: 'O que construímos' },
    headline: {
      en: 'Every tool you need.\nNone you don\'t.',
      pt: 'Cada ferramenta que você precisa.\nNenhuma que você não precisa.',
    },
    sub: {
      en: 'Not a menu of random services. A cohesive system where every component works together.',
      pt: 'Não um cardápio de serviços avulsos. Um sistema coeso onde cada componente funciona junto.',
    },
    items: {
      en: [
        { label: 'Websites', desc: 'Fast, conversion-optimized, built to rank.' },
        { label: 'Landing Pages', desc: 'Single-purpose pages engineered to convert.' },
        { label: 'Sales Funnels', desc: 'Multi-step flows that guide prospects to purchase.' },
        { label: 'AI Chat Systems', desc: 'Lead qualification and support, running 24/7.' },
        { label: 'CRM Integration', desc: 'Connect your sales pipeline to everything else.' },
        { label: 'Database Setup', desc: 'Supabase, Firebase — structured for scale.' },
        { label: 'API Integrations', desc: 'Make your tools talk to each other.' },
        { label: 'Automation Systems', desc: 'Remove manual work from your growth process.' },
      ],
      pt: [
        { label: 'Sites', desc: 'Rápidos, otimizados para conversão, construídos para ranquear.' },
        { label: 'Landing Pages', desc: 'Páginas de propósito único projetadas para converter.' },
        { label: 'Funis de Vendas', desc: 'Fluxos multi-etapa que guiam prospects até a compra.' },
        { label: 'Sistemas de Chat com IA', desc: 'Qualificação de leads e suporte, funcionando 24/7.' },
        { label: 'Integração CRM', desc: 'Conecte seu pipeline de vendas a tudo mais.' },
        { label: 'Configuração de Banco de Dados', desc: 'Supabase, Firebase — estruturado para escalar.' },
        { label: 'Integrações de API', desc: 'Faça suas ferramentas se comunicarem.' },
        { label: 'Sistemas de Automação', desc: 'Remova trabalho manual do seu processo de crescimento.' },
      ],
    },
  },

  projects: {
    badge: { en: 'Selected work', pt: 'Trabalhos selecionados' },
    headline: {
      en: 'Built to perform.\nProof included.',
      pt: 'Construído para performar.\nProva incluída.',
    },
    sub: {
      en: 'Real systems shipped to production. Each one solved a specific problem for a specific founder.',
      pt: 'Sistemas reais entregues em produção. Cada um resolveu um problema específico para um founder específico.',
    },
    labels: {
      challenge: { en: 'Challenge', pt: 'Desafio' },
      built: { en: 'What we built', pt: 'O que construímos' },
      result: { en: 'Result', pt: 'Resultado' },
      viewLive: { en: 'View live', pt: 'Ver ao vivo' },
    },
    items: {
      en: [
        {
          name: 'BREQ',
          url: 'https://breq.com.br',
          domain: 'breq.com.br',
          what: 'Full digital portfolio & brand hub',
          tag: 'Portfolio & Brand Hub',
          accent: '#6c3aff',
          stack: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
          challenge: 'Needed a premium personal brand hub that generates inbound leads without relying on social media.',
          built: [
            'Custom Next.js + TypeScript site with original UI system',
            'Full on-page SEO architecture + schema markup',
            'Core Web Vitals optimization (LCP, CLS, INP)',
          ],
          results: [
            'Sub-1.5s load time across all pages',
            'Top 3 Google rankings for target keywords',
            'Inbound leads consistently, without paid ads',
          ],
        },
        {
          name: 'Desafog.ai',
          url: 'https://desafog.ai',
          domain: 'desafog.ai',
          what: 'AI-powered mental health SaaS',
          tag: 'SaaS + AI Integration',
          accent: '#00d4ff',
          stack: ['Next.js', 'Supabase', 'OpenAI', 'Stripe'],
          challenge: 'Mental health SaaS needed a full production system — AI chat, auth, billing, and a high-converting landing — from scratch.',
          built: [
            'Next.js + Supabase + Stripe full stack with auth flow',
            'AI chat integration with streaming responses',
            'Subscription billing + dashboard + emotional support flows',
          ],
          results: [
            'Production-ready in 3 weeks end-to-end',
            '24/7 AI-powered emotional support live',
            'Frictionless onboarding + recurring billing operational',
          ],
        },
      ],
      pt: [
        {
          name: 'BREQ',
          url: 'https://breq.com.br',
          domain: 'breq.com.br',
          what: 'Hub digital completo e portfólio',
          tag: 'Portfólio & Hub de Marca',
          accent: '#6c3aff',
          stack: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
          challenge: 'Precisava de um hub de marca pessoal premium que gerasse leads inbound sem depender de redes sociais.',
          built: [
            'Site custom Next.js + TypeScript com sistema de UI original',
            'Arquitetura completa de SEO on-page + schema markup',
            'Otimização de Core Web Vitals (LCP, CLS, INP)',
          ],
          results: [
            'Tempo de carga sub-1.5s em todas as páginas',
            'Top 3 no Google para keywords alvo',
            'Leads inbound consistentemente, sem paid ads',
          ],
        },
        {
          name: 'Desafog.ai',
          url: 'https://desafog.ai',
          domain: 'desafog.ai',
          what: 'SaaS de saúde mental com IA',
          tag: 'SaaS + Integração IA',
          accent: '#00d4ff',
          stack: ['Next.js', 'Supabase', 'OpenAI', 'Stripe'],
          challenge: 'SaaS de saúde mental precisava de um sistema completo em produção — chat IA, auth, billing e landing de alta conversão — do zero.',
          built: [
            'Stack completa Next.js + Supabase + Stripe com fluxo de auth',
            'Integração de chat IA com respostas em streaming',
            'Billing recorrente + dashboard + fluxos de suporte emocional',
          ],
          results: [
            'Pronto para produção em 3 semanas end-to-end',
            'Suporte emocional 24/7 com IA no ar',
            'Onboarding sem fricção + billing recorrente operacionais',
          ],
        },
      ],
    },
  },

  plans: {
    badge: { en: 'Pricing', pt: 'Planos' },
    headline: {
      en: 'Pick your level.\nUpgrade when you\'re ready.',
      pt: 'Escolha seu nível.\nFaça upgrade quando estiver pronto.',
    },
    sub: {
      en: 'From first site to full system. Every plan is the complete version of that tier — not a stripped-down upsell.',
      pt: 'Do primeiro site ao sistema completo. Cada plano é a versão completa daquele nível — não um upsell reduzido.',
    },
    guarantee: {
      en: '7-day money-back guarantee on all plans. If it\'s not right, you get a full refund.',
      pt: 'Garantia de reembolso de 7 dias em todos os planos. Se não for certo, você recebe reembolso total.',
    },
    items: {
      en: [
        {
          id: 'starter',
          name: 'Launch',
          pitch: 'Your first serious web presence. We build it, you own it, it converts from day one.',
          features: [
            'Professional website (up to 5 pages)',
            'Mobile-first responsive design',
            'On-page SEO + Google Analytics setup',
            'Lead capture form + email integration',
            'WhatsApp support (Mon–Fri)',
            '1 revision cycle per month',
          ],
          cta: 'Start with Launch',
          note: 'Cancel anytime · No long-term contract',
        },
        {
          id: 'growth',
          name: 'Scale',
          pitch: 'A complete funnel system built around your product. Pages that rank, CRM that follows up, analytics that tell the truth.',
          features: [
            'Everything in Launch',
            'High-converting landing pages',
            'Multi-step sales funnel architecture',
            'CRM + email automation integration',
            'Monthly analytics report with actionable insights',
            'Unlimited revision cycles',
            'Priority support (same-day response)',
          ],
          cta: 'Scale my business',
          note: 'Most clients see ROI within 45 days',
        },
        {
          id: 'pro',
          name: 'Dominate',
          pitch: 'The full CyberFlow stack — website, funnel, AI chat, integrations, and monthly strategy. Built to outcompete.',
          features: [
            'Everything in Scale',
            'Complete digital strategy',
            'Multiple landing pages + A/B structure',
            'AI chat system (lead qualification + support)',
            'Advanced automations + API integrations',
            'Database setup (Supabase / Firebase)',
            'Custom analytics dashboard',
            'Monthly strategy call (60 min)',
          ],
          cta: 'Go Dominate',
          note: 'Includes monthly 60-min strategy call',
        },
        {
          id: 'onetime',
          name: 'Ignite',
          pitch: 'Pay once, launch forever. Premium design, no templates, no ongoing fees.',
          features: [
            'Premium website up to 8 pages',
            'Exclusive custom design (no templates)',
            'Advanced on-page SEO',
            'Performance-guaranteed (Core Web Vitals)',
            'Payment integration (Stripe / others)',
            '30 days post-delivery support',
          ],
          cta: 'Buy the project',
          note: '30-day support · Delivered in 2–4 weeks',
        },
      ],
      pt: [
        {
          id: 'starter',
          name: 'Launch',
          pitch: 'Sua primeira presença web séria. Construímos, você é dono, e converte desde o dia um.',
          features: [
            'Site profissional (até 5 páginas)',
            'Design responsivo mobile-first',
            'SEO on-page + configuração Google Analytics',
            'Formulário de captação + integração email',
            'Suporte WhatsApp (seg–sex)',
            '1 ciclo de revisão por mês',
          ],
          cta: 'Começar com Launch',
          note: 'Cancele quando quiser · Sem contrato de longo prazo',
        },
        {
          id: 'growth',
          name: 'Scale',
          pitch: 'Um sistema de funil completo construído em torno do seu produto. Páginas que ranqueiam, CRM que faz follow-up, analytics que falam a verdade.',
          features: [
            'Tudo do Launch',
            'Landing pages de alta conversão',
            'Arquitetura de funil de vendas multi-etapa',
            'Integração CRM + automação de email',
            'Relatório mensal de analytics com insights acionáveis',
            'Ciclos de revisão ilimitados',
            'Suporte prioritário (resposta no mesmo dia)',
          ],
          cta: 'Escalar meu negócio',
          note: 'A maioria dos clientes vê ROI em 45 dias',
        },
        {
          id: 'pro',
          name: 'Dominate',
          pitch: 'O stack CyberFlow completo — site, funil, chat IA, integrações e estratégia mensal. Construído para superar a concorrência.',
          features: [
            'Tudo do Scale',
            'Estratégia digital completa',
            'Múltiplas landing pages + estrutura A/B',
            'Sistema de chat com IA (qualificação de leads + suporte)',
            'Automações avançadas + integrações API',
            'Configuração de banco de dados (Supabase / Firebase)',
            'Dashboard de analytics personalizado',
            'Reunião estratégica mensal (60 min)',
          ],
          cta: 'Ir para Dominate',
          note: 'Inclui reunião estratégica mensal de 60 min',
        },
        {
          id: 'onetime',
          name: 'Ignite',
          pitch: 'Pague uma vez, lance para sempre. Design premium, sem templates, sem taxas recorrentes.',
          features: [
            'Site premium até 8 páginas',
            'Design exclusivo personalizado (sem templates)',
            'SEO on-page avançado',
            'Performance garantida (Core Web Vitals)',
            'Integração de pagamento (Stripe / outros)',
            '30 dias de suporte pós-entrega',
          ],
          cta: 'Comprar projeto',
          note: 'Suporte de 30 dias · Entregue em 2–4 semanas',
        },
      ],
    },
  },

  cta: {
    badge: { en: 'Limited spots available', pt: 'Vagas limitadas' },
    headline: {
      en: 'Find out exactly what\'s\ncosting you conversions.',
      pt: 'Descubra exatamente o que está\ncustando suas conversões.',
    },
    sub: {
      en: 'Tell us about your business. We\'ll review your current digital presence and tell you exactly what\'s costing you conversions — no pitch, no obligation.',
      pt: 'Fale sobre seu negócio. Revisaremos sua presença digital atual e diremos exatamente o que está custando suas conversões — sem pitch, sem obrigação.',
    },
    what_happens: {
      en: ['You submit the form', 'We audit your digital presence', 'You receive a specific action plan — free'],
      pt: ['Você envia o formulário', 'Auditamos sua presença digital', 'Você recebe um plano de ação específico — grátis'],
    },
    social_proof: {
      en: 'We\'ve audited 40+ digital presences. We know what to look for.',
      pt: 'Já auditamos 40+ presenças digitais. Sabemos o que procurar.',
    },
    fields: {
      name: { en: 'Full name', pt: 'Nome completo' },
      email: { en: 'Work email', pt: 'Email de trabalho' },
      phone: { en: 'WhatsApp', pt: 'WhatsApp' },
      website: { en: 'Current website (optional)', pt: 'Site atual (opcional)' },
      challenge: { en: 'Main challenge', pt: 'Principal desafio' },
    },
    challenge_options: {
      en: [
        'My website doesn\'t convert',
        'I need a sales funnel',
        'I need automation / AI chat',
        'I\'m launching a product',
        'I need technical infrastructure',
      ],
      pt: [
        'Meu site não converte',
        'Preciso de um funil de vendas',
        'Preciso de automação / chat com IA',
        'Estou lançando um produto',
        'Preciso de infraestrutura técnica',
      ],
    },
    submit: { en: 'Request my free audit →', pt: 'Quero minha auditoria gratuita →' },
    micro: {
      en: 'We respond in under 24h. No spam, ever.',
      pt: 'Respondemos em menos de 24h. Sem spam.',
    },
    sent_title: { en: 'Request received.', pt: 'Solicitação recebida.' },
    sent_body: {
      en: 'We\'ll review your presence and reach out within 24 hours with your audit. Watch your inbox — we\'ll reply from hello@cyberflow.io',
      pt: 'Revisaremos sua presença e entraremos em contato em até 24 horas com sua auditoria. Fique de olho na sua caixa — responderemos de hello@cyberflow.io',
    },
    trust: {
      en: ['Your data stays private', 'No commitment required', 'Response under 24 hours'],
      pt: ['Seus dados ficam privados', 'Sem compromisso', 'Resposta em menos de 24 horas'],
    },
  },

  footer: {
    tagline: {
      en: 'Built for businesses that can\'t afford to blend in.',
      pt: 'Feito para negócios que não podem se dar ao luxo de parecer comuns.',
    },
    links: {
      en: ['How it works', 'Services', 'Work', 'Pricing'],
      pt: ['Como funciona', 'Serviços', 'Projetos', 'Planos'],
    },
    copy: { en: 'All rights reserved.', pt: 'Todos os direitos reservados.' },
  },

  dashboard: {
    overview: {
      title: { en: 'Overview', pt: 'Visão Geral' },
      greeting: { en: 'Hello', pt: 'Olá' },
      plan: { en: 'Current plan', pt: 'Plano atual' },
      status: { en: 'Status', pt: 'Status' },
      memberSince: { en: 'Member since', pt: 'Membro desde' },
      projectStatus: { en: 'Project progress', pt: 'Progresso do projeto' },
    },
    nav: {
      overview: { en: 'Overview', pt: 'Visão Geral' },
      progress: { en: 'Progress', pt: 'Progresso' },
      invoices: { en: 'Invoices', pt: 'Faturas' },
      messages: { en: 'Messages', pt: 'Mensagens' },
      profile: { en: 'Profile', pt: 'Perfil' },
      logout: { en: 'Log out', pt: 'Sair' },
    },
    progress: {
      title: { en: 'Project progress', pt: 'Progresso do projeto' },
      note: { en: 'Team note', pt: 'Nota da equipe' },
      stages: {
        briefing: { en: 'Briefing', pt: 'Briefing' },
        design: { en: 'Design', pt: 'Design' },
        development: { en: 'Development', pt: 'Desenvolvimento' },
        review: { en: 'Review', pt: 'Revisão' },
        delivered: { en: 'Delivered', pt: 'Entregue' },
      },
      empty: { en: 'No project started yet.', pt: 'Nenhum projeto iniciado ainda.' },
    },
    invoices: {
      title: { en: 'Invoices', pt: 'Faturas' },
      date: { en: 'Date', pt: 'Data' },
      amount: { en: 'Amount', pt: 'Valor' },
      status: { en: 'Status', pt: 'Status' },
      pdf: { en: 'PDF', pt: 'PDF' },
      paid: { en: 'Paid', pt: 'Pago' },
      open: { en: 'Pending', pt: 'Pendente' },
      uncollectible: { en: 'Overdue', pt: 'Vencido' },
      empty: { en: 'No invoices yet.', pt: 'Nenhuma fatura ainda.' },
      noStripe: { en: 'Billing not configured yet. Contact us.', pt: 'Faturamento ainda não configurado. Entre em contato.' },
    },
    messages: {
      title: { en: 'Messages', pt: 'Mensagens' },
      subtitle: { en: 'Direct communication with the CyberFlow team.', pt: 'Comunicação direta com a equipe CyberFlow.' },
      placeholder: { en: 'Write your message…', pt: 'Escreva sua mensagem…' },
      send: { en: 'Send', pt: 'Enviar' },
      teamLabel: { en: 'CyberFlow', pt: 'CyberFlow' },
      youLabel: { en: 'You', pt: 'Você' },
      empty: { en: 'No messages yet. Send us a message!', pt: 'Nenhuma mensagem ainda. Nos envie uma mensagem!' },
    },
    profile: {
      title: { en: 'Profile', pt: 'Perfil' },
      subtitle: { en: 'Update your contact information.', pt: 'Atualize suas informações de contato.' },
      name: { en: 'Full name', pt: 'Nome completo' },
      company: { en: 'Company name', pt: 'Nome da empresa' },
      email: { en: 'Email', pt: 'Email' },
      phone: { en: 'Phone', pt: 'Telefone' },
      country: { en: 'Country', pt: 'País' },
      save: { en: 'Save changes', pt: 'Salvar alterações' },
      saved: { en: 'Saved!', pt: 'Salvo!' },
      saving: { en: 'Saving…', pt: 'Salvando…' },
    },
  },

  cookie: {
    message: {
      en: 'We use cookies to improve your experience. By continuing, you agree to our Privacy Policy.',
      pt: 'Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa Política de Privacidade.',
    },
    accept: { en: 'Accept cookies', pt: 'Aceitar cookies' },
    decline: { en: 'Decline', pt: 'Recusar' },
  },
};

export const t = (obj: { en: string; pt: string }, lang: Lang): string => obj[lang];
export const tArr = <T,>(obj: { en: T[]; pt: T[] }, lang: Lang): T[] => obj[lang];
export const tObj = <T,>(obj: { en: T; pt: T }, lang: Lang): T => obj[lang];
