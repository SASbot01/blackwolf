'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'inverted';
  size?: 'default' | 'large';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-body text-xs font-semibold uppercase tracking-[0.1em] rounded-[2px] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2';

  const sizeStyles = {
    default: 'px-8 py-3',
    large: 'px-10 py-4 text-sm',
  };

  const variantStyles = {
    primary:
      'bg-white text-black hover:bg-gray-200 focus-visible:outline-white',
    outline:
      'bg-transparent text-white border border-white hover:bg-white hover:text-black focus-visible:outline-white',
    inverted:
      'bg-black text-white hover:bg-gray-800 focus-visible:outline-black',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
