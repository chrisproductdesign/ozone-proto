import React from 'react';
import { Settings } from 'lucide-react';
import { ButtonBaseUIWrapper } from '@/components/button/ButtonBaseUIWrapper';

export interface CompositeScoreCardProps {
  grade: 'A' | 'B' | 'C' | 'D';
  description: string;
  onSettingsClick?: () => void;
  className?: string;
}

// Grade color variants
const gradeColors = {
  A: {
    gradient: 'from-[#02B948] to-[#009989]',
  },
  B: {
    gradient: 'from-[#2bb8aa] to-[#10a36d]',
  },
  C: {
    gradient: 'from-[#b8b028] to-[#78a010]',
  },
  D: {
    gradient: 'from-[#b88c28] to-[#a09910]',
  },
};

/**
 * CompositeScoreCard - Visually layered scorecard with gradient background
 *
 * Features:
 * - Three layered letter grades at different sizes and opacities
 * - Grade-specific gradient backgrounds (A/B/C/D)
 * - Settings button in top right
 * - Dynamic grade and description
 *
 * Design matches Figma spec exactly with precise positioning and layering
 *
 * @example
 * <CompositeScoreCard
 *   grade="A"
 *   description="Strong revenue predictability"
 *   onSettingsClick={() => console.log('Settings')}
 * />
 */
export const CompositeScoreCard: React.FC<CompositeScoreCardProps> = ({
  grade,
  description,
  onSettingsClick,
  className = '',
}) => {
  const colors = gradeColors[grade];

  return (
    <div className={`relative bg-gradient-to-r ${colors.gradient} rounded-lg overflow-clip flex flex-col justify-center items-start w-full max-w-[1000px] ${className}`}>
      {/* Subtle texture artifacts */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tl from-white/3 via-transparent to-transparent pointer-events-none" />

      {/* Content foreground - first child, relative positioned */}
      <div className="box-border flex gap-[24px] items-start px-[24px] py-[32px] w-full shrink-0">
        <div className="flex flex-1 gap-[24px] items-center min-w-0">
          {/* Foreground A */}
          <div className="flex flex-col h-[93px] w-[91px] justify-center leading-[0] text-[length:var(--text-grade-overlay)] font-bold text-[rgba(255,255,255,0.8)] shrink-0" style={{ mixBlendMode: 'overlay' }}>
            <p className="leading-normal whitespace-pre-wrap">{grade}</p>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-[8px] h-[38px] items-start justify-center shrink-0">
            <div className="flex flex-col justify-center leading-[0] text-[28px] font-semibold text-black/50 whitespace-nowrap shrink-0">
              <p className="leading-normal">{description}</p>
            </div>
          </div>
        </div>

        {/* Icon button */}
        <div className="flex flex-col items-center justify-center p-[5px] rounded-[100px] shrink-0">
          <ButtonBaseUIWrapper
            variant="ghost"
            size="icon-lg"
            onClick={onSettingsClick}
            aria-label="Settings"
            className="p-0"
          >
            <Settings className="w-[35px] h-[35px] text-primary" />
          </ButtonBaseUIWrapper>
        </div>
      </div>

      {/* Background A #2 - 10% opacity, 332px */}
      <div className="absolute left-[70px] top-[calc(50%+0.5px)] -translate-y-1/2 flex h-[154px] items-center justify-center overflow-clip gap-[10px]">
        <div className="flex flex-col justify-center leading-[0] text-[length:var(--text-grade-bg-sm)] font-bold text-[rgba(255,255,255,0.1)] whitespace-nowrap shrink-0">
          <p className="leading-normal">{grade}</p>
        </div>
      </div>

      {/* Background A #3 - 8% opacity, 450px */}
      <div className="absolute left-[calc(50%+0.5px)] top-[calc(50%+0.5px)] -translate-x-1/2 -translate-y-1/2 flex h-[154px] items-center justify-center overflow-clip gap-[10px]">
        <div className="flex flex-col justify-center leading-[0] text-[length:var(--text-grade-bg-lg)] font-bold text-[rgba(255,255,255,0.08)] whitespace-nowrap shrink-0">
          <p className="leading-normal">{grade}</p>
        </div>
      </div>
    </div>
  );
};
