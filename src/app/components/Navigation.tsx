'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HomeIcon, UserGroupIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface NavigationProps {
  currentPage: 'home' | 'verticals' | 'events' | 'comparison';
}

export default function Navigation({ currentPage }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card m-4 border-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold text-sm">OS</span>
              </motion.div>
              <span className="font-semibold text-text-primary group-hover:text-primary-600 transition-colors">
                OneSignal Events Experience
              </span>
            </Link>
            <div className="flex items-center space-x-8">
              <NavLink href="/" isActive={currentPage === 'home'}>
                Customer Experience
              </NavLink>
              <NavLink href="/verticals" isActive={currentPage === 'verticals'}>
                Industry Use Cases
              </NavLink>
              <NavLink href="/events" isActive={currentPage === 'events'}>
                Event Data Platform
              </NavLink>
              <NavLink href="/comparison" isActive={currentPage === 'comparison'}>
                Strategy Guide
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ 
  href, 
  children, 
  isActive
}: { 
  href: string; 
  children: React.ReactNode; 
  isActive: boolean;
}) {
  return (
    <Link href={href} className="relative group flex items-center">
      <span className={`text-sm font-medium transition-colors ${ 
        isActive 
          ? 'text-primary-600' 
          : 'text-text-primary group-hover:text-primary-600'
      }`}>
        {children}
      </span>
      <motion.span 
        className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 rounded-full"
        initial={false}
        animate={{ 
          opacity: isActive ? 1 : 0,
          scaleX: isActive ? 1 : 0 
        }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
}