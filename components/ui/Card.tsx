'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlighted';
  dark?: boolean;
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  dark = true,
}: CardProps) {
  const borderStyle =
    variant === 'highlighted'
      ? 'border-white'
      : dark
        ? 'border-gray-800'
        : 'border-gray-200';

  return (
    <div
      className={`rounded-[2px] border p-8 transition-all duration-250 hover:-translate-y-1 hover:shadow-lg ${
        dark ? 'hover:shadow-white/5' : 'hover:shadow-black/5'
      } ${borderStyle} ${className}`}
    >
      {children}
    </div>
  );
}
