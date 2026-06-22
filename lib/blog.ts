export interface BlogSection {
  type: 'heading' | 'paragraph' | 'list'
  text?: string
  items?: string[]
}

export interface BlogPost {
  slug: string
  category: 'management' | 'training' | 'operations' | 'culture'
  icon: string
  badge: string
  readTime: string
  publishedAt: string
  title: string
  excerpt: string
  content: BlogSection[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'reduce-staff-turnover-restaurant',
    category: 'management',
    icon: '📊',
    badge: 'Management',
    readTime: '6 min read',
    publishedAt: 'May 14, 2025',
    title: 'How to Reduce Staff Turnover in Your Restaurant',
    excerpt: "Turnover doesn't start on a person's last day — it starts in the first week. Here are the retention strategies that actually move the needle.",
    content: [
      { type: 'paragraph', text: "The hospitality industry's turnover rate hovers around 75% annually — nearly three times the national average across all industries. But the operators beating that number aren't doing it with higher wages alone. They've figured out that retention is won or lost in the first 30 days, not after someone gives notice." },
      { type: 'heading', text: 'The Real Reason People Leave' },
      { type: 'paragraph', text: "Before you can fix turnover, you need to understand why it happens. Exit interviews are notoriously unreliable — people say 'personal reasons' or 'better opportunity' when the real answer is 'my manager made me feel invisible' or 'I never knew what was expected of me.' The actual drivers of early departure are almost always:" },
      { type: 'list', items: ['Unclear expectations from the start', 'A poor relationship with their direct supervisor', 'No sense of belonging or team culture', 'Feeling undertrained and set up to fail', 'Inconsistent scheduling that makes planning life impossible'] },
      { type: 'heading', text: 'The First 30 Days Framework' },
      { type: 'paragraph', text: "Your onboarding window is your most powerful retention tool and it's completely in your control. The managers who retain staff at above-average rates almost universally follow some version of a structured 30-day onboarding program. It doesn't need to be elaborate — it needs to be intentional." },
      { type: 'paragraph', text: "Week one should focus on belonging, not just procedures. Introduce your new hire to every team member by name. Assign a buddy who isn't their manager. Eat a meal together before their first real shift. These aren't soft gestures — they're the fastest way to trigger the psychological safety that makes someone want to come back the next day." },
      { type: 'heading', text: 'Practical Retention Moves That Work' },
      { type: 'list', items: [
        'Hold a 7-day check-in: a 10-minute conversation about what\'s going well and what\'s confusing. Most managers skip this and wonder why people ghost.',
        'Be explicit about the path forward. Even if there\'s no immediate promotion available, outline what growth looks like here.',
        'Recognize wins publicly and specifically. "Good job tonight" is forgotten in an hour. "The way you handled Table 12 when they sent back their food was exactly what we train for" is remembered.',
        'Schedule consistency matters more than pay rate for many staff. Work to give your reliable people the hours they can plan around.',
        'Address toxic team members immediately. One cancerous employee drives out three good ones.',
      ] },
      { type: 'heading', text: 'Measure What You Manage' },
      { type: 'paragraph', text: "Track your 30-day, 60-day, and 90-day retention rates separately. Most operators only look at annualized turnover, which masks where the real bleeding is happening. If your 30-day number is high, your onboarding is broken. If 60-90 days is the problem, look at your supervisor relationships and scheduling practices. The data tells you exactly where to focus." },
      { type: 'paragraph', text: "Retention isn't a perk program or a pizza party. It's a discipline. The restaurants keeping staff for 2, 3, 5 years are doing it through consistent, intentional management — not better wages than the place across the street." },
    ],
  },
  {
    slug: 'new-hire-onboarding-checklist',
    category: 'training',
    icon: '✅',
    badge: 'Training',
    readTime: '8 min read',
    publishedAt: 'April 28, 2025',
    title: "New Hire Onboarding: A Complete Manager's Checklist",
    excerpt: "The first 30 days determine whether someone stays or goes. This checklist covers everything you should be doing — and most managers aren't.",
    content: [
      { type: 'paragraph', text: "Walk into most restaurants on a new hire's first day and you'll find the same scene: a manager handing over a stack of papers, pointing at the sidework chart, and saying 'shadow Jake tonight.' That's not onboarding — that's hoping for the best." },
      { type: 'paragraph', text: "The operators with the best retention numbers treat the first 30 days as a structured program, not an afterthought. Here's the framework that works." },
      { type: 'heading', text: 'Before Day One' },
      { type: 'list', items: [
        'Send a welcome message with start time, parking info, and what to wear — eliminates first-day anxiety',
        'Set up their station, locker, and login credentials before they arrive',
        'Brief the existing team that someone new is starting and ask them to be welcoming',
        'Assign a buddy (not the manager) for the first two weeks',
        'Prepare a 30-day schedule with clear milestones',
      ] },
      { type: 'heading', text: 'Day One: Belonging Before Procedures' },
      { type: 'paragraph', text: "The instinct is to dive straight into training — menu knowledge, POS systems, table numbers. Resist it. The single most important thing you can do on day one is make your new hire feel like they belong here. Introduce them personally to every team member. Take 10 minutes to tell them why you like working here. Show them where things are before you explain how things work." },
      { type: 'list', items: [
        'Personal welcome from the manager (not delegated)',
        'Full team introductions — names and roles',
        'Tour of the full property, including back-of-house areas they\'ll use',
        'Review the team culture and non-negotiables (not just the employee handbook)',
        'Pair with their buddy for the shift — observe only, no live service',
      ] },
      { type: 'heading', text: 'Week One: Build Confidence, Not Just Knowledge' },
      { type: 'list', items: [
        'Menu tasting — they cannot sell what they haven\'t tasted',
        'POS training in a no-pressure environment before live service',
        'Shadow their buddy through at least two full service periods',
        'End-of-day 5-minute check-in from the manager every shift',
        'First official sign-off task completed (your choice — make it achievable)',
      ] },
      { type: 'heading', text: 'Weeks Two and Three: Graduated Independence' },
      { type: 'paragraph', text: "The goal here is to progressively transfer responsibility while keeping your safety net visible. Let them run their own section with their buddy nearby. Hold a formal 10-minute check-in at the end of week two — this is your turnover prevention window. If something is wrong, you'll hear it here before it becomes a resignation." },
      { type: 'heading', text: 'The 30-Day Review' },
      { type: 'paragraph', text: "At 30 days, hold a proper sit-down review — not a hallway conversation. Come prepared with specific observations (positive and developmental). Ask them: What's going well? What's still unclear? What do you need more of? This conversation signals that you're paying attention. That alone keeps people." },
      { type: 'list', items: [
        'Review all training sign-offs completed',
        'Set 60-day and 90-day development goals',
        'Discuss scheduling preferences and lock in a predictable base schedule',
        'Confirm their understanding of how performance and advancement work here',
      ] },
    ],
  },
  {
    slug: 'handling-difficult-guests',
    category: 'management',
    icon: '🤝',
    badge: 'Management',
    readTime: '5 min read',
    publishedAt: 'April 10, 2025',
    title: "How to Handle Difficult Guests Without Losing Your Cool",
    excerpt: "Every manager has a story. The ones who handle it best aren't born with thicker skin — they have a framework. Here's the one that works.",
    content: [
      { type: 'paragraph', text: "No amount of training can eliminate the difficult guest. They exist in every type of operation — from fast-casual to fine dining. What separates the managers who defuse these situations from the ones who escalate them isn't temperament. It's having a framework and using it consistently." },
      { type: 'heading', text: 'The LAST Method' },
      { type: 'paragraph', text: "The most effective guest recovery framework is one you can execute under pressure. LAST — Listen, Apologize, Solve, Thank — is simple enough to remember mid-service and flexible enough to apply to nearly any situation." },
      { type: 'list', items: [
        'Listen: Let them finish. Completely. Don\'t interrupt, don\'t defend, don\'t explain. Eye contact, open body language, full attention.',
        'Apologize: For the experience, not necessarily for wrongdoing. "I\'m sorry this wasn\'t what you expected" is always true and always appropriate.',
        'Solve: Offer a specific solution, not a vague promise. "Let me take care of that dish right now" beats "we\'ll see what we can do."',
        'Thank: "Thank you for telling us — this helps us get better." It reframes the interaction and gives them a positive role in the story.',
      ] },
      { type: 'heading', text: 'The Physical Approach Matters' },
      { type: 'paragraph', text: "Before you say a word, how you approach a difficult situation communicates everything. Move toward conflict, not away from it — the hesitant approach signals that you're not in control. Lower your voice slightly below their volume (never raise it to match). If they're standing, gently ask them to sit with you. Change of position helps change emotional state." },
      { type: 'heading', text: 'When to Escalate vs. Resolve' },
      { type: 'paragraph', text: "Not every situation should be escalated. In fact, most shouldn't be. Give your team clear authority to resolve complaints up to a defined threshold — a free dessert, a comped drink, a discount on the bill — without needing manager approval. When people feel empowered to solve problems, they do. When they have to escalate everything, they freeze." },
      { type: 'paragraph', text: "Escalate when: the guest is being verbally abusive to your team, when a solution is beyond your team's authority, or when there's a genuine safety concern. In these cases, step in calmly, remove the staff member from the situation, and take over. Protect your team." },
      { type: 'heading', text: 'The Post-Incident Debrief' },
      { type: 'paragraph', text: "The most underused tool in guest recovery is the 5-minute debrief after a difficult interaction. Pull aside the staff member who was involved. Ask what happened, what they tried, and what they'd do differently. This isn't a critique — it's a development conversation that also signals that you noticed and that you care. These moments build trust faster than any formal training." },
    ],
  },
  {
    slug: 'true-cost-employee-turnover-hospitality',
    category: 'operations',
    icon: '💸',
    badge: 'Operations',
    readTime: '7 min read',
    publishedAt: 'March 22, 2025',
    title: 'The Real Cost of Employee Turnover in Hospitality',
    excerpt: 'Most operators underestimate it by half. When you factor in recruiting, training, lost productivity, and guest experience impact, the number is staggering.',
    content: [
      { type: 'paragraph', text: "When managers calculate the cost of turnover, they typically count the obvious: posting a job listing, hours spent interviewing, maybe a background check. They come up with a number and it feels manageable. They're wrong — often by a factor of two or three." },
      { type: 'heading', text: 'What Turnover Actually Costs' },
      { type: 'paragraph', text: "A comprehensive turnover cost analysis covers six categories, and most operators only track one or two:" },
      { type: 'list', items: [
        'Separation costs: final pay processing, potential unemployment claims, exit interview time',
        'Vacancy costs: overtime paid to remaining staff to cover shifts, reduced table capacity if you\'re short-staffed',
        'Recruitment costs: job postings, agency fees, manager time reviewing applications and conducting interviews',
        'Onboarding costs: orientation time, training staff hours, uniforms, system access setup',
        'Lost productivity: a new hire operates at roughly 50-60% efficiency for their first 60 days',
        'Guest experience impact: your regulars notice new faces; inconsistent service affects reviews and repeat visits',
      ] },
      { type: 'paragraph', text: "Add it up and the industry consensus for a front-of-house employee replacement lands between $3,500 and $7,000. For a key manager, it can exceed $15,000 when you include the productivity gap during their absence and the time required to bring a replacement to full effectiveness." },
      { type: 'heading', text: 'The Hidden Multiplier: Team Morale' },
      { type: 'paragraph', text: "The number that never makes it into a turnover cost calculation is the morale cost. When a well-liked team member leaves, others start asking themselves the same question: should I be looking too? High-visibility departures are contagious. One resignation in a tight-knit team can trigger a wave if leadership doesn't respond thoughtfully." },
      { type: 'heading', text: 'A Simple ROI Case for Retention Investment' },
      { type: 'paragraph', text: "If your operation replaces 20 employees per year at an average cost of $4,500 per replacement, your baseline turnover cost is $90,000 annually. If a structured onboarding program, a buddy system, and more consistent scheduling reduces that by 30%, you've saved $27,000. The investment in those programs — even with outside training resources — rarely exceeds $5,000-$10,000. The ROI is not subtle." },
      { type: 'heading', text: 'Measuring Your Own Number' },
      { type: 'paragraph', text: "Pull your last 12 months of terminations and voluntary resignations. For each, estimate the hours spent on separation, recruitment, and onboarding. Apply a labor cost to those hours, add any direct costs (ads, agency fees), and factor a 50% productivity penalty for the average new hire's first 60 days. That's your number. Most managers who do this exercise for the first time find it motivating in a way that abstract percentages never were." },
    ],
  },
  {
    slug: 'building-training-culture-that-sticks',
    category: 'training',
    icon: '🎓',
    badge: 'Training',
    readTime: '9 min read',
    publishedAt: 'March 5, 2025',
    title: 'Building a Training Culture That Actually Sticks',
    excerpt: "One-time orientation isn't training — it's paperwork. A real training culture requires buy-in from leadership, consistency, and the right tools. Here's how to build it.",
    content: [
      { type: 'paragraph', text: "You can run the best orientation session in the industry and still have a training failure on your hands by week three. Because training culture isn't what happens on day one — it's what happens every day after that. It's what your shift leaders say on the floor. It's whether managers reinforce the standards they taught or quietly ignore them when it's busy. It's whether learning is visibly valued or quietly viewed as a chore that gets in the way of real work." },
      { type: 'heading', text: 'Why Most Training Programs Fail' },
      { type: 'paragraph', text: "The pattern is predictable: a new manager or owner implements a training program they're proud of. For the first few weeks, it runs well. Then business picks up, a key trainer leaves, or the manager gets busy — and the program quietly erodes. Within three months it's back to 'shadow someone for a few days and figure it out.'" },
      { type: 'list', items: [
        'Training is treated as an event, not a system',
        'No one owns accountability for whether it happens',
        'Standards are defined once and never reinforced',
        'Leadership doesn\'t model the behaviors they train',
        'There\'s no feedback loop to know if it\'s working',
      ] },
      { type: 'heading', text: 'The Three Pillars of a Durable Training Culture' },
      { type: 'paragraph', text: "Operations that sustain training cultures over time tend to share three characteristics: standards are written down and accessible, trainers are selected and developed (not just assigned), and reinforcement is built into daily operations — not saved for a quarterly refresher." },
      { type: 'heading', text: 'Written Standards: The Foundation' },
      { type: 'paragraph', text: "You cannot train consistently to unwritten standards. Every core operation — table greeting, order entry, complaint handling, shift opening procedures — should have a written standard that your trainers teach and your managers enforce. These don't need to be elaborate. A one-page SOP per procedure is sufficient. The discipline is in writing them, reviewing them annually, and making sure every manager knows them cold." },
      { type: 'heading', text: 'Building Your Trainer Bench' },
      { type: 'paragraph', text: "Your best trainer is almost certainly not the person who is most available to train. Select trainers based on their demonstration of the standards you care about and their ability to explain and show — not just tell. Invest in them: hold a brief trainer calibration each quarter to keep everyone aligned. Recognize them publicly. Pay them a small premium for training shifts. Make the trainer role aspirational." },
      { type: 'heading', text: 'Daily Reinforcement: Where Culture Lives' },
      { type: 'paragraph', text: "Training culture is built in the moments between formal training sessions. It lives in the two-second correction a shift lead makes when they see a greeting done wrong. It lives in the pre-shift huddle where a manager highlights one standard for the team to focus on tonight. It lives in the post-shift recognition when someone nails the service recovery you've been working on." },
      { type: 'paragraph', text: "Build reinforcement into your existing operational rhythm — don't add new meetings. Use pre-shifts, one-on-ones, and your walk-throughs as training moments. Consistency over intensity, every time." },
    ],
  },
  {
    slug: 'what-great-hospitality-managers-do-differently',
    category: 'culture',
    icon: '⭐',
    badge: 'Culture',
    readTime: '6 min read',
    publishedAt: 'February 18, 2025',
    title: 'What Great Hospitality Managers Do Differently',
    excerpt: "After studying hundreds of top operators, the patterns are clear. The best managers aren't the most experienced — they share a specific set of habits and mindsets.",
    content: [
      { type: 'paragraph', text: "Experience in hospitality management doesn't automatically make someone good at it. The industry is full of veterans who've managed for 20 years by doing the same things wrong, and relative newcomers who seem to get it instinctively. What separates them isn't time served — it's a set of observable habits and mindsets that show up consistently in the best managers we've encountered." },
      { type: 'heading', text: '1. They Manage the Energy in the Room' },
      { type: 'paragraph', text: "The best managers understand that their emotional state is contagious. When they walk into a chaotic Saturday night service anxious and reactive, the team mirrors it. When they walk in composed and focused, the team settles. This isn't about performing calm you don't feel — it's about developing genuine self-regulation and understanding that your team takes behavioral cues from you constantly, even when you think no one is watching." },
      { type: 'heading', text: '2. They Give Feedback Immediately and Specifically' },
      { type: 'paragraph', text: "Great managers don't save feedback for reviews or weekly meetings. They give it in the moment — within minutes of observing a behavior, positive or developmental. And they're specific: not 'good job with that table' but 'the way you apologized and immediately offered to replace the dish without waiting to be asked — that was exactly right.' Specificity makes feedback actionable. Generality makes it forgettable." },
      { type: 'heading', text: '3. They Know What They Don\'t Know' },
      { type: 'paragraph', text: "The managers who struggle longest are usually the ones who've stopped being curious. The ones who excel are perpetually learning — from their staff, from other operators, from guests, from their own mistakes. They ask their team for input on problems. They seek out peers and mentors. They read. They're not threatened by not having all the answers, because they've learned that the answers usually come from the people around them." },
      { type: 'heading', text: '4. They Protect Their Team' },
      { type: 'paragraph', text: "When a difficult guest confronts a staff member, the best managers step in. When corporate policy makes no sense at the unit level, they push back instead of passing the frustration down. When a team member is struggling, they address it directly rather than letting resentment build among the rest of the team. Staff watch how their manager responds when things get hard. It's the fastest way to build — or destroy — trust." },
      { type: 'heading', text: '5. They Create Predictability' },
      { type: 'paragraph', text: "Inconsistency is one of the most destabilizing things a manager can introduce to a team. When the standards change based on who's working, when the schedule is a mystery until Sunday night, when praise or discipline seems random — people disengage. The best managers are relentlessly consistent: same standards every shift, advance schedules, predictable decision-making. Predictability creates psychological safety, and psychological safety is where high performance lives." },
      { type: 'paragraph', text: "None of these habits require exceptional talent or decades of experience. They require intention, repetition, and a genuine commitment to the people you manage. That combination is rarer than it should be — and it's exactly what makes the operators who have it stand out." },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}
