import React, { useState } from 'react';
import { classNames } from '@/lib/classNames';
import { ScoreCard } from '@/components/dashboard/ScoreCard';
import { ScoreCardWithInputs } from '@/components/dashboard/ScoreCardWithInputs';
import { ConfidenceCard } from '@/components/dashboard/ConfidenceCard';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { useDeal } from '@/contexts/DealContext';
import { useToast } from '@/components/feedback/Toast';
import { type NavigationProps } from '@playground/App';

interface DashboardScreenProps extends NavigationProps {}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState<'pricing' | 'performance'>('pricing');
  const [layout, setLayout] = useState<'A' | 'B'>('A');
  const { dealName, resetDeal } = useDeal();
  const { showToast } = useToast();

  const handleNewDeal = () => {
    resetDeal();
    if (navigateTo) {
      navigateTo('dealinput');
    }
  };

  const handleViewDeals = () => {
    showToast('Deals list coming soon', 'info');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F2ED' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 w-full">
        <div className="px-6 py-4">
          <div className="max-w-[1000px] mx-auto flex items-center justify-between">
            {/* Deal Name */}
            <h1 className="text-lg font-medium text-gray-900">
              {dealName}
            </h1>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Layout Toggle */}
              <button
                onClick={() => setLayout(layout === 'A' ? 'B' : 'A')}
                className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                aria-label={`Switch to layout ${layout === 'A' ? 'B' : 'A'}`}
              >
                <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
                Layout {layout}
              </button>
              <button
                onClick={handleViewDeals}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                aria-label="View deals"
              >
                Deals
              </button>
              <button
                onClick={() => navigateTo?.('dealinput')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                aria-label="Edit deal inputs"
              >
                Edit inputs
              </button>
              <button
                onClick={handleNewDeal}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                style={{ backgroundColor: '#4A4543' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3A3533'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4A4543'}
                aria-label="Create new deal"
              >
                New deal
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-t border-gray-200">
          <nav className="max-w-[1000px] mx-auto flex gap-8" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'pricing'}
              onClick={() => setActiveTab('pricing')}
              className={classNames(
                'py-3 px-1 text-sm font-medium border-b-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700',
                activeTab === 'pricing'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              Pricing
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'performance'}
              onClick={() => setActiveTab('performance')}
              className={classNames(
                'py-3 px-1 text-sm font-medium border-b-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700',
                activeTab === 'performance'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              Performance
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-6 py-6">
        <div className="max-w-[1000px] mx-auto">
          {layout === 'A' ? (
          /* Layout A - Original Layout */
          <div className="grid grid-cols-12 gap-6">
            {/* Top Row - Large Cards */}
            <div className="col-span-12 lg:col-span-6">
              <ScoreCard
                score={0.87}
                description="Strong revenue predictability"
                status="high"
                className="h-full"
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <ConfidenceCard
                prediction="Stable pay"
                description="Description details"
                className="h-full"
              />
            </div>

            {/* Metric Cards Row */}
            <div className="col-span-12 md:col-span-4">
              <MetricCard
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                }
                label="Factor Rate"
                value={1.40}
                min={1}
                max={2}
                currentValue={1.4}
                showSlider={true}
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <MetricCard
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                }
                label="Gross Funding Amount"
                value={102000}
                unit="$"
                min={50000}
                max={500000}
                currentValue={102000}
                showSlider={true}
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <MetricCard
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                }
                label="Term"
                value="180 days"
                min={30}
                max={365}
                currentValue={180}
                showSlider={true}
              />
            </div>

            {/* Graph Placeholder */}
            <div className="col-span-12">
              <div className="bg-white rounded-2xl p-8 h-96 flex items-center justify-center">
                <p className="text-2xl text-gray-400">Scatterplot Graph Goes Here</p>
              </div>
            </div>
          </div>
        ) : (
          /* Layout B - Alternative Layout with Inputs */
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - ScoreCard with Inputs */}
            <div className="col-span-12 lg:col-span-6">
              <ScoreCardWithInputs
                score={0.87}
                description="Strong revenue predictability"
                status="high"
                className="h-full"
              />
            </div>

            {/* Right Column - Metric Cards */}
            <div className="col-span-12 lg:col-span-6 space-y-6">
              <MetricCard
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                }
                label="Factor Rate"
                value={1.40}
                min={1}
                max={2}
                currentValue={1.4}
                showSlider={true}
              />

              <MetricCard
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                }
                label="Gross Funding Amount"
                value={102000}
                unit="$"
                min={50000}
                max={500000}
                currentValue={102000}
                showSlider={true}
              />

              <MetricCard
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                }
                label="Term"
                value="180 days"
                min={30}
                max={365}
                currentValue={180}
                showSlider={true}
              />
            </div>

            {/* Bottom Row - Graph */}
            <div className="col-span-12">
              <div className="bg-white rounded-2xl p-8 h-96 flex items-center justify-center">
                <p className="text-2xl text-gray-400">Scatterplot Graph Goes Here</p>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>
    </div>
  );
}