import React, { useRef, useEffect } from 'react';
import { Lightbulb, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { Insight } from './InsightList';

export interface InsightPanelProps {
  insights: Insight[];
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

/**
 * InsightPanel - Floating panel with backdrop blur for displaying insights
 *
 * Features:
 * - Absolutely positioned below anchor element (icon badge)
 * - Backdrop blur effect for depth and elegance
 * - Smooth enter/exit animations
 * - Click outside to dismiss
 * - Scrollable if insights overflow
 * - Fixed dimensions (320px width, max 120px height)
 *
 * @example
 * <InsightPanel
 *   insights={activeInsights}
 *   isOpen={isPanelOpen}
 *   onClose={() => setIsPanelOpen(false)}
 *   anchorRef={iconRef}
 * />
 */
export function InsightPanel({ insights, isOpen, onClose, anchorRef }: InsightPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useClickOutside(panelRef as React.RefObject<HTMLElement>, onClose, isOpen);

  // Close panel on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Map insight types to icons
  const iconMap = {
    positive: CheckCircle,
    warning: AlertTriangle,
    negative: XCircle,
    neutral: Lightbulb,
  };

  const colorMap = {
    positive: 'text-green-600',
    warning: 'text-amber-600',
    negative: 'text-red-600',
    neutral: 'text-blue-600',
  };

  return (
    <div
      ref={panelRef}
      className={`
        absolute top-0 right-[calc(100%+8px)] z-50
        w-80
        bg-white/90 backdrop-blur-md
        border border-neutral-200
        rounded-lg shadow-lg
        origin-right
        animate-in fade-in slide-in-from-right-2 duration-150
      `}
      role="dialog"
      aria-label="Insights panel"
    >
      <div className="py-2">
        {insights.map((insight) => {
          const Icon = iconMap[insight.type];
          const iconColor = colorMap[insight.type];

          return (
            <div
              key={insight.id}
              className="flex items-start gap-2.5 px-3 py-2.5 hover:bg-black/5 transition-colors"
            >
              <Icon className={`w-3.5 h-3.5 ${iconColor} flex-shrink-0 mt-0.5`} />
              <p className="text-sm text-neutral-900 leading-relaxed line-clamp-2">
                {insight.message}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
