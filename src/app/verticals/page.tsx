'use client';

import { useState } from 'react';
import { verticalExamples, VerticalExample, CustomerJourney, JourneyStep } from '@/lib/verticalJourneys';
import Navigation from '@/app/components/Navigation';
import { 
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  DeviceTabletIcon,
  BoltIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ClockIcon,
  SparklesIcon,
  TrophyIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  NewspaperIcon,
  PuzzlePieceIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const channelIcons = {
  push: DevicePhoneMobileIcon,
  email: EnvelopeIcon, 
  sms: ChatBubbleLeftRightIcon,
  'in-app': DeviceTabletIcon,
  'live-activity': BoltIcon
};

const channelColors = {
  push: 'bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300 border-primary-200 dark:border-primary-800',
  email: 'bg-navy-100 dark:bg-navy-900/50 text-navy-800 dark:text-navy-300 border-navy-200 dark:border-navy-800',
  sms: 'bg-brand-100 dark:bg-brand-900/50 text-brand-800 dark:text-brand-300 border-brand-200 dark:border-brand-800',
  'in-app': 'bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300 border-primary-200 dark:border-primary-800',
  'live-activity': 'bg-navy-100 dark:bg-navy-900/50 text-navy-800 dark:text-navy-300 border-navy-200 dark:border-navy-800'
};

const verticalColors = {
  primary: {
    bg: 'glass-card border-primary-200/50 dark:border-primary-800/50',
    border: 'border-primary-200/50 dark:border-primary-800/50',
    header: 'bg-primary-100/50 dark:bg-primary-900/50',
    text: 'text-text-primary',
    accent: 'text-primary-600'
  },
  navy: {
    bg: 'glass-card border-navy-200/50 dark:border-navy-800/50', 
    border: 'border-navy-200/50 dark:border-navy-800/50',
    header: 'bg-navy-100/50 dark:bg-navy-900/50',
    text: 'text-text-primary',
    accent: 'text-navy-600 dark:text-navy-400'
  }
};

function JourneyStepCard({ step }: { step: JourneyStep }) {
  const ChannelIcon = channelIcons[step.channel];
  
  return (
    <div className="glass-card rounded-lg p-4 hover:shadow-lg transition-all duration-300 border border-border/50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <ChannelIcon className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h4 className="font-semibold text-text-primary">{step.title}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${channelColors[step.channel]}`}>
                {step.channel.toUpperCase()}
              </span>
              <span className="text-xs text-text-tertiary">{step.timing}</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-text-secondary mb-3 leading-relaxed">{step.content}</p>
      
      {step.personalization && (
        <div className="glass-card rounded p-3 mb-3 border border-primary-200/50 dark:border-primary-800/50">
          <h5 className="text-xs font-semibold text-primary-700 dark:text-primary-300 mb-1 flex items-center gap-1">
            <SparklesIcon className="w-3 h-3" />
            Personalization
          </h5>
          <p className="text-xs text-primary-600 dark:text-primary-400">{step.personalization}</p>
        </div>
      )}
      
      {step.cta && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-tertiary">CTA: {step.cta}</span>
          {step.eventToLog && (
            <code className="text-xs bg-surface-elevated px-2 py-1 rounded font-mono text-text-secondary">
              {step.eventToLog}
            </code>
          )}
        </div>
      )}
    </div>
  );
}

function JourneyCard({ journey, vertical }: { journey: CustomerJourney; vertical: VerticalExample }) {
  const [expanded, setExpanded] = useState(false);
  const colors = verticalColors[vertical.color as keyof typeof verticalColors];
  
  return (
    <div className={`${colors.bg} rounded-xl p-6 mb-6 transition-all duration-300 hover:shadow-lg`}>
      <div 
        className="cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className={`font-bold text-lg ${colors.text} mb-2`}>{journey.name}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${journey.type === 'event-triggered' ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300' : 'bg-navy-100 dark:bg-navy-900/50 text-navy-700 dark:text-navy-300'}`}>
                {journey.type === 'event-triggered' ? (
                  <>
                    <BoltIcon className="w-3 h-3" />
                    Event-Triggered
                  </>
                ) : (
                  <>
                    <UserGroupIcon className="w-3 h-3" />
                    Segment-Based
                  </>
                )}
              </span>
              {journey.exitCondition && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" />
                  Smart Exit
                </span>
              )}
            </div>
            <p className="text-sm text-text-secondary mb-3">{journey.description}</p>
            <div className="glass-card rounded p-3 mb-3">
              <h5 className="text-xs font-semibold text-text-primary mb-1 flex items-center gap-1">
                <TrophyIcon className="w-3 h-3 text-primary-600" />
                Business Goal
              </h5>
              <p className="text-sm text-text-secondary">{journey.businessGoal}</p>
            </div>
          </div>
          <div className={`transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
            <ChevronDownIcon className="w-5 h-5 text-text-tertiary" />
          </div>
        </div>
        
        <div className="glass-card rounded p-3 mb-3">
          <h5 className="text-xs font-semibold text-text-primary mb-2 flex items-center gap-1">
            <BoltIcon className="w-3 h-3 text-green-600" />
            Trigger Event
          </h5>
          <div className="flex items-center space-x-2">
            <code className="text-sm bg-surface-elevated text-text-primary px-2 py-1 rounded font-mono">
              {journey.trigger.eventName}
            </code>
            <span className="text-sm text-text-secondary">{journey.trigger.description}</span>
          </div>
        </div>

        {journey.exitCondition && (
          <div className="glass-card rounded p-3 border border-primary-200/50 dark:border-primary-800/50">
            <h5 className="text-xs font-semibold text-primary-700 dark:text-primary-300 mb-2 flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              Journey Auto-Exits When
            </h5>
            <div className="flex items-center space-x-2">
              <code className="text-sm bg-primary-800 text-white px-2 py-1 rounded font-mono">
                {journey.exitCondition.eventName}
              </code>
              <span className="text-sm text-primary-600 dark:text-primary-400">{journey.exitCondition.description}</span>
            </div>
            <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Prevents over-messaging when goal is achieved</p>
          </div>
        )}
      </div>
      
      {expanded && (
        <div className="mt-6 animate-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {journey.steps.map((step) => (
              <JourneyStepCard key={step.id} step={step} />
            ))}
          </div>
          
          {journey.exitCondition && (
            <div className="glass-card border border-primary-200/50 dark:border-primary-800/50 rounded p-4 mb-4">
              <h5 className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-3 flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                Smart Journey Logic
              </h5>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h6 className="text-sm font-medium text-text-primary">Automatic Exit</h6>
                    <p className="text-sm text-text-secondary">Journey stops when user achieves the goal, preventing irrelevant messages</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h6 className="text-sm font-medium text-text-primary">Wait for Events</h6>
                    <p className="text-sm text-text-secondary">Each step can wait for specific user actions before proceeding</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h6 className="text-sm font-medium text-text-primary">Real-time Response</h6>
                    <p className="text-sm text-text-secondary">Instantly adapts based on user behavior, no manual intervention needed</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 p-3 glass-card rounded">
                <div className="flex items-center space-x-2">
                  <code className="text-sm bg-primary-800 text-white px-2 py-1 rounded font-mono">
                    {journey.exitCondition.eventName}
                  </code>
                  <span className="text-sm text-primary-600 dark:text-primary-400">{journey.exitCondition.description}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="glass-card rounded-lg p-4">
            <h5 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <ChartBarIcon className="w-4 h-4 text-green-500" />
              Expected Outcomes
            </h5>
            <ul className="space-y-2">
              {journey.expectedOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-text-secondary">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function CollapsedVerticalCard({ vertical, onClick }: { vertical: VerticalExample; onClick: () => void }) {
  const colors = verticalColors[vertical.color as keyof typeof verticalColors];
  
  // Map industry names to appropriate icons
  const getIndustryIcon = (industry: string) => {
    switch (industry.toLowerCase()) {
      case 'gaming':
        return PuzzlePieceIcon;
      case 'news & media':
        return NewspaperIcon;
      case 'fintech':
        return CurrencyDollarIcon;
      case 'food delivery':
        return ShoppingCartIcon;
      default:
        return UserGroupIcon;
    }
  };
  
  const IndustryIcon = getIndustryIcon(vertical.industry);
  
  return (
    <div 
      onClick={onClick}
      className={`${colors.bg} rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 h-full transform hover:-translate-y-1`}
    >
      <div className="flex items-center space-x-3 mb-3">
        <IndustryIcon className="w-10 h-10 text-primary-600" />
        <div>
          <h2 className={`text-xl font-bold ${colors.text}`}>{vertical.industry}</h2>
          <p className={`text-sm ${colors.accent} font-medium`}>{vertical.companyExample}</p>
        </div>
      </div>
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">{vertical.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">4 Journeys</span>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-navy-100 dark:bg-navy-900/50 text-navy-700 dark:text-navy-300">{vertical.keyEvents.length} Events</span>
        </div>
        <ChevronDownIcon className="w-5 h-5 text-text-tertiary" />
      </div>
    </div>
  );
}

function VerticalCard({ vertical, isExpanded, onToggle }: { 
  vertical: VerticalExample; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [activeJourney, setActiveJourney] = useState<'onboarding' | 'engagement' | 'conversion' | 'retention'>('onboarding');
  const colors = verticalColors[vertical.color as keyof typeof verticalColors];
  
  if (!isExpanded) {
    return <CollapsedVerticalCard vertical={vertical} onClick={onToggle} />;
  }

  // Map industry names to appropriate icons
  const getIndustryIcon = (industry: string) => {
    switch (industry.toLowerCase()) {
      case 'gaming':
        return PuzzlePieceIcon;
      case 'news & media':
        return NewspaperIcon;
      case 'fintech':
        return CurrencyDollarIcon;
      case 'food delivery':
        return ShoppingCartIcon;
      default:
        return UserGroupIcon;
    }
  };
  
  const IndustryIcon = getIndustryIcon(vertical.industry);

  const journeys = {
    onboarding: vertical.onboardingJourney,
    engagement: vertical.engagementJourney,
    conversion: vertical.conversionJourney,
    retention: vertical.retentionJourney
  };
  
  const journeyLabels = {
    onboarding: 'Onboarding',
    engagement: 'Engagement', 
    conversion: 'Conversion',
    retention: 'Retention'
  };
  
  return (
    <div className="glass-card rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className={`${colors.header} p-6 border-b border-border/50`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <IndustryIcon className="w-10 h-10 text-primary-600" />
              <div>
                <h2 className={`text-2xl font-bold ${colors.text}`}>{vertical.industry}</h2>
                <p className={`text-sm ${colors.accent} font-medium`}>{vertical.companyExample}</p>
              </div>
            </div>
            <p className="text-text-secondary mb-4">{vertical.description}</p>
            
            {/* Problem Statement */}
            <div className="glass-card border border-red-200/50 dark:border-red-800/50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
                <ExclamationTriangleIcon className="w-4 h-4" />
                Current Problem
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">{vertical.problemStatement}</p>
            </div>
            
            {/* Solution Benefits */}
            <div className="glass-card border border-primary-200/50 dark:border-primary-800/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-primary-800 dark:text-primary-200 mb-3 flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4" />
                OneSignal Events Solution Benefits
              </h4>
              <ul className="space-y-2">
                {vertical.solutionBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button 
            onClick={onToggle}
            className="ml-4 p-2 hover:bg-surface-elevated rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Journey Tabs */}
      <div className="border-b border-border/50">
        <div className="flex">
          {(Object.keys(journeys) as Array<keyof typeof journeys>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveJourney(key)}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeJourney === key
                  ? 'border-primary-500 text-primary-600 bg-primary-50 dark:bg-primary-900/50'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
              }`}
            >
              {journeyLabels[key]}
            </button>
          ))}
        </div>
      </div>
      
      {/* Active Journey */}
      <div className="p-6">
        <JourneyCard journey={journeys[activeJourney]} vertical={vertical} />
      </div>
      
      {/* Key Events */}
      <div className="bg-surface-elevated p-6 border-t border-border/50">
        <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <BoltIcon className="w-5 h-5 text-primary-600" />
          Key Events Tracked
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {vertical.keyEvents.slice(0, 6).map((event, index) => (
            <div key={index} className="glass-card rounded p-3">
              <div className="flex items-start justify-between">
                <div>
                  <code className="text-sm font-mono text-primary-600 dark:text-primary-400 font-medium">
                    {event.eventName}
                  </code>
                  <p className="text-xs text-text-tertiary mt-1">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VerticalsPage() {
  const [expandedVertical, setExpandedVertical] = useState<string | null>(null);

  return (
    <>
      <Navigation currentPage="verticals" />
      <div className="min-h-screen bg-surface pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 text-center">
              <div className="mb-4">
                <span className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/50 px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300 ring-1 ring-primary-200 dark:ring-primary-800">
                  Industry Use Cases
                </span>
              </div>
              <h1 className="text-3xl font-bold text-text-primary mb-2 sm:text-4xl">
                OneSignal Events in 
                <span className="text-primary-600"> Real Industries</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Explore how OneSignal Events powers customer journeys across Gaming, News & Media, Fintech, and Food Delivery with detailed customer experience examples.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verticalExamples.map((vertical) => (
                <div key={vertical.industry} className={expandedVertical === vertical.industry ? "col-span-full" : ""}>
                  <VerticalCard 
                    vertical={vertical}
                    isExpanded={expandedVertical === vertical.industry}
                    onToggle={() => setExpandedVertical(
                      expandedVertical === vertical.industry ? null : vertical.industry
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 