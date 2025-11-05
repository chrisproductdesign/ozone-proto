import { DndContext, DragEndEvent, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Home, ArrowLeft, Save, Share2, Download, DollarSign, Clock, BadgeCheck, Lightbulb, TrendingUp, Target, ShieldCheck, ExternalLink, ChevronDown } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

import { ButtonBaseUIWrapper } from '@/components/button/ButtonBaseUIWrapper';
import { SortableSection } from '@/components/dashboard/SortableSection';
import { DEFAULT_SECTION_ORDER, SECTION_STORAGE_KEY, type DashboardSectionId } from '@/components/dashboard/sections/types';
import {
  DealRangeChart,
  PaymentCurveChart,
  ScatterPlotChart,
  PortfolioRiskCard,
  type XAxisMetric,
} from '@/components/charts';
import { BackgroundCheckCard } from '@/components/dashboard/BackgroundCheckCard';
import { CompositeScoreCard } from '@/components/dashboard/CompositeScoreCard';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { InsightPanel, type Insight } from '@/components/insights';
import { useDeal } from '@/contexts/DealContext';
import { type NavigationProps } from '@playground/App';

type DashboardV2Props = NavigationProps;

/**
 * Dashboard v0.7 - New dashboard layout
 * Responsive layout with sidebar navigation and content sections
 */
export function DashboardV2({ navigateTo: _navigateTo }: DashboardV2Props) {
  const { currentDeal, updateDeal, dealName } = useDeal();

  // Drag-and-drop sensors (optimized for intentional drags)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to activate drag
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

  // Section order state with localStorage persistence
  const [sectionOrder, setSectionOrder] = useState<DashboardSectionId[]>(() => {
    const saved = localStorage.getItem(SECTION_STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_SECTION_ORDER;
  });

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

  // Chart type state for Deal Performance section
  const [selectedChart, setSelectedChart] = useState<'dealRange' | 'paymentTimeline'>('dealRange');
  const [isChartDropdownOpen, setIsChartDropdownOpen] = useState(false);

  // X-axis metric state for marketplace benchmarking
  const [xAxisMetric, setXAxisMetric] = useState<XAxisMetric>('fundingAmount');

  // Scorecard control values state
  const [controlValues, setControlValues] = useState({
    tib: '5',
    seasonality: 'moderate',
    ue: '3.5',
    creditScore: '680',
    wh: '',
  });

  // Track which variables are currently shown
  const [shownVariables, setShownVariables] = useState<('tib' | 'seasonality' | 'ue' | 'creditScore' | 'wh')[]>([
    'tib',
    'seasonality',
    'ue',
    'creditScore',
  ]);

  // Calculate available variables (not currently shown)
  const availableVariables = (['tib', 'seasonality', 'ue', 'creditScore', 'wh'] as const).filter(
    (v) => !shownVariables.includes(v)
  );

  // Handle adding a new variable
  const handleAddVariable = (variableId: 'tib' | 'seasonality' | 'ue' | 'creditScore' | 'wh') => {
    setShownVariables((prev) => [...prev, variableId]);
    // Set a default value if empty
    if (!controlValues[variableId]) {
      const defaults: Record<string, string> = {
        tib: '5',
        seasonality: 'moderate',
        ue: '3.5',
        creditScore: '680',
        wh: '10',
      };
      setControlValues((prev) => ({ ...prev, [variableId]: defaults[variableId] }));
    }
  };

  // Insight panel open/close state
  const [marketplaceInsightsOpen, setMarketplaceInsightsOpen] = useState(false);
  const [funderInsightsOpen, setFunderInsightsOpen] = useState(false);

  // Refs for insight icon positioning and dropdown
  const marketplaceIconRef = useRef<HTMLDivElement>(null);
  const funderIconRef = useRef<HTMLDivElement>(null);
  const chartDropdownRef = useRef<HTMLDivElement>(null);

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

  // Placeholder for future use
  void handleDismissMarketplaceInsight;
  void handleDismissFunderInsight;

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isChartDropdownOpen &&
        chartDropdownRef.current &&
        !chartDropdownRef.current.contains(event.target as Node)
      ) {
        setIsChartDropdownOpen(false);
      }
    };

    if (isChartDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChartDropdownOpen]);

  // Drag end handler for section reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id as DashboardSectionId);
        const newIndex = items.indexOf(over.id as DashboardSectionId);
        const newOrder = arrayMove(items, oldIndex, newIndex);

        // Persist to localStorage
        localStorage.setItem(SECTION_STORAGE_KEY, JSON.stringify(newOrder));

        return newOrder;
      });
    }
  };

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
          disabled
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
              disabled
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
              <StatusCard
                status="stable"
                title="Stable pay"
                description="Tortor diam rhoncus lorem dapibus mauris malesuada aliquam cursus interdum. Enim aliquet"
                confidenceScore={51}
              />
            </section>

            {/* 2. Deal Metrics Grid (2x2) */}
            <section className="mb-9">
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

            {/* Drag-and-Drop Reorderable Sections */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sectionOrder}
                strategy={verticalListSortingStrategy}
              >
                {sectionOrder.map((sectionId) => (
                  <SortableSection key={sectionId} id={sectionId}>
                    {sectionId === 'performance' && (
                      <section className="mb-12">
              {/* Outer container with semi-transparent white background */}
              <div className="bg-white/40 rounded-lg p-6 flex flex-col gap-4">
                {/* Header row: Performance title + segmented control */}
                <div className="flex items-center justify-between w-full">
                  {/* Left: Performance title */}
                  <div className="flex gap-1 items-center">
                    <div className="rounded-lg p-2">
                      <TrendingUp className="w-6 h-6 text-black/70" />
                    </div>
                    <p className="text-[20px] font-medium leading-[2] text-black/70">
                      Performance
                    </p>
                  </div>

                  {/* Right: Segmented control */}
                  <div className="flex items-center h-6 rounded bg-gradient-to-r from-[rgba(0,0,51,0.058824)] to-[rgba(0,0,51,0.058824)] bg-[rgba(255,255,255,0.9)]">
                    <button
                      onClick={() => setPerformanceScenario('best')}
                      className={`h-full px-3 text-xs tracking-[0.04px] leading-4 transition-all rounded ${
                        performanceScenario === 'best'
                          ? 'bg-white border border-black/9 font-medium text-black/87'
                          : 'bg-transparent font-normal text-black/87'
                      }`}
                    >
                      Best
                    </button>
                    <button
                      onClick={() => setPerformanceScenario('conservative')}
                      className={`h-full px-3 text-xs tracking-[0.04px] leading-4 transition-all rounded ${
                        performanceScenario === 'conservative'
                          ? 'bg-white border border-black/9 font-medium text-black/87'
                          : 'bg-transparent font-normal text-black/87'
                      }`}
                    >
                      Conservative
                    </button>
                    <button
                      onClick={() => setPerformanceScenario('moderate')}
                      className={`h-full px-3 text-xs tracking-[0.04px] leading-4 transition-all rounded relative ${
                        performanceScenario === 'moderate'
                          ? 'bg-white border border-black/9 font-medium text-black/87'
                          : 'bg-transparent font-normal text-black/87'
                      }`}
                    >
                      Moderate
                    </button>
                  </div>
                </div>

                {/* Inner chart card */}
                <div className="bg-[#faf8f5] rounded-lg px-6 py-8 flex flex-col h-[300px]">
                  {/* Chart type dropdown */}
                  <div ref={chartDropdownRef} className="relative w-fit mb-12">
                    <button
                      onClick={() => setIsChartDropdownOpen(!isChartDropdownOpen)}
                      className="flex items-center gap-[2px] px-0 py-0 text-sm font-semibold text-[#594c56] uppercase tracking-[0.28px] hover:bg-black/5 rounded transition-colors"
                    >
                      {selectedChart === 'dealRange' ? 'DEAL RANGE' : 'PAYMENT TIMELINE'}
                      <ChevronDown className="w-6 h-6" />
                    </button>

                    {/* Dropdown menu */}
                    {isChartDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-black/10 py-1 z-50 min-w-[180px]">
                        <button
                          onClick={() => {
                            setSelectedChart('dealRange');
                            setIsChartDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-black/5 transition-colors ${
                            selectedChart === 'dealRange' ? 'bg-black/5 font-medium' : ''
                          }`}
                        >
                          Deal Range
                        </button>
                        <button
                          onClick={() => {
                            setSelectedChart('paymentTimeline');
                            setIsChartDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-black/5 transition-colors ${
                            selectedChart === 'paymentTimeline' ? 'bg-black/5 font-medium' : ''
                          }`}
                        >
                          Payment Timeline
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Chart container */}
                  <div className="flex-1 min-h-0">
                    {selectedChart === 'dealRange' ? (
                      <DealRangeChart scenario={performanceScenario} />
                    ) : (
                      <PaymentCurveChart scenario={performanceScenario} />
                    )}
                  </div>
                </div>
              </div>
                      </section>
                    )}

                    {sectionId === 'composite-score' && (
                      <section className="mb-12">
              <CompositeScoreCard
                grade="A"
                description="Strong revenue predictability"
                controls={shownVariables.map((variableId) => {
                  const labelMap = {
                    tib: 'Time in Business',
                    seasonality: 'Seasonality',
                    ue: 'Macro Unemployment',
                    creditScore: 'Credit Score',
                    wh: 'Warehouse Lending',
                  };
                  return {
                    variableId,
                    label: labelMap[variableId],
                    value: controlValues[variableId],
                    onChange: (val: string) => setControlValues(prev => ({ ...prev, [variableId]: val }))
                  };
                })}
                onSettingsClick={() => console.log('Settings clicked')}
                onAddVariable={handleAddVariable}
                availableVariables={availableVariables}
              />
                      </section>
                    )}

                    {sectionId === 'benchmarking' && (
                      <section className="mb-12">
              {/* Outer container with semi-transparent white background */}
              <div className="bg-white/40 rounded-lg p-6 flex flex-col gap-3">
                {/* Header row: Benchmarking title + segmented control */}
                <div className="flex items-center justify-between w-full">
                  {/* Left: Benchmarking title */}
                  <div className="flex gap-1 items-center">
                    <div className="rounded-lg p-2">
                      <Target className="w-6 h-6 text-black/70" />
                    </div>
                    <p className="text-[20px] font-medium leading-[2] text-black/70">
                      Benchmarking
                    </p>
                  </div>

                  {/* Right: X-axis metric segmented control */}
                  <div className="flex items-center h-6 rounded bg-gradient-to-r from-[rgba(0,0,51,0.058824)] to-[rgba(0,0,51,0.058824)] bg-[rgba(255,255,255,0.9)]">
                    <button
                      onClick={() => setXAxisMetric('fundingAmount')}
                      className={`h-full px-3 text-xs tracking-[0.04px] leading-4 transition-all rounded ${
                        xAxisMetric === 'fundingAmount'
                          ? 'bg-white border border-black/9 font-medium text-black/87'
                          : 'bg-transparent font-normal text-black/87'
                      }`}
                    >
                      Funding
                    </button>
                    <button
                      onClick={() => setXAxisMetric('tib')}
                      className={`h-full px-3 text-xs tracking-[0.04px] leading-4 transition-all rounded ${
                        xAxisMetric === 'tib'
                          ? 'bg-white border border-black/9 font-medium text-black/87'
                          : 'bg-transparent font-normal text-black/87'
                      }`}
                    >
                      TIB
                    </button>
                    <button
                      onClick={() => setXAxisMetric('industry')}
                      className={`h-full px-3 text-xs tracking-[0.04px] leading-4 transition-all rounded ${
                        xAxisMetric === 'industry'
                          ? 'bg-white border border-black/9 font-medium text-black/87'
                          : 'bg-transparent font-normal text-black/87'
                      }`}
                    >
                      Industry
                    </button>
                    <button
                      onClick={() => setXAxisMetric('region')}
                      className={`h-full px-3 text-xs tracking-[0.04px] leading-4 transition-all rounded ${
                        xAxisMetric === 'region'
                          ? 'bg-white border border-black/9 font-medium text-black/87'
                          : 'bg-transparent font-normal text-black/87'
                      }`}
                    >
                      Region
                    </button>
                  </div>
                </div>

                {/* Marketplace Chart Card */}
                <div className="bg-[#faf8f5] rounded-lg px-6 py-8 flex flex-col h-[395px] shadow-md relative">
                  <div className="flex items-start justify-between mb-3 relative">
                    <p className="text-sm font-semibold text-[#594c56] tracking-[0.28px] uppercase">
                      marketplace
                    </p>

                    <div className="relative">
                      {/* Insight Panel */}
                      <InsightPanel
                        insights={activeMarketplaceInsights}
                        isOpen={marketplaceInsightsOpen}
                        onClose={() => setMarketplaceInsightsOpen(false)}
                        anchorRef={marketplaceIconRef}
                      />

                      {/* Icon button with red notification badge */}
                      <div ref={marketplaceIconRef} className="relative">
                        <ButtonBaseUIWrapper
                          variant="ghost"
                          size="icon-lg"
                          aria-label="Marketplace insights"
                          onClick={() => setMarketplaceInsightsOpen(!marketplaceInsightsOpen)}
                        >
                          <Lightbulb className="w-6 h-6" />
                        </ButtonBaseUIWrapper>
                        {/* Red notification badge */}
                        {activeMarketplaceInsights.length > 0 && (
                          <div className="absolute top-[5px] left-[24px] w-2 h-2 bg-[#ff0303] rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Chart container */}
                  <div className="flex-1 min-h-0">
                    <ScatterPlotChart
                      variant="marketplace"
                      xAxisMetric={xAxisMetric}
                      currentDealData={{
                        fundingAmount: grossFunding,
                        moic: moic,
                      }}
                    />
                  </div>
                </div>

                {/* Your Portfolio Chart Card */}
                <div className="bg-[#faf8f5] rounded-lg px-6 py-8 flex flex-col h-[395px] shadow-md relative">
                  <div className="flex items-start justify-between mb-3 relative">
                    <p className="text-sm font-semibold text-[#594c56] tracking-[0.28px] uppercase">
                      your portfolio
                    </p>

                    <div className="relative">
                      {/* Insight Panel */}
                      <InsightPanel
                        insights={activeFunderInsights}
                        isOpen={funderInsightsOpen}
                        onClose={() => setFunderInsightsOpen(false)}
                        anchorRef={funderIconRef}
                      />

                      {/* Icon button with red notification badge */}
                      <div ref={funderIconRef} className="relative">
                        <ButtonBaseUIWrapper
                          variant="ghost"
                          size="icon-lg"
                          aria-label="Portfolio insights"
                          onClick={() => setFunderInsightsOpen(!funderInsightsOpen)}
                        >
                          <Lightbulb className="w-6 h-6" />
                        </ButtonBaseUIWrapper>
                        {/* Red notification badge */}
                        {activeFunderInsights.length > 0 && (
                          <div className="absolute top-[5px] left-[24px] w-2 h-2 bg-[#ff0303] rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Chart container */}
                  <div className="flex-1 min-h-0">
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
              </div>
                      </section>
                    )}

                    {sectionId === 'background-check' && (
                      <section className="mb-12">
              {/* Outer container with semi-transparent white background */}
              <div className="bg-white/40 rounded-lg p-6 flex flex-col gap-4">
                {/* Header row: title + export button */}
                <div className="flex items-center justify-between w-full">
                  {/* Left: Background check title with icon */}
                  <div className="flex gap-1 items-center">
                    <div className="rounded-lg p-2">
                      <ShieldCheck className="w-6 h-6 text-black/70" />
                    </div>
                    <p className="text-[20px] font-medium leading-[2] text-black/70 tracking-[0.15px]">
                      Background check
                    </p>
                  </div>

                  {/* Right: Export button */}
                  <ButtonBaseUIWrapper
                    variant="ghost"
                    size="icon-lg"
                    aria-label="Export background check"
                    className="p-[5px]"
                  >
                    <ExternalLink className="w-6 h-6 text-black/70" />
                  </ButtonBaseUIWrapper>
                </div>

                {/* Cards container */}
                <div className="rounded overflow-hidden bg-neutral-400 shadow-md">
                  <div className="grid grid-cols-2 gap-[2px]">
                    <BackgroundCheckCard variant="checklist" noBorder noRounded />
                    <BackgroundCheckCard variant="data-merch" noBorder noRounded />
                    <BackgroundCheckCard variant="perplexity" noBorder noRounded className="col-span-2" />
                  </div>
                </div>
              </div>
                      </section>
                    )}

                    {sectionId === 'portfolio-risk' && (
                      <section className="mb-12">
                        <PortfolioRiskCard />
                      </section>
                    )}
                  </SortableSection>
                ))}
              </SortableContext>
            </DndContext>

          </div>
        </main>
      </div>
    </div>
  );
}
