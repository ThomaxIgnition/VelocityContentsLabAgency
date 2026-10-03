/**
 * Single source of truth for company facts, services, pricing and client evidence.
 * Taken from the VCL Company Profile & Capability Statement 2026. Update here, and
 * every page that shows this information updates with it.
 */

export const COMPANY = {
  name: 'Velocity Contents Lab',
  legalName: 'Velocity Contents Lab Ltd',
  rc: 'RC 9868389',
  tagline: 'Where Strategy Meets Soul',
  promise: 'Clear messages. Reliable systems. Built together.',
  email: 'velocitycontentslab@gmail.com',
  website: 'velocitycontentlabs.com',
  address: '8 Eshinlokun Street, Ijesha, Lagos State, Nigeria',
  city: 'Lagos, Nigeria',
  hours: 'Monday to Friday, 9:00 AM to 5:00 PM WAT',
  responseTime: 'Within 4 business hours',
  operatingSince: 'July 2024',
  incorporated: '17 September 2026',
  companyType: 'Private Limited Company',
  registrationAuthority: 'Corporate Affairs Commission (CAC), Nigeria',
  delivery: 'On-site in Lagos and remote delivery to clients anywhere',
  founder: 'Emmanuel Sunday Thomas',
  founderShort: 'Thomax',
  founderTitle: 'Founder & Chief Executive Officer'
};

export const PHILOSOPHY =
  'It does not matter how good something is if nobody knows where to find it. Great work needs a clear message and a reliable system to carry it. That is what we build.';

export type ServiceLineId = 'content' | 'automation' | 'software';

export interface ServiceLine {
  id: ServiceLineId;
  number: string;
  name: string;
  short: string;
  promise: string;
  intro: string;
  tags: string[];
  scope: string[];
}

export const SERVICE_LINES: ServiceLine[] = [
  {
    id: 'content',
    number: '01',
    name: 'Content Strategy & Executive Communication',
    short: 'Content Strategy',
    promise: 'Making a business and its leaders visible, credible, and clearly understood.',
    intro:
      'We help founders, executives, and organisations communicate what they do in a way that the right people understand and remember. Our work is story-led and specific, written to sound like a real person rather than a template.',
    tags: ['Content strategy', 'Executive ghostwriting', 'Profile optimisation', 'Multi-platform content', 'Editing & campaigns'],
    scope: [
      'Content strategy, editorial planning, and 90-day content roadmaps',
      'Executive ghostwriting and thought leadership for LinkedIn and other platforms',
      'Professional profile optimisation across LinkedIn and other social platforms',
      'Multi-platform content production: posts, articles, newsletters, scripts, and visual content',
      'Editing, marketing, and campaign strategy',
      'Content calendars, repurposing, and distribution systems'
    ]
  },
  {
    id: 'automation',
    number: '02',
    name: 'AI Automation',
    short: 'AI Automation',
    promise: 'Systems that answer, follow up, schedule, and organise without waiting for someone to click send.',
    intro:
      'Our Technology & Automation Division designs, builds, and tests automation around how your business already operates. Each system is configured to your own tools, tone, and rules, so no two deployments are identical.',
    tags: ['AI customer care agents', 'Booking automation', 'WhatsApp, Telegram & email', 'CRM data workflows'],
    scope: [
      'AI customer care agents that answer, qualify, and book',
      'Booking and appointment automation into your calendar',
      'WhatsApp, Telegram, and email automation',
      'CRM and spreadsheet data workflows',
      'Content generation with human approval before publishing'
    ]
  },
  {
    id: 'software',
    number: '03',
    name: 'Software Engineering & System Integration',
    short: 'Software Engineering',
    promise: 'Custom applications and integrations that connect the tools a business already relies on.',
    intro:
      'When off-the-shelf tools do not fit, we build what does, and we connect it to the systems you already use. We start by understanding the problem properly, then translate requirements into a practical, maintainable solution.',
    tags: ['Web applications & websites', 'System integration', 'Internal productivity tools', 'AI features in existing software'],
    scope: [
      'Custom web applications and business websites',
      'System integration: connecting applications, databases, and third-party services through APIs',
      'Internal productivity tools built around a team’s actual workflow',
      'Dashboards and data tools for tracking leads, operations, and performance',
      'AI features added to existing software and processes'
    ]
  }
];

export const COMBINED_FLOW = [
  { step: 'Shape the message', line: 'content' as ServiceLineId, detail: 'Positioning and a clear story your buyers remember.' },
  { step: 'Build the content', line: 'content' as ServiceLineId, detail: 'Platform-ready content that carries the message.' },
  { step: 'Answer every enquiry', line: 'automation' as ServiceLineId, detail: 'An AI agent replies, qualifies, and collects details.' },
  { step: 'Book the meeting', line: 'software' as ServiceLineId, detail: 'Qualified meetings land straight in your calendar.' }
];

export const WHY_US = [
  {
    title: 'One partner, three disciplines',
    body: 'Strategy, automation, and software from a single team. No hand-offs between agencies, no gaps between what is promised and what is built.'
  },
  {
    title: 'Founder-led delivery',
    body: 'You work directly with the person accountable for the result, from the first call to the final handover.'
  },
  {
    title: 'Built to be understood',
    body: 'Every system is documented and explained in plain language. If it cannot be explained clearly over a cup of coffee, we rewrite it.'
  },
  {
    title: 'A low-risk way to start',
    body: 'Pilot engagements, milestone-based payments, and written acceptance criteria protect your investment at every stage.'
  }
];

export const WHO_WE_SERVE = [
  'Founders and executives building a professional presence and authority',
  'Small and medium-sized businesses that want to reduce manual work and respond to customers faster',
  'Professional services firms, agencies, and consultancies that need content and systems working together',
  'Organisations that need a custom software solution or integration properly understood and delivered'
];

export const AUTOMATION_SYSTEMS = [
  {
    name: 'AI Customer Care & Appointment Agent',
    body: 'Answers enquiries using company knowledge, qualifies interest, collects details one question at a time, books meetings, and logs every lead.'
  },
  { name: 'WhatsApp AI Automation', body: 'Responds intelligently to customer messages on WhatsApp, day or night.' },
  {
    name: 'Email Auto-Reply & Lead Logging',
    body: 'Reads incoming email, drafts and sends a professional reply, and records the sender’s details in a spreadsheet CRM.'
  },
  {
    name: 'Form-to-Follow-Up Automation',
    body: 'Logs website form submissions instantly and sends the right follow-up email based on what the visitor requested.'
  },
  { name: 'Voice-to-Email Automation', body: 'Turns a spoken voice note into a correctly addressed, professionally written email.' },
  {
    name: 'Content Generation with Approval',
    body: 'Researches a topic, drafts on-brand content, and waits for human approval before anything is published.'
  },
  {
    name: 'Spreadsheet Data Agent',
    body: 'Reads and updates Google Sheets records in real time, keeping customer data accurate without manual entry.'
  },
  { name: 'Content & Image Pipeline', body: 'Produces a researched article and a matching image from a simple form, delivered to an inbox.' }
];

export const ENGINEERING_STACK = [
  { layer: 'Frontend', tech: 'React, Vite, JavaScript, Tailwind CSS' },
  { layer: 'Backend & APIs', tech: 'Node.js, REST APIs, webhooks' },
  { layer: 'Automation & integration', tech: 'n8n, Google Workspace APIs, WhatsApp and Telegram integrations' },
  { layer: 'AI services', tech: 'OpenAI and other large language model APIs' }
];

export const METHODS = [
  {
    id: 'distribution-engine',
    name: 'The Velocity Distribution Engine™',
    body: 'Turns one core idea into a full set of platform-ready assets in a single weekly session.'
  },
  {
    id: 'hybrid-system',
    name: 'The AI-Human Hybrid Content System™',
    body: 'Uses AI for research and structure, and human editing for voice and judgement.'
  },
  {
    id: 'trust-framework',
    name: 'The Founder Trust Framework™',
    body: 'Builds a leader’s credibility before the sales conversation begins.'
  },
  {
    id: 'discovery-framework',
    name: 'The Discovery Build Framework™',
    body: 'A structured discovery process that turns client conversations into precise requirements.'
  },
  {
    id: 'fortune-framework',
    name: 'The 7-Touch Fortune Framework™',
    body: 'A disciplined, respectful follow-up sequence for business development.'
  }
];

export const COFFEE_SHOP_TEST =
  'Every headline, paragraph, and call to action must be clear enough to explain in a casual conversation. No jargon, no filler, no sentences that need reading twice. Work that fails the test is rewritten before it reaches you.';

export interface Testimonial {
  quote: string;
  short: string;
  name: string;
  project: string;
  lines: ServiceLineId[];
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Working with Velocity Contents Lab on our software project and integration was a very positive experience. The team took the time to understand what we needed, translated the requirements into a practical solution, and delivered the project to an excellent standard. What stood out most was their ability to think through the details, solve problems along the way, and remain committed to getting the solution right. The outcome has been excellent, and the system continues to deliver value for us.',
    short: 'The outcome has been excellent, and the system continues to deliver value for us.',
    name: 'Olatunde Oloyode',
    project: 'Custom software solution and system integration',
    lines: ['software']
  },
  {
    quote:
      'Working with Velocity Contents Lab Ltd was an excellent experience from start to finish. They transformed our online presence with a professional website for Fitins & Cute Collections and a WhatsApp automation system that has made customer communication much easier and more efficient. Both solutions have been performing exceptionally well and have made a noticeable difference in how we serve our customers.',
    short: 'Both solutions have made a noticeable difference in how we serve our customers.',
    name: 'Fitins & Cute Collections Hub',
    project: 'Business website and WhatsApp automation',
    lines: ['software', 'automation']
  },
  {
    quote:
      'Velocity is the best thing that has happened to my business this year. The best thing you can do for yourself as a business owner is to put a good structure in place, because you can’t be everywhere at the same time, especially if you are a sole proprietor. Ever since they helped me with content strategy, my content doesn’t only convert to sales, it has attracted tangible personnel. The automation service is the best: now I make money while I sleep.',
    short: 'Now I make money while I sleep.',
    name: 'House of Matiggy',
    project: 'Content strategy and business automation',
    lines: ['content', 'automation']
  }
];

export const ENGAGEMENTS = [
  {
    client: 'Olatunde Oloyode',
    type: 'Software project',
    delivered: 'Custom software solution and system integration, from requirements through delivery.',
    lines: ['software'] as ServiceLineId[]
  },
  {
    client: 'Fitins & Cute Collections Hub',
    type: 'Website and automation',
    delivered: 'Professional business website and a WhatsApp automation system for customer communication.',
    lines: ['software', 'automation'] as ServiceLineId[]
  },
  {
    client: 'House of Matiggy',
    type: 'Content and automation',
    delivered: 'Content strategy and business automation for a sole-proprietor business.',
    lines: ['content', 'automation'] as ServiceLineId[]
  },
  {
    client: 'Business leader',
    type: 'Multi-service engagement',
    delivered:
      'Profile optimisation across all social platforms; editing, marketing, and strategy projects; custom productivity tools; business automation; business website. This engagement led to a direct client referral.',
    lines: ['content', 'automation', 'software'] as ServiceLineId[]
  },
  {
    client: 'Professional',
    type: 'Personal brand engagement',
    delivered: 'LinkedIn profile optimisation and project support.',
    lines: ['content'] as ServiceLineId[]
  },
  {
    client: 'Professional',
    type: 'Content engagement',
    delivered: 'Content creation and content strategy.',
    lines: ['content'] as ServiceLineId[]
  }
];

export const PROCESS = [
  {
    n: '01',
    title: 'Discovery call',
    when: '15 to 30 minutes',
    body: 'A free conversation to understand the challenge, what it is costing you, what has been tried, and what success looks like.'
  },
  {
    n: '02',
    title: 'Requirements & written proposal',
    when: 'Within 2 business days',
    body: 'We document requirements and send a proposal with scope, deliverables, timeline, acceptance criteria, and price.'
  },
  {
    n: '03',
    title: 'Kick-off & onboarding',
    when: 'First week',
    body: 'We confirm access, contacts, and brand or system details, then agree the milestone plan.'
  },
  {
    n: '04',
    title: 'Build & review',
    when: 'Per project plan',
    body: 'Work proceeds in agreed milestones, with review points so you see progress early and often.'
  },
  {
    n: '05',
    title: 'Testing & acceptance',
    when: 'Before go-live',
    body: 'Systems are tested with real or test scenarios alongside you. You sign off against the agreed acceptance criteria.'
  },
  {
    n: '06',
    title: 'Handover & support',
    when: '1 week included',
    body: 'Documentation, a walkthrough of how everything works, and a support window for adjustments. Ongoing support is available by agreement.'
  }
];

export const CLIENT_NEEDS = [
  'One point of contact who can provide feedback and approvals',
  'Access to the relevant accounts or platforms, granted securely',
  'A clear description of your current process: what happens today, and where it breaks down',
  'Feedback on drafts and milestones within agreed timeframes, usually 48 hours'
];

export const ENGAGEMENT_MODELS = [
  {
    name: 'Pilot engagement',
    body: 'A small, fixed-scope first phase so you can evaluate our work with minimal risk before a larger commitment.'
  },
  {
    name: 'Fixed-scope project',
    body: 'A defined deliverable, such as an automation system, website, or integration, at an agreed price.'
  },
  {
    name: 'Retainer',
    body: 'Ongoing monthly content and communication support with a fixed scope and regular strategy calls.'
  },
  {
    name: 'Support & maintenance',
    body: 'Ongoing monitoring, updates, and improvements to systems after go-live, by agreement.'
  }
];

export const CONTENT_PRICING = [
  { name: 'The Velocity Engine', what: 'Full content ecosystem', format: 'Monthly retainer', price: '$3,500', unit: 'per month', featured: true },
  { name: 'The Authority Accelerator', what: 'Executive voice building', format: 'Monthly retainer', price: '$2,500', unit: 'per month' },
  { name: 'The Launch System', what: 'Product or brand launch content', format: 'Fixed scope', price: '$5,000', unit: 'one-time' },
  { name: 'The Strategic Sprint', what: 'Content audit and 90-day strategy', format: 'Fixed scope', price: '$1,500', unit: 'one-time' }
];

export const AUTOMATION_PRICING = [
  { scope: 'Single-platform automation', example: 'Email auto-reply, form follow-up, one connected tool', price: '$800 – $1,800' },
  { scope: 'Multi-platform automation', example: 'AI customer care agent with calendar, CRM, and email', price: '$1,800 – $3,500', featured: true },
  { scope: 'Automation suite', example: 'Several connected systems across the business', price: 'From $3,500' },
  { scope: 'Custom software & integration', example: 'Web applications, integrations, internal tools', price: 'Quoted after scoping' }
];

export const PRICING_NOTE =
  'All prices are indicative and in USD. Final pricing is confirmed in a written proposal after requirements are understood. Applicable taxes are charged in line with Nigerian regulations.';

export const COMMITMENTS = [
  { area: 'Payments', body: 'Milestone-based payment schedules tied to agreed deliverables.' },
  { area: 'Scope control', body: 'Written scope for every engagement. Changes are agreed in writing before work proceeds.' },
  { area: 'Acceptance', body: 'Each deliverable has acceptance criteria agreed in advance. You sign off before go-live.' },
  { area: 'Testing', body: 'Systems are tested with you before they handle live customers or business data.' },
  {
    area: 'Intellectual property',
    body: 'Ownership of custom deliverables transfers to the client on full payment. Third-party platforms remain under their own licences.'
  },
  { area: 'Confidentiality', body: 'Client information is treated as confidential. We sign non-disclosure agreements on request.' },
  {
    area: 'Data protection',
    body: 'Personal data is handled in line with the Nigeria Data Protection Act 2023, collected only where needed and protected throughout.'
  },
  { area: 'Access & credentials', body: 'Account access is granted through secure means and revoked or returned at the close of the engagement.' },
  { area: 'Documentation', body: 'Every system is documented, so your team can understand and maintain it.' },
  { area: 'AI safeguards', body: 'AI agents operate within defined limits. Pricing, contracts, payments, and publishing decisions remain with people.' }
];

export const HISTORY = [
  {
    when: 'July 2024',
    title: 'A founder-led practice',
    body: 'Velocity Contents Lab begins delivering content strategy, profile optimisation, and executive communication.'
  },
  {
    when: 'As needs grew',
    title: 'Into automation and software',
    body: 'As client needs grow, the practice expands into AI automation and custom software: systems that handle enquiries, bookings, email, and business data.'
  },
  {
    when: 'September 2026',
    title: 'Velocity Contents Lab Ltd',
    body: 'Incorporated as a private limited company (RC 9868389) to serve organisations formally, including through tenders and vendor programmes.'
  }
];

export const FOUNDER = {
  bio: 'Thomax founded Velocity Contents Lab in July 2024 and leads strategy, content, automation, and software delivery on every engagement. His work combines executive communication with hands-on technical delivery: building AI agents, automation workflows, and web applications alongside the content they support.',
  education: [
    'Higher National Diploma (HND), Yaba College of Technology',
    'AI Automation certification, Express Technology Academy',
    'ALX Africa certification',
    'Continuous professional training in Google Workspace, Canva, Asana, and Trello'
  ],
  expertise: ['Content strategy', 'Executive ghostwriting', 'AI automation (n8n)', 'Web development (React, Node.js)', 'System integration']
};

export const TOOLS = [
  { area: 'Automation & AI', tools: ['n8n', 'OpenAI', 'Voice transcription & voice AI', 'Web research APIs'] },
  { area: 'Communication channels', tools: ['WhatsApp', 'Telegram', 'Gmail', 'Website chat'] },
  { area: 'Business data', tools: ['Google Sheets', 'Google Calendar', 'Google Drive'] },
  { area: 'Software development', tools: ['React', 'Vite', 'Node.js', 'JavaScript', 'Tailwind CSS'] },
  { area: 'Content & collaboration', tools: ['Google Workspace', 'Canva', 'Asana', 'Trello'] }
];

export const MARQUEE_ITEMS = [
  'Content strategy',
  'Executive ghostwriting',
  'Profile optimisation',
  'AI customer care agents',
  'WhatsApp automation',
  'Booking automation',
  'CRM workflows',
  'Web applications',
  'System integration',
  'Internal tools'
];
