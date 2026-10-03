/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogChapter {
  slug: string;
  chapterNumber: number;
  title: string;
  status: 'PUBLISHED' | 'COMING';
  content?: string;
  description: string;
  publishedAt?: string;
}

export interface Resource {
  keyword: string;
  title: string;
  description: string;
  bulletDesc: string[];
}

export interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  includes: string[];
  bestFor: string;
  timeline: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  metrics: {
    before: string;
    after: string;
  };
  highlightMetric: string;
  challenge: string;
  solution: string;
  expandedDetails?: string;
}

export interface ContentCalendarItem {
  id: string;
  title: string;
  content: string;
  date: string; // ISO string or simple YYYY-MM-DDTHH:MM
  platform: 'LinkedIn' | 'Instagram' | 'Twitter/X' | 'Facebook' | 'Email' | 'YouTube' | 'Blog';
  status: 'Draft' | 'Scheduled' | 'Published' | 'Distributed';
  tags: string[];
  ctaUrl?: string;
  aiTimeSuggested?: boolean;
}

export interface DMKeywordStats {
  keyword: string;
  title: string;
  downloads: number;
  completionRate: string;
  conversionRate: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  tag: 'Week 17' | 'Week 18' | 'Week 19' | 'Evergreen' | 'Frameworks' | 'Photos';
}

export interface LeadCapture {
  id: string;
  name: string;
  email: string;
  companySize?: string;
  budget?: string;
  source: string; // e.g., "Contact Form", "Newsletter capture", "Resource: FORTUNE"
  timestamp: string;
  message?: string;
}

