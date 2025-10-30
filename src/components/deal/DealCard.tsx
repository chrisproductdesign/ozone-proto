import React from 'react';
import { classNames } from '@/lib/classNames';

export type DealCardVariant = 'new' | 'existing';

interface DealCardProps {
  variant: DealCardVariant;
  onClick?: () => void;
  className?: string;
}

const variantConfig: Record<DealCardVariant, {
  title: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  hoverBorder: string;
  hoverShadow: string;
}> = {
  new: {
    title: 'New deal',
    accentColor: 'mauve-700',
    gradientFrom: 'rgba(89, 76, 86, 0.03)',
    gradientTo: 'rgba(254, 253, 252, 0)',
    hoverBorder: 'border-mauve-700',
    hoverShadow: 'shadow-[0_12px_40px_rgba(89,76,86,0.15)]',
  },
  existing: {
    title: 'Existing deal',
    accentColor: 'neutral-800',
    gradientFrom: 'rgba(93, 91, 89, 0.03)',
    gradientTo: 'rgba(254, 253, 252, 0)',
    hoverBorder: 'border-neutral-800',
    hoverShadow: 'shadow-[0_12px_40px_rgba(93,91,89,0.15)]',
  },
};

export function DealCard({
  variant,
  onClick,
  className,
}: DealCardProps) {
  const config = variantConfig[variant];

  // Assign unique view-transition-name via CSS class
  const transitionClass = variant === 'new'
    ? 'view-transition-new-deal-card'
    : 'view-transition-existing-deal-card';

  return (
    <button
      onClick={onClick}
      className={classNames(
        transitionClass,
        // Base styles - Fintech Professional aesthetic
        'relative w-full overflow-hidden',
        'rounded-3xl bg-white',
        'border border-neutral-200',
        'transition-all duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-mauve-700 focus-visible:ring-offset-2',

        // Refined hover state with subtle lift and enhanced shadow
        'hover:-translate-y-0.5',
        `hover:${config.hoverBorder}`,
        `hover:${config.hoverShadow}`,

        className
      )}
      aria-label={config.title}
    >
      {/* Subtle radial gradient background - "Fintech Serenity" philosophy */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${variant === 'new' ? '30% 40%' : '70% 60%'}, ${config.gradientFrom}, ${config.gradientTo} 70%)`
        }}
      />

      {/* Fine grain texture overlay - barely perceptible */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Content - Title only, centered */}
      <div className="relative flex items-center justify-center px-12 py-20 md:py-24 min-h-[320px] md:min-h-[380px]">
        <h2 className={classNames(
          'text-3xl md:text-4xl font-medium tracking-tight',
          'text-neutral-900',
          'transition-colors duration-300',
        )}>
          {config.title}
        </h2>
      </div>
    </button>
  );
}
