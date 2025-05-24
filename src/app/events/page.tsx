'use client';

import { useState, FC } from 'react';
import Navigation from '@/app/components/Navigation';
import { eventDataExamples } from '@/lib/verticalJourneys';
import {
  CircleStackIcon, CodeBracketIcon, CpuChipIcon, ChartBarIcon, DevicePhoneMobileIcon,
  TagIcon, MagnifyingGlassCircleIcon, FunnelIcon, RectangleStackIcon, PresentationChartLineIcon,
  ArrowRightIcon, InformationCircleIcon, CheckCircleIcon, XCircleIcon, ClipboardDocumentIcon, AdjustmentsHorizontalIcon,
  UserCircleIcon, EnvelopeIcon, UsersIcon, AcademicCapIcon, ShoppingCartIcon, SparklesIcon, LightBulbIcon
} from '@heroicons/react/24/outline';

// Define a type for Heroicon components
type HeroIconType = FC<React.SVGProps<SVGSVGElement>>;

// Placeholder for event examples if the structure of eventDataExamples is complex
// This should be replaced with actual logic if eventDataExamples is an object
const getCustomEventExamples = () => {
  if (Array.isArray(eventDataExamples)) {
    return eventDataExamples.map(ex => ({ 
      name: ex.name,
      description: ex.description,
      properties: ex.properties
    }));
  }
  // Fallback or specific logic if eventDataExamples is an object
  // For now, using a generic example if it's not an array
  if (eventDataExamples && typeof eventDataExamples === 'object' && eventDataExamples.gaming) { // Example check
    const gamingExamples = eventDataExamples.gaming;
    return Object.values(gamingExamples).map((ex: any) => ({
        name: ex.name || 'Sample Event',
        description: ex.description || 'Sample custom event description',
        properties: ex.properties || {}
    }));
  }
  return [
    {
      name: 'user_signup',
      description: 'User creates a new account',
      properties: {
        user_id: 'user_67890',
        signup_method: 'email',
        plan_type: 'free',
        signup_time: '2024-01-15T09:15:00Z'
      }
    }
  ];
};

const eventTypes: Array<{
  id: string;
  name: string;
  description: string;
  icon: HeroIconType;
  color: string;
  alreadyTracked: boolean;
  examples: Array<{
    name: string;
    description: string;
    properties: Record<string, any>;
  }>;
}> = [
  {
    id: 'message',
    name: 'Message Events',
    description: 'Events based on how users interact with messages sent through OneSignal',
    icon: EnvelopeIcon,
    color: 'blue',
    alreadyTracked: true,
    examples: [
      {
        name: 'notification_opened',
        description: 'User opens a push notification',
        properties: {
          message_id: 'msg_12345',
          campaign_name: 'Black Friday Sale',
          open_time: '2024-01-15T14:30:00Z',
          device_type: 'iOS'
        }
      },
      {
        name: 'link_clicked', 
        description: 'User clicks a link in a message',
        properties: {
          message_id: 'msg_12345',
          link_url: 'https://app.example.com/sale',
          click_time: '2024-01-15T14:32:00Z'
        }
      },
      {
        name: 'message_ignored',
        description: 'User receives but doesn\'t interact with message',
        properties: {
          message_id: 'msg_12345',
          delivery_time: '2024-01-15T14:30:00Z',
          ignored_duration: 3600
        }
      }
    ]
  },
  {
    id: 'custom',
    name: 'Custom Events',
    description: 'Events based on user behavior in your app or website, not related to OneSignal messages',
    icon: UserCircleIcon, 
    color: 'purple',
    alreadyTracked: false,
    examples: getCustomEventExamples()
  }
];

const ingestionMethods: Array<{
    id: string;
    name: string;
    subtitle: string;
    description: string;
    icon: HeroIconType;
    color: string;
    difficulty: string;
    setup: string;
    realTime: boolean;
    benefits: string[];
}> = [
  {
    id: 'warehouse',
    name: 'Data Warehouse',
    subtitle: 'via Census',
    description: 'Connect your data warehouse (BigQuery, Databricks) to automatically sync event data',
    icon: CircleStackIcon,
    color: 'blue',
    difficulty: 'Medium',
    setup: 'One-time configuration',
    realTime: false,
    benefits: [
      'Leverage existing data infrastructure',
      'Batch processing for historical data', 
      'No code changes needed in app',
      'Works with complex data transformations'
    ]
  },
  {
    id: 'api',
    name: 'OneSignal API',
    subtitle: 'Direct Integration',
    description: 'Send events directly to OneSignal by making API calls from your app or backend',
    icon: CodeBracketIcon,
    color: 'green',
    difficulty: 'Easy',
    setup: 'Developer implementation',
    realTime: true,
    benefits: [
      'Real-time event delivery',
      'Full control over timing',
      'Custom event properties',
      'Server-side implementation'
    ]
  },
  {
    id: 'segment',
    name: 'Segment CDP',
    subtitle: 'Customer Data Platform',
    description: 'If you use Segment to store customer data, connect it to OneSignal automatically',
    icon: CpuChipIcon,
    color: 'purple',
    difficulty: 'Easy',
    setup: 'Integration configuration',
    realTime: true,
    benefits: [
      'No additional development work',
      'Unified customer data view',
      'Automatic data synchronization',
      'Rich user context'
    ]
  },
  {
    id: 'amplitude',
    name: 'Amplitude',
    subtitle: 'Analytics Platform',
    description: 'Connect Amplitude analytics to OneSignal and automatically send your event data',
    icon: ChartBarIcon,
    color: 'orange',
    difficulty: 'Easy',
    setup: 'Integration configuration',
    realTime: true,
    benefits: [
      'Leverage existing analytics setup',
      'Behavioral insights included',
      'User journey data',
      'Advanced event properties'
    ]
  },
  {
    id: 'sdk',
    name: 'OneSignal SDK',
    subtitle: 'Mobile/Web SDK',
    description: 'Send custom events directly from your app using the latest OneSignal SDK',
    icon: DevicePhoneMobileIcon,
    color: 'indigo',
    difficulty: 'Easy',
    setup: 'Code implementation',
    realTime: true,
    benefits: [
      'Client-side event tracking',
      'Real-time user behavior',
      'Easy to implement',
      'Works offline with sync'
    ]
  }
];

const eventManagementFeatures: Array<{
    title: string;
    description: string;
    icon: HeroIconType;
}> = [
  {
    title: 'Event Names',
    description: 'See all event names coming into OneSignal',
    icon: TagIcon
  },
  {
    title: 'Event Sources',
    description: 'Track where each event originated (API, SDK, CDP, etc.)',
    icon: MagnifyingGlassCircleIcon
  },
  {
    title: 'Source Filtering',
    description: 'Filter events by specific data sources',
    icon: FunnelIcon
  },
  {
    title: 'Event Properties',
    description: 'View detailed properties and metadata for each event',
    icon: RectangleStackIcon
  },
  {
    title: 'Event Counts',
    description: 'See volume metrics for the last 24 hours',
    icon: PresentationChartLineIcon
  },
  {
    title: 'Property Value Search',
    description: 'Search for specific property values within your events',
    icon: AdjustmentsHorizontalIcon
  }
];

// Dummy liquidSyntaxExamples if not imported or needed for this pass
const liquidSyntaxExamples = [
    { name: 'Example 1', description: 'Description 1' },
    { name: 'Example 2', description: 'Description 2' },
];

function EventTypeCard({ eventType }: { eventType: typeof eventTypes[0] }) {
  const IconComponent = eventType.icon;
  return (
    <div className={`glass-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-${eventType.color}-500`}>
      <div className="flex items-center mb-4">
        <IconComponent className={`w-8 h-8 text-${eventType.color}-500 mr-3`} />
        <h3 className="text-xl font-semibold text-text-primary">{eventType.name}</h3>
      </div>
      <p className="text-sm text-text-secondary mb-3">{eventType.description}</p>
      {eventType.alreadyTracked ? (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircleIcon className="w-4 h-4 mr-1.5" />
          Already Tracked by OneSignal
        </span>
      ) : (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <InformationCircleIcon className="w-4 h-4 mr-1.5" />
          Requires Custom Setup
        </span>
      )}
      {/* Render event examples - assuming structure */}
      {eventType.examples && eventType.examples.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <h4 className="text-sm font-medium text-text-secondary mb-2">Examples:</h4>
          <ul className="space-y-1 text-xs text-text-secondary/80">
            {eventType.examples.slice(0, 2).map(ex => (
              <li key={ex.name} className="flex items-center">
                <ArrowRightIcon className="w-3 h-3 mr-1.5 text-primary-400 flex-shrink-0" />
                {ex.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function IngestionMethodCard({ method }: { method: typeof ingestionMethods[0] }) {
  const IconComponent = method.icon;
  return (
    <div className={`glass-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-${method.color}-500`}>
      <div className="flex items-center mb-3">
        <IconComponent className={`w-10 h-10 text-${method.color}-500 mr-4`} />
        <div>
          <h3 className="text-xl font-semibold text-text-primary">{method.name}</h3>
          <p className="text-sm text-text-secondary">{method.subtitle}</p>
        </div>
      </div>
      <p className="text-sm text-text-secondary mb-3 h-16 line-clamp-3">{method.description}</p>
      <div className="text-xs space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-text-secondary/80">Difficulty:</span>
          <span className="font-medium text-text-primary">{method.difficulty}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary/80">Real-time:</span>
          {method.realTime ? (
            <span className="font-medium text-green-400 inline-flex items-center"><CheckCircleIcon className="w-3 h-3 mr-1"/>Yes</span>
          ) : (
            <span className="font-medium text-red-400 inline-flex items-center"><XCircleIcon className="w-3 h-3 mr-1"/>No</span>
          )}
        </div>
      </div>
       <h4 className="text-sm font-medium text-text-secondary mb-1">Benefits:</h4>
        <ul className="space-y-1 text-xs text-text-secondary/80 list-inside">
            {method.benefits.slice(0,2).map(benefit => (
                <li key={benefit} className="flex items-start">
                    <CheckCircleIcon className="w-3 h-3 mr-1.5 text-green-400 flex-shrink-0 mt-0.5"/> 
                    {benefit}
                </li>
            ))}
            {method.benefits.length > 2 && <li>...and more</li>}
        </ul>
    </div>
  );
}

export default function EventsPage() {
  const [selectedEventType, setSelectedEventType] = useState(eventTypes[0].id);
  const [selectedIngestionMethod, setSelectedIngestionMethod] = useState(ingestionMethods[0].id);
  const [copiedEvent, setCopiedEvent] = useState<string | null>(null);

  const copyToClipboard = (text: string, eventName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedEvent(eventName);
      setTimeout(() => setCopiedEvent(null), 2000);
    });
  };

  const currentEventType = eventTypes.find(et => et.id === selectedEventType);
  const currentIngestionMethod = ingestionMethods.find(im => im.id === selectedIngestionMethod);

  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Navigation currentPage="events" />

      <main className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <header className="text-center mb-16 animate-in">
          <span className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/50 px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300 ring-1 ring-primary-200 dark:ring-primary-800 mb-4">
            Event Data Platform
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary mb-4">
            Unlock the Power of <span className="text-primary-600">Event Data</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Understand how OneSignal handles different types of event data and how you can leverage it to create personalized customer journeys.
          </p>
        </header>

        <section className="mb-20">
          <h2 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-2">
            <RectangleStackIcon className="w-7 h-7 text-primary-500" /> Event Types
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {eventTypes.map((eventType) => (
              <EventTypeCard key={eventType.id} eventType={eventType} />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-2">
            <CircleStackIcon className="w-7 h-7 text-primary-500" /> Data Ingestion Methods
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ingestionMethods.map((method) => (
              <IngestionMethodCard key={method.id} method={method} />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-2">
            <AdjustmentsHorizontalIcon className="w-7 h-7 text-primary-500" /> Event Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventManagementFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="glass-card p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                  <Icon className="w-8 h-8 text-primary-500 mb-3" />
                  <h3 className="text-lg font-medium text-text-primary mb-1">{feature.title}</h3>
                  <p className="text-sm text-text-secondary">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-2">
            <LightBulbIcon className="w-7 h-7 text-primary-500" /> Using Event Data in Messages (Liquid Syntax)
          </h2>
          <div className="space-y-8">
            {liquidSyntaxExamples.map(example => <LiquidSyntaxCard key={example.name} example={example} />)}
          </div>
        </section>

      </main>
    </div>
  );
}

function LiquidSyntaxCard({ example }: { example: typeof liquidSyntaxExamples[0] }) {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-2">{example.name}</h3>
      <p className="text-sm text-text-secondary mb-3">{example.description}</p>
      {/* Add more details and HeroIcons as needed */}
    </div>
  );
} 