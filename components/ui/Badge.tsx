interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'surface';
  className?: string;
}

export const Badge = ({ children, variant = 'primary', className = '' }: BadgeProps) => {
  const styles = {
    primary: 'bg-[#6c3aff]/20 text-[#a47aff] border border-[#6c3aff]/30',
    accent: 'bg-[#00d4ff]/15 text-[#00d4ff] border border-[#00d4ff]/30',
    surface: 'bg-white/5 text-[#f0f0ff]/70 border border-white/10',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};
