'use client';

import { useState } from 'react';
import Navigation from '@/app/components/Navigation';
import { 
  BoltIcon, 
  TagIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ClockIcon,
  ChevronDownIcon,
  LightBulbIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const comparisonData = {
  eventTriggered: {
    title: 'Event-Triggered Journeys',
    subtitle: 'Real-time response to user actions',
    icon: BoltIcon,
    color: 'green',
    description: 'Automatically start a campaign when a user does something in real time. Journeys can wait for specific events before proceeding and auto-exit when goals are achieved.',
    availability: 'Available Now',
    bestFor: [
      'Real-time response to user actions',
      'Automatic exit when goals completed',
      'Simple triggers with complex logic'
    ],
    limitations: [
      'Limited to single event triggers',
      'Cannot combine multiple conditions upfront',
      'Best for sequential, event-driven flows'
    ],
    examples: [
      {
        title: 'Savings Goal Funding Reminder',
        industry: 'Fintech',
        trigger: 'User sets up a savings goal but doesn&apos;t fund it within 3 days',
        description: 'When a user creates a savings goal, OneSignal automatically enrolls them in a "Savings Goal Funding" journey. After a 3-day wait, if they haven\'t funded their goal, they start receiving helpful messages to encourage completion.',
        flow: [
          {
            step: 1,
            action: 'User creates savings goal',
            timing: 'Immediate',
            result: 'Enrolled in journey'
          },
          {
            step: 2,
            action: '3-day wait period',
            timing: 'Day 3',
            result: 'Check if goal funded'
          },
          {
            step: 3,
            action: 'If funded: Exit journey',
            timing: 'Any time',
            result: 'Move to celebration journey'
          },
          {
            step: 4,
            action: 'If not funded: Send reminders',
            timing: 'Day 3+',
            result: 'Encouraging messages sent'
          }
        ],
        benefits: [
          'Immediate enrollment based on behavior',
          'Real-time response to user actions',
          'Simple setup without complex rules',
          'Automatic exit when goal is achieved'
        ]
      },
      {
        title: 'Cart Abandonment Recovery',
        industry: 'E-commerce',
        trigger: 'User adds items to cart but doesn\'t complete checkout within 15 minutes',
        description: 'When a customer abandons their cart, immediately start a recovery sequence with personalized reminders and incentives.',
        flow: [
          {
            step: 1,
            action: 'Cart abandonment detected',
            timing: 'Immediate',
            result: 'Journey triggered'
          },
          {
            step: 2,
            action: 'Send reminder push notification',
            timing: '15 minutes',
            result: 'Gentle reminder sent'
          },
          {
            step: 3,
            action: 'Send email with incentive',
            timing: '2 hours',
            result: 'Discount offer sent'
          },
          {
            step: 4,
            action: 'Final SMS with urgency',
            timing: '24 hours',
            result: 'Last chance message'
          }
        ],
        benefits: [
          'Immediate response to abandonment',
          'Personalized with actual cart contents',
          'Progressive incentive strategy',
          'Multi-channel approach'
        ]
      }
    ]
  },
  segmentBased: {
    title: 'Event-Based Segments',
    subtitle: 'Complex logic with multiple conditions',
    icon: TagIcon,
    color: 'purple',
    description: 'Create segments based on combinations of events, frequency, timing, and properties. Perfect for sophisticated targeting rules.',
    availability: 'Planned',
    bestFor: [
      'Complex, multi-event logic',
      'Frequency-based targeting',
      'Time-based patterns analysis', 
      'Sophisticated user behavior combinations'
    ],
    limitations: [
      'More complex to set up',
      'Requires segment creation first',
      'May have slight delay vs real-time'
    ],
    examples: [
      {
        title: 'Stalled Savers Re-engagement',
        industry: 'Fintech',
        trigger: 'Users who have created a savings goal, funded it at least once, and have not added money in the past 30 days',
        description: 'Target users who started strong with their savings but have become inactive. This requires analyzing multiple events and timing patterns to identify the right audience.',
        segmentRules: [
          'Event: Savings Goal Created',
          'AND Event: Goal Funded (at least once)',
          'AND No Goal Funded events in the last 30 days'
        ],
        flow: [
          {
            step: 1,
            action: 'User matches segment criteria',
            timing: 'When conditions met',
            result: 'Added to "Stalled Savers" segment'
          },
          {
            step: 2,
            action: 'Enrolled in re-engagement journey',
            timing: 'Immediate',
            result: 'Journey begins'
          },
          {
            step: 3,
            action: 'Personalized re-engagement messages',
            timing: 'Day 1-4',
            result: 'Progress-based motivation'
          },
          {
            step: 4,
            action: 'Offer automatic savings setup',
            timing: 'Day 7',
            result: 'Automation solution provided'
          }
        ],
        benefits: [
          'Precisely targeted based on behavior patterns',
          'Combines multiple data points',
          'Identifies specific user states',
          'More sophisticated than single events'
        ]
      },
      {
        title: 'High-Value Customer Rewards',
        industry: 'E-commerce',
        trigger: 'Customers who have made 3+ purchases totaling $500+ in the last 90 days and have opened at least 80% of promotional emails',
        description: 'Identify and reward your most engaged and valuable customers with exclusive offers and VIP treatment.',
        segmentRules: [
          'Event: Purchase Completed (3 or more times in 90 days)',
          'AND Total purchase value ≥ $500 in 90 days',
          'AND Email open rate ≥ 80% for promotional emails'
        ],
        flow: [
          {
            step: 1,
            action: 'Customer qualifies for VIP segment',
            timing: 'When conditions met',
            result: 'Added to "VIP Customer" segment'
          },
          {
            step: 2,
            action: 'VIP welcome message',
            timing: 'Day 1',
            result: 'Exclusive status notification'
          },
          {
            step: 3,
            action: 'Early access to sales',
            timing: 'Before public',
            result: 'VIP perks delivered'
          },
          {
            step: 4,
            action: 'Personal shopping assistance',
            timing: 'Monthly',
            result: 'White-glove service offered'
          }
        ],
        benefits: [
          'Identifies truly valuable customers',
          'Combines purchase and engagement data',
          'Ensures high-quality audience',
          'Drives customer loyalty and retention'
        ]
      }
    ]
  }
};

const decisionMatrix = [
  {
    scenario: 'User completes signup',
    recommendation: 'event-triggered',
    reasoning: 'Simple, single event that should trigger immediate welcome sequence'
  },
  {
    scenario: 'User abandons cart',
    recommendation: 'event-triggered', 
    reasoning: 'Time-sensitive action requiring immediate response'
  },
  {
    scenario: 'Identify power users based on activity pattern',
    recommendation: 'segment-based',
    reasoning: 'Requires analyzing multiple events over time'
  },
  {
    scenario: 'User reaches level 10 in game',
    recommendation: 'event-triggered',
    reasoning: 'Single achievement milestone triggering celebration'
  },
  {
    scenario: 'Users who browse but never purchase',
    recommendation: 'segment-based',
    reasoning: 'Combination of browse events AND absence of purchase events'
  },
  {
    scenario: 'User makes first purchase',
    recommendation: 'event-triggered',
    reasoning: 'Important single event triggering onboarding to loyalty program'
  },
  {
    scenario: 'Identify churning subscribers',
    recommendation: 'segment-based',
    reasoning: 'Complex pattern: declining engagement over time period'
  },
  {
    scenario: 'User unlocks premium feature',
    recommendation: 'event-triggered',
    reasoning: 'Single event triggering feature education sequence'
  }
];

function ExampleCard({ example, type }: { example: any; type: 'event-triggered' | 'segment-based' }) {
  const [expanded, setExpanded] = useState(false);
  
  const colorClasses = type === 'event-triggered' 
    ? 'glass-card border-green-200/50 hover:border-green-300/50 bg-green-50/30 dark:bg-green-950/30'
    : 'glass-card border-purple-200/50 hover:border-purple-300/50 bg-purple-50/30 dark:bg-purple-950/30';
    
  return (
    <div className={`${colorClasses} rounded-xl p-6 mb-6 transition-all duration-300`}>
      <div 
        className="cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-bold text-lg mb-2 text-text-primary">{example.title}</h4>
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full mb-3">
              {example.industry}
            </span>
            <p className="text-sm mb-3 text-text-secondary">{example.description}</p>
            <div className="glass-card p-3 rounded-lg">
              <h5 className="text-xs font-semibold mb-2 text-text-primary flex items-center gap-2">
                {type === 'event-triggered' ? (
                  <>
                    <BoltIcon className="w-4 h-4" />
                    Trigger Event
                  </>
                ) : (
                  <>
                    <TagIcon className="w-4 h-4" />
                    Segment Rules
                  </>
                )}
              </h5>
              {type === 'event-triggered' ? (
                <p className="text-sm text-text-secondary">{example.trigger}</p>
              ) : (
                <ul className="text-sm space-y-1 text-text-secondary">
                  {example.segmentRules.map((rule: string, index: number) => (
                    <li key={index}>• {rule}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={`transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
            <ChevronDownIcon className="w-5 h-5 text-text-tertiary" />
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="animate-in slide-in-from-top-2 duration-300">
          <div className="mb-6">
            <h5 className="font-semibold mb-3 text-text-primary flex items-center gap-2">
              <ArrowPathIcon className="w-4 h-4" />
              Journey Flow:
            </h5>
            <div className="space-y-3">
              {example.flow.map((step: any, index: number) => (
                <div key={index} className="glass-card p-3 rounded-lg border-l-4 border-primary-300 dark:border-primary-600">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="w-6 h-6 bg-primary-500 text-white rounded-full text-xs flex items-center justify-center font-medium">
                      {step.step}
                    </span>
                    <span className="font-medium text-sm text-text-primary">{step.action}</span>
                    <span className="text-xs text-text-tertiary">({step.timing})</span>
                  </div>
                  <p className="text-sm text-text-secondary ml-8">→ {step.result}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card rounded-lg p-4">
            <h5 className="font-semibold mb-3 text-text-primary flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
              Key Benefits:
            </h5>
            <ul className="space-y-2">
              {example.benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-text-secondary">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparisonPage() {
  const [activeComparison, setActiveComparison] = useState<'overview' | 'examples' | 'decision'>('overview');
  
  return (
    <>
      <Navigation currentPage="comparison" />
      <div className="min-h-screen bg-surface pt-16">
        {/* Header */}
        <header className="px-6 pt-8 pb-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/50 px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300 ring-1 ring-primary-200 dark:ring-primary-800">
                Campaign Strategy Guide
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Event-Triggered vs 
              <span className="text-primary-600"> Segment-Based</span>
            </h1>
            <p className="mt-4 text-lg leading-8 text-text-secondary max-w-3xl mx-auto">
              Understand when to use event-triggered journeys with smart wait conditions for real-time responses versus 
              segment-based campaigns for complex behavioral targeting.
            </p>
          </div>
        </header>

        {/* Tabs */}
        <section className="px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="glass-card rounded-lg p-1 mb-8">
              <nav className="flex space-x-1">
                <button
                  onClick={() => setActiveComparison('overview')}
                  className={`flex-1 py-3 px-4 font-medium text-sm rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeComparison === 'overview'
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                  }`}
                >
                  <ChartBarIcon className="w-4 h-4" />
                  Side-by-Side Comparison
                </button>
                <button
                  onClick={() => setActiveComparison('examples')}
                  className={`flex-1 py-3 px-4 font-medium text-sm rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeComparison === 'examples'
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                  }`}
                >
                  <DocumentTextIcon className="w-4 h-4" />
                  Detailed Examples
                </button>
                <button
                  onClick={() => setActiveComparison('decision')}
                  className={`flex-1 py-3 px-4 font-medium text-sm rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeComparison === 'decision'
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                  }`}
                >
                  <LightBulbIcon className="w-4 h-4" />
                  Decision Guide
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 pb-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            {activeComparison === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Event-Triggered */}
                <div className="glass-card rounded-xl p-8 border-green-200/50 dark:border-green-800/50 hover:border-green-300/50 dark:hover:border-green-700/50 transition-all duration-300">
                  <div className="text-center mb-6">
                    <comparisonData.eventTriggered.icon className="w-12 h-12 mx-auto text-green-600 mb-3" />
                    <h2 className="text-2xl font-bold text-text-primary mt-3">
                      {comparisonData.eventTriggered.title}
                    </h2>
                    <p className="text-green-700 dark:text-green-300 font-medium">
                      {comparisonData.eventTriggered.subtitle}
                    </p>
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full mt-3 gap-1">
                      <CheckCircleIcon className="w-4 h-4" />
                      {comparisonData.eventTriggered.availability}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary mb-6">{comparisonData.eventTriggered.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <SparklesIcon className="w-4 h-4 text-green-500" />
                      Best For:
                    </h4>
                    <ul className="space-y-2">
                      {comparisonData.eventTriggered.bestFor.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircleIcon className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <ExclamationTriangleIcon className="w-4 h-4 text-orange-500" />
                      Limitations:
                    </h4>
                    <ul className="space-y-2">
                      {comparisonData.eventTriggered.limitations.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <ExclamationTriangleIcon className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Segment-Based */}
                <div className="glass-card rounded-xl p-8 border-purple-200/50 dark:border-purple-800/50 hover:border-purple-300/50 dark:hover:border-purple-700/50 transition-all duration-300">
                  <div className="text-center mb-6">
                    <comparisonData.segmentBased.icon className="w-12 h-12 mx-auto text-purple-600 mb-3" />
                    <h2 className="text-2xl font-bold text-text-primary mt-3">
                      {comparisonData.segmentBased.title}
                    </h2>
                    <p className="text-purple-700 dark:text-purple-300 font-medium">
                      {comparisonData.segmentBased.subtitle}
                    </p>
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full mt-3 gap-1">
                      <CogIcon className="w-4 h-4" />
                      {comparisonData.segmentBased.availability}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary mb-6">{comparisonData.segmentBased.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <SparklesIcon className="w-4 h-4 text-purple-500" />
                      Best For:
                    </h4>
                    <ul className="space-y-2">
                      {comparisonData.segmentBased.bestFor.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircleIcon className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <ExclamationTriangleIcon className="w-4 h-4 text-orange-500" />
                      Limitations:
                    </h4>
                    <ul className="space-y-2">
                      {comparisonData.segmentBased.limitations.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <ExclamationTriangleIcon className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeComparison === 'examples' && (
              <div>
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
                    <BoltIcon className="w-6 h-6 text-green-600" />
                    Event-Triggered Journey Examples
                  </h2>
                  {comparisonData.eventTriggered.examples.map((example, index) => (
                    <ExampleCard key={index} example={example} type="event-triggered" />
                  ))}
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
                    <TagIcon className="w-6 h-6 text-purple-600" />
                    Segment-Based Campaign Examples
                  </h2>
                  {comparisonData.segmentBased.examples.map((example, index) => (
                    <ExampleCard key={index} example={example} type="segment-based" />
                  ))}
                </div>
              </div>
            )}

            {activeComparison === 'decision' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
                    <LightBulbIcon className="w-6 h-6 text-primary-600" />
                    Which Approach Should You Choose?
                  </h2>
                  <p className="text-text-secondary mb-6">
                    Use this decision matrix to determine the best approach for common customer experience scenarios.
                  </p>
                </div>

                <div className="glass-card rounded-xl overflow-hidden mb-8">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-surface-elevated">
                        <tr>
                          <th className="text-left py-4 px-6 font-semibold text-text-primary">Scenario</th>
                          <th className="text-left py-4 px-6 font-semibold text-text-primary">Recommended Approach</th>
                          <th className="text-left py-4 px-6 font-semibold text-text-primary">Reasoning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {decisionMatrix.map((item, index) => (
                          <tr key={index} className="border-t border-border">
                            <td className="py-4 px-6 text-sm text-text-primary">{item.scenario}</td>
                            <td className="py-4 px-6">
                              <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full gap-1 ${
                                item.recommendation === 'event-triggered'
                                  ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                                  : 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                              }`}>
                                {item.recommendation === 'event-triggered' ? (
                                  <BoltIcon className="w-3 h-3" />
                                ) : (
                                  <TagIcon className="w-3 h-3" />
                                )}
                                {item.recommendation.replace('-', ' ')}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-sm text-text-secondary">{item.reasoning}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Decision Tree */}
                <div className="glass-card rounded-xl p-8 border border-primary-200/50 dark:border-primary-800/50">
                  <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                    <ArrowPathIcon className="w-6 h-6 text-primary-600" />
                    Quick Decision Tree
                  </h3>
                  <div className="space-y-4">
                    <div className="glass-card rounded-lg p-4 border-l-4 border-primary-400">
                      <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                        <LightBulbIcon className="w-5 h-5 text-primary-600" />
                        Start Here: What triggers your campaign?
                      </h4>
                      <div className="ml-4 space-y-3">
                        <div className="glass-card rounded p-3">
                          <p className="text-sm font-medium text-text-primary mb-1 flex items-center gap-2">
                            <BoltIcon className="w-4 h-4 text-green-600" />
                            Single, specific user action
                          </p>
                          <p className="text-sm text-green-700 dark:text-green-300 ml-6">→ Use Event-Triggered Journey</p>
                          <p className="text-xs text-text-tertiary ml-6">Example: User signs up, abandons cart, completes level</p>
                        </div>
                        <div className="glass-card rounded p-3">
                          <p className="text-sm font-medium text-text-primary mb-1 flex items-center gap-2">
                            <TagIcon className="w-4 h-4 text-purple-600" />
                            Multiple conditions or complex timing
                          </p>
                          <p className="text-sm text-purple-700 dark:text-purple-300 ml-6">→ Use Segment-Based Campaign</p>
                          <p className="text-xs text-text-tertiary ml-6">Example: Active users who haven&apos;t purchased, declining engagement patterns</p>
                        </div>
                        <div className="glass-card rounded p-3">
                          <p className="text-sm font-medium text-text-primary mb-1 flex items-center gap-2">
                            <ChartBarIcon className="w-4 h-4 text-purple-600" />
                            Frequency or pattern-based
                          </p>
                          <p className="text-sm text-purple-700 dark:text-purple-300 ml-6">→ Use Segment-Based Campaign</p>
                          <p className="text-xs text-text-tertiary ml-6">Example: Users who visit weekly but never convert, power users</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
} 