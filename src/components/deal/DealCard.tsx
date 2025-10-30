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
        'group', // Enable group-hover utilities
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

      {/* Content - Enhanced with description and visual hierarchy */}
      <div className="relative flex flex-col items-center justify-center px-8 py-16 md:py-20 min-h-[320px] md:min-h-[380px]">
        {/* Icon/Visual Element */}
        <div className={classNames(
          'mb-6 w-16 h-16 rounded-2xl flex items-center justify-center',
          'border-2 transition-all duration-300',
          variant === 'new' ? 'border-mauve-700/20 bg-mauve-700/5' : 'border-neutral-800/20 bg-neutral-800/5',
          'group-hover:scale-110'
        )}>
          {variant === 'new' ? (
            <svg className="w-8 h-8 text-mauve-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
        </div>

        {/* Title */}
        <h2 className={classNames(
          'text-3xl md:text-4xl font-medium tracking-tight',
          'text-neutral-900 mb-3',
          'transition-colors duration-300',
        )}>
          {config.title}
        </h2>

        {/* Description */}
        <p className={classNames(
          'text-base md:text-lg text-neutral-600',
          'text-center max-w-[280px]',
          'leading-relaxed'
        )}>
          {variant === 'new'
            ? 'Start a new funding application and get instant quotes'
            : 'View and manage your active funding deals'}
        </p>

        {/* Action indicator */}
        <div className={classNames(
          'mt-6 flex items-center gap-2',
          'text-sm font-medium transition-all duration-300',
          variant === 'new' ? 'text-mauve-700' : 'text-neutral-800',
        )}>
          <span>Continue</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
