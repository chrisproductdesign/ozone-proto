import React from 'react';

import { DealCard } from '@/components/deal/DealCard';
import { type NavigationProps } from '@playground/App';

type DealSelectScreenProps = NavigationProps;

export const DealSelectScreen: React.FC<DealSelectScreenProps> = ({ navigateTo }) => {
  const handleNewDeal = () => {
    if (navigateTo) {
      navigateTo('dealinput');
    }
  };

  const handleExistingDeal = () => {
    // TODO: Navigate to deals table view (not implemented yet)
    console.log('Navigate to existing deals table');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Sophisticated background - "Fintech Professional" theme */}
      <div
        className="absolute inset-0 bg-neutral-400"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(254, 253, 252, 0.4), transparent 60%),
            radial-gradient(ellipse at 20% 70%, rgba(89, 76, 86, 0.04), transparent 50%),
            radial-gradient(ellipse at 80% 60%, rgba(93, 91, 89, 0.04), transparent 50%),
            #E8E6E3
          `
        }}
      />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />

      {/* Content */}
      <div className="relative w-full max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* New Deal Card */}
          <DealCard
            variant="new"
            onClick={handleNewDeal}
          />

          {/* Existing Deal Card */}
          <DealCard
            variant="existing"
            onClick={handleExistingDeal}
          />
        </div>
      </div>
    </div>
  );
};