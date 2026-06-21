import type { EffectiveTier } from '@/lib/subscriptions'

export interface Lesson {
  id: string
  title: string
  duration: string
  description: string
  objectives: string[]
  keyPoints: string[]
  requiredTier: EffectiveTier
  videoId?: string
}

export interface Course {
  id: string
  title: string
  icon: string
  tagline: string
  description: string
  requiredTier: EffectiveTier
  status: 'available' | 'coming-soon'
  lessons: Lesson[]
}

export const COURSES: Course[] = [
  {
    id: 'foh-essentials',
    title: 'Front of House Essentials',
    icon: '🌟',
    tagline: 'Free Starter Course',
    description: 'Your introduction to world-class guest service. Available to all members.',
    requiredTier: 'EXPLORER',
    status: 'available',
    lessons: [
      {
        id: 'lesson-1',
        title: 'The Hospitality Mindset',
        duration: '8 min',
        description: 'Understand what separates good service from truly great hospitality.',
        objectives: ['Define what "hospitality" really means', 'Identify the mindset shift needed to excel', 'Recognize hospitality moments in everyday interactions'],
        keyPoints: ['Hospitality is not what you do — it\'s how you make people feel', 'Every touchpoint is an opportunity to create a memory', 'The best service feels effortless because it\'s deeply prepared'],
        requiredTier: 'EXPLORER',
      },
      {
        id: 'lesson-2',
        title: 'Understanding Your Guest',
        duration: '10 min',
        description: 'Learn to read your guests and anticipate their needs before they ask.',
        objectives: ['Identify different guest personality types', 'Recognize verbal and non-verbal cues', 'Adapt your service style to different guests'],
        keyPoints: ['Observation is your most powerful tool', 'Anticipation is the highest form of service', 'Listen more than you speak in your first 60 seconds'],
        requiredTier: 'EXPLORER',
      },
      {
        id: 'lesson-3',
        title: 'First Impressions That Last',
        duration: '7 min',
        description: 'The science of first impressions and how to engineer them intentionally.',
        objectives: ['Understand the 7-second rule', 'Script a great greeting', 'Recover from a bad first impression'],
        keyPoints: ['Guests form opinions in the first 7 seconds', 'Eye contact, smile, and posture communicate before words do', 'A great greeting sets the tone for the entire experience'],
        requiredTier: 'EXPLORER',
      },
    ],
  },
  {
    id: 'foh-excellence',
    title: 'Front of House Excellence',
    icon: '🍷',
    tagline: 'Full Member Course',
    description: 'Master the guest-facing skills that define your brand and drive loyalty — from service standards to recovery.',
    requiredTier: 'MEMBER',
    status: 'available',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Setting Service Standards',
        duration: '12 min',
        description: 'Build service standards that are specific, measurable, and trainable.',
        objectives: ['Define measurable service standards for your operation', 'Build a service standard document your team can follow', 'Create accountability without micromanaging'],
        keyPoints: ['Standards without specificity are wishes, not standards', 'Great standards anticipate failure points and address them proactively', 'Train to the standard, not to the exception'],
        requiredTier: 'MEMBER',
      },
      {
        id: 'lesson-2',
        title: 'Scripting Guest Interactions',
        duration: '14 min',
        description: 'How to create scripts that feel natural and elevate the guest experience.',
        objectives: ['Write scripts for key guest touchpoints', 'Train scripts so they feel genuine, not robotic', 'Adapt scripts for different personality types'],
        keyPoints: ['Scripts should be frameworks, not lines to memorize verbatim', 'The best scripts disappear — they sound like natural conversation', 'Practice scripts until they require no conscious thought'],
        requiredTier: 'MEMBER',
      },
      {
        id: 'lesson-3',
        title: 'Handling Complaints Professionally',
        duration: '16 min',
        description: 'Turn negative moments into loyalty-building opportunities with the LEARN framework.',
        objectives: ['Apply the LEARN framework to any complaint', 'Empower your team to resolve complaints on the spot', 'Track and analyze complaints for systemic improvements'],
        keyPoints: ['Listen, Empathize, Apologize, Resolve, Notify (LEARN)', 'Resolution speed matters more than what you resolve', 'A complaint well-handled creates a more loyal guest than no complaint at all'],
        requiredTier: 'MEMBER',
      },
      {
        id: 'lesson-4',
        title: 'Service Recovery That Wins',
        duration: '11 min',
        description: 'The psychology of service recovery and how to execute it every time.',
        objectives: ['Understand the service recovery paradox', 'Design a service recovery playbook', 'Empower frontline staff to make decisions'],
        keyPoints: ['Guests forgive mistakes far more easily than they forgive indifference', 'Speed and sincerity are the two pillars of recovery', 'Give your team decision-making power up to a defined dollar threshold'],
        requiredTier: 'MEMBER',
      },
      {
        id: 'lesson-5',
        title: 'Upselling That Feels Like Service',
        duration: '13 min',
        description: 'Increase average check without ever making a guest feel sold to.',
        objectives: ['Distinguish recommendation from hard selling', 'Use storytelling to describe menu items', 'Time your recommendations to moments of maximum receptivity'],
        keyPoints: ['Guests don\'t resist recommendations — they resist feeling manipulated', 'Genuine enthusiasm is your most powerful sales tool', 'Upselling is about matching guests with experiences they\'ll love'],
        requiredTier: 'MEMBER',
      },
    ],
  },
  {
    id: 'boh-operations',
    title: 'Back of House Operations',
    icon: '🍳',
    tagline: 'Full Member Course',
    description: 'Build the systems, processes, and team culture that keep your back-of-house running efficiently.',
    requiredTier: 'MEMBER',
    status: 'available',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Kitchen Workflow Design',
        duration: '15 min',
        description: 'Design your kitchen workflow to eliminate bottlenecks and maximize throughput.',
        objectives: ['Map your current kitchen workflow', 'Identify and eliminate your top 3 bottlenecks', 'Design station layouts for maximum efficiency'],
        keyPoints: ['Workflow design starts with your menu, not your space', 'The slowest station sets the pace for the entire kitchen', 'Mise en place is a philosophy, not just a prep technique'],
        requiredTier: 'MEMBER',
      },
      {
        id: 'lesson-2',
        title: 'Line Efficiency Strategies',
        duration: '12 min',
        description: 'Strategies to keep your line running smoothly during your highest-volume periods.',
        objectives: ['Develop a rush strategy for peak service', 'Cross-train stations to prevent single points of failure', 'Use expediting to control ticket flow'],
        keyPoints: ['Your line fails at the same points every service — fix them before service starts', 'Communication between the pass and the floor is your most important tool', 'Great expeditors make average cooks look like great ones'],
        requiredTier: 'MEMBER',
      },
      {
        id: 'lesson-3',
        title: 'Food Cost Control',
        duration: '18 min',
        description: 'Practical systems to control food cost without sacrificing quality.',
        objectives: ['Calculate your actual vs theoretical food cost', 'Implement portion control without demoralization', 'Build a waste tracking system'],
        keyPoints: ['The gap between actual and theoretical cost is where your profit leaks', 'Portion control is a training issue before it\'s a discipline issue', 'Track waste daily — what gets measured gets managed'],
        requiredTier: 'MEMBER',
      },
      {
        id: 'lesson-4',
        title: 'Waste Reduction Tactics',
        duration: '10 min',
        description: 'Systematic approaches to reducing food waste and improving your bottom line.',
        objectives: ['Audit your waste categories', 'Build a "use first" labeling and rotation system', 'Create daily specials that utilize high-waste items'],
        keyPoints: ['Most kitchens waste 4-10% of food purchased — every percentage point costs real money', 'First In, First Out (FIFO) must be a non-negotiable habit', 'Your daily special is your waste management strategy made delicious'],
        requiredTier: 'MEMBER',
      },
      {
        id: 'lesson-5',
        title: 'Building a Health & Safety Culture',
        duration: '14 min',
        description: 'Go beyond compliance to build a culture where food safety is everyone\'s responsibility.',
        objectives: ['Move from compliance-based to culture-based food safety', 'Build pre-shift safety habits into your team\'s routine', 'Handle a food safety incident without panic'],
        keyPoints: ['Compliance keeps you from being shut down — culture keeps your guests safe', 'The chef sets the standard: if they cut corners, the team cuts corners', 'Pre-shift line checks take 5 minutes and prevent 90% of issues'],
        requiredTier: 'MEMBER',
      },
    ],
  },
  {
    id: 'leadership',
    title: 'Manager & Leadership Development',
    icon: '👔',
    tagline: 'Coming Soon',
    description: 'Step into your authority and lead your team with clarity, consistency, and confidence.',
    requiredTier: 'MEMBER',
    status: 'coming-soon',
    lessons: [],
  },
  {
    id: 'guest-experience',
    title: 'Guest Experience Mastery',
    icon: '⭐',
    tagline: 'Coming Soon',
    description: 'Design guest journeys that create advocates who come back and bring others with them.',
    requiredTier: 'MEMBER',
    status: 'coming-soon',
    lessons: [],
  },
]

export function getCourse(id: string): Course | undefined {
  return COURSES.find(c => c.id === id)
}

export function getLesson(courseId: string, lessonId: string): Lesson | undefined {
  return getCourse(courseId)?.lessons.find(l => l.id === lessonId)
}
