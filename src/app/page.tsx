'use client';

import { useState } from 'react';
import { customerJourneyStages } from '@/lib/journeyData';
import Navigation from '@/app/components/Navigation';
import Link from 'next/link';
import { 
  ChartBarIcon,
  CheckCircleIcon,
  TagIcon,
  RocketLaunchIcon,
  ChartPieIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightIcon,
  BuildingOfficeIcon,
  RadioIcon,
  MapIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  CircleStackIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Define phases with OneSignal-inspired minimal color scheme
const phases = [
  {
    id: 1,
    title: "Data Ingestion",
    subtitle: "Getting Started",
    stages: [customerJourneyStages[0]],
    color: "primary",
    icon: ChartBarIcon
  },
  {
    id: 2,
    title: "Data Validation",
    subtitle: "Verification",
    stages: [customerJourneyStages[1]],
    color: "navy",
    icon: CheckCircleIcon
  },
  {
    id: 3,
    title: "Targeting Logic",
    subtitle: "Strategy",
    stages: [customerJourneyStages[2]],
    color: "primary",
    icon: TagIcon
  },
  {
    id: 4,
    title: "Campaign Building",
    subtitle: "Execution",
    stages: [customerJourneyStages[3]],
    color: "navy",
    icon: RocketLaunchIcon
  },
  {
    id: 5,
    title: "Performance Analysis",
    subtitle: "Optimization",
    stages: [customerJourneyStages[4]],
    color: "primary",
    icon: ChartPieIcon
  }
];

const colorSchemes = {
  primary: {
    bg: "glass-card border-primary-200/50 dark:border-primary-800/50",
    border: "border-primary-200/50 dark:border-primary-800/50",
    header: "bg-primary-100/50 dark:bg-primary-900/50",
    text: "text-text-primary",
    accent: "text-primary-600"
  },
  navy: {
    bg: "glass-card border-navy-200/50 dark:border-navy-800/50", 
    border: "border-navy-200/50 dark:border-navy-800/50",
    header: "bg-navy-100/50 dark:bg-navy-900/50",
    text: "text-text-primary",
    accent: "text-navy-600 dark:text-navy-400"
  }
};

const exploreCards = [
  {
    title: "Industry Use Cases",
    description: "See OneSignal Events in action across Gaming, News & Media, Fintech, and Food Delivery with detailed customer experience examples.",
    icon: BuildingOfficeIcon,
    href: "/verticals",
    color: "glass-card border-primary-200/50 dark:border-primary-800/50 hover:border-primary-300/50 dark:hover:border-primary-700/50",
    stats: ["Gaming IAP +28% conversion", "News +3x subscription rate", "Fintech +85% goal completion", "Smart exit conditions prevent over-messaging"]
  },
  {
    title: "Event Data Platform",
    description: "Learn about different event types, data ingestion methods, and how events can trigger journeys or serve as wait/exit conditions.",
    icon: RadioIcon,
    href: "/events",
    color: "glass-card border-navy-200/50 dark:border-navy-800/50 hover:border-navy-300/50 dark:hover:border-navy-700/50",
    stats: ["Message Events (ready now)", "Custom Events (your data)", "5 ingestion methods"]
  },
  {
    title: "Strategy Guide",
    description: "Understand when to use event-triggered journeys vs segment-based campaigns, including advanced exit logic.",
    icon: MapIcon,
    href: "/comparison",
    color: "glass-card border-primary-200/50 dark:border-primary-800/50 hover:border-primary-300/50 dark:hover:border-primary-700/50",
    stats: ["Event-triggered (available)", "Segment-based (planned)", "Automatic exit on goal completion"]
  }
];

export default function HomePage() {
  const [expandedStages, setExpandedStages] = useState<number[]>([]);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const toggleStageExpanded = (stageId: number) => {
    setExpandedStages(prev => 
      prev.includes(stageId) 
        ? prev.filter(id => id !== stageId)
        : [...prev, stageId]
    );
  };

  const togglePhaseExpanded = (phaseId: number) => {
    setExpandedPhase(prev => prev === phaseId ? null : phaseId);
  };

  return (
    <>
      <Navigation currentPage="home" />
      <div className="min-h-screen bg-surface pt-16">
        {/* Header Section */}
        <header className="relative px-6 pt-8 pb-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/50 px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300 ring-1 ring-primary-200 dark:ring-primary-800">
                Customer Experience Model
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              OneSignal Events
              <span className="text-primary-600"> Customer Experience</span>
            </h1>
            <p className="mt-4 text-lg leading-8 text-text-secondary max-w-3xl mx-auto">
              Complete flow mapping from data discovery to campaign optimization, highlighting pain points and solutions at each critical stage.
            </p>
          </div>
        </header>

        {/* Kanban Board Layout */}
        <section className="px-6 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            {expandedPhase ? (
              /* Expanded Phase Layout - Full Width Rows */
              <div className="space-y-8">
                {/* Expanded Phase */}
                {phases.filter(phase => phase.id === expandedPhase).map((phase) => {
                  const colors = colorSchemes[phase.color as keyof typeof colorSchemes];
                  const PhaseIcon = phase.icon;
                  return (
                    <div
                      key={phase.id}
                      className={`${colors.bg} rounded-xl p-8 w-full transition-all duration-300 hover:shadow-lg`}
                    >
                      {/* Phase Header - Expanded */}
                      <div 
                        className={`${colors.header} rounded-lg p-6 mb-8 cursor-pointer hover:opacity-90 transition-opacity`}
                        onClick={() => togglePhaseExpanded(phase.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center h-full">
                              <PhaseIcon className="w-10 h-10 text-primary-600" />
                            </div>
                            <div className="text-left">
                              <h3 className={`font-bold text-3xl ${colors.text}`}>
                                {phase.title}
                              </h3>
                              <p className={`text-xl ${colors.accent} font-medium`}>
                                {phase.subtitle}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-text-secondary font-medium">Click to collapse</span>
                            <ChevronUpIcon className="w-6 h-6 text-text-tertiary" />
                          </div>
                        </div>
                      </div>

                      {/* Stage Cards - Full Width Row Layout */}
                      <div className="space-y-6">
                        {phase.stages.map((stage) => (
                          <div
                            key={stage.id}
                            className="glass-card rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
                          >
                            {/* Stage Header */}
                            <div 
                              className="p-6 cursor-pointer"
                              onClick={() => toggleStageExpanded(stage.id)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-text-primary text-xl mb-4 leading-tight">
                                    {stage.title.replace(/^Stage \d+: /, '')}
                                  </h4>
                                  <div className="flex flex-wrap gap-3 mb-4">
                                    <span className="inline-flex items-center text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/50 px-3 py-2 rounded-full gap-1">
                                      <ExclamationTriangleIcon className="w-4 h-4" />
                                      Pain Point
                                    </span>
                                    <span className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/50 px-3 py-2 rounded-full gap-1">
                                      <CheckCircleIcon className="w-4 h-4" />
                                      Solution
                                    </span>
                                  </div>
                                  <p className="text-text-secondary leading-relaxed">
                                    {stage.marketerGoal}
                                  </p>
                                </div>
                                <div className={`transform transition-transform duration-200 ${expandedStages.includes(stage.id) ? 'rotate-180' : ''} ml-4`}>
                                  <ChevronDownIcon className="w-5 h-5 text-text-tertiary" />
                                </div>
                              </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedStages.includes(stage.id) && (
                              <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                                <div className="border-t border-text-primary pt-6 space-y-6">
                                  {/* Pain Point */}
                                  <div>
                                    <h5 className="text-sm font-semibold text-red-700 mb-3 flex items-center">
                                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                      Current Pain Point
                                    </h5>
                                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                                      <p className="text-sm text-red-700 leading-relaxed">
                                        {stage.currentPainPoint}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Solution */}
                                  <div>
                                    <h5 className="text-sm font-semibold text-green-700 mb-3 flex items-center">
                                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                      OneSignal Solution
                                    </h5>
                                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                                      <p className="text-sm text-green-700 leading-relaxed">
                                        {stage.oneSignalEventsSolution}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Event Data Example */}
                                  {stage.exampleEventDataFocus && (
                                    <div>
                                      <h5 className="text-sm font-semibold text-text-700 mb-3 flex items-center">
                                        <div className="w-2 h-2 bg-text-500 rounded-full mr-3"></div>
                                        Event Data Examples
                                      </h5>
                                      <div className="space-y-4">
                                        <div className="bg-text-50 border border-text-200 rounded-lg p-4">
                                          <code className="text-sm text-text-800 font-mono break-all">
                                            {stage.exampleEventDataFocus}
                                          </code>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Collapsed Phase Previews */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-text-700 mb-4">Other Phases</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {phases.filter(phase => phase.id !== expandedPhase).map((phase) => {
                      const colors = colorSchemes[phase.color as keyof typeof colorSchemes];
                      const PhaseIcon = phase.icon;
                      return (
                        <div
                          key={phase.id}
                          className={`${colors.bg} ${colors.border} border-2 rounded-xl p-4 cursor-pointer hover:scale-105 transition-all duration-200`}
                          onClick={() => togglePhaseExpanded(phase.id)}
                        >
                          <div className={`${colors.header} rounded-lg p-4 text-center`}>
                            <div className="text-3xl mb-2">
                              <div className="flex items-center justify-center h-full">
                                <PhaseIcon className="w-10 h-10 text-primary-600" />
                              </div>
                            </div>
                            <h3 className={`font-bold text-sm ${colors.text}`}>
                              {phase.title}
                            </h3>
                            <p className={`text-xs ${colors.accent} font-medium`}>
                              {phase.subtitle}
                            </p>
                            <p className="text-xs text-text-500 mt-2">Click to expand</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Compact Preview Cards Layout */
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold text-text-primary mb-2">Customer Experience Phases</h2>
                  <p className="text-text-secondary">Click any phase to explore the detailed journey</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 relative">
                  {/* Connector lines between cards */}
                  <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-primary-200/50 -translate-y-1/2 z-0" />
                  
                  {phases.map((phase, index) => {
                    const colors = colorSchemes[phase.color as keyof typeof colorSchemes];
                    const PhaseIcon = phase.icon;
                    return (
                      <div
                        key={phase.id}
                        className="relative z-10 flex"
                      >
                        <div
                          className={`${colors.bg} ${colors.border} border rounded-xl p-4 cursor-pointer hover:scale-102 hover:shadow-md transition-all duration-200 group flex-1 flex flex-col min-h-[320px]`}
                          onClick={() => togglePhaseExpanded(phase.id)}
                        >
                          <div className={`${colors.header} rounded-lg p-6 text-center flex-1 flex flex-col`}>
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center h-20">
                              <div className="flex items-center justify-center h-full">
                                <PhaseIcon className="w-10 h-10 text-primary-600" />
                              </div>
                            </div>
                            <h3 className={`font-bold text-lg ${colors.text} mb-2`}>
                              {phase.title}
                            </h3>
                            <p className={`text-sm ${colors.accent} font-medium mb-4 flex-1`}>
                              {phase.subtitle}
                            </p>
                            
                            {/* View details CTA */}
                            <button 
                              className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-text-secondary hover:text-text-800 bg-white/80 hover:bg-white border border-text-200 rounded transition-colors duration-200 group-hover:border-text-300 mx-auto w-24"
                            >
                              View details
                              <ArrowRightIcon className="w-3 h-3 ml-1 opacity-70" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Arrow for all cards except the last one */}
                        {index < phases.length - 1 && (
                          <div className="hidden lg:flex items-center justify-center" style={{ width: '4rem', margin: '0 -2rem' }}>
                            <div className="relative">
                              <div className="absolute w-full h-px bg-primary-300" style={{ width: '4rem' }}></div>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary-400">
                                  <path d="M12.6 12L8.7 8.1a1 1 0 011.4-1.4l4.9 4.9a1 1 0 010 1.4l-4.9 4.9a1 1 0 01-1.4-1.4l3.9-3.9z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Explore More Sections */}
        <section className="px-6 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">Explore OneSignal Events</h2>
              <p className="text-text-secondary">Dive deeper into specific aspects of event-driven customer experiences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exploreCards.map((card, index) => {
                const CardIcon = card.icon;
                return (
                  <Link key={index} href={card.href}>
                    <div className={`${card.color} border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}>
                      <div className="flex items-center space-x-3 mb-4">
                        <CardIcon className="w-8 h-8 text-primary-600" />
                        <h3 className="font-bold text-lg text-text-primary">{card.title}</h3>
                      </div>
                      
                      <p className="text-text-secondary mb-4 leading-relaxed">{card.description}</p>
                      
                      <div className="space-y-2">
                        {card.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="flex items-center space-x-2">
                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-text-secondary">{stat}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex items-center text-primary-600 font-medium">
                        <span className="text-sm">Explore section</span>
                        <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
