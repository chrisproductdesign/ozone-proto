import React from 'react';

import { classNames } from '@/lib/classNames';

// SECURITY FIX: Use local assets instead of external Figma API
// TODO: Download these assets from Figma and place them in /public/assets/
// For now, using base64 data URIs or local paths
const TEXTURE_IMAGE = '/ozone-proto/assets/status-card-texture.png'; // Replace with actual texture image
const SPARKLES_ICON = '/ozone-proto/assets/sparkles-icon.svg'; // Replace with actual sparkles icon

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

// Color variants for different status levels
const statusColors = {
  stable: {
    bgGradient: 'linear-gradient(to right, rgba(56, 239, 125, 0.2), rgba(17, 153, 142, 0.2))',
    textureGradient: 'linear-gradient(to right, rgba(56, 239, 125, 0.94), rgba(17, 153, 142, 0.94))',
  },
  moderate: {
    bgGradient: 'linear-gradient(to right, rgba(255, 115, 0, 0.2), rgba(255, 95, 0, 0.2))',
    textureGradient: 'linear-gradient(to right, rgba(255, 115, 0, 0.94), rgba(255, 95, 0, 0.94))',
  },
  critical: {
    bgGradient: 'linear-gradient(to right, rgba(255, 55, 45, 0.2), rgba(240, 45, 38, 0.2))',
    textureGradient: 'linear-gradient(to right, rgba(255, 55, 45, 0.94), rgba(240, 45, 38, 0.94))',
  },
};

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
  const colors = statusColors[status];

  return (
    <div
      className={classNames('relative overflow-hidden rounded px-6 pt-8 pb-3', className)}
      style={{
        background: colors.bgGradient,
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
            background: colors.textureGradient,
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
          <h2 className="text-2xl font-semibold mb-4 text-neutral-900">
            {title}
          </h2>
          <p className="text-[13px] font-medium leading-4 text-neutral-900">
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
            <p className="text-xs font-medium uppercase text-neutral-900">
              AI Confidence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
