// Comprehensive Industry Vertical Journey Data
// Based on OneSignal Events Product Positioning Document

export interface EventTrigger {
  eventName: string;
  description: string;
  properties?: { [key: string]: any };
  timing?: string;
}

export interface JourneyStep {
  id: number;
  channel: 'push' | 'email' | 'sms' | 'in-app' | 'live-activity';
  timing: string;
  title: string;
  content: string;
  personalization?: string;
  cta?: string;
  eventToLog?: string;
}

export interface CustomerJourney {
  id: string;
  name: string;
  type: 'event-triggered' | 'segment-based';
  trigger: EventTrigger;
  exitCondition?: EventTrigger;
  description: string;
  businessGoal: string;
  steps: JourneyStep[];
  expectedOutcomes: string[];
}

export interface VerticalExample {
  industry: string;
  description: string;
  icon: string;
  color: string;
  companyExample: string;
  onboardingJourney: CustomerJourney;
  engagementJourney: CustomerJourney;
  conversionJourney: CustomerJourney;
  retentionJourney: CustomerJourney;
  keyEvents: EventTrigger[];
  problemStatement: string;
  solutionBenefits: string[];
}

export const verticalExamples: VerticalExample[] = [
  {
    industry: "Gaming",
    description: "Mobile gaming apps focused on user engagement, progression, and in-app purchases",
    icon: "🎮",
    color: "primary",
    companyExample: "Fantasy Quest Mobile Game",
    problemStatement: "Players often get stuck at difficult levels, abandon the game during onboarding, or don't discover monetization features like power-ups and special characters.",
    solutionBenefits: [
      "62% higher revenue growth through real-time behavioral messaging",
      "Reduced churn with personalized re-engagement flows",
      "Increased IAP conversion with timely power-up suggestions",
      "Better player retention through achievement celebrations"
    ],
    keyEvents: [
      {
        eventName: "first_app_open",
        description: "Player opens the game for the first time",
        properties: { "install_source": "app_store", "device_type": "iOS" }
      },
      {
        eventName: "tutorial_completed",
        description: "Player finishes the onboarding tutorial",
        properties: { "completion_time": 300, "skipped_steps": 0 }
      },
      {
        eventName: "level_failed",
        description: "Player fails to complete a level",
        properties: { "level": 15, "attempt_number": 3, "time_spent": 180 }
      },
      {
        eventName: "power_up_used",
        description: "Player uses a power-up item",
        properties: { "item_type": "extra_lives", "level": 15, "purchased": false }
      },
      {
        eventName: "iap_completed",
        description: "Player makes an in-app purchase",
        properties: { "item": "power_up_bundle", "price": 4.99, "currency": "USD" }
      },
      {
        eventName: "session_ended",
        description: "Player closes the game",
        properties: { "session_duration": 900, "levels_completed": 2 }
      }
    ],
    onboardingJourney: {
      id: "gaming_onboarding",
      name: "Welcome New Players",
      type: "event-triggered",
      trigger: {
        eventName: "first_app_open",
        description: "First app open triggers welcome journey"
      },
      description: "Guide new players through their first gaming experience and encourage tutorial completion",
      businessGoal: "Increase tutorial completion rate and early engagement",
      steps: [
        {
          id: 1,
          channel: "push",
          timing: "Immediately",
          title: "Welcome to Fantasy Quest!",
          content: "Welcome to the adventure! Ready to become a legendary hero? Start your tutorial now.",
          cta: "Begin Adventure",
          eventToLog: "welcome_push_sent"
        },
        {
          id: 2,
          channel: "in-app",
          timing: "On tutorial start",
          title: "Tutorial Guide",
          content: "Let's learn the basics! Follow the guide to master combat, magic, and exploration.",
          personalization: "Adapted based on player's chosen character class",
          eventToLog: "tutorial_guide_shown"
        },
        {
          id: 3,
          channel: "email",
          timing: "1 hour after install",
          title: "Your Adventure Awaits",
          content: "Ready to dive deeper? Here's your beginner's guide with tips, tricks, and a special reward for completing your first quest!",
          cta: "Claim Beginner Bonus",
          eventToLog: "beginner_email_sent"
        },
        {
          id: 4,
          channel: "sms",
          timing: "Day 2 if no return",
          title: "Still stuck on Level 1?",
          content: "No worries! Claim your bonus power-up and jump back into Fantasy Quest! 🎮✨",
          cta: "Get Bonus Items",
          eventToLog: "day2_sms_sent"
        }
      ],
      expectedOutcomes: [
        "85% tutorial completion rate (vs 60% baseline)",
        "40% increase in Day 1 retention", 
        "25% more players reach Level 5 within first session"
      ]
    },
    engagementJourney: {
      id: "gaming_engagement",
      name: "New Game Mode Discovery",
      type: "event-triggered",
      trigger: {
        eventName: "game_mode_unlocked",
        description: "Player unlocks a new game mode (PvP Arena)",
        properties: { "mode_type": "pvp_arena", "player_level": 10 }
      },
      description: "Encourage continued participation when players unlock new features",
      businessGoal: "Increase feature adoption and daily active usage",
      steps: [
        {
          id: 1,
          channel: "in-app",
          timing: "Immediately on unlock",
          title: "PvP Arena Unlocked!",
          content: "Congratulations! You've unlocked the PvP Arena. Battle other players for epic rewards and climb the leaderboards!",
          personalization: "Show arena appropriate for player's level and skill",
          cta: "Enter Arena",
          eventToLog: "pvp_promotion_shown"
        },
        {
          id: 2,
          channel: "push",
          timing: "30 minutes later",
          title: "Ready for Battle?",
          content: "The Arena awaits your first challenge! Face other heroes and prove your worth.",
          cta: "Join Battle",
          eventToLog: "pvp_push_sent"
        },
        {
          id: 3,
          channel: "email",
          timing: "Next day",
          title: "Arena Strategy Guide",
          content: "Master the Arena with these pro tips! Learn the best strategies, see leaderboard rankings, and discover winning combinations.",
          personalization: "Tips customized for player's character build and preferred play style",
          eventToLog: "strategy_email_sent"
        },
        {
          id: 4,
          channel: "sms",
          timing: "Day 3 if no arena participation",
          title: "Arena Tournament Today!",
          content: "Don't miss today's special tournament! Huge rewards and a chance to win rare characters. Battle starts in 2 hours! ⚔️",
          cta: "Join Tournament",
          eventToLog: "tournament_sms_sent"
        }
      ],
      expectedOutcomes: [
        "75% of players try new mode within 24 hours",
        "50% increase in average session time",
        "35% boost in daily active users"
      ]
    },
    conversionJourney: {
      id: "gaming_conversion",
      name: "Power-Up Purchase Encouragement",
      type: "event-triggered",
      trigger: {
        eventName: "level_failed",
        description: "Player fails a difficult level multiple times",
        properties: { "level": 15, "failure_count": 3, "time_spent": 540 }
      },
      description: "Suggest helpful power-ups when players get stuck on challenging content",
      businessGoal: "Increase in-app purchase conversion and reduce churn at difficulty spikes",
      steps: [
        {
          id: 1,
          channel: "push",
          timing: "Immediately after 3rd failure",
          title: "Need a Power Boost?",
          content: "Level 15 is tough! Get the Champion's Bundle with extra lives and power boosts - 50% off for the next hour!",
          personalization: "Bundle recommended based on player's preferred power-ups",
          cta: "Get Power Bundle",
          eventToLog: "powerup_offer_push"
        },
        {
          id: 2,
          channel: "in-app",
          timing: "On next game open",
          title: "Pro Player Success Stories",
          content: "See how Sarah from Texas beat Level 15! 95% of players who used the Shield Boost and Extra Lives combo successfully passed this level.",
          personalization: "Stories from players with similar play patterns",
          eventToLog: "success_story_shown"
        },
        {
          id: 3,
          channel: "email",
          timing: "2 hours later",
          title: "Level 15 Mastery Guide",
          content: "Struggling with the Dragon Boss? Here are the top strategies and power-up combinations that helped 10,000+ players conquer this challenge.",
          personalization: "Guide tailored to player's character class and failed attempts",
          eventToLog: "strategy_email_sent"
        },
        {
          id: 4,
          channel: "sms",
          timing: "If still stuck after 24 hours",
          title: "Last Chance Power-Up Deal!",
          content: "🔥 Final offer: Get 5 lives + rare weapon for just $2.99 (normally $9.99). This deal expires in 2 hours!",
          cta: "Claim Deal",
          eventToLog: "urgency_sms_sent"
        }
      ],
      exitCondition: {
        eventName: "level_completed",
        description: "Player successfully completes the level",
        properties: { "level": 15 }
      },
      expectedOutcomes: [
        "28% conversion rate on power-up offers (vs 12% baseline)",
        "45% reduction in level-based churn",
        "Average purchase value increase of $3.20 per converting user"
      ]
    },
    retentionJourney: {
      id: "gaming_retention",
      name: "Win-Back Inactive Players",
      type: "event-triggered",
      trigger: {
        eventName: "app_not_opened",
        description: "Player hasn't opened the app for 7 days",
        timing: "7 days since last session"
      },
      description: "Re-engage players who have stopped playing with personalized comeback incentives",
      businessGoal: "Reduce churn and reactivate dormant users",
      steps: [
        {
          id: 1,
          channel: "email",
          timing: "Day 7 of inactivity",
          title: "Your Quest Awaits Your Return!",
          content: "While you were away, new adventures have been added! Plus, your guild members have been asking about you. Come back and see what's new in Fantasy Quest!",
          personalization: "Show specific guild activity and new content relevant to player's progress",
          eventToLog: "winback_email_sent"
        },
        {
          id: 2,
          channel: "push",
          timing: "Day 8",
          title: "We Saved Your Progress!",
          content: "Your Level 12 hero is waiting! Come back now and claim your daily comeback gift - 500 gold coins and rare materials! 🎁",
          personalization: "Reference actual player level and accumulated idle rewards",
          cta: "Claim Rewards",
          eventToLog: "progress_push_sent"
        },
        {
          id: 3,
          channel: "in-app",
          timing: "On return",
          title: "Welcome Back, Hero!",
          content: "We missed you! Here's a special welcome back chest with epic loot to help you jump right back into action.",
          personalization: "Chest contents match player's character needs and level",
          eventToLog: "welcome_back_shown"
        },
        {
          id: 4,
          channel: "sms",
          timing: "Day 10 if no return",
          title: "Final Call for Adventure!",
          content: "⏰ Your account will go dormant soon! Log in today to keep your progress and get an exclusive returning hero bonus! 🛡️",
          cta: "Save Progress",
          eventToLog: "final_call_sms"
        }
      ],
      expectedOutcomes: [
        "35% of inactive players return within 3 days",
        "22% reactivation rate (vs 8% organic return)",
        "Returning players show 60% higher lifetime value"
      ]
    }
  },
  {
    industry: "News & Media",
    description: "Digital news and media platforms focused on reader engagement and subscription conversion",
    icon: "📰",
    color: "navy",
    companyExample: "TechNews Daily",
    problemStatement: "Readers often consume content sporadically, hit paywalls without converting, and struggle to discover relevant content in an overwhelming news cycle.",
    solutionBenefits: [
      "40% increase in article engagement through personalized notifications",
      "3x higher subscription conversion with behavioral targeting",
      "65% improvement in reader retention via content personalization",
      "50% reduction in paywall abandonment through strategic messaging"
    ],
    keyEvents: [
      {
        eventName: "article_read",
        description: "Reader finishes an article",
        properties: { "article_id": "tech-2024-01", "category": "AI", "read_time": 240, "scroll_depth": 95 }
      },
      {
        eventName: "category_followed",
        description: "Reader follows a topic or category",
        properties: { "category": "artificial-intelligence", "source": "article_page" }
      },
      {
        eventName: "paywall_hit",
        description: "Reader encounters subscription paywall",
        properties: { "article_count": 3, "time_on_site": 420, "category": "premium" }
      },
      {
        eventName: "newsletter_signup",
        description: "Reader subscribes to newsletter",
        properties: { "newsletter_type": "daily_digest", "source": "article_footer" }
      },
      {
        eventName: "subscription_started",
        description: "Reader begins subscription process",
        properties: { "plan_type": "monthly", "price": 9.99, "source": "paywall" }
      },
      {
        eventName: "breaking_news_alert",
        description: "Major news story published",
        properties: { "urgency": "high", "category": "breaking", "estimated_interest": 0.95 }
      }
    ],
    onboardingJourney: {
      id: "news_onboarding",
      name: "New Reader Engagement",
      type: "event-triggered",
      trigger: {
        eventName: "first_article_read",
        description: "Reader finishes their first article"
      },
      description: "Guide new readers to discover personalized content and build reading habits",
      businessGoal: "Increase content discovery and establish regular reading patterns",
      steps: [
        {
          id: 1,
          channel: "in-app",
          timing: "Immediately after first article",
          title: "Discover Your Interests",
          content: "Great choice reading about AI! Follow topics you're interested in to get personalized content recommendations.",
          personalization: "Suggest topics based on the article just read",
          cta: "Follow AI Topics",
          eventToLog: "topic_suggestion_shown"
        },
        {
          id: 2,
          channel: "push",
          timing: "2 hours later",
          title: "More AI Stories You'll Love",
          content: "📱 Tap to see the latest breakthrough in machine learning that's making headlines today.",
          cta: "Read Story",
          eventToLog: "followup_push_sent"
        },
        {
          id: 3,
          channel: "email",
          timing: "Next day",
          title: "Welcome to TechNews Daily!",
          content: "Get the most important tech stories delivered to your inbox. Here are this week's top articles in AI, cybersecurity, and startup news.",
          personalization: "Curated based on initial reading preferences",
          cta: "Read This Week's Top Stories",
          eventToLog: "welcome_email_sent"
        },
        {
          id: 4,
          channel: "sms",
          timing: "Day 3 if no return",
          title: "Breaking: Major AI Announcement",
          content: "🚨 OpenAI just announced GPT-5! Get the full story and expert analysis in our exclusive coverage.",
          cta: "Read Breaking News",
          eventToLog: "breaking_news_sms"
        }
      ],
      expectedOutcomes: [
        "60% of new readers follow at least one topic",
        "45% increase in second-day return rate",
        "3.2x more articles read in first week"
      ]
    },
    engagementJourney: {
      id: "news_engagement",
      name: "Category Following Activation",
      type: "event-triggered",
      trigger: {
        eventName: "category_followed",
        description: "Reader follows a new category like 'Artificial Intelligence'",
        properties: { "category": "artificial-intelligence" }
      },
      description: "Deliver relevant content and encourage deeper engagement with followed topics",
      businessGoal: "Increase content consumption and time on platform",
      steps: [
        {
          id: 1,
          channel: "in-app",
          timing: "Immediately",
          title: "AI Feed Activated!",
          content: "Perfect timing! Here are today's top trending AI stories from industry experts and breaking developments.",
          personalization: "Show most relevant AI stories based on reader level (beginner vs expert)",
          cta: "Explore AI Stories",
          eventToLog: "ai_feed_shown"
        },
        {
          id: 2,
          channel: "push",
          timing: "Next major AI story",
          title: "Breaking AI News You'll Want to See",
          content: "🤖 Google just released a game-changing AI model. Our tech team has the exclusive analysis.",
          cta: "Read Analysis",
          eventToLog: "ai_breaking_push"
        },
        {
          id: 3,
          channel: "email",
          timing: "Weekly",
          title: "Your AI Weekly Digest",
          content: "The week's most important AI developments, explained clearly. Plus expert predictions on what's coming next in artificial intelligence.",
          personalization: "Difficulty level and focus areas adapted to reader's engagement history",
          eventToLog: "ai_weekly_sent"
        },
        {
          id: 4,
          channel: "sms",
          timing: "For major breaking stories",
          title: "AI Breakthrough Alert!",
          content: "⚡ Major breakthrough in AI just announced! This could change everything. Get the exclusive details now.",
          cta: "Read Details",
          eventToLog: "breakthrough_alert_sms"
        }
      ],
      expectedOutcomes: [
        "78% increase in category-specific engagement",
        "2.8x more time spent reading AI content",
        "55% higher likelihood to share AI articles"
      ]
    },
    conversionJourney: {
      id: "news_conversion",
      name: "Subscription Conversion Flow",
      type: "event-triggered",
      trigger: {
        eventName: "paywall_hit",
        description: "Reader hits paywall for the 3rd time in a week",
        properties: { "article_count": 3, "engagement_score": 0.8 }
      },
      description: "Convert engaged readers into paid subscribers with personalized offers",
      businessGoal: "Increase subscription conversion rate and reduce paywall abandonment",
      steps: [
        {
          id: 1,
          channel: "push",
          timing: "Immediately",
          title: "You're Reading a Lot - We Love It!",
          content: "📚 You've read 3 premium articles this week! Unlock unlimited access for just $1 for your first month.",
          personalization: "Offer adapted based on reading frequency and article types",
          cta: "Start $1 Trial",
          eventToLog: "subscription_offer_push"
        },
        {
          id: 2,
          channel: "in-app",
          timing: "On next article attempt",
          title: "Join 50,000+ Tech Professionals",
          content: "Smart professionals choose TechNews Daily for unbiased analysis and exclusive insights. See what Sarah from Google says about our AI coverage!",
          personalization: "Testimonials from professionals in reader's industry/interests",
          eventToLog: "social_proof_shown"
        },
        {
          id: 3,
          channel: "email",
          timing: "2 hours later",
          title: "Complete Guide to Our Premium Content",
          content: "See exactly what you'll get with TechNews Premium: expert analysis, exclusive interviews, ad-free reading, and early access to breaking stories.",
          personalization: "Highlight premium content in reader's followed categories",
          eventToLog: "premium_guide_sent"
        },
        {
          id: 4,
          channel: "sms",
          timing: "24 hours later",
          title: "Limited Time: 40% Off Premium",
          content: "⏰ Your exclusive offer expires tonight! Get unlimited access to all premium tech content for 40% off. Claim before midnight!",
          cta: "Claim 40% Off",
          eventToLog: "urgency_offer_sms"
        }
      ],
      expectedOutcomes: [
        "25% conversion rate on subscription offers (vs 8% baseline)",
        "90% trial-to-paid conversion rate",
        "Average subscription lifetime value of $180"
      ]
    },
    retentionJourney: {
      id: "news_retention",
      name: "Re-engage Dormant Readers",
      type: "event-triggered",
      trigger: {
        eventName: "no_visit",
        description: "Reader hasn't visited in 5 days",
        timing: "5 days since last visit"
      },
      description: "Bring back readers with relevant content and personalized re-engagement",
      businessGoal: "Reduce churn and reactivate dormant users",
      steps: [
        {
          id: 1,
          channel: "email",
          timing: "Day 5 of inactivity",
          title: "What You Missed in Tech This Week",
          content: "Major developments while you were away: Apple's AI announcement, the Tesla software update, and why cybersecurity experts are concerned about the new social platform.",
          personalization: "Curated based on reader's previously engaged topics",
          eventToLog: "missed_news_email"
        },
        {
          id: 2,
          channel: "push",
          timing: "Day 7",
          title: "Today's Must-Read Story",
          content: "🔥 This AI story is breaking the internet today. Industry experts are calling it 'the biggest development since ChatGPT.'",
          cta: "Read Now",
          eventToLog: "must_read_push"
        },
        {
          id: 3,
          channel: "in-app",
          timing: "On return",
          title: "Welcome Back!",
          content: "We've saved the stories you'll find most interesting. Here's your personalized catch-up feed with the highlights you missed.",
          personalization: "Curated feed based on reading history and trending in followed topics",
          eventToLog: "welcome_back_feed"
        },
        {
          id: 4,
          channel: "sms",
          timing: "Day 10 if no return",
          title: "Your Tech News Preferences",
          content: "📱 Still interested in tech news? Reply STOP to pause alerts, or reply YES to keep getting the stories that matter to you.",
          eventToLog: "preference_check_sms"
        }
      ],
      expectedOutcomes: [
        "32% of dormant readers return within 48 hours",
        "18% full reactivation rate (vs 5% organic)",
        "Reactivated readers show 40% higher engagement than new users"
      ]
    }
  },
  {
    industry: "Fintech",
    description: "Financial technology apps focused on savings, investments, and financial health",
    icon: "💰",
    color: "primary",
    companyExample: "Cash Cat - Personal Finance App",
    problemStatement: "Users often create financial goals but don't follow through with funding them, abandon onboarding before completing setup, or become inactive after initial enthusiasm wanes.",
    solutionBenefits: [
      "85% increase in savings goal completion rates",
      "97% higher profit margins through behavioral targeting",
      "50% reduction in onboarding abandonment",
      "3x improvement in long-term user engagement"
    ],
    keyEvents: [
      {
        eventName: "savings_goal_created",
        description: "User sets up a new savings goal",
        properties: { "goal_amount": 5000, "target_date": "2024-12-31", "category": "vacation" }
      },
      {
        eventName: "goal_funded",
        description: "User adds money to their savings goal",
        properties: { "amount": 100, "goal_id": "goal_123", "funding_method": "bank_transfer" }
      },
      {
        eventName: "account_balance_checked",
        description: "User views their account balance",
        properties: { "current_balance": 2350, "goals_progress": 0.47 }
      },
      {
        eventName: "budget_exceeded",
        description: "User spending exceeds their budget category",
        properties: { "category": "dining", "budget": 300, "actual": 375, "month": "2024-01" }
      },
      {
        eventName: "investment_opportunity_viewed",
        description: "User looks at investment options",
        properties: { "investment_type": "ETF", "risk_level": "moderate", "minimum_amount": 500 }
      },
      {
        eventName: "payment_missed",
        description: "User misses a scheduled payment or deposit",
        properties: { "payment_type": "auto_save", "amount": 50, "due_date": "2024-01-15" }
      }
    ],
    onboardingJourney: {
      id: "fintech_onboarding",
      name: "Financial Goal Setup Journey",
      type: "event-triggered",
      trigger: {
        eventName: "account_created",
        description: "User creates their Cash Cat account"
      },
      description: "Guide new users through setting up their first savings goal and making their initial deposit",
      businessGoal: "Increase onboarding completion and early funding behavior",
      steps: [
        {
          id: 1,
          channel: "push",
          timing: "Immediately after signup",
          title: "Welcome to Cash Cat! 🐱",
          content: "Ready to reach your financial goals? Let's start by setting up your first savings target - it only takes 2 minutes!",
          cta: "Set First Goal",
          eventToLog: "welcome_push_sent"
        },
        {
          id: 2,
          channel: "in-app",
          timing: "During goal setup",
          title: "Smart Goal Suggestions",
          content: "Based on your income, we recommend starting with a $1,000 emergency fund. This gives you financial security and builds a great savings habit!",
          personalization: "Recommendations based on income level and financial profile",
          eventToLog: "goal_suggestion_shown"
        },
        {
          id: 3,
          channel: "email",
          timing: "1 hour after goal creation",
          title: "You're On Your Way! 🚀",
          content: "Great job setting up your first savings goal! Here's your step-by-step guide to reaching $1,000 faster, plus tips from users who hit their goals in record time.",
          personalization: "Timeline and tips customized for goal amount and target date",
          eventToLog: "success_guide_sent"
        },
        {
          id: 4,
          channel: "sms",
          timing: "Day 2 if no initial funding",
          title: "Ready to Start Saving?",
          content: "🏦 Your savings goal is waiting! Add just $25 to get started and see how quickly small amounts add up. It takes 30 seconds!",
          cta: "Add $25",
          eventToLog: "funding_reminder_sms"
        }
      ],
      expectedOutcomes: [
        "72% of users complete their first goal setup",
        "58% make an initial deposit within 48 hours",
        "40% increase in 30-day user retention"
      ]
    },
    engagementJourney: {
      id: "fintech_engagement",
      name: "Savings Progress Celebration",
      type: "event-triggered",
      trigger: {
        eventName: "milestone_reached",
        description: "User reaches 25%, 50%, or 75% of their savings goal",
        properties: { "milestone": "50%", "goal_amount": 1000, "current_amount": 500 }
      },
      description: "Celebrate achievements and encourage continued progress toward financial goals",
      businessGoal: "Maintain momentum and increase goal completion rates",
      steps: [
        {
          id: 1,
          channel: "in-app",
          timing: "Immediately on milestone",
          title: "Halfway There! 🎉",
          content: "Amazing progress! You've saved $500 toward your $1,000 goal. You're building an incredible habit - keep it up!",
          personalization: "Celebration message adapted to milestone percentage and goal type",
          cta: "See My Progress",
          eventToLog: "milestone_celebration_shown"
        },
        {
          id: 2,
          channel: "push",
          timing: "Next day",
          title: "Momentum Building! 💪",
          content: "Yesterday's save brought you to 50%! At this rate, you'll reach your goal 2 weeks early. Ready for your next deposit?",
          personalization: "Projected completion date based on current saving rate",
          cta: "Add More",
          eventToLog: "momentum_push_sent"
        },
        {
          id: 3,
          channel: "email",
          timing: "Weekly",
          title: "Your Savings Success Story",
          content: "See how your consistent saving compares to other Cash Cat users. Plus, discover the strategies that helped users like you accelerate their progress by 40%.",
          personalization: "Benchmarks and strategies relevant to user's saving pattern",
          eventToLog: "progress_report_sent"
        },
        {
          id: 4,
          channel: "sms",
          timing: "When goal completion is projected within 1 month",
          title: "Goal Finish Line in Sight! 🏁",
          content: "You're so close! Just $200 more and you'll hit your $1,000 goal. One final push this month and you're there! 💪",
          cta: "Make Final Push",
          eventToLog: "final_stretch_sms"
        }
      ],
      expectedOutcomes: [
        "68% higher likelihood of reaching next milestone",
        "35% increase in average monthly deposits",
        "25% faster goal completion time"
      ]
    },
    conversionJourney: {
      id: "fintech_conversion",
      name: "Premium Features Upgrade",
      type: "event-triggered",
      trigger: {
        eventName: "advanced_feature_attempted",
        description: "User tries to access premium features like investment tools or detailed analytics",
        properties: { "feature": "investment_recommendations", "user_tenure": 30 }
      },
      description: "Convert engaged users to premium subscription with advanced financial tools",
      businessGoal: "Increase premium subscription conversion and revenue per user",
      steps: [
        {
          id: 1,
          channel: "push",
          timing: "Immediately",
          title: "Unlock Advanced Financial Tools",
          content: "Ready to supercharge your finances? Get investment recommendations, advanced budgeting, and tax optimization for just $9.99/month.",
          cta: "Start Free Trial",
          eventToLog: "premium_offer_push"
        },
        {
          id: 2,
          channel: "in-app",
          timing: "On next app open",
          title: "See What Premium Can Do",
          content: "Premium users save an average of $2,400 more per year with our advanced tools. Take a quick tour to see how these features can accelerate your goals.",
          personalization: "Benefits calculated based on user's current savings rate and goals",
          eventToLog: "premium_tour_shown"
        },
        {
          id: 3,
          channel: "email",
          timing: "4 hours later",
          title: "Your Personalized Premium Preview",
          content: "Based on your savings pattern, here's exactly how Premium features would work for YOUR financial situation. See your projected benefits and savings acceleration.",
          personalization: "Concrete examples using user's actual financial data and goals",
          eventToLog: "personalized_preview_sent"
        },
        {
          id: 4,
          channel: "sms",
          timing: "24 hours later",
          title: "Limited Time: First Month Free",
          content: "🎁 Special offer just for you! Try Premium free for 30 days - no commitment. Start building wealth faster today!",
          cta: "Claim Free Month",
          eventToLog: "free_trial_offer_sms"
        }
      ],
      expectedOutcomes: [
        "32% conversion rate to premium trial",
        "78% trial-to-paid conversion rate",
        "Average premium user lifetime value of $450"
      ]
    },
    retentionJourney: {
      id: "fintech_retention",
      name: "Stalled Savers Re-engagement",
      type: "segment-based",
      trigger: {
        eventName: "complex_segment_match",
        description: "Users who created a savings goal, funded it at least once, but haven't added money in 30 days",
        timing: "Updated daily"
      },
      description: "Re-engage users who started strong but have become inactive with their financial goals",
      businessGoal: "Reduce churn and reactivate dormant savers",
      steps: [
        {
          id: 1,
          channel: "email",
          timing: "Day 30 of inactivity",
          title: "Your Savings Goal Misses You",
          content: "You made great progress on your emergency fund - $400 saved toward your $1,000 goal! Life gets busy, but your future self will thank you for getting back on track.",
          personalization: "Reference specific goal progress and amount saved",
          eventToLog: "reengagement_email_sent"
        },
        {
          id: 2,
          channel: "push",
          timing: "Day 32",
          title: "Small Steps, Big Results",
          content: "💡 Tip: Even $10 today keeps your momentum going! People who save weekly reach their goals 3x faster than monthly savers.",
          cta: "Add $10",
          eventToLog: "small_step_push"
        },
        {
          id: 3,
          channel: "in-app",
          timing: "On next app open",
          title: "Welcome Back, Future Millionaire! 🌟",
          content: "Great to see you! We've kept your $400 safe and growing. Ready to continue building your financial security? Here's an easy way to get back on track.",
          personalization: "Show updated balance and progress since last visit",
          eventToLog: "welcome_back_message"
        },
        {
          id: 4,
          channel: "sms",
          timing: "Day 45 if still inactive",
          title: "One Final Push? 💪",
          content: "You're 60% there! Want help setting up an automatic $25 weekly deposit? It takes the thinking out of saving and you'll hit your goal by summer!",
          cta: "Set Auto-Save",
          eventToLog: "automation_offer_sms"
        }
      ],
      expectedOutcomes: [
        "28% of stalled users resume saving within 7 days",
        "15% conversion to automatic savings plans",
        "Reactivated users complete goals at 85% rate (vs 45% baseline)"
      ]
    }
  },
  {
    industry: "Food Delivery",
    description: "On-demand food delivery platforms focused on order frequency and customer lifetime value",
    icon: "🍕",
    color: "navy",
    companyExample: "QuickBites Delivery",
    problemStatement: "Customers often place one order and never return, discover limited restaurants, or abandon carts due to delivery fees and wait times without understanding the value proposition.",
    solutionBenefits: [
      "45% increase in repeat order rate through behavioral triggers",
      "30% higher average order value with personalized recommendations",
      "60% reduction in cart abandonment via timely interventions",
      "2.5x improvement in customer lifetime value"
    ],
    keyEvents: [
      {
        eventName: "first_order_completed",
        description: "Customer completes their first order",
        properties: { "order_value": 24.50, "restaurant": "Tony's Pizza", "delivery_time": 28 }
      },
      {
        eventName: "restaurant_favorited",
        description: "Customer adds restaurant to favorites",
        properties: { "restaurant_id": "rest_456", "cuisine_type": "italian", "avg_rating": 4.7 }
      },
      {
        eventName: "cart_abandoned",
        description: "Customer adds items to cart but doesn't complete order",
        properties: { "cart_value": 18.25, "items": 3, "abandonment_reason": "delivery_fee" }
      },
      {
        eventName: "delivery_completed",
        description: "Order successfully delivered to customer",
        properties: { "actual_delivery_time": 32, "estimated_time": 30, "rating": 5 }
      },
      {
        eventName: "promotion_viewed",
        description: "Customer sees a promotional offer",
        properties: { "promo_type": "free_delivery", "discount_amount": 3.99, "restaurants_included": 15 }
      },
      {
        eventName: "search_performed",
        description: "Customer searches for specific food or restaurant",
        properties: { "query": "chinese food", "results_count": 12, "filter_used": "under_30_min" }
      }
    ],
    onboardingJourney: {
      id: "food_onboarding",
      name: "First Order Success Journey",
      type: "event-triggered",
      trigger: {
        eventName: "app_downloaded",
        description: "Customer downloads the QuickBites app"
      },
      description: "Guide new customers to place their first successful order and discover the platform value",
      businessGoal: "Increase first-order conversion and establish ordering habits",
      steps: [
        {
          id: 1,
          channel: "push",
          timing: "30 minutes after download",
          title: "Welcome to QuickBites! 🍕",
          content: "Hungry? Get your first meal delivered free! Over 200 restaurants near you are ready to satisfy any craving.",
          cta: "Browse Restaurants",
          eventToLog: "welcome_push_sent"
        },
        {
          id: 2,
          channel: "in-app",
          timing: "On first app open",
          title: "What Are You Craving?",
          content: "Let's find your perfect meal! Choose from pizza, sushi, burgers, healthy options, and more. Plus, delivery is FREE on your first order!",
          personalization: "Restaurant recommendations based on location and time of day",
          cta: "Explore Food",
          eventToLog: "craving_prompt_shown"
        },
        {
          id: 3,
          channel: "email",
          timing: "2 hours if no order placed",
          title: "Your Free Delivery is Waiting! 🚗",
          content: "Don't let your free delivery offer expire! Here are the top-rated restaurants in your area, ready to deliver delicious food to your door tonight.",
          personalization: "Curated restaurant list based on popular choices in user's neighborhood",
          cta: "Order Now - Free Delivery",
          eventToLog: "free_delivery_email"
        },
        {
          id: 4,
          channel: "sms",
          timing: "Day 2 if still no order",
          title: "Last Day for Free Delivery! 🎁",
          content: "⏰ Your free delivery expires tonight! Tony's Pizza (4.8★) has a 20-min delivery time right now. Order before midnight!",
          cta: "Order Tony's Pizza",
          eventToLog: "urgency_sms_sent"
        }
      ],
      expectedOutcomes: [
        "65% first-order conversion rate within 48 hours",
        "42% of first-time customers place second order within a week",
        "Average first order value of $28.50"
      ]
    },
    engagementJourney: {
      id: "food_engagement",
      name: "Restaurant Discovery Journey",
      type: "event-triggered",
      trigger: {
        eventName: "restaurant_favorited",
        description: "Customer adds a restaurant to their favorites",
        properties: { "cuisine_type": "italian", "restaurant_name": "Tony's Pizza" }
      },
      description: "Help customers discover similar restaurants and expand their dining preferences",
      businessGoal: "Increase restaurant variety and order frequency",
      steps: [
        {
          id: 1,
          channel: "in-app",
          timing: "Immediately after favoriting",
          title: "Great Choice! 🌟",
          content: "Tony's Pizza is a customer favorite! Since you love Italian food, you might also enjoy Mama Rosa's Pasta and Luigi's Authentic Italian - both highly rated!",
          personalization: "Recommend similar restaurants based on cuisine type and ratings",
          cta: "Explore Italian Food",
          eventToLog: "similar_restaurants_shown"
        },
        {
          id: 2,
          channel: "push",
          timing: "Next meal time (based on first order time)",
          title: "Tony's Has Your Favorite Ready! 🍕",
          content: "Craving that delicious pizza again? Tony's Pizza is available now with 25-minute delivery. Plus, try their new garlic bread!",
          personalization: "Timing based on typical meal patterns and previous order time",
          cta: "Reorder from Tony's",
          eventToLog: "reorder_push_sent"
        },
        {
          id: 3,
          channel: "email",
          timing: "Weekly",
          title: "Your Italian Food Journey",
          content: "Based on your love for Tony's Pizza, we've curated a list of the best Italian restaurants in your area. Discover authentic pasta, fresh salads, and artisan desserts!",
          personalization: "Curated list of Italian restaurants with different specialties",
          eventToLog: "cuisine_discovery_email"
        },
        {
          id: 4,
          channel: "sms",
          timing: "When favorite restaurant has special offer",
          title: "Tony's Pizza Special! 🍕",
          content: "🔥 Your favorite restaurant has a limited offer: Buy 1 pizza, get 1 half off! Valid today only at Tony's Pizza.",
          cta: "Order Special Deal",
          eventToLog: "favorite_restaurant_deal"
        }
      ],
      expectedOutcomes: [
        "85% try at least one recommended similar restaurant",
        "3.2x increase in orders from different cuisine types",
        "40% higher average weekly order frequency"
      ]
    },
    conversionJourney: {
      id: "food_conversion",
      name: "Cart Abandonment Recovery",
      type: "event-triggered",
      trigger: {
        eventName: "cart_abandoned",
        description: "Customer adds items to cart but doesn't complete checkout",
        properties: { "cart_value": 18.25, "abandonment_reason": "delivery_fee" }
      },
      description: "Recover abandoned carts with personalized incentives and value propositions",
      businessGoal: "Reduce cart abandonment and convert hesitant customers",
      steps: [
        {
          id: 1,
          channel: "push",
          timing: "15 minutes after abandonment",
          title: "Your Delicious Order is Waiting! 🛒",
          content: "Don't let that tasty meal get away! Complete your $18.25 order from Tony's Pizza and satisfy that craving.",
          personalization: "Reference specific restaurant and cart value",
          cta: "Complete Order",
          eventToLog: "cart_recovery_push"
        },
        {
          id: 2,
          channel: "in-app",
          timing: "On next app open",
          title: "We'll Cover the Delivery Fee! 🚗",
          content: "We noticed delivery fees can add up. This time, it's on us! Complete your Tony's Pizza order and we'll waive the $3.99 delivery fee.",
          personalization: "Address specific abandonment reason with targeted solution",
          eventToLog: "delivery_fee_waiver_shown"
        },
        {
          id: 3,
          channel: "email",
          timing: "2 hours later",
          title: "Why QuickBites is Worth It",
          content: "We get it - delivery fees can seem high. But here's what you get: guaranteed hot food, real-time tracking, 5-minute delivery windows, and our happiness guarantee. Plus, save with our membership!",
          personalization: "Value proposition focused on customer's specific concerns",
          eventToLog: "value_prop_email"
        },
        {
          id: 4,
          channel: "sms",
          timing: "6 hours later",
          title: "Final Offer: 20% Off! 🎯",
          content: "💰 Last chance! Get 20% off your Tony's Pizza order (saving you $3.65). This special offer expires in 2 hours!",
          cta: "Save 20% Now",
          eventToLog: "final_discount_sms"
        }
      ],
      exitCondition: {
        eventName: "order_completed",
        description: "Customer completes the abandoned order or places a new order"
      },
      expectedOutcomes: [
        "38% cart recovery rate (vs 12% baseline)",
        "Average recovered order value of $21.30",
        "65% of recovered customers place another order within 2 weeks"
      ]
    },
    retentionJourney: {
      id: "food_retention",
      name: "Win-Back Dormant Customers",
      type: "event-triggered",
      trigger: {
        eventName: "no_order_placed",
        description: "Customer hasn't placed an order in 14 days",
        timing: "14 days since last order"
      },
      description: "Re-engage customers who have stopped ordering with personalized offers and new options",
      businessGoal: "Reduce churn and reactivate dormant customers",
      steps: [
        {
          id: 1,
          channel: "email",
          timing: "Day 14 of inactivity",
          title: "We Miss You at QuickBites! 🥺",
          content: "It's been 2 weeks since your last order from Tony's Pizza. We've added 15 new restaurants since then, including some amazing options we think you'll love!",
          personalization: "Reference last order and highlight new restaurants in preferred cuisine types",
          eventToLog: "miss_you_email"
        },
        {
          id: 2,
          channel: "push",
          timing: "Day 16",
          title: "Special Welcome Back Offer! 🎁",
          content: "Come back to QuickBites and get 30% off your next order! Your favorites are waiting, plus discover new restaurants in your area.",
          cta: "Get 30% Off",
          eventToLog: "welcome_back_offer_push"
        },
        {
          id: 3,
          channel: "in-app",
          timing: "On return",
          title: "Welcome Back! Here's What's New 🌟",
          content: "While you were away, we added lightning-fast delivery and 20 new restaurants! Plus, here's a special returning customer bonus just for you.",
          personalization: "Highlight new features and restaurants added since last order",
          eventToLog: "whats_new_shown"
        },
        {
          id: 4,
          channel: "sms",
          timing: "Day 21 if no return",
          title: "Final Call: Free Delivery Forever! 🚗",
          content: "🎊 Exclusive offer: Come back now and get FREE DELIVERY on all orders for the next month! No minimum order required.",
          cta: "Claim Free Delivery",
          eventToLog: "final_retention_offer"
        }
      ],
      expectedOutcomes: [
        "24% of dormant customers return within 7 days",
        "16% full reactivation rate (vs 4% organic)",
        "Reactivated customers have 2.1x higher lifetime value than new customers"
      ]
    }
  }
];

// Event Data Examples for each industry
export const eventDataExamples = {
  gaming: {
    "level_completed": {
      "user_id": "player_12345",
      "level": 15,
      "completion_time": 240,
      "power_ups_used": 2,
      "score": 8750,
      "timestamp": "2024-01-15T14:30:00Z"
    },
    "iap_completed": {
      "user_id": "player_12345", 
      "item": "power_up_bundle",
      "price": 4.99,
      "currency": "USD",
      "level_triggered": 15,
      "timestamp": "2024-01-15T14:45:00Z"
    }
  },
  news: {
    "article_read": {
      "user_id": "reader_67890",
      "article_id": "ai-breakthrough-2024",
      "category": "artificial-intelligence",
      "read_time": 240,
      "scroll_depth": 95,
      "timestamp": "2024-01-15T09:15:00Z"
    },
    "paywall_hit": {
      "user_id": "reader_67890",
      "article_count": 3,
      "time_on_site": 420,
      "category": "premium",
      "timestamp": "2024-01-15T09:45:00Z"
    }
  },
  fintech: {
    "savings_goal_created": {
      "user_id": "saver_54321",
      "goal_amount": 1000,
      "target_date": "2024-06-30",
      "category": "emergency_fund",
      "timestamp": "2024-01-15T19:20:00Z"
    },
    "goal_funded": {
      "user_id": "saver_54321",
      "amount": 100,
      "goal_id": "goal_emergency_123",
      "funding_method": "bank_transfer",
      "timestamp": "2024-01-16T08:30:00Z"
    }
  },
  food: {
    "cart_abandoned": {
      "user_id": "customer_98765",
      "cart_value": 24.50,
      "restaurant": "Tony's Pizza",
      "items": ["Margherita Pizza", "Garlic Bread", "Soda"],
      "abandonment_reason": "delivery_fee",
      "timestamp": "2024-01-15T18:30:00Z"
    },
    "order_completed": {
      "user_id": "customer_98765",
      "order_value": 24.50,
      "restaurant": "Tony's Pizza", 
      "delivery_time": 28,
      "timestamp": "2024-01-15T19:15:00Z"
    }
  }
}; 