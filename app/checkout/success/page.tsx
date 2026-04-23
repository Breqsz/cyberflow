import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Payment confirmed — CyberFlow',
  description: 'Your payment has been confirmed. Welcome to CyberFlow.',
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center px-6 relative overflow-hidden">
      {/* ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#6c3aff]/15 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-[#00d4ff]/10 blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-10">
          <span className="text-xl font-bold text-white">
            Cyber<span className="text-[#6c3aff]">Flow</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
        </Link>

        <div className="bg-[#0d0d1a] border border-[#6c3aff]/20 rounded-2xl p-10 shadow-[0_0_60px_rgba(108,58,255,0.15)]">
          <div className="w-20 h-20 rounded-full bg-[#00d4ff]/15 border-2 border-[#00d4ff]/40 flex items-center justify-center mx-auto mb-6 animate-pulse-accent">
            <Check className="w-10 h-10 text-[#00d4ff]" strokeWidth={3} />
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">
            Payment confirmed.
          </h1>
          <p className="text-[#f0f0ff]/65 leading-relaxed mb-8">
            Welcome aboard. We&apos;ll reach out within 24 hours to kick off your project.
          </p>

          <div className="space-y-3 text-left bg-[#050510] border border-white/8 rounded-xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#6c3aff]/20 border border-[#6c3aff]/30 flex items-center justify-center shrink-0 text-[11px] font-mono font-bold text-[#a47aff]">1</span>
              <p className="text-[#f0f0ff]/75 text-sm">Check your inbox for a confirmation email.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#6c3aff]/20 border border-[#6c3aff]/30 flex items-center justify-center shrink-0 text-[11px] font-mono font-bold text-[#a47aff]">2</span>
              <p className="text-[#f0f0ff]/75 text-sm">We&apos;ll schedule a 30-min kickoff call this week.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#6c3aff]/20 border border-[#6c3aff]/30 flex items-center justify-center shrink-0 text-[11px] font-mono font-bold text-[#a47aff]">3</span>
              <p className="text-[#f0f0ff]/75 text-sm">Work begins once your brief is finalized.</p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#a47aff] hover:text-white transition-colors"
          >
            Back to CyberFlow
            <ArrowRight className="w-4 h-4" />
          </Link>

          {session_id && (
            <p className="mt-6 text-[10px] font-mono text-[#f0f0ff]/20 break-all">
              Ref: {session_id}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
