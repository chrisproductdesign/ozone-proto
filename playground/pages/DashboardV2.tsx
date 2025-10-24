import React, { useState } from 'react';
import { Home, ArrowLeft, Save, Share2, Download, RefreshCw, DollarSign, Clock, BadgeCheck } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { CompositeScoreCard } from '@/components/dashboard/CompositeScoreCard';
import { BackgroundCheckCard } from '@/components/dashboard/BackgroundCheckCard';
import { ButtonBaseUIWrapper } from '@/components/button/ButtonBaseUIWrapper';

/**
 * Dashboard v0.7 - New dashboard layout
 * Responsive layout with sidebar navigation and content sections
 */
export function DashboardV2() {
  // State for all 4 metrics
  const [grossFunding, setGrossFunding] = useState(50000);
  const [term, setTerm] = useState(180);
  const [moic, setMoic] = useState(1.32);
  const [factorRate, setFactorRate] = useState(1.40);

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Left Sidebar */}
      <aside className="w-16 bg-tertiary flex flex-col items-center py-6 gap-6">
        {/* Logo placeholder */}
        <div className="w-10 h-10 bg-neutral-300 rounded flex items-center justify-center text-xs">
          Logo
        </div>

        {/* Home icon */}
        <ButtonBaseUIWrapper
          variant="ghost"
          size="icon-lg"
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
        </ButtonBaseUIWrapper>

        {/* Back button */}
        <ButtonBaseUIWrapper
          variant="ghost"
          size="icon-lg"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </ButtonBaseUIWrapper>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-secondary px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-lg font-semibold">Deal name LLC</h1>

          <div className="flex items-center gap-3">
            <ButtonBaseUIWrapper
              variant="ghost"
              size="icon-lg"
              aria-label="Save"
            >
              <Save className="w-5 h-5" />
            </ButtonBaseUIWrapper>
            <ButtonBaseUIWrapper
              variant="ghost"
              size="icon-lg"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </ButtonBaseUIWrapper>
            <ButtonBaseUIWrapper
              variant="ghost"
              size="icon-lg"
              aria-label="Download"
            >
              <Download className="w-5 h-5" />
            </ButtonBaseUIWrapper>
          </div>
        </header>

        {/* Content container with max-width */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

            {/* 1. Status Hero Section */}
            <section className="mb-3">
              <p className="text-xs text-neutral-600 mb-3">AI Predicted deal snapshot</p>
              <StatusCard
                status="stable"
                title="Stable pay"
                description="Tortor diam rhoncus lorem dapibus mauris malesuada aliquam cursus interdum. Enim aliquet"
                confidenceScore={51}
              />
            </section>

            {/* 2. Deal Metrics Grid (2x2) */}
            <section className="mb-12">
              <div className="rounded-lg overflow-hidden bg-neutral-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
                  {/* Gross Funding Amount */}
                  <MetricCard
                    icon={<DollarSign className="w-[18px] h-[18px]" />}
                    label="GROSS FUNDING AMOUNT"
                    displayValue={`$${grossFunding.toLocaleString()}`}
                    sliderMin={10000}
                    sliderMax={100000}
                    sliderStep={1000}
                    sliderMinLabel="10K"
                    sliderMaxLabel="100K"
                    sliderValue={grossFunding}
                    onSliderChange={setGrossFunding}
                    onValueChange={setGrossFunding}
                    noBorder
                    noRounded
                  />

                  {/* Term */}
                  <MetricCard
                    icon={<Clock className="w-[18px] h-[18px]" />}
                    label="TERM"
                    displayValue={`${term} days`}
                    sliderMin={30}
                    sliderMax={180}
                    sliderValue={term}
                    onSliderChange={setTerm}
                    onValueChange={setTerm}
                    noBorder
                    noRounded
                  />

                  {/* MOIC */}
                  <MetricCard
                    icon={<BadgeCheck className="w-[18px] h-[18px]" />}
                    label="TARGET MOIC"
                    displayValue={moic.toFixed(2)}
                    sliderMin={1.1}
                    sliderMax={1.4}
                    sliderStep={0.01}
                    sliderValue={moic}
                    onSliderChange={setMoic}
                    onValueChange={setMoic}
                    showRecalculate
                    onRecalculate={() => console.log('Recalculate MOIC')}
                    noBorder
                    noRounded
                  />

                  {/* Factor Rate */}
                  <MetricCard
                    icon={<BadgeCheck className="w-[18px] h-[18px]" />}
                    label="FACTOR RATE"
                    displayValue={factorRate.toFixed(2)}
                    sliderMin={1.2}
                    sliderMax={1.6}
                    sliderStep={0.01}
                    sliderValue={factorRate}
                    onSliderChange={setFactorRate}
                    onValueChange={setFactorRate}
                    showRecalculate
                    onRecalculate={() => console.log('Recalculate Factor Rate')}
                    noBorder
                    noRounded
                  />
                </div>
              </div>
            </section>

            {/* 3. Composite Score Card */}
            <section className="mb-12">
              <p className="text-xs text-neutral-600 mb-3">Custom scorecard</p>
              <CompositeScoreCard
                grade="A"
                description="Strong revenue predictability"
                onSettingsClick={() => console.log('Settings clicked')}
              />
            </section>

            {/* 4. Deal Benchmarking - 2 Graphs (stacked vertically) */}
            <section className="mb-12">
              <p className="text-xs text-neutral-600 mb-3">Deal benchmarking</p>
              <div>
                {/* Marketplace Graph */}
                <div className="bg-base rounded-lg p-6 border border-black/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs text-neutral-600">MARKETPLACE</div>
                    <ButtonBaseUIWrapper
                      variant="ghost"
                      size="icon"
                      aria-label="Recalculate marketplace"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </ButtonBaseUIWrapper>
                  </div>
                  <div className="h-[250px] bg-neutral-100 rounded flex items-center justify-center text-neutral-500">
                    [Graph] Scatter Plot
                  </div>
                </div>

                {/* Funder Portfolio Graph */}
                <div className="bg-base rounded-lg p-6 border border-black/10 mt-3">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs text-neutral-600">FUNDER PORTFOLIO</div>
                    <ButtonBaseUIWrapper
                      variant="ghost"
                      size="icon"
                      aria-label="Recalculate funder portfolio"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </ButtonBaseUIWrapper>
                  </div>
                  <div className="h-[250px] bg-neutral-100 rounded flex items-center justify-center text-neutral-500">
                    [Graph] Scatter Plot
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Background Check - 3 Cards */}
            <section className="mb-12">
              <p className="text-xs text-neutral-600 mb-3">Background check</p>
              <div className="space-y-4">
                {/* Top row - 2 columns */}
                <div className="grid grid-cols-2 gap-2.5">
                  <BackgroundCheckCard variant="checklist" />
                  <BackgroundCheckCard variant="data-merch" />
                </div>

                {/* Bottom row - full width */}
                <BackgroundCheckCard variant="perplexity" />
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
