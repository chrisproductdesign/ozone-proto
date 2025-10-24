// @ts-nocheck
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
  const [activeTab, setActiveTab] = useState<'pricing' | 'performance'>('performance');
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
    <div className="min-h-full" style={{ backgroundColor: '#F5F2ED' }}>
      {/* Header */}
      <header className="border-b border-gray-200 w-full sticky top-0 z-10" style={{ backgroundColor: '#F5F2ED' }}>
        <div className="px-6 py-8">
          <div className="max-w-[1000px] mx-auto flex items-center justify-between">
            {/* Deal Name */}
            <h1 className="text-lg font-medium text-gray-900">
              {dealName}
            </h1>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleViewDeals}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                aria-label="View deals"
              >
                Deals
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

        {/* Tab Navigation with Layout Toggle */}
        <div className="px-6 border-t border-gray-200">
          <div className="max-w-[1000px] mx-auto flex items-center justify-between">
            <nav className="flex gap-8" role="tablist">
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
            </nav>

            {/* Layout Toggle and Export */}
            <div className="flex items-center gap-2">
              {/* Layout Toggle */}
              <button
                onClick={() => setLayout(layout === 'A' ? 'B' : 'A')}
                className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                aria-label={`Switch to layout ${layout === 'A' ? 'B' : 'A'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              </button>

              {/* Export Button */}
              <button
                onClick={() => showToast('Export functionality coming soon', 'info')}
                className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Export dashboard data"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-6 pt-10 pb-6">
        <div className="max-w-[1000px] mx-auto">
          {layout === 'A' ? (
          /* Layout A - Updated Layout */
          <div className="grid grid-cols-12 gap-5">
            {/* Top Row - ScoreCard and Confidence Card */}
            <div className={classNames(
              "col-span-12",
              activeTab === 'performance' ? "lg:col-span-8" : "lg:col-span-12"
            )}>
              <ScoreCard
                score={0.87}
                description="Strong revenue predictability"
                status="high"
                className="h-full"
              />
            </div>

            {activeTab === 'performance' && (
              <div className="col-span-12 lg:col-span-4">
                <ConfidenceCard
                  prediction="Stable pay"
                  description="Description details"
                  className="h-full"
                />
              </div>
            )}

            {/* Metric Cards Row - Below the top cards */}
            <div className="col-span-12 md:col-span-4">
              <MetricCard
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label={activeTab === 'performance' ? "PREDICTED MOIC" : "FACTOR RATE"}
                value={activeTab === 'performance' ? 1.40 : 1.30}
                min={1}
                max={2}
                currentValue={activeTab === 'performance' ? 1.4 : 1.3}
                showSlider={true}
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <MetricCard
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="GROSS FUNDING AMOUNT"
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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="TERM"
                value="180 days"
                min={30}
                max={365}
                currentValue={180}
                showSlider={true}
              />
            </div>

            {/* Graph Placeholder */}
            <div className="col-span-12">
              <div className="bg-white rounded-2xl p-5 h-96 flex items-center justify-center shadow-sm">
                <p className="text-2xl text-gray-400">Scatterplot Graph Goes Here</p>
              </div>
            </div>
          </div>
        ) : (
          /* Layout B - Updated Layout with Inputs */
          <div className="grid grid-cols-12 gap-5">
            {/* Left Column - ScoreCard with Inputs */}
            <div className="col-span-12 lg:col-span-8">
              <ScoreCardWithInputs
                score={0.87}
                description="Strong revenue predictability"
                status="high"
                className="h-full"
              />
            </div>

            {/* Right Column - Metric Cards Stacked */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
              <MetricCard
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label={activeTab === 'performance' ? "PREDICTED MOIC" : "FACTOR RATE"}
                value={activeTab === 'performance' ? 1.40 : 1.30}
                min={1}
                max={2}
                currentValue={activeTab === 'performance' ? 1.4 : 1.3}
                showSlider={true}
              />

              <MetricCard
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="GROSS FUNDING AMOUNT"
                value={102000}
                unit="$"
                min={50000}
                max={500000}
                currentValue={102000}
                showSlider={true}
              />

              <MetricCard
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="TERM"
                value="180 days"
                min={30}
                max={365}
                currentValue={180}
                showSlider={true}
              />
            </div>

            {/* Bottom Row - Graph */}
            <div className="col-span-12">
              <div className="bg-white rounded-2xl p-5 h-96 flex items-center justify-center shadow-sm">
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