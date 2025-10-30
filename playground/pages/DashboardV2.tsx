import React, { useState, useEffect, useRef } from 'react';
import { Home, ArrowLeft, Save, Share2, Download, RefreshCw, DollarSign, Clock, BadgeCheck } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { CompositeScoreCard } from '@/components/dashboard/CompositeScoreCard';
import { BackgroundCheckCard } from '@/components/dashboard/BackgroundCheckCard';
import { ButtonBaseUIWrapper } from '@/components/button/ButtonBaseUIWrapper';
import {
  DealRangeChart,
  PaymentCurveChart,
  ScatterPlotChart,
  LossExposureChart,
  PortfolioRiskCard,
  type XAxisMetric,
} from '@/components/charts';
import { InsightIconBadge, InsightPanel, getHighestPriorityType, type Insight } from '@/components/insights';
import { useDeal } from '@/contexts/DealContext';
import { type NavigationProps } from '@playground/App';

interface DashboardV2Props extends NavigationProps {}

/**
 * Dashboard v0.7 - New dashboard layout
 * Responsive layout with sidebar navigation and content sections
 */
export function DashboardV2({ navigateTo }: DashboardV2Props) {
  const { currentDeal, updateDeal, dealName } = useDeal();

  // Initialize metrics from context or use defaults
  const [grossFunding, setGrossFunding] = useState(() =>
    currentDeal.grossFundedAmount ? Number(currentDeal.grossFundedAmount) : 50000
  );
  const [term, setTerm] = useState(() =>
    currentDeal.term ? Number(currentDeal.term) : 180
  );
  const [moic, setMoic] = useState(() =>
    currentDeal.moic ? Number(currentDeal.moic) : 1.32
  );
  const [factorRate, setFactorRate] = useState(() =>
    currentDeal.factorRate ? Number(currentDeal.factorRate) : 1.40
  );

  // Scenario state for Deal Performance charts
  const [performanceScenario, setPerformanceScenario] = useState<'best' | 'conservative' | 'moderate'>('best');

  // X-axis metric state for marketplace benchmarking
  const [xAxisMetric, setXAxisMetric] = useState<XAxisMetric>('fundingAmount');

  // Insight panel open/close state
  const [marketplaceInsightsOpen, setMarketplaceInsightsOpen] = useState(false);
  const [funderInsightsOpen, setFunderInsightsOpen] = useState(false);

  // Refs for insight icon positioning
  const marketplaceIconRef = useRef<HTMLButtonElement>(null);
  const funderIconRef = useRef<HTMLButtonElement>(null);

  // Insights state for both charts with tab-contextual mock data
  const [marketplaceInsights, setMarketplaceInsights] = useState<Insight[]>([
    {
      id: 'mp-1',
      type: 'positive',
      message: 'Your default rate is 30% lower with Industry A compared to Industry B',
      metric: 'industry',
      priority: 3,
    },
    {
      id: 'mp-2',
      type: 'warning',
      message: 'Funding amounts above $75K show 15% increased default risk in current market conditions',
      metric: 'fundingAmount',
      priority: 2,
    },
    {
      id: 'mp-3',
      type: 'neutral',
      message: 'Average MOIC in your funding range is 1.35x across the marketplace',
      metric: 'fundingAmount',
      priority: 1,
    },
    {
      id: 'mp-4',
      type: 'positive',
      message: 'Businesses with TIB over $500K demonstrate 40% better repayment consistency',
      metric: 'tib',
      priority: 3,
    },
    {
      id: 'mp-5',
      type: 'negative',
      message: 'Southwest region shows 25% higher default rates in the past 6 months',
      metric: 'region',
      priority: 2,
    },
  ]);

  const [funderInsights, setFunderInsights] = useState<Insight[]>([
    {
      id: 'fp-1',
      type: 'warning',
      message: 'Your portfolio is 85% concentrated in the Southwest region - consider diversification',
      metric: 'region',
      priority: 3,
    },
    {
      id: 'fp-2',
      type: 'positive',
      message: 'Your average MOIC of 1.42x outperforms the marketplace by 18%',
      metric: 'fundingAmount',
      priority: 2,
    },
    {
      id: 'fp-3',
      type: 'neutral',
      message: 'Portfolio concentration in Industry A represents 80% of total funded deals',
      metric: 'industry',
      priority: 2,
    },
    {
      id: 'fp-4',
      type: 'positive',
      message: 'TIB-based selection strategy reduced default rates by 35% vs marketplace average',
      metric: 'tib',
      priority: 3,
    },
  ]);

  // Filter insights by active metric (limit to 3 per chart)
  const activeMarketplaceInsights = marketplaceInsights
    .filter((insight) => insight.metric === xAxisMetric)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
    .slice(0, 3);

  const activeFunderInsights = funderInsights
    .filter((insight) => insight.metric === xAxisMetric)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
    .slice(0, 3);

  // Dismiss handlers
  const handleDismissMarketplaceInsight = (id: string) => {
    setMarketplaceInsights((prev) => prev.filter((insight) => insight.id !== id));
  };

  const handleDismissFunderInsight = (id: string) => {
    setFunderInsights((prev) => prev.filter((insight) => insight.id !== id));
  };

  // Sync local state back to context when values change
  useEffect(() => {
    const newGrossFunding = grossFunding.toString();
    const newTerm = term.toString();
    const newMoic = moic.toFixed(2);
    const newFactorRate = factorRate.toFixed(2);

    // Only update if values actually changed
    if (
      currentDeal.grossFundedAmount !== newGrossFunding ||
      currentDeal.term !== newTerm ||
      currentDeal.moic !== newMoic ||
      currentDeal.factorRate !== newFactorRate
    ) {
      updateDeal({
        grossFundedAmount: newGrossFunding,
        term: newTerm,
        moic: newMoic,
        factorRate: newFactorRate
      });
    }
  }, [grossFunding, term, moic, factorRate, currentDeal, updateDeal]);

  return (
    <div className="min-h-screen bg-neutral-400 flex">
      {/* Left Sidebar */}
      <aside className="w-16 bg-neutral-500 flex flex-col items-center py-6 gap-6 sticky top-0 h-screen">
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
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-neutral-400 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Back button */}
            <ButtonBaseUIWrapper
              variant="ghost"
              size="icon-lg"
              aria-label="Back to Deal Input"
              onClick={() => navigateTo('dealinput')}
            >
              <ArrowLeft className="w-5 h-5" />
            </ButtonBaseUIWrapper>
            <h1 className="text-lg font-semibold">{dealName}</h1>
          </div>

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
              <p className="text-xs text-neutral-800 mb-3">AI Predicted deal snapshot</p>
              <StatusCard
                status="stable"
                title="Stable pay"
                description="Tortor diam rhoncus lorem dapibus mauris malesuada aliquam cursus interdum. Enim aliquet"
                confidenceScore={51}
              />
            </section>

            {/* 2. Deal Metrics Grid (2x2) */}
            <section className="mb-12">
              <div className="rounded overflow-hidden bg-neutral-400 shadow-md">
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

            {/* 2.5. Deal Performance Charts - Deal Range & Payment Curve */}
            <section className="mb-12">
              {/* Header with label and shared scenario tabs */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-neutral-800">Deal performance</p>

                {/* Shared scenario tabs for both charts */}
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setPerformanceScenario('best')}
                    className={`text-sm font-medium transition-colors pb-1 ${
                      performanceScenario === 'best'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-neutral-900 hover:text-neutral-700'
                    }`}
                  >
                    Best
                  </button>
                  <button
                    onClick={() => setPerformanceScenario('conservative')}
                    className={`text-sm font-medium transition-colors pb-1 ${
                      performanceScenario === 'conservative'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-neutral-900 hover:text-neutral-700'
                    }`}
                  >
                    Conservative
                  </button>
                  <button
                    onClick={() => setPerformanceScenario('moderate')}
                    className={`text-sm font-medium transition-colors pb-1 ${
                      performanceScenario === 'moderate'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-neutral-900 hover:text-neutral-700'
                    }`}
                  >
                    Moderate
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Deal Range Chart */}
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <h3 className="text-sm font-medium text-neutral-700 mb-3">Deal Range</h3>
                  <DealRangeChart scenario={performanceScenario} />
                </div>

                {/* Payment Curve Chart */}
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <h3 className="text-sm font-medium text-neutral-700 mb-3">Payment</h3>
                  <PaymentCurveChart scenario={performanceScenario} />
                </div>
              </div>
            </section>

            {/* 3. Composite Score Card */}
            <section className="mb-12">
              <p className="text-xs text-neutral-800 mb-3">Custom scorecard</p>
              <CompositeScoreCard
                grade="A"
                description="Strong revenue predictability"
                onSettingsClick={() => console.log('Settings clicked')}
              />
            </section>

            {/* 4. Deal Benchmarking - 2 Graphs (stacked vertically) */}
            <section className="mb-12">
              {/* Header with label and x-axis toggle */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-neutral-800">Deal benchmarking</p>

                {/* X-axis metric toggle */}
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setXAxisMetric('fundingAmount')}
                    className={`text-xs font-medium transition-colors pb-1 px-3 rounded-t ${
                      xAxisMetric === 'fundingAmount'
                        ? 'text-purple-700 border-b-2 border-purple-700'
                        : 'text-neutral-900 hover:text-neutral-700 hover:bg-purple-700/15'
                    }`}
                  >
                    Funding Amount
                  </button>
                  <button
                    onClick={() => setXAxisMetric('tib')}
                    className={`text-xs font-medium transition-colors pb-1 px-3 rounded-t ${
                      xAxisMetric === 'tib'
                        ? 'text-purple-700 border-b-2 border-purple-700'
                        : 'text-neutral-900 hover:text-neutral-700 hover:bg-purple-700/15'
                    }`}
                  >
                    TIB
                  </button>
                  <button
                    onClick={() => setXAxisMetric('industry')}
                    className={`text-xs font-medium transition-colors pb-1 px-3 rounded-t ${
                      xAxisMetric === 'industry'
                        ? 'text-purple-700 border-b-2 border-purple-700'
                        : 'text-neutral-900 hover:text-neutral-700 hover:bg-purple-700/15'
                    }`}
                  >
                    Industry
                  </button>
                  <button
                    onClick={() => setXAxisMetric('region')}
                    className={`text-xs font-medium transition-colors pb-1 px-3 rounded-t ${
                      xAxisMetric === 'region'
                        ? 'text-purple-700 border-b-2 border-purple-700'
                        : 'text-neutral-900 hover:text-neutral-700 hover:bg-purple-700/15'
                    }`}
                  >
                    Region
                  </button>
                </div>
              </div>

              <div>
                {/* Marketplace Graph */}
                <div className="bg-neutral-300 rounded shadow-md p-6 border border-black/10 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-neutral-800">MARKETPLACE</div>

                      {/* Insight Icon Badge */}
                      {activeMarketplaceInsights.length > 0 && (
                        <InsightIconBadge
                          ref={marketplaceIconRef}
                          count={activeMarketplaceInsights.length}
                          highestPriority={getHighestPriorityType(activeMarketplaceInsights)}
                          isOpen={marketplaceInsightsOpen}
                          onClick={() => setMarketplaceInsightsOpen(!marketplaceInsightsOpen)}
                        />
                      )}
                    </div>

                    <ButtonBaseUIWrapper
                      variant="ghost"
                      size="icon"
                      aria-label="Recalculate marketplace"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </ButtonBaseUIWrapper>
                  </div>

                  {/* Insight Panel */}
                  <InsightPanel
                    insights={activeMarketplaceInsights}
                    isOpen={marketplaceInsightsOpen}
                    onClose={() => setMarketplaceInsightsOpen(false)}
                    anchorRef={marketplaceIconRef}
                  />

                  <ScatterPlotChart
                    variant="marketplace"
                    xAxisMetric={xAxisMetric}
                    currentDealData={{
                      fundingAmount: grossFunding,
                      moic: moic,
                    }}
                  />
                </div>

                {/* Funder Portfolio Graph */}
                <div className="bg-neutral-300 rounded shadow-md p-6 border border-black/10 mt-3 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-neutral-800">FUNDER PORTFOLIO</div>

                      {/* Insight Icon Badge */}
                      {activeFunderInsights.length > 0 && (
                        <InsightIconBadge
                          ref={funderIconRef}
                          count={activeFunderInsights.length}
                          highestPriority={getHighestPriorityType(activeFunderInsights)}
                          isOpen={funderInsightsOpen}
                          onClick={() => setFunderInsightsOpen(!funderInsightsOpen)}
                        />
                      )}
                    </div>

                    <ButtonBaseUIWrapper
                      variant="ghost"
                      size="icon"
                      aria-label="Recalculate funder portfolio"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </ButtonBaseUIWrapper>
                  </div>

                  {/* Insight Panel */}
                  <InsightPanel
                    insights={activeFunderInsights}
                    isOpen={funderInsightsOpen}
                    onClose={() => setFunderInsightsOpen(false)}
                    anchorRef={funderIconRef}
                  />

                  <ScatterPlotChart
                    variant="funder"
                    xAxisMetric={xAxisMetric}
                    currentDealData={{
                      fundingAmount: grossFunding,
                      moic: moic,
                    }}
                  />
                </div>
              </div>
            </section>

            {/* 5. Background Check - 3 Cards */}
            <section className="mb-12">
              <p className="text-xs text-neutral-800 mb-3">Background check</p>
              <div className="rounded overflow-hidden bg-neutral-400 shadow-md">
                <div className="grid grid-cols-2 gap-[2px]">
                  <BackgroundCheckCard variant="checklist" noBorder noRounded />
                  <BackgroundCheckCard variant="data-merch" noBorder noRounded />
                  <BackgroundCheckCard variant="perplexity" noBorder noRounded className="col-span-2" />
                </div>
              </div>
            </section>

            {/* 6. Portfolio Risk - Unified Card with Toggle */}
            <section className="mb-12">
              <p className="text-xs text-neutral-800 mb-3">Portfolio risk</p>
              <PortfolioRiskCard />
            </section>

            {/* 7. Loss Exposure Analysis */}
            <section className="mb-12">
              <p className="text-xs text-neutral-800 mb-3">Risk stress scenarios</p>
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <h3 className="text-sm font-medium text-neutral-700 mb-3">Loss Exposure Analysis</h3>
                <LossExposureChart exposureLimit={300} showThresholdLine={true} />
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
