'use client';

import { JourneyStage } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDownIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  LightBulbIcon,
  FaceSmileIcon,
  FaceFrownIcon
} from '@heroicons/react/24/outline';

interface JourneyStageCardProps {
  stage: JourneyStage;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

export default function JourneyStageCard({ 
  stage, 
  isExpanded = false, 
  onToggleExpanded 
}: JourneyStageCardProps) {
  return (
    <div className="mb-8">
      {/* Card Header */}
      <motion.div 
        className="glass-card p-6 cursor-pointer"
        whileHover={{ y: -2 }}
        onClick={onToggleExpanded}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="flex-shrink-0">
              <motion.div 
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-lg shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {stage.id}
              </motion.div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-text-primary mb-2 leading-tight">
                {stage.title}
              </h2>
              <div className="flex items-center space-x-3 mb-3">
                <span className="inline-flex items-center text-xs font-medium text-red-600 bg-red-500/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" /> Pain Point
                </span>
                <span className="inline-flex items-center text-xs font-medium text-green-600 bg-green-500/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  <CheckCircleIcon className="w-4 h-4 mr-1" /> Solution
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                {stage.marketerGoal}
              </p>
            </div>
          </div>
          <motion.div 
            className="flex-shrink-0 ml-4"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon className="w-5 h-5 text-text-secondary" />
          </motion.div>
        </div>
      </motion.div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mt-2 glass-card p-6"
          >
            {/* Marketer Goal */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                Marketer Goal
              </h3>
              <div className="glass-card bg-primary-500/5 p-4">
                <p className="text-text-primary leading-relaxed">
                  {stage.marketerGoal}
                </p>
              </div>
            </div>

            {/* Pain Point Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-red-500 mb-3 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                Current Pain Point
              </h3>
              <div className="glass-card bg-red-500/5 p-4">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="ml-3 text-text-primary leading-relaxed">
                    {stage.currentPainPoint}
                  </p>
                </div>
              </div>
            </div>

            {/* Solution Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-green-500 mb-3 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                OneSignal Events Solution
              </h3>
              <div className="glass-card bg-green-500/5 p-4">
                <div className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="ml-3 text-text-primary leading-relaxed">
                    {stage.oneSignalEventsSolution}
                  </p>
                </div>
              </div>
            </div>

            {/* Event Data Focus */}
            {stage.exampleEventDataFocus && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary-500 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  <LightBulbIcon className="w-5 h-5 mr-2" /> Leveraging Event Data
                </h3>
                <div className="glass-card bg-primary-500/5 p-4">
                  <code className="text-sm text-text-primary bg-primary-500/5 px-3 py-2 rounded-lg font-mono block">
                    {stage.exampleEventDataFocus}
                  </code>
                </div>
              </div>
            )}

            {/* Sentiment Analysis Summary */}
            <div className="mt-6 pt-6 border-t border-border-color">
              <h4 className="text-md font-medium text-text-primary mb-3">Sentiment Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div 
                  className="glass-card bg-red-500/5 p-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                      <FaceFrownIcon className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">Frustration Level</div>
                      <div className="text-xs text-text-secondary">High - Technical Dependencies</div>
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  className="glass-card bg-green-500/5 p-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                      <FaceSmileIcon className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">Solution Impact</div>
                      <div className="text-xs text-text-secondary">High - Empowers Marketers</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 