/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlogChapter, Resource, Service, CaseStudy, ContentCalendarItem, DMKeywordStats, MediaAsset } from './types.ts';

export const BRAND_COMPANY = 'VELOCITY CONTENTS LAB';
export const BRAND_TAGLINE = 'Where Strategy Meets Soul';
export const FOUNDER_NAME = 'Thomax (Emmanuel Sunday Thomas)';
export const COFFEE_SHOP_TEST_QUOTE = "If you cannot explain this to someone over a coffee — why would a client trust you with their brand?";

export const ORIGIN_STORY_TEXT = {
  quote: "Daddy, it doesn't matter how good it is if nobody knows where to find it.",
  attribution: "— The daughter of Thomax. Age 7. The wisest marketing insight of his career.",
  story: `My daughter started a lemonade stand. She made the best lemonade I have ever tasted. But nobody came.
After an hour, she was devastated. "Daddy, my lemonade is not good enough."
Wrong diagnosis entirely.
Her lemonade was exceptional. Her distribution was broken.
We fixed three things: posted in the neighbourhood WhatsApp group, put signs where people actually walked, and she personally invited her friends' parents.
Twenty minutes later — 15 customers. $43 earned. Sold out.
She looked at me and said:
"Daddy, it doesn't matter how good it is if nobody knows where to find it."
From a 7-year-old. The entire content marketing problem solved in one sentence.
That is when Velocity Contents Lab was born.`
};

export const SERVICES: Service[] = [
  {
    id: 'velocity-engine',
    name: 'The Velocity Engine',
    price: '$3,500/month',
    description: 'Full content ecosystem — ongoing retainer that scales your organic footprint seamlessly.',
    includes: [
      '4 long-form cornerstone pieces (2,000+ words each) monthly',
      '40+ derivative assets across 10+ social platforms',
      'Distribution across 10+ visual and text channels',
      'Daily engagement and community-building acceleration',
      'Weekly recurring strategy calls with Thomax',
      'Monthly detailed performance and business pipelines report'
    ],
    bestFor: 'B2B companies, SaaS founders, complex professional services',
    timeline: '60–90 days for momentum, 120+ for compounding'
  },
  {
    id: 'authority-accelerator',
    name: 'The Authority Accelerator',
    price: '$2,500/month',
    description: 'Executive voice building — ongoing premium retainer to turn your raw expert knowledge into pipelines.',
    includes: [
      '8 long-form ghostwritten thought leadership posts monthly',
      'Surgical LinkedIn + Twitter/X narrative design and growth',
      'PR placement strategy consulting and warm pitches',
      'Organic client community engagement playbook',
      'Bi-weekly direct 1-on-1 strategy coaching calls'
    ],
    bestFor: 'Founders, executives, high-ticket consultants and VC partners',
    timeline: '30–60 days for visibility, 90+ for undisputed authority'
  },
  {
    id: 'launch-system',
    name: 'The Launch System',
    price: '$5,000 one-time',
    description: 'Product launch amplification — high-impact fixed scope for major events.',
    includes: [
      'Complete launch content suite (12+ hyper-tailored pieces)',
      '30-day comprehensive multi-channel distribution calendar',
      'Pre-launch buzz cultivation, launch day hijacking, and post-launch momentum capitalization',
      'Strategic creator/influencer outreach and positioning guide'
    ],
    bestFor: 'New product rollouts, complete rebrands, major corporate announcements',
    timeline: '4 weeks build, 4 weeks master execution'
  },
  {
    id: 'strategic-sprint',
    name: 'The Strategic Sprint',
    price: '$1,500 one-time',
    description: 'A deep-dive content audit and blueprint setup for teams looking for a strategic reset.',
    includes: [
      'Complete multi-platform content audit & deep audience research',
      'Direct competitor positioning matrix and gap analysis',
      'Actionable custom 90-day execution content roadmap',
      'Customized channel distribution recommendations',
      'Comprehensive brand search voice and messaging frameworks'
    ],
    bestFor: 'Teams starting marketing from scratch or needing an urgent structural reset',
    timeline: '2 weeks turnaround'
  }
];

export const FRAMEWORKS = [
  {
    id: 'distribution-engine',
    name: 'The Velocity Distribution Engine™',
    principle: 'Create Once, Distribute Forever.',
    description: 'One single energetic weekly content session produces bespoke assets for 10 platforms: LinkedIn (2,500 chars), Articles (800w), Twitter threads, carousels, threads, and more.',
    result: 'Reduced creation time from 12 hours to 2 hours per week without losing authentic voice.',
    keyword: 'DISTRIBUTE',
    icon: 'Share2'
  },
  {
    id: 'fortune-framework',
    name: 'The 7-Touch Fortune Framework™',
    principle: 'Personalized multi-channel sequence.',
    description: 'A 7-step BD outreach sequence spanning 32 days: personalization connection (Day 0), surgical value drop (Day 3), comment observation (Day 7), case study drop (Day 12), conversion ask (Day 18), last value (Day 25), and dignified goodbye (Day 32).',
    result: '50%+ DM and email response rates (versus the 5% industry standard).',
    keyword: 'FORTUNE',
    icon: 'MailOpen'
  },
  {
    id: 'trust-framework',
    name: 'The Founder Trust Framework™',
    principle: 'Becoming the obvious choice before the call.',
    description: '5 milestones to build trust before calls: visible results, named problem ownership, proof-stack rotating, pre-pitch distribution, and absolute consistency.',
    result: 'Zero "I need to think about it" hesitations. Clients secured in 4 countries entirely via content.',
    keyword: 'TRUST',
    icon: 'ShieldCheck'
  },
  {
    id: 'hybrid-system',
    name: 'The AI-Human Hybrid Content System™',
    principle: 'Human soul layered with semantic speed.',
    description: 'AI structure research (20m) → Human story layer (10m) → AI first draft (15m) → Human soul edit (15m) → Automation distribution (5m). Total 65 minutes.',
    result: 'Eliminated "robot speak". Saved hours while maintaining deeply resonant emotional connection.',
    keyword: 'HYBRID',
    icon: 'Cpu'
  },
  {
    id: 'discovery-framework',
    name: 'The Discovery Build Framework™',
    principle: 'Same-day booking mechanics.',
    description: '5 high-impact questions: Q1 what challenge is being solved, Q2 negative cost in revenue/time, Q3 previous attempts, Q4 perfect 90-day projection, Q5 confidence trigger.',
    result: 'Over 80% same-day agreement ratios on discovery calls. Highly repeatable results.',
    keyword: 'CURIOUS',
    icon: 'HeartHandshake'
  }
];

export const RESOURCES: Resource[] = [
  {
    keyword: 'FORTUNE',
    title: '7-Touch Fortune Framework Toolkit',
    description: 'Surgical business development scripts and a complete 32-day sequence calendar.',
    bulletDesc: [
      'Pre-written templates for cold and warm outreach',
      'Day-by-day scheduling outline for 32 days',
      'Follow-up strategies that guarantee friendly responses'
    ]
  },
  {
    keyword: 'TRUST',
    title: 'Founder Trust Framework Guide',
    description: 'A 5-step strategic system to secure absolute digital trust before you ever jump on Zoom.',
    bulletDesc: [
      'Comprehensive calibration guides',
      'Rotary calendar models for the Proof-Stack system',
      '90-day positioning template guidelines'
    ]
  },
  {
    keyword: 'HYBRID',
    title: 'AI-Human Hybrid Content System',
    description: 'The exact 65-minute weekly workflow that scales high-quality authentic copy.',
    bulletDesc: [
      'Prompt collections for structural mapping',
      'Friction-free methods to stitch your personal human stories',
      'Editing cheat-sheet cards to bypass generic AI formatting patterns'
    ]
  },
  {
    keyword: 'CURIOUS',
    title: 'Discovery Build Framework Playbook',
    description: 'The 5-question matrix that dismantles buyer objections and closes same-day clients.',
    bulletDesc: [
      'Line-by-line questions with psychological analysis',
      'Redirection models for awkward pricing conversations',
      'Post-agreement immediate contract scripts'
    ]
  },
  {
    keyword: 'DISTRIBUTE',
    title: 'Velocity Distribution Engine Guide',
    description: 'Master framework to multiply 1 audio session into cohesive text and visual updates.',
    bulletDesc: [
      'Platform requirements sheet for 10 distinct channels',
      'Formatting and character limits reference grids',
      'Repurposing blueprint tools'
    ]
  },
  {
    keyword: 'LAGOS',
    title: 'Lagos → Global Playbook',
    description: 'Building world-class agencies from Africa serving Fortune scale enterprises globally.',
    bulletDesc: [
      'Operational currency and banking architectures',
      'Time-zone manipulation strategies that foster confidence',
      'How to turn cultural perspective into absolute creative advantage'
    ]
  }
];

export const CHAPTERS: BlogChapter[] = [
  {
    slug: 'chapters-the-fortune-is-in-the-follow-up',
    chapterNumber: 1,
    title: 'The Fortune Is in the Follow-Up — The 7-Touch Fortune Framework',
    status: 'PUBLISHED',
    description: 'Why 95% of outbound outreach dies on follow-up 2, and the exact 32-day rhythm we use to close five-figure retainers.',
    content: `## The Fortune Is in the Follow-Up

The industry has a dark secret. Most agency outreach is lazy, robotic, and fails immediately. 
Think about it. You get a cold pitch. It contains a block of text, 4 links, and a Calendly request. It is uninvited, non-personalized, and asks for your time upfront. 

When you do not respond, they send a bump email on Day 3: *"Just bumping this in your inbox."* 
On Day 7: *"Checking if you saw this."*
It is the administrative equivalent of tapping some stranger's shoulder repeatedly.

We decided to burn that playbook down and replace it with **The 7-Touch Fortune Framework™**.

### The Psychology of Outbound Value
Modern buyers are guarded. They do not want to "jump on a quick call." They want to see that you understand their problem. Our sequence is designed to establish authority incrementally over 32 days:

1. **Touch 1: Personalized Connection (Day 0)**
   A friendly, completely non-salesy message stating an exact connection or a genuine piece of praise about their work. No links, no asks. Just connection.

2. **Touch 2: Surgical Value Drop (Day 3)**
   You noticed a precise error in their current public content setup (e.g., a broken link, missing metadata, or lack of distribution on a great article). You send the solution on a platter: *"I loved your piece, but noticed it was not shared on X. We reformatted it into a thread for you. Hope it helps."*

3. **Touch 3: Observational Engagement (Day 7)**
   Read their latest post and comment with intellectual weight. Not *"Great post!"* but a 3-sentence addition that shows you operate in their niche.

4. **Touch 4: Case Study Drop (Day 12)**
   Send a 1-page document detailing a company specifically similar to them that achieved a 5x return. *"Saw your team is scaling. This is how we helped a similar team expand inbound demo volume this quarter."*

5. **Touch 5: The Direct Value-First Ask (Day 18)**
   *"Would 15 minutes of auditing your distribution system be worth it? If not, no worries at all."*

6. **Touch 6: The Last Value Gift (Day 25)**
   Send a link to a proprietary framework worksheet: *"Built this guide for our internal portfolio. Free for you."*

7. **Touch 7: The Dignified Breakup (Day 32)**
   *"Since the timing might be busy, I will step back here. If you ever want to re-evaluate distribution, you know where to find me. Best of luck on the expansion."*

### The Impact
By moving away from automated robotic loops, we saw open and response ratios jump from 5% to over 50%. In outbound pipelines, personalization is the ultimate leverage.`
  },
  {
    slug: 'chapters-i-lost-a-five-thousand-dollar-client-in-ten-minutes',
    chapterNumber: 2,
    title: 'I Lost a $5K Client in 10 Minutes — The Founder Trust Framework',
    status: 'PUBLISHED',
    description: 'A raw look at a humbling Lagos agency lesson that birthed our highest-converting closing mechanism.',
    content: `## A Humbling Lesson on Trust

In July 2024, I sat on a video call with an executive of a leading US software firm. They loved my methodology. The presentation was sharp. The pricing was agreed: **$5,000 per month**. 

Then, he asked a simple question:
*"Thomax, your ideas are world-class. But since you are operating from Lagos, how do I know my brand's narrative won't get lost in translation? Where are the other companies who trust you with their words?"*

I froze. I stammered. I pointed to a few NDA clients. I talked about my portfolio. I spoke in abstractions.
Within 10 minutes, the energy evaporated. They ended the call. They went with another agency charging twice as much.

That is the day I realized: **Abstractions die. Proof lives.**

### The Birth of the Founder Trust Framework™
You cannot complain about geographical skepticism; you must simply make your trust incontestable. We built a 5-step strategy that makes us the obvious partner:

* **Step 1: Radically Visible Results** — Your client metrics should be front and center, updated constantly, with visible attribution.
* **Step 2: Micro-Problem Ownership** — Never pitch yourself as a generalist. Own a specific pain: *"We turn cornerstone assets into 10 channels of bespoke distribution."*
* **Step 3: The Proof Stack** — Rotate 4 types of proof on a weekly loop: testimonial quotes, case-study growth numbers, process breakdown videos, and third-party media inclusions.
* **Step 4: Distribute Before You Pitch** — Give them an accurate, customized sample of their own potential distribution BEFORE the proposal. Let them read their own voice perfected.
* **Step 5: The Follow-Through Signal** — Display relentless, clockwork consistency. If your own blog or social channels go quiet for 2 weeks, you lose the right to pitch consistency to others.

Since putting this framework in place, we changed geographic skepticism into creative advantage. Lagos is not a barrier; it is one of the world's most energetic output engines.`
  },
  {
    slug: 'chapters-she-asked-why-seventeen-times',
    chapterNumber: 3,
    title: 'She Asked Why 17 Times — The Discovery Build Framework',
    status: 'COMING',
    description: 'How a relentless conversational interrogation from a seven-year-old completely revolutionized our high-ticket discovery calls.'
  },
  {
    slug: 'chapters-you-sound-like-a-robot',
    chapterNumber: 4,
    title: 'You Sound Like a Robot — The AI-Human Hybrid System',
    status: 'COMING',
    description: "The honest, four-word critique that forced me to develop a 65-minute content workflow that keeps the human soul alive."
  },
  {
    slug: 'chapters-stop-creating-start-distributing',
    chapterNumber: 5,
    title: 'Stop Creating. Start Distributing — The Velocity Distribution Engine',
    status: 'COMING',
    description: 'The mathematical reality of content saturation: Why the best content does not win, the best distributed content does.'
  },
  {
    slug: 'chapters-build-the-proof-stack',
    chapterNumber: 6,
    title: 'Build the Proof Stack — From Results to Revenue',
    status: 'COMING',
    description: 'How to transition client metrics from vague testimonials to structural revenue proofs that command premium retainers.'
  },
  {
    slug: 'chapters-the-content-to-revenue-system',
    chapterNumber: 7,
    title: 'The Content-to-Revenue System',
    status: 'COMING',
    description: 'Creating the direct correlation matrix that maps raw organic impressions directly into qualified sales opportunities.'
  },
  {
    slug: 'chapters-the-ninety-day-visibility-sprint',
    chapterNumber: 8,
    title: 'The 90-Day Visibility Sprint',
    status: 'COMING',
    description: 'The strict day-by-day playbook designed to carve an authoritative niche in highly saturated markets.'
  },
  {
    slug: 'chapters-lagos-global-building-world-class',
    chapterNumber: 9,
    title: 'Lagos → Global — Building World-Class From Africa',
    status: 'COMING',
    description: 'The structural playbooks, banking routes, and team design that power cross-continental execution.'
  },
  {
    slug: 'chapters-building-with-soul',
    chapterNumber: 10,
    title: 'Building With Soul — The Thomax Philosophy',
    status: 'COMING',
    description: 'Why content without humanity is noise, and the deep ethical responsibilities of creators in the age of automation.'
  }
];

export const AGENCY_METRICS = [
  { value: '$2.3M', label: 'Client Revenue Attributed', desc: 'Direct revenue tracked back to VCL strategies.' },
  { value: '847K+', label: 'Organic Impressions', desc: 'Surgical reach generated on organic channels.' },
  { value: '312%', label: 'Average Traffic Increase', desc: 'Compounded growth achieved after 90 days.' },
  { value: '89%', label: 'Client Retention Rate', desc: 'Ongoing retainers that cross multi-year milestones.' },
  { value: '23:1', label: 'Average Content ROI', desc: 'Client pipeline generation compared to spend.' },
  { value: '5', label: 'Continents Served', desc: 'Truly cross-continental Lagos to global execution.' }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'pulse-digital',
    client: 'Pulse Digital',
    industry: 'High-Ticket Agency',
    metrics: { before: '2,400 LinkedIn followers', after: '18,700 followers' },
    highlightMetric: 'Inbound inquiries up from 4 to 23/mo. +40% average deal size.',
    challenge: 'Struggling to source qualified high-ticket pipeline beyond low-margin localized networks. Content felt highly technical but lacked human narrative style.',
    solution: 'Implemented the 7-Touch Fortune Framework coupled with executive voice styling, turning the pipeline from cold outreach into qualified warm inbound queries.',
    expandedDetails: ' followers expanded organically in 120 days. Deal size closed shifted upward by 40% due to authoritative pre-call framing.'
  },
  {
    id: 'cloudsync',
    client: 'CloudSync Analytics',
    industry: 'B2B SaaS',
    metrics: { before: '15K monthly traffic', after: '62K monthly traffic' },
    highlightMetric: 'Demo requests up 80 to 287/mo. Closed $420K ARR in enterprise deals.',
    challenge: 'Excellent technical product, but failed to connect with non-technical business buyers. Organic search visibility was practically non-existent.',
    solution: 'Designed the AI-Human Hybrid Content System. Generated custom problem breakdowns targeting corporate buyers, distributing them globally over 10 platforms.',
    expandedDetails: 'Monthly traffic expanded by 413%. Demo request velocity surged, culminating in 3 major enterprise contracts valued at $140,000 ARR each.'
  },
  {
    id: 'ecothreads',
    client: 'EcoThreads Apparel',
    industry: 'E-commerce Brand',
    metrics: { before: '$45K MRR', after: '$127K MRR' },
    highlightMetric: 'Customer acquisition cost (CAC) dropped from $78 to $31.',
    challenge: 'A high-concept premium direct-to-consumer brand spending heavily on paid ads that yielded decreasing ROIs under skyrocketing ad platforms bids.',
    solution: 'Created full-width stories of manufacturing practices, putting the moral "Soul" of the fashion process before the product, and distributed heavily via carousels and threads.',
    expandedDetails: 'Increased monthly recurring collections by 182% in 90 days. CAC decreased by 60%, removing reliance on unpredictable algorithmic PPC platforms.'
  },
  {
    id: 'vanguard',
    client: 'Vanguard Consulting',
    industry: 'Enterprise Advisory',
    metrics: { before: '15K impressions/mo', after: '480K impressions/mo' },
    highlightMetric: 'Inbound leads up from 2 to 31/mo. Featured in Forbes, Entrepreneur.',
    challenge: 'A group of elite advisors whose massive combined expertise lay hidden behind standard, sterile PDFs on a 15-year-old corporate site structure.',
    solution: 'Mapped their institutional expertise into the Velocity Distribution Engine. Created authority streams and pitched ghostwritten briefs directly into publications.',
    expandedDetails: 'Organic impressions scaled 32x. Secured recurring feature inclusions in top global business publications, cementing authority status.'
  },
  {
    id: 'hyperion-ai',
    client: 'Hyperion AI',
    industry: 'Generative Tech / VC',
    metrics: { before: '890 followers', after: '12,400 followers' },
    highlightMetric: '1,247 signups in launch week. 3 inbound seed investor inquiries.',
    challenge: 'Entering a highly saturated, noisy AI space where competitor noise drowned out their highly advanced technological breakthroughs.',
    solution: 'Deployed The Founder Trust Framework paired with The Launch System sequence, translating complex mathematical APIs into human narrative-led growth vectors.',
    expandedDetails: 'Seeded launch buzz 4 weeks prior. Captured over 1,200 active users in 7 days, securing prominent inbound venture capitalist dialogues.'
  }
];

export const INITIAL_CALENDAR: ContentCalendarItem[] = [
  {
    id: 'cal-1',
    title: 'LinkedIn: The Fortune Is in the Follow-up Outline',
    content: 'Outlining our 7-step sequence spanning 32 days. Showing how a dignified breakup at Day 32 secures respect and keeps the door key open. Bold metrics front and center.',
    date: '2026-06-08T07:00:00', // Monday
    platform: 'LinkedIn',
    status: 'Scheduled',
    tags: ['Niche', 'Sequence', 'FORTUNE'],
    ctaUrl: 'https://velocitycontentlabs.com/resources'
  },
  {
    id: 'cal-2',
    title: 'Blog Chapter 1: Release Outbound Reality Checks',
    content: 'Full editorial breakdown of chapter 1 data. Explaining how we shifted outreach response rates from 5% to 50% using our system. Included raw examples.',
    date: '2026-06-08T07:00:00', // Monday
    platform: 'Blog',
    status: 'Published',
    tags: ['Blog', 'Chapter 1', 'FORTUNE']
  },
  {
    id: 'cal-3',
    title: 'Instagram Threads: Lemonade Stand Philosophy Quote',
    content: '"Daddy, it doesn\'t matter how good it is if nobody knows where to find it." The 7-year-old diagnostic that launched VELOCITY CONTENTS LAB.',
    date: '2026-06-08T07:00:00', // Monday
    platform: 'Instagram',
    status: 'Distributed',
    tags: ['Culture', 'Origin Story', 'Lagos']
  },
  {
    id: 'cal-4',
    title: 'Instagram: Carousel On AI-Human Content Splits',
    content: 'Visual 6-slide deck: slide 1: "Speak like a human, use AI like steel", slide 2-5: The 65-min workflow timeline, slide 6: Call to Action to DM "HYBRID".',
    date: '2026-06-09T09:00:00', // Tuesday
    platform: 'Instagram',
    status: 'Draft',
    tags: ['Campaign', 'Tutorial', 'HYBRID']
  },
  {
    id: 'cal-5',
    title: 'Twitter/X Thread: The 32-Day Outbound Outreach Cadence',
    content: '10-tweet master thread outlining Day 0, Day 3, Day 7, Day 12, Day 18, Day 25, and Day 32. Zero jargon, direct examples of value lines.',
    date: '2026-06-09T09:00:00', // Tuesday
    platform: 'Twitter/X',
    status: 'Scheduled',
    tags: ['Outreach', 'X-Thread', 'FORTUNE']
  },
  {
    id: 'cal-6',
    title: 'Facebook Group: High-Value Client Advisory Hacks',
    content: 'A detailed 1,200 words post on the "Founder Trust Framework" specifically targeting agency owners. Showing results from Pulse Digital case studies.',
    date: '2026-06-10T07:30:00', // Wednesday
    platform: 'Facebook',
    status: 'Scheduled',
    tags: ['Facebook', 'Community', 'TRUST']
  },
  {
    id: 'cal-7',
    title: 'Email: Weekly Soul & Distribution Newsletter',
    content: 'Opening story: My daughter\'s latest lemonade expansion metrics. Main value: Dismantling Q1 of the Discovery Build Framework. Closing call to action to book Zoom slot.',
    date: '2026-06-10T07:30:00', // Wednesday
    platform: 'Email',
    status: 'Scheduled',
    tags: ['Evergreen', 'Newsletter', 'CURIOUS']
  }
];

export const INITIAL_MEDIA: MediaAsset[] = [
  { id: 'img-1', name: 'Thomax Portrait A (Office Backdrop, Cream Suit)', url: '/photos/1000335399.png', tag: 'Photos' },
  { id: 'img-2', name: 'Thomax Tech B (Holographic Tech, Turtleneck)', url: '/photos/1000335398.png', tag: 'Photos' },
  { id: 'img-3', name: 'Thomax Disruptive C (Cinematic Explosion)', url: '/photos/1000335381.png', tag: 'Photos' },
  { id: 'img-4', name: 'Thomax + Wife Coordinated Camel Outfits', url: '/photos/1000313924.png', tag: 'Photos' },
  { id: 'img-5', name: 'Thomax + Wife Monogram Premium Studio', url: '/photos/1000313923.png', tag: 'Photos' },
  { id: 'img-6', name: 'Daughter Lemonade Branded Premium Image', url: '/photos/VCL_Daughter_Branded_Premium.png', tag: 'Photos' },
  { id: 'img-7', name: 'The Goodfellas Accountability Staircase', url: '/photos/1000319397.jpg', tag: 'Photos' },
  { id: 'img-8', name: 'Velocity Distribution Framework Structure PDF Logo', url: '/photos/vcl_badge_framework.png', tag: 'Frameworks' }
];

export const INITIAL_KEYWORDS: DMKeywordStats[] = [
  { keyword: 'FORTUNE', title: '7-Touch Fortune Framework Toolkit', downloads: 142, completionRate: '92%', conversionRate: '12%' },
  { keyword: 'TRUST', title: 'Founder Trust Framework Guide', downloads: 98, completionRate: '88%', conversionRate: '15%' },
  { keyword: 'HYBRID', title: 'AI-Human Hybrid Content System', downloads: 114, completionRate: '94%', conversionRate: '10%' },
  { keyword: 'CURIOUS', title: 'Discovery Build Framework Playbook', downloads: 67, completionRate: '83%', conversionRate: '18%' },
  { keyword: 'DISTRIBUTE', title: 'Velocity Distribution Engine Guide', downloads: 182, completionRate: '96%', conversionRate: '9%' },
  { keyword: 'LAGOS', title: 'Lagos → Global Playbook', downloads: 105, completionRate: '90%', conversionRate: '14%' }
];
