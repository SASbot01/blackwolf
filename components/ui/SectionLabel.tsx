interface SectionLabelProps {
  children: string;
  light?: boolean;
  variant?: 'default' | 'dark';
}

export default function SectionLabel({ children, light = false, variant = 'default' }: SectionLabelProps) {
  const colorClass = variant === 'dark' ? 'text-gray-500' : light ? 'text-gray-600' : 'text-gray-400';

  return (
    <span
      className={`text-xs font-semibold uppercase tracking-[0.15em] ${colorClass}`}
    >
      {children}
    </span>
  );
}
