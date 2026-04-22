'use client';

import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[#6c3aff] hover:bg-[#5a2ee0] text-white shadow-[0_0_20px_rgba(108,58,255,0.4)] hover:shadow-[0_0_30px_rgba(108,58,255,0.6)] border border-[#6c3aff]',
  secondary:
    'bg-[#00d4ff] hover:bg-[#00b8e0] text-[#050510] font-semibold shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]',
  ghost:
    'bg-transparent hover:bg-white/5 text-[#f0f0ff] border border-transparent hover:border-white/10',
  outline:
    'bg-transparent border border-[#6c3aff]/60 text-[#f0f0ff] hover:bg-[#6c3aff]/10 hover:border-[#6c3aff]',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
}

export const LinkButton = ({ variant = 'primary', size = 'md', className = '', children, ...props }: LinkButtonProps) => (
  <a
    className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    {...props}
  >
    {children}
  </a>
);
