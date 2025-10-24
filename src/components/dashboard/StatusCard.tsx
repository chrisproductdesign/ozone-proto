import React from 'react';
import { classNames } from '@/lib/classNames';

// Figma texture and icon assets
const TEXTURE_IMAGE = 'https://www.figma.com/api/mcp/asset/3aed26fa-c22f-442e-ad95-d10da80f7979';
const SPARKLES_ICON = 'https://www.figma.com/api/mcp/asset/21f03096-1c97-49aa-855d-52d9859d43ef';

export type StatusLevel = 'stable' | 'moderate' | 'critical';

export interface StatusCardProps {
  /**
   * The status level determining the color scheme
   * @default 'stable'
   */
  status?: StatusLevel;
  /**
   * The main title/heading
   */
  title: string;
  /**
   * Description text
   */
  description: string;
  /**
   * AI confidence score (0-100)
   */
  confidenceScore: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * StatusCard - Neo-glassmorphism card with mesh gradient background
 *
 * Features:
 * - Mesh gradient background (green/orange/red variants)
 * - Glassmorphism overlay layer
 * - Floating confidence badge
 * - Responsive layout
 *
 * @example
 * <StatusCard
 *   status="stable"
 *   title="Stable pay"
 *   description="Strong revenue predictability with consistent payment patterns"
 *   confidenceScore={51}
 * />
 */
export const StatusCard: React.FC<StatusCardProps> = ({
  status = 'stable',
  title,
  description,
  confidenceScore,
  className = '',
}) => {
  return (
    <div
      className={classNames('relative overflow-hidden rounded-lg px-6 py-8', className)}
      style={{
        background: `linear-gradient(to right, rgba(56, 239, 125, 0.2), rgba(17, 153, 142, 0.2))`,
      }}
    >
      {/* Background Texture Layer with Blur and Blend Modes */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[111.3%] h-[730px] pointer-events-none"
        style={{ filter: 'blur(2.6px)' }}
      >
        {/* Texture Image */}
        <div
          className="absolute inset-0 opacity-[0.77] bg-repeat"
          style={{
            backgroundImage: `url('${TEXTURE_IMAGE}')`,
            backgroundSize: '1236px 1236px',
            backgroundPosition: '-350px 0',
          }}
        />
        {/* Gradient with Soft Light Blend */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(56, 239, 125, 0.94), rgba(17, 153, 142, 0.94))',
            mixBlendMode: 'soft-light',
          }}
        />
        {/* White Gradient with Lighten Blend */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 9.704%, rgba(255, 255, 255, 0.63) 99.191%)',
            mixBlendMode: 'lighten',
          }}
        />
        {/* Right-side gradient blur to fade vertical lines */}
        <div
          className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative flex items-start gap-4">
        {/* Title and Description */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            {title}
          </h2>
          <p className="text-[13px] font-medium leading-4 text-black">
            {description}
          </p>
        </div>
      </div>

      {/* AI Score Badge - Absolute positioned on right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 px-8 py-8 rounded-[10px]">
        {/* White Blur Background */}
        <div
          className="absolute left-0 top-0 w-[182px] h-[125px] rounded-[10px]"
          style={{
            background: 'rgba(255, 255, 255, 0.44)',
            filter: 'blur(48px)',
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col items-center gap-4">
          {/* Score */}
          <div className="text-2xl font-bold text-[#594c56]">
            {confidenceScore}
          </div>

          {/* Icon + Label */}
          <div className="flex items-center gap-2">
            <img src={SPARKLES_ICON} alt="" className="w-4 h-4" />
            <p className="text-xs font-medium uppercase text-black">
              AI Confidence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
