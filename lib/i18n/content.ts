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
      en: 'Digital infrastructure for growing businesses',
      pt: 'Infraestrutura digital para negócios em crescimento',
    },
    headline: {
      en: 'Your traffic is ready.\nYour website isn\'t.',
      pt: 'Seu tráfego está pronto.\nSeu site não está.',
    },
    sub: {
      en: 'CyberFlow builds the digital systems that turn visitors into paying customers — websites, funnels, AI chat, CRM integrations, and scalable infrastructure.',
      pt: 'CyberFlow constrói os sistemas digitais que transformam visitantes em clientes — sites, funis, chat com IA, integrações CRM e infraestrutura escalável.',
    },
    cta1: { en: 'Get a free audit →', pt: 'Quero auditoria gratuita →' },
    cta2: { en: 'See our work', pt: 'Ver projetos' },
    trust: {
      en: ['No contracts. Cancel anytime.', 'Reply in under 24h', 'Direct access to the founder'],
      pt: ['Sem contratos. Cancele quando quiser.', 'Resposta em até 24h', 'Acesso direto ao fundador'],
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
      en: 'One system.\nBuilt to convert.',
      pt: 'Um sistema.\nFeito para converter.',
    },
    sub: {
      en: 'We don\'t just build websites. We build the complete digital infrastructure that makes your business run — and grow — on autopilot.',
      pt: 'Não apenas construímos sites. Construímos a infraestrutura digital completa que faz seu negócio funcionar — e crescer — no piloto automático.',
    },
    pillars: {
      en: [
        { icon: '⚡', title: 'Speed & Performance', body: 'Sub-2s load times, optimized Core Web Vitals, and mobile-first architecture that Google rewards.' },
        { icon: '🎯', title: 'Conversion Architecture', body: 'Every page is built around a specific action. Copy, layout, and flow designed to move people forward.' },
        { icon: '🤖', title: 'AI-Powered Systems', body: 'AI chat for lead qualification, 24/7 support, and automated follow-ups that never sleep.' },
        { icon: '🔗', title: 'Deep Integrations', body: 'CRM, email automation, payment systems, analytics — everything connected and talking to each other.' },
        { icon: '🗄️', title: 'Scalable Infrastructure', body: 'Supabase, Firebase, serverless APIs — the backend your product needs to grow without breaking.' },
        { icon: '📈', title: 'Growth-Ready Funnels', body: 'Multi-step funnels with A/B-ready structure, lead capture, and conversion tracking baked in.' },
      ],
      pt: [
        { icon: '⚡', title: 'Velocidade & Performance', body: 'Carregamento abaixo de 2s, Core Web Vitals otimizados e arquitetura mobile-first que o Google recompensa.' },
        { icon: '🎯', title: 'Arquitetura de Conversão', body: 'Cada página é construída em torno de uma ação específica. Copy, layout e fluxo projetados para avançar.' },
        { icon: '🤖', title: 'Sistemas com IA', body: 'Chat com IA para qualificação de leads, suporte 24/7 e follow-ups automatizados que nunca dormem.' },
        { icon: '🔗', title: 'Integrações Profundas', body: 'CRM, automação de email, sistemas de pagamento, analytics — tudo conectado e conversando.' },
        { icon: '🗄️', title: 'Infraestrutura Escalável', body: 'Supabase, Firebase, APIs serverless — o backend que seu produto precisa para crescer sem quebrar.' },
        { icon: '📈', title: 'Funis Prontos para Crescer', body: 'Funis com estrutura A/B-ready, captura de leads e rastreamento de conversão embutidos.' },
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
          body: 'We analyze your current digital presence, traffic sources, funnel structure, and conversion blockers.',
          deliverables: ['Conversion audit report', 'Funnel gap analysis', 'Priority fix list'],
        },
        {
          n: '02',
          title: 'Strategy',
          body: 'We map out the exact system needed — pages, integrations, copy architecture, and tech stack.',
          deliverables: ['Project roadmap', 'Tech stack selection', 'Copy framework'],
        },
        {
          n: '03',
          title: 'Build',
          body: 'We build and ship. Fast. Every component is tested for speed, UX, and conversion before going live.',
          deliverables: ['Live website or funnel', 'Integrations connected', 'Performance benchmarks'],
        },
        {
          n: '04',
          title: 'Scale',
          body: 'We monitor, iterate, and expand the system as your business grows — without rebuilding from scratch.',
          deliverables: ['Monthly performance reports', 'Continuous improvements', 'Growth roadmap'],
        },
      ],
      pt: [
        {
          n: '01',
          title: 'Auditoria',
          body: 'Analisamos sua presença digital atual, fontes de tráfego, estrutura de funil e bloqueadores de conversão.',
          deliverables: ['Relatório de auditoria de conversão', 'Análise de gaps no funil', 'Lista de prioridades'],
        },
        {
          n: '02',
          title: 'Estratégia',
          body: 'Mapeamos o sistema exato necessário — páginas, integrações, arquitetura de copy e stack tecnológico.',
          deliverables: ['Roadmap do projeto', 'Seleção da stack técnica', 'Framework de copy'],
        },
        {
          n: '03',
          title: 'Construção',
          body: 'Construímos e entregamos. Rápido. Cada componente é testado em velocidade, UX e conversão antes de ir ao ar.',
          deliverables: ['Site ou funil no ar', 'Integrações conectadas', 'Benchmarks de performance'],
        },
        {
          n: '04',
          title: 'Escala',
          body: 'Monitoramos, iteramos e expandimos o sistema conforme seu negócio cresce — sem reconstruir do zero.',
          deliverables: ['Relatórios mensais de performance', 'Melhorias contínuas', 'Roadmap de crescimento'],
        },
      ],
    },
  },

  services: {
    badge: { en: 'What we build', pt: 'O que construímos' },
    headline: {
      en: 'Every piece of your\ndigital system.',
      pt: 'Cada peça do seu\nsistema digital.',
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
    items: {
      en: [
        {
          name: 'BREQ',
          url: 'https://breq.com.br',
          what: 'Full digital portfolio & hub',
          stack: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
          objective: 'Create a premium personal brand hub that converts visitors into clients and showcases work with impact.',
          outcome: 'Strong brand authority, fast load times, SEO-optimized — generating inbound leads consistently.',
          tag: 'Portfolio & Brand Hub',
          emoji: '🚀',
          accent: '#6c3aff',
        },
        {
          name: 'Desafog.ai',
          url: 'https://desafog.ai',
          what: 'AI-powered mental health SaaS',
          stack: ['Next.js', 'Supabase', 'OpenAI', 'Stripe'],
          objective: 'Build a scalable SaaS with AI-driven emotional support, frictionless onboarding, and recurring payments.',
          outcome: 'High-converting landing, smooth auth + billing flow, AI chat fully integrated and production-ready.',
          tag: 'SaaS + AI Integration',
          emoji: '🧠',
          accent: '#00d4ff',
        },
      ],
      pt: [
        {
          name: 'BREQ',
          url: 'https://breq.com.br',
          what: 'Hub digital completo e portfólio',
          stack: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
          objective: 'Criar um hub de marca pessoal premium que converte visitantes em clientes e apresenta trabalhos com impacto.',
          outcome: 'Autoridade de marca forte, carregamento rápido, SEO otimizado — gerando leads inbound consistentemente.',
          tag: 'Portfólio & Hub de Marca',
          emoji: '🚀',
          accent: '#6c3aff',
        },
        {
          name: 'Desafog.ai',
          url: 'https://desafog.ai',
          what: 'SaaS de saúde mental com IA',
          stack: ['Next.js', 'Supabase', 'OpenAI', 'Stripe'],
          objective: 'Construir um SaaS escalável com suporte emocional por IA, onboarding sem fricção e pagamentos recorrentes.',
          outcome: 'Landing de alta conversão, fluxo de auth + billing fluido, chat IA totalmente integrado e pronto para produção.',
          tag: 'SaaS + Integração IA',
          emoji: '🧠',
          accent: '#00d4ff',
        },
      ],
    },
  },

  plans: {
    badge: { en: 'Pricing', pt: 'Planos' },
    headline: {
      en: 'Clear pricing.\nNo surprises.',
      pt: 'Preços claros.\nSem surpresas.',
    },
    sub: {
      en: 'No retainers forced on you. No hidden fees. Pick what fits, upgrade when you\'re ready.',
      pt: 'Sem contratos forçados. Sem taxas ocultas. Escolha o que serve, faça upgrade quando estiver pronto.',
    },
    guarantee: {
      en: '7-day money-back guarantee on all plans. If it\'s not right, you get a full refund.',
      pt: 'Garantia de reembolso de 7 dias em todos os planos. Se não for certo, você recebe reembolso total.',
    },
    items: {
      en: [
        {
          id: 'starter',
          name: 'Starter',
          price: '$297',
          period: '/ month',
          pitch: 'For businesses that need a solid, fast, converting presence — built right the first time.',
          features: [
            'Professional website (up to 5 pages)',
            'Mobile-first responsive design',
            'On-page SEO + Google Analytics setup',
            'Lead capture form + email integration',
            'WhatsApp support (Mon–Fri)',
            '1 revision cycle per month',
          ],
          cta: 'Start with Starter',
          note: 'Best for: Freelancers, solo founders, service businesses',
        },
        {
          id: 'growth',
          name: 'Growth',
          price: '$597',
          period: '/ month',
          pitch: 'For businesses ready to build a real funnel — not just a website.',
          features: [
            'Everything in Starter',
            'High-converting landing pages',
            'Multi-step sales funnel architecture',
            'CRM + email automation integration',
            'Monthly analytics report with actionable insights',
            'Unlimited revision cycles',
            'Priority support (same-day response)',
          ],
          cta: 'Scale with Growth',
          note: 'Best for: Startups, online services, course creators',
        },
        {
          id: 'pro',
          name: 'Pro',
          price: '$1,197',
          period: '/ month',
          pitch: 'For serious businesses that want the full system — built, integrated, and optimized.',
          features: [
            'Everything in Growth',
            'Complete digital strategy',
            'Multiple landing pages + A/B structure',
            'AI chat system (lead qualification + support)',
            'Advanced automations + API integrations',
            'Database setup (Supabase / Firebase)',
            'Custom analytics dashboard',
            'Monthly strategy call (60 min)',
          ],
          cta: 'Go Pro',
          note: 'Best for: SaaS, e-commerce, growing teams',
        },
        {
          id: 'onetime',
          name: 'One-Time',
          price: '$1,997',
          period: 'one payment',
          pitch: 'One project. Fully delivered. No monthly commitment.',
          features: [
            'Premium website up to 8 pages',
            'Exclusive custom design (no templates)',
            'Advanced on-page SEO',
            'Performance-guaranteed (Core Web Vitals)',
            'Payment integration (Stripe / others)',
            '30 days post-delivery support',
          ],
          cta: 'Buy the project',
          note: 'Best for: Established businesses, product launches',
        },
      ],
      pt: [
        {
          id: 'starter',
          name: 'Starter',
          price: 'R$ 297',
          period: '/ mês',
          pitch: 'Para empresas que precisam de uma presença sólida, rápida e que converte — feita certo desde o início.',
          features: [
            'Site profissional (até 5 páginas)',
            'Design responsivo mobile-first',
            'SEO on-page + configuração Google Analytics',
            'Formulário de captação + integração email',
            'Suporte WhatsApp (seg–sex)',
            '1 ciclo de revisão por mês',
          ],
          cta: 'Começar com Starter',
          note: 'Ideal para: Freelancers, fundadores solo, serviços',
        },
        {
          id: 'growth',
          name: 'Growth',
          price: 'R$ 597',
          period: '/ mês',
          pitch: 'Para empresas prontas para construir um funil real — não apenas um site.',
          features: [
            'Tudo do Starter',
            'Landing pages de alta conversão',
            'Arquitetura de funil de vendas multi-etapa',
            'Integração CRM + automação de email',
            'Relatório mensal de analytics com insights acionáveis',
            'Ciclos de revisão ilimitados',
            'Suporte prioritário (resposta no mesmo dia)',
          ],
          cta: 'Escalar com Growth',
          note: 'Ideal para: Startups, serviços online, criadores de cursos',
        },
        {
          id: 'pro',
          name: 'Pro',
          price: 'R$ 1.197',
          period: '/ mês',
          pitch: 'Para negócios sérios que querem o sistema completo — construído, integrado e otimizado.',
          features: [
            'Tudo do Growth',
            'Estratégia digital completa',
            'Múltiplas landing pages + estrutura A/B',
            'Sistema de chat com IA (qualificação de leads + suporte)',
            'Automações avançadas + integrações API',
            'Configuração de banco de dados (Supabase / Firebase)',
            'Dashboard de analytics personalizado',
            'Reunião estratégica mensal (60 min)',
          ],
          cta: 'Ir para Pro',
          note: 'Ideal para: SaaS, e-commerce, equipes em crescimento',
        },
        {
          id: 'onetime',
          name: 'Único',
          price: 'R$ 1.997',
          period: 'pagamento único',
          pitch: 'Um projeto. Totalmente entregue. Sem compromisso mensal.',
          features: [
            'Site premium até 8 páginas',
            'Design exclusivo personalizado (sem templates)',
            'SEO on-page avançado',
            'Performance garantida (Core Web Vitals)',
            'Integração de pagamento (Stripe / outros)',
            '30 dias de suporte pós-entrega',
          ],
          cta: 'Comprar projeto',
          note: 'Ideal para: Empresas estabelecidas, lançamentos de produto',
        },
      ],
    },
  },

  cta: {
    badge: { en: 'Limited spots available', pt: 'Vagas limitadas' },
    headline: {
      en: 'Stop guessing.\nGet a free audit.',
      pt: 'Pare de adivinhar.\nReceba uma auditoria gratuita.',
    },
    sub: {
      en: 'Tell us about your business. We\'ll review your current digital presence and tell you exactly what\'s costing you conversions — no pitch, no obligation.',
      pt: 'Fale sobre seu negócio. Revisaremos sua presença digital atual e diremos exatamente o que está custando suas conversões — sem pitch, sem obrigação.',
    },
    what_happens: {
      en: ['You submit the form', 'We audit your digital presence', 'You receive a specific action plan — free'],
      pt: ['Você envia o formulário', 'Auditamos sua presença digital', 'Você recebe um plano de ação específico — grátis'],
    },
    fields: {
      name: { en: 'Full name', pt: 'Nome completo' },
      email: { en: 'Work email', pt: 'Email de trabalho' },
      phone: { en: 'WhatsApp', pt: 'WhatsApp' },
      website: { en: 'Current website (optional)', pt: 'Site atual (opcional)' },
    },
    submit: { en: 'Request my free audit →', pt: 'Quero minha auditoria gratuita →' },
    micro: {
      en: 'We respond in under 24h. No spam, ever.',
      pt: 'Respondemos em menos de 24h. Sem spam.',
    },
    sent_title: { en: 'Request received.', pt: 'Solicitação recebida.' },
    sent_body: {
      en: 'We\'ll review your presence and reach out within 24 hours with your audit.',
      pt: 'Revisaremos sua presença e entraremos em contato em até 24 horas com sua auditoria.',
    },
    trust: {
      en: ['🔒 Your data stays private', '✓ No commitment required', '⚡ Response under 24 hours'],
      pt: ['🔒 Seus dados ficam privados', '✓ Sem compromisso', '⚡ Resposta em menos de 24 horas'],
    },
  },

  footer: {
    tagline: { en: 'Digital infrastructure that converts.', pt: 'Infraestrutura digital que converte.' },
    links: {
      en: ['How it works', 'Services', 'Work', 'Pricing', 'Portfolio'],
      pt: ['Como funciona', 'Serviços', 'Projetos', 'Planos', 'Portfólio'],
    },
    copy: { en: 'All rights reserved.', pt: 'Todos os direitos reservados.' },
  },
};

export const t = (obj: { en: string; pt: string }, lang: Lang): string => obj[lang];
export const tArr = <T,>(obj: { en: T[]; pt: T[] }, lang: Lang): T[] => obj[lang];
