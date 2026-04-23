'use client';
import dynamic from 'next/dynamic';

const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false });

export default function LanyardWidget() {
  return (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden bg-[#050510]/60">
      <Lanyard position={[0, 0, 24]} gravity={[0, -40, 0]} fov={20} transparent />
    </div>
  );
}
