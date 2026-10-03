// Starting data for the private admin dashboard.
import { ContentCalendarItem, DMKeywordStats, MediaAsset } from '../src/types.ts';

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
