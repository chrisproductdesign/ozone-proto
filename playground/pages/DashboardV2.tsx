import React, { useState } from 'react';
import { Home, ArrowLeft, Save, Share2, Download, Settings, RefreshCw } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { StatusCard } from '@/components/dashboard/StatusCard';
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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-6">
        {/* Logo placeholder */}
        <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center text-xs">
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
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
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
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

            {/* 1. Status Hero Section */}
            <StatusCard
              status="stable"
              title="Stable pay"
              description="Tortor diam rhoncus lorem dapibus mauris malesuada aliquam cursus interdum. Enim aliquet"
              confidenceScore={51}
            />

            {/* 2. Deal Metrics Grid (2x2) */}
            <section>
              <p className="text-xs text-gray-600 mb-3">AI Predicted deal snapshot</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Gross Funding Amount */}
                <MetricCard
                  label="GROSS FUNDING AMOUNT"
                  displayValue={`$${grossFunding.toLocaleString()}`}
                  sliderMin={10000}
                  sliderMax={100000}
                  sliderStep={1000}
                  sliderMinLabel="10K"
                  sliderMaxLabel="100K"
                  sliderValue={grossFunding}
                  onSliderChange={setGrossFunding}
                />

                {/* Term */}
                <MetricCard
                  label="TERM"
                  displayValue={`${term} days`}
                  sliderMin={30}
                  sliderMax={180}
                  sliderValue={term}
                  onSliderChange={setTerm}
                />

                {/* MOIC */}
                <MetricCard
                  label="TARGET MOIC"
                  displayValue={moic.toFixed(2)}
                  sliderMin={1.1}
                  sliderMax={1.4}
                  sliderStep={0.01}
                  sliderValue={moic}
                  onSliderChange={setMoic}
                  showRecalculate
                  onRecalculate={() => console.log('Recalculate MOIC')}
                />

                {/* Factor Rate */}
                <MetricCard
                  label="FACTOR RATE"
                  displayValue={factorRate.toFixed(2)}
                  sliderMin={1.2}
                  sliderMax={1.6}
                  sliderStep={0.01}
                  sliderValue={factorRate}
                  onSliderChange={setFactorRate}
                  showRecalculate
                  onRecalculate={() => console.log('Recalculate Factor Rate')}
                />
              </div>
            </section>

            {/* 3. Composite Score Card */}
            <section>
              <p className="text-xs text-gray-600 mb-3">Custom scorecard</p>
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-6">
                    {/* Large letter grade with visual background */}
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="text-[96px] font-bold text-green-700 leading-none">A</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-2">COMPOSITE SCORE</div>
                      <div className="text-sm text-gray-700">Strong revenue predictability</div>
                    </div>
                  </div>
                  <ButtonBaseUIWrapper
                    variant="ghost"
                    size="icon"
                    aria-label="Settings"
                  >
                    <Settings className="w-5 h-5" />
                  </ButtonBaseUIWrapper>
                </div>
              </div>
            </section>

            {/* 4. Deal Benchmarking - 2 Graphs (stacked vertically) */}
            <section>
              <p className="text-xs text-gray-600 mb-3">Deal benchmarking</p>
              <div className="space-y-4">
                {/* Marketplace Graph */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs text-gray-600">MARKETPLACE</div>
                    <ButtonBaseUIWrapper
                      variant="ghost"
                      size="icon"
                      aria-label="Recalculate marketplace"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </ButtonBaseUIWrapper>
                  </div>
                  <div className="h-[250px] bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    [Graph] Scatter Plot
                  </div>
                </div>

                {/* Funder Portfolio Graph */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs text-gray-600">FUNDER PORTFOLIO</div>
                    <ButtonBaseUIWrapper
                      variant="ghost"
                      size="icon"
                      aria-label="Recalculate funder portfolio"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </ButtonBaseUIWrapper>
                  </div>
                  <div className="h-[250px] bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    [Graph] Scatter Plot
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Background Check - 4 Cards */}
            <section>
              <p className="text-xs text-gray-600 mb-3">Background check</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Data Merch */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 min-h-[200px]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold">Data merch</div>
                    <button className="text-gray-500 hover:text-gray-700">ℹ️</button>
                  </div>
                  <div className="text-gray-400">[Content placeholder]</div>
                </div>

                {/* Custom Integrations */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 min-h-[200px]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold">Custom integrations</div>
                    <button className="text-gray-500 hover:text-gray-700">ℹ️</button>
                  </div>
                  <div className="text-gray-400">[Content placeholder]</div>
                </div>

                {/* Custom Checklist */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 min-h-[200px]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold">Custom checklist</div>
                    <button className="text-gray-500 hover:text-gray-700">ℹ️</button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Viverra urna orci pellentesque viverra.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Etiam mattis nunc nec ac gravida sed varius massa.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Massa quis mauris leo eget amet id.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Velit sagittis volutpat in tempor quam.</span>
                    </div>
                  </div>
                </div>

                {/* Perplexity Search */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 min-h-[200px]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold">Perplexity search</div>
                    <button className="text-gray-500 hover:text-gray-700">ℹ️</button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="text-xs font-semibold mb-2">RESULTS</div>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Quis eget pellentesque eget consectetur. Commodo viverra velit condimentum consectetur donec.</li>
                      <li>Quis viverra arcu dui donec turpis consectetur aliquam. Enim et est leo duis et.</li>
                      <li>Ut at adipiscing cras sit placerat faucibus tincidunt mattis. Quam et non nibh orci.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
