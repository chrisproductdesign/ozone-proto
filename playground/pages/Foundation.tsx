import React, { useState } from 'react';
import { TokenTest } from './TokenTest';
import { Forms } from './Forms';

type FoundationTab = 'tokens' | 'components';

export function Foundation() {
  const [activeTab, setActiveTab] = useState<FoundationTab>('tokens');

  return (
    <div className="flex flex-col h-full">
      {/* Nested Tab Navigation */}
      <div className="border-b border-neutral-200 px-6 sticky top-0 bg-white z-10">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('tokens')}
            className={`
              py-3 px-1 text-sm font-medium border-b-2 transition-colors
              ${activeTab === 'tokens'
                ? 'border-neutral-800 text-neutral-800'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'}
            `}
          >
            Tokens
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`
              py-3 px-1 text-sm font-medium border-b-2 transition-colors
              ${activeTab === 'components'
                ? 'border-neutral-800 text-neutral-800'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'}
            `}
          >
            Components
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'tokens' && <TokenTest />}
        {activeTab === 'components' && <Forms />}
      </div>
    </div>
  );
}
