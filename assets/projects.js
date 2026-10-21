window.portfolioProjects = [
{
  "id": "maid-match",
  "mockup": "Mockups/maid-match-portfolio-mockup-1000x750.png",
  "title": "Maid-Match",
  "subtitle": "AI-scored household help matching",
  "category": "Business platforms",
  "type": "AI SAAS / FAMILY MATCHING",
  "client": "Maid-Match (demo project)",
  "date": "October 2026",
  "color": "#e0eee6",
  "cover": "02-matching-desktop.png",
  "mobileCover": "04-matching-mobile.png",
  "summary": "A premium family workspace for discovering household help, generating AI-scored shortlists, comparing suitability, and planning interviews together.",
  "description": "Maid-Match combines household requirements, a consent-based maid directory, saved matches, interview planning, and family collaboration in one responsive SaaS. Its AI assistant evaluates work-related profile facts, generates suitability scores and a relevant shortlist, and explains reasons and gaps while families retain the final decision.",
  "challenge": "Families need to compare skills, working days, hours, living arrangements, and monthly pay without losing track of their needs. AI recommendations must use actual profile records, keep private family data scoped to the right workspace, and clearly distinguish suitability estimates from verified credentials or hiring decisions.",
  "solution": "Built a Next.js, React, and TypeScript platform with Supabase email authentication, PostgreSQL row-level security, owner/member permissions, email-bound invitation links, and optimistic version checks. A server-side OpenAI integration receives a bounded set of anonymized work-related facts and returns a structured shortlist with model-generated scores, reasons, gaps, and interview questions. The server rejects unknown profile IDs, invalid scores, changed requirements, and withdrawn profiles. Stripe Starter/Pro integration uses organization billing leases, signed idempotent webhooks, and reconciliation. An emerald-noir interface connects the experience with photographic cards and an animated, reduced-motion-aware assistant loader.",
  "features": [
    "AI assistant with model-generated suitability scores, a relevant shortlist, reasons, gaps, and interview questions",
    "Household requirements covering skills, service area, monthly budget, working days, hours, and living arrangement",
    "Consent-based profile discovery, search and service filters, saved matches, and profile details with photos",
    "Private family workspaces with owner/member roles, invitation links, member controls, and shared activity",
    "Interview planning, family notes, arrangement status, and conflict-aware record updates",
    "Supabase verified-email authentication and tenant-isolated PostgreSQL policies with database-enforced AI quotas",
    "Stripe Starter/Pro integration with Checkout, customer portal, billing leases, webhooks, and subscription reconciliation",
    "Premium responsive dark interface with desktop/mobile layouts and an animated AI loading state"
  ],
  "stack": [
    "Next.js",
    "React",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "OpenAI",
    "Stripe",
    "Playwright"
  ],
  "scope": "Independent portfolio project. Screenshots show a browser-local demo with stock photography and explicitly labeled example AI scores; a separate live OpenAI scoring check passed using anonymized synthetic profiles. The photographed people are not represented as the named profiles or available for hire. Interview scheduling is a private family planning record and does not contact maids. The implementation includes Stripe billing, but these captures do not certify production payments, email delivery, reference checks, or completed hiring arrangements.",
  "screens": [
    [
      "01-home-desktop.png",
      "Premium Maid-Match landing page",
      "desktop"
    ],
    [
      "02-matching-desktop.png",
      "Family matching dashboard and profile discovery",
      "desktop"
    ],
    [
      "03-ai-shortlist-desktop.png",
      "AI assistant shortlist with example scores (demo)",
      "desktop"
    ],
    [
      "04-matching-mobile.png",
      "Mobile family matching dashboard",
      "mobile"
    ],
    [
      "05-ai-shortlist-mobile.png",
      "Mobile AI assistant and scored shortlist (demo)",
      "mobile"
    ]
  ]
},
{
  "id": "quotient-procurement",
  "mockup": "Mockups/quotient-procurement-portfolio-mockup-1000x750.png",
  "title": "Quotient Procurement",
  "subtitle": "AI supplier quote comparison & approvals",
  "category": "Business platforms",
  "type": "AI SAAS / PROCUREMENT",
  "client": "Quotient Procurement (demo project)",
  "date": "October 2026",
  "color": "#e5f0e8",
  "cover": "02-comparison-desktop.png",
  "mobileCover": "05-comparison-mobile.png",
  "summary": "A multi-tenant purchasing workspace for comparing supplier quotes, shortlisting vendors, generating bounded AI reviews, and controlling approval decisions.",
  "description": "Quotient Procurement brings purchase requests, structured supplier quotations, landed-cost comparison, decision support, approvals, and audit history into one responsive workspace. Teams can compare price, tax, shipping, lead time, and payment terms while owners retain control of final approval decisions.",
  "challenge": "Purchasing teams often compare inconsistent quotations in spreadsheets, making delivery trade-offs, approval history, and tenant access difficult to control. AI assistance also needs strict data and quota boundaries so it supports rather than replaces accountable decisions.",
  "solution": "Built a Next.js and TypeScript SaaS backed by Supabase authentication, PostgreSQL row-level security, organization-scoped RPCs, and optimistic version checks. Structured quote data drives normalized totals and OpenAI-assisted reviews. An owner-controlled workflow records decisions and audit events, while Stripe Starter and Pro subscriptions enforce member, request, and daily AI limits in the database.",
  "features": [
    "Multi-tenant organizations with owner/member roles and email-bound invitations",
    "Structured supplier quotations with items, tax, shipping, currency, lead time, and terms",
    "Side-by-side landed-cost comparison, charts, and supplier shortlisting",
    "Bounded OpenAI review over saved quote data with plan-based daily quotas",
    "Draft, review, approved, rejected, and archived workflow with audit history",
    "Stripe Starter and Pro subscriptions with Checkout, portal, webhooks, and reconciliation",
    "CSV import/export, JSON backup, decision briefs, and responsive desktop/mobile UI"
  ],
  "stack": [
    "Next.js",
    "TypeScript",
    "React",
    "Supabase",
    "PostgreSQL",
    "OpenAI",
    "Stripe",
    "Playwright"
  ],
  "scope": "Independent portfolio demo using fictional procurement data. AI reviews analyze structured quote data supplied by the application; this is not RAG and does not autonomously approve purchases. Stripe was exercised in test mode, and the captures do not establish production payment operation, ERP integration, OCR, supplier messaging, or purchase-order fulfillment.",
  "screens": [
    ["01-home-desktop.png", "Quotient Procurement homepage", "desktop"],
    ["02-comparison-desktop.png", "Supplier quote comparison workspace", "desktop"],
    ["03-settings-desktop.png", "Workspace and subscription settings", "desktop"],
    ["04-home-mobile.png", "Mobile Quotient homepage", "mobile"],
    ["05-comparison-mobile.png", "Mobile supplier quote comparison", "mobile"]
  ]
},
  {
  "id": "orbit-sales",
  "title": "Orbit Sales",
  "subtitle": "AI sales CRM with document-based RAG",
  "category": "Business platforms",
  "type": "AI SAAS / RAG",
  "client": "Orbit Sales (demo project)",
  "date": "October 2026",
  "color": "#dcefee",
  "cover": "01-dashboard-desktop.png",
  "mobileCover": "04-dashboard-mobile.png",
  "summary": "A sales workspace that combines leads, follow-ups and team knowledge with AI answers and editable drafts grounded in uploaded documents.",
  "description": "Orbit Sales brings CRM records, a six-stage pipeline, follow-ups and private team knowledge into one responsive application. Its retrieval-augmented generation (RAG) workflow indexes uploaded TXT, Markdown and text-based PDF documents, retrieves relevant passages and generates answers with source citations. Teams can review and edit AI follow-up drafts before copying them into their own communication tools.",
  "challenge": "Small teams need to keep customer context and product knowledge together so AI-assisted sales work can reference relevant sources, respect workspace access and remain under human review.",
  "solution": "Built a Next.js and TypeScript application with Supabase email authentication, PostgreSQL workspace policies and private file storage. A separate ingestion worker extracts and chunks documents, generates OpenAI embeddings and indexes them with pgvector. Hybrid vector and full-text retrieval supplies evidence for cited answers and drafts. Added team invitations, Stripe subscription integration and a shared layout that preserves workspace data across navigation.",
  "features": [
    "Shared leads, six-stage sales pipeline and assigned follow-ups",
    "Document-based RAG with hybrid search, source citations and insufficient-evidence handling",
    "Private knowledge uploads with queued background extraction and indexing",
    "Editable AI follow-up drafts, lead summaries and suggested next actions",
    "Email/password accounts, workspace membership and email-bound team invitations",
    "Stripe subscription integration, plan limits and owner billing controls",
    "Persistent section navigation and responsive desktop/mobile layouts"
  ],
  "stack": [
    "Next.js",
    "TypeScript",
    "OpenAI / RAG",
    "Supabase",
    "pgvector",
    "React",
    "PostgreSQL",
    "Stripe"
  ],
  "scope": "Independent portfolio demo. Screenshots use fictional browser-local records; AI answers, indexing and billing in these views are explicitly simulated. A separate live sample upload was successfully indexed into six chunks. Email delivery, complete live payment flows and all generated-answer scenarios are not certified by these captures. The application generates drafts for review and does not send sales messages automatically.",
  "screens": [
    [
      "01-dashboard-desktop.png",
      "Sales dashboard and follow-up overview",
      "desktop"
    ],
    [
      "02-assistant-desktop.png",
      "AI knowledge answer with source citation (demo)",
      "desktop"
    ],
    [
      "03-knowledge-desktop.png",
      "Private knowledge library and indexing states (demo)",
      "desktop"
    ],
    [
      "04-dashboard-mobile.png",
      "Mobile sales dashboard",
      "mobile"
    ],
    [
      "05-assistant-mobile.png",
      "Mobile AI assistant and cited answer (demo)",
      "mobile"
    ]
  ]
},
  {
  "id": "clientnest",
  "mockup": "Mockups/clientnest-portfolio-mockup-1000x750.png",
  "title": "ClientNest",
  "subtitle": "Agency client portal & subscription SaaS",
  "category": "Business platforms",
  "type": "SAAS / CLIENT PORTAL",
  "client": "ClientNest (demo project)",
  "date": "October 2026",
  "color": "#e6eee8",
  "cover": "01-dashboard-desktop.png",
  "mobileCover": "05-dashboard-mobile.png",
  "summary": "An agency workspace for tracking client projects, sharing deliverables, collecting approvals, and managing SaaS subscriptions.",
  "description": "ClientNest gives small agencies and their clients a shared workspace for project updates, private files, conversations, milestones, and review decisions. Agency owners manage delivery and subscriptions, while clients see assigned projects and approve deliverables or request changes with feedback.",
  "challenge": "Agencies need to keep project progress, shared files, and approval feedback together while protecting each workspace and limiting clients to their assigned work. Subscription limits must also stay consistent with billing status.",
  "solution": "Built with Next.js App Router, React, and TypeScript, backed by Supabase authentication, PostgreSQL row-level security, private storage, and realtime project messages. Stripe Checkout, verified webhooks, and the billing portal support recurring agency subscriptions and project limits.",
  "features": [
    "Agency and client accounts with workspace and project access controls",
    "Project tracking, milestones, and realtime project conversations",
    "Private deliverables with approvals and change-request feedback",
    "In-app notifications with unread counts and project navigation",
    "Stripe subscriptions, plan limits, and customer billing portal",
    "Responsive landing page and interactive browser-local demo"
  ],
  "stack": [
    "React",
    "Next.js",
    "TypeScript",
    "Supabase",
    "Stripe",
    "PostgreSQL",
    "CSS"
  ],
  "scope": "Screenshots show the interactive demo with sample data stored in browser localStorage. Demo uploads retain metadata only and downloads use placeholder content. Hosted authentication, private file transfer, and Stripe billing require configured services; these captures do not verify live payments. No AI features are included in the current release.",
  "screens": [
    [
      "01-dashboard-desktop.png",
      "Agency project dashboard",
      "desktop"
    ],
    [
      "02-landing-desktop.png",
      "ClientNest SaaS landing page",
      "desktop"
    ],
    [
      "03-landing-mobile.png",
      "Mobile SaaS landing page",
      "mobile"
    ],
    [
      "04-conversation-mobile.png",
      "Mobile project conversation and milestones",
      "mobile"
    ],
    [
      "05-dashboard-mobile.png",
      "Mobile agency dashboard",
      "mobile"
    ]
  ]
},
  {
    id: 'grounded-men', title: 'Grounded Men', subtitle: 'Yoga booking & class management', category: 'Business platforms', type: 'BOOKING PLATFORM', client: 'Grounded Men (demo project)', date: 'October 2026', color: '#e8eee2', cover: '01-home-desktop.png', mobileCover: '05-dashboard-mobile.png',
    summary: 'A responsive yoga platform connecting local class discovery and trial reservations with venue, teacher, and attendance management.',
    description: 'Grounded Men makes beginner yoga classes easier to discover and manage. Customers can search venues by town or region, reserve five-week trial courses, review their booking history, and request membership plans. Administrators manage venues, teachers, customers, course schedules, and occupancy, while teachers record attendance for their assigned classes.',
    challenge: 'A multi-venue yoga service needs a welcoming customer experience alongside reliable capacity checks, booking history, and clear access boundaries for administrators, teachers, and customers.',
    solution: 'Built a lightweight PHP and SQLite prototype with a responsive interface, searchable venue records, bulk course creation, duplicate and capacity protection, and role-based server authorization. Teacher registers persist attendance for each session, while reports and CSV exports help administrators review activity.',
    features: ['Searchable venue finder with town search and region filters', 'Trial reservations, cancellations, and unified booking and plan history', 'Bulk creation of five-week courses with teacher, time, price, and capacity', 'Teacher registers with attendance saved for each of five sessions', 'Venue and customer management, occupancy reporting, and CSV export', 'Membership plan requests, local email outbox, and accessible mobile navigation'],
    stack: ['PHP', 'SQLite', 'PDO', 'JavaScript', 'CSS'],
    scope: 'A working local prototype with 23 illustrative venues and demo accounts. Plan requests do not grant credits or start subscriptions. Payments, live email delivery, and recurring membership bookings require production integration; no money is collected.',
    mockup: 'Mockups/grounded-men-portfolio-mockup-1000x750.png',
    screens: [['01-home-desktop.png', 'Yoga homepage and venue finder', 'desktop'], ['02-dashboard-desktop.png', 'Class management overview', 'desktop'], ['03-schedule-desktop.png', 'Weekly class schedule', 'desktop'], ['04-home-mobile.png', 'Mobile yoga homepage', 'mobile'], ['05-dashboard-mobile.png', 'Mobile class management overview', 'mobile']]
  },
  {
    id: 'talentflow', title: 'TalentFlow', subtitle: 'Recruitment CRM & applicant tracking', category: 'Business platforms', type: 'CRM / ATS', client: 'Northstar Talent Partners', date: 'September 2026', color: '#e9e7fb', cover: '01-dashboard-desktop.png', mobileCover: '04-dashboard-mobile.png',
    summary: 'A complete recruitment workspace that connects client companies, candidates, jobs, interviews, and placements in one responsive application.',
    description: 'TalentFlow brings the daily work of a recruitment agency into a single, consistent interface. Recruiters can manage company relationships and candidate profiles, track applications through a hiring pipeline, schedule interviews, and follow successful hires into placement and invoice records. The application pairs a clear dashboard with searchable directories, detailed record pages, and a mobile workspace.',
    challenge: 'Recruitment information is often spread across spreadsheets, inboxes, and separate calendars. This project organizes those related records while respecting the access boundaries of administrators, managers, and individual recruiters.',
    solution: 'Built a Laravel application with relational MySQL storage, reusable record workflows, role and ownership controls, private document delivery, and a responsive Blade interface. Application-stage changes preserve history, and CSV import/export supports working with existing agency data.',
    features: ['Connected clients, candidates, jobs, applications, interviews, tasks, and placements', 'Hiring pipeline with persistent stage changes and history', 'Administrator, manager, and recruiter access boundaries', 'Private candidate documents and company communication timelines', 'CSV import/export, operational reporting, and invoice tracking', 'Responsive dashboard and record management on desktop and mobile'],
    stack: ['PHP', 'Laravel 13', 'MySQL', 'Blade', 'JavaScript', 'CSS'],
    scope: 'Email, SMS, job-board publishing, and automatic CV parsing are not connected. Invoices track records; they do not process payments.',
    screens: [['01-dashboard-desktop.png', 'Recruitment overview', 'desktop'], ['02-pipeline-desktop.png', 'Application pipeline', 'desktop'], ['03-candidates-desktop.png', 'Candidate directory', 'desktop'], ['04-dashboard-mobile.png', 'Mobile recruitment overview', 'mobile'], ['05-jobs-mobile.png', 'Mobile job management', 'mobile']]
  },
  {
    id: 'veyra', title: 'Veyra Estates', subtitle: 'Real estate discovery & operations', category: 'Marketplaces', type: 'REAL ESTATE', client: 'Evergreen Property Group', date: 'August 2026', color: '#efe9e0', cover: '01-home-desktop.png', mobileCover: '05-property-mobile.png',
    summary: 'A premium property experience with searchable listings, agent profiles, viewing requests, saved collections, and real estate administration.',
    description: 'Veyra Estates combines an editorial property storefront with the practical workflows behind a real estate business. Visitors can explore sale and rental listings, compare properties, inspect galleries, and discover agents. Customer, seller, agent, and administrator workspaces handle the next steps, from saved properties and viewing requests to listing review, leads, proposals, and service billing.',
    challenge: 'A real estate platform needs to make visually rich property discovery feel effortless while coordinating multiple people, permissions, and operational states behind each listing.',
    solution: 'Created a core PHP and MySQL application with a responsive luxury interface, searchable property records, controlled listing publication, role-based workspaces, and persistent messaging. A separate Workerman process supports WebSocket delivery without holding the PHP web server open.',
    features: ['Sale and rental search, filtering, comparison, and detailed property galleries', 'Saved properties, shared collections, and saved-search alerts', 'Customer viewing requests and nonbinding proposal revisions', 'Seller listing drafts, media management, and publication review', 'Agent profiles, lead pipeline, follow-ups, and appointments', 'Persistent messaging and administrative service-billing records'],
    stack: ['PHP', 'MySQL', 'PDO', 'JavaScript', 'CSS', 'Workerman', 'WebSockets'],
    scope: 'Property imagery and seeded profiles are illustrative. Proposals are nonbinding; manual service billing does not transfer money or manage property escrow.',
    screens: [['01-home-desktop.png', 'Luxury property homepage', 'desktop'], ['02-properties-desktop.png', 'Property discovery', 'desktop'], ['03-property-desktop.png', 'Property detail', 'desktop'], ['04-home-mobile.png', 'Mobile property homepage', 'mobile'], ['05-property-mobile.png', 'Mobile property detail', 'mobile']]
  },
  {
    id: 'medica', title: 'Medica', subtitle: 'Clinic management workspace', category: 'Business platforms', type: 'HEALTHCARE', client: 'Oakridge Family Clinic', date: 'July 2026', color: '#e0eeee', cover: '01-dashboard-desktop.png', mobileCover: '04-dashboard-mobile.png',
    summary: 'A navy-and-teal clinic workspace for patient records, appointments, clinical notes, permission roles, and authenticator-based sign-in.',
    description: 'Medica provides a focused workspace for the day-to-day coordination of a clinic. Staff can review patient records, search the patient directory, inspect appointment history, and schedule visits. Clinical workflows include encrypted notes and signing, while a role matrix separates clinical, reception, finance, and audit responsibilities. The responsive interface keeps essential information legible on smaller screens.',
    challenge: 'Clinic information needs to remain accessible to the right staff while separating sensitive clinical data from administrative responsibilities and maintaining a traceable history.',
    solution: 'Implemented Laravel with clinic-scoped access, six staff permission roles, authenticator MFA, encrypted clinical records, signed-note restrictions, appointment-overlap validation, and audit history. Built the interface in Blade with local CSS and plain JavaScript.',
    features: ['Patient search, registration, profiles, and care-team assignments', 'Appointment scheduling with provider conflict checks', 'Encrypted clinical notes, allergies, conditions, and signing', 'Six permission roles with clinic and patient access boundaries', 'Authenticator MFA with local QR enrollment and replay prevention', 'Clinic dashboard, read-only billing, and paginated audit history'],
    stack: ['PHP', 'Laravel 13', 'SQLite', 'Blade', 'JavaScript', 'CSS', 'TOTP MFA'],
    scope: 'An initial clinic-management release with synthetic demo patients. It is not a certified EHR. Payments, prescriptions, insurance claims, and a patient portal are future modules.',
    screens: [['01-dashboard-desktop.png', 'Clinic overview', 'desktop'], ['02-patients-desktop.png', 'Patient directory', 'desktop'], ['03-appointments-desktop.png', 'Appointment schedule', 'desktop'], ['04-dashboard-mobile.png', 'Mobile clinic overview', 'mobile'], ['05-patients-mobile.png', 'Mobile patient directory', 'mobile']]
  },
  {
    id: 'aurelle', title: 'Aurelle', subtitle: 'Furniture storefront & store management', category: 'Ecommerce', type: 'ECOMMERCE', client: 'Studio Haven Interiors', date: 'June 2026', color: '#eee7dd', cover: '01-home-desktop.png', mobileCover: '05-catalog-mobile.png',
    summary: 'An elegant furniture store with product discovery, a shopping bag, persistent orders, tracking, and a comprehensive administration workspace.',
    description: 'Aurelle pairs a warm, photography-led shopping experience with functional store operations. Customers can browse furniture, open product details, build a shopping bag, place an order, and track its progress. Behind the storefront, administrators manage products, stock, fulfillment, recorded payments, returns, invoices, customers, reports, and store settings.',
    challenge: 'A furniture storefront should present products beautifully while keeping orders, inventory changes, fulfillment, and historical financial records consistent.',
    solution: 'Built a framework-free PHP application using PDO and SQLite, with locally bundled photography and typography. Checkout stores order-item snapshots and reserves stock in a transaction, while the administration area supports operational history and controlled fulfillment transitions.',
    features: ['Responsive storefront, category catalog, and product detail pages', 'Shopping bag, persisted checkout, and customer order tracking', 'Product, image, stock, and catalog management', 'Fulfillment workflow with shipment references and invoices', 'Recorded payments, item-specific returns, and refund records', 'Customer history, CSV exports, activity reporting, and store settings'],
    stack: ['PHP', 'SQLite', 'PDO', 'JavaScript', 'CSS', 'HTML'],
    scope: 'Payments and refunds record transactions performed outside the site. Card charging, automated email, carrier integrations, and tax calculation are not connected.',
    screens: [['01-home-desktop.png', 'Furniture storefront', 'desktop'], ['02-catalog-desktop.png', 'Furniture catalog', 'desktop'], ['03-product-desktop.png', 'Product detail', 'desktop'], ['04-home-mobile.png', 'Mobile furniture storefront', 'mobile'], ['05-catalog-mobile.png', 'Mobile furniture catalog', 'mobile']]
  },
  {
    id: 'helio', title: 'Helio', subtitle: 'Solar customer portal', category: 'Business platforms', type: 'CUSTOMER PORTAL', client: 'Solstice Energy Co.', date: 'May 2026', color: '#e8eddc', cover: '01-dashboard-desktop.png', mobileCover: '04-dashboard-mobile.png',
    summary: 'A solar customer portal that brings energy reporting, installation progress, documents, billing history, appointments, and support into one place.',
    description: 'Helio gives solar customers a clear view of their installation and ongoing service relationship. A property-specific dashboard displays simulated generation and energy flow, while reporting controls switch between daily, weekly, and monthly views. Customers can follow installation milestones, review billing records, find documents, request appointments, and open support tickets.',
    challenge: 'Customers need an understandable overview of a technical installation, together with a convenient way to find paperwork and communicate with the service team.',
    solution: 'Created a core PHP portal with PDO SQLite, locally bundled Bootstrap, custom chart interactions, customer-scoped downloads, and persistent support and appointment workflows. An administrator workspace manages installation stages, replies, request statuses, and audit history.',
    features: ['Property-specific dashboard and interactive demo energy reporting', 'Day, week, and month chart controls with CSV report exports', 'Installation milestones and project timeline', 'Searchable sample documents and billing-history downloads', 'Persistent support tickets and administrator responses', 'Appointment requests, profile updates, and responsive navigation'],
    stack: ['PHP', 'SQLite', 'PDO', 'Bootstrap 5', 'JavaScript', 'CSS'],
    scope: 'Energy telemetry and savings are simulated. Invoice payments are not processed, and document downloads contain sample text rather than real customer PDFs.',
    screens: [['01-dashboard-desktop.png', 'Customer dashboard', 'desktop'], ['02-energy-desktop.png', 'Energy reporting', 'desktop'], ['03-project-desktop.png', 'Installation timeline', 'desktop'], ['04-dashboard-mobile.png', 'Mobile customer dashboard', 'mobile'], ['05-project-mobile.png', 'Mobile installation timeline', 'mobile']]
  },
  {
    id: 'lingua', title: 'Lingua', subtitle: 'English learning LMS & tutor marketplace', category: 'Marketplaces', type: 'EDTECH / LMS', client: 'BrightPath Learning Studio', date: 'April 2026', color: '#eee7fa', cover: '01-home-desktop.png', mobileCover: '04-dashboard-mobile.png',
    summary: 'A tutor marketplace and learning platform with lesson bookings, messaging, homework, course authoring, media lessons, quizzes, and learner progress.',
    description: 'Lingua connects English learners with tutors and provides a workspace for learning between sessions. Visitors can discover tutors by price, specialty, and availability. Student and tutor accounts support bookings, messages, homework, goals, and preferences. Tutors can also publish structured courses with modules, uploaded lesson materials, practice questions, and tracked completion.',
    challenge: 'A learning marketplace needs more than attractive tutor profiles: it must coordinate availability, prevent conflicting bookings, protect course materials, and make learner progress visible.',
    solution: 'Developed a core PHP and SQLite application with separate student, tutor, and administrator workflows. Booking checks and atomic demo-credit changes keep reservations consistent. Enrollment-controlled file delivery, server-side quiz grading, and course-progress records support the LMS experience.',
    features: ['Tutor discovery, filters, profiles, and weekly availability', 'Student and tutor dashboards with time-zone-aware booking', 'Demo credit wallet, booking debit, and cancellation refunds', 'Persistent messages, homework, reviews, and shared lesson notes', 'Course authoring with modules, lessons, and protected media uploads', 'Enrollment, multiple-choice quizzes, completion, and course progress'],
    stack: ['PHP', 'SQLite', 'PDO', 'JavaScript', 'CSS', 'HTML'],
    scope: 'Wallet credits and earnings are demonstrations; no real payments or payouts occur. Meetings use external links rather than built-in video calling.',
    screens: [['01-home-desktop.png', 'Learning marketplace', 'desktop'], ['02-tutors-desktop.png', 'Tutor discovery', 'desktop'], ['03-dashboard-desktop.png', 'Student workspace', 'desktop'], ['04-dashboard-mobile.png', 'Mobile student workspace', 'mobile'], ['05-tutors-mobile.png', 'Mobile tutor discovery', 'mobile']]
  },
  {
    id: 'wholesale', title: 'My Store', subtitle: 'B2B wholesale marketplace', category: 'Ecommerce', type: 'B2B ECOMMERCE', client: 'Greenfield Trade Network', date: 'March 2026', color: '#e5ecd9', cover: '01-marketplace-desktop.png', mobileCover: '04-marketplace-mobile.png',
    summary: 'A retailer-to-wholesaler marketplace with supplier offers, normalized price comparisons, quantity tiers, split orders, and business administration.',
    description: 'My Store helps retailers discover products and compare offers from multiple wholesalers. The platform accounts for pack sizes, minimum quantities, tiered prices, supplier delivery options, and platform fees. Retailer, wholesaler, and administrator workspaces support product offers, checkout, supplier-specific fulfillment, conversations, approvals, and reporting.',
    challenge: 'Wholesale prices are difficult to compare when pack sizes, quantity tiers, delivery fees, and minimum orders differ. A multi-supplier checkout also needs consistent stock and order accounting.',
    solution: 'Built a core PHP and MySQL platform with a canonical catalog, normalized unit-price comparison, integer monetary calculations, inventory reservations, and supplier-order splits. The application includes an explicit demo-payment mode and optional Stripe test-mode checkout with signed webhook handling.',
    features: ['Canonical products, supplier offers, quantity tiers, and normalized prices', 'Retailer, wholesaler, and administrator workspaces', 'Multi-supplier cart and supplier-specific fulfillment choices', 'Stock reservations, order snapshots, and demo checkout', 'Business approvals, account management, and private messaging', 'CSV comparison import, reports, and installable PWA support'],
    stack: ['PHP', 'MySQL', 'PDO', 'Bootstrap 5', 'JavaScript', 'PWA', 'Stripe test mode'],
    scope: 'Captured screens use demo records. Real-money payments are not enabled; Stripe integration is restricted to test mode. External comparison samples are fictional.',
    screens: [['01-marketplace-desktop.png', 'Wholesale marketplace', 'desktop'], ['02-product-desktop.png', 'Supplier comparison', 'desktop'], ['03-bag-desktop.png', 'Wholesale shopping bag', 'desktop'], ['04-marketplace-mobile.png', 'Mobile wholesale marketplace', 'mobile'], ['05-product-mobile.png', 'Mobile supplier comparison', 'mobile']]
  },
  {
    id: 'marketplace', title: 'MarketPlace', subtitle: 'Classifieds & seller workspace', category: 'Marketplaces', type: 'CLASSIFIEDS', client: 'CityCircle Community Market', date: 'February 2026', color: '#e7edf8', cover: '01-marketplace-desktop.png', mobileCover: '04-marketplace-mobile.png',
    summary: 'A Laravel classifieds marketplace with searchable listings, category and city filters, image galleries, and seller inventory management.',
    description: 'MarketPlace creates a straightforward path from browsing local listings to managing a seller inventory. Buyers can search by text or city, narrow results by category, sort by price, and inspect listing details. Authenticated sellers can create and edit listings, add photo galleries, choose a primary image, and mark items as sold.',
    challenge: 'A classifieds application must make discovery intuitive while ensuring that sellers can manage only their own listings and that uploaded images remain well controlled.',
    solution: 'Implemented Laravel, Blade, and SQLite with listing ownership policies, validated image uploads, primary-image selection, searchable public pages, and a responsive seller dashboard. Local CSS and JavaScript keep the interface lightweight.',
    features: ['Public listing discovery with category, text, city, and price controls', 'Listing detail pages with multi-image galleries', 'Registration, sign-in, remembered sessions, and authentication throttling', 'Seller dashboard for creating, editing, and marking listings sold', 'Up to eight validated JPG, PNG, or WebP photos per listing', 'Server-side ownership policies, validation, and CSRF protection'],
    stack: ['PHP', 'Laravel 13', 'SQLite', 'Blade', 'JavaScript', 'CSS'],
    scope: 'A classifieds application. Online checkout, payment processing, password recovery, and moderation are not part of the documented release.',
    screens: [['01-marketplace-desktop.png', 'Classifieds discovery', 'desktop'], ['02-listing-desktop.png', 'Listing detail', 'desktop'], ['03-dashboard-desktop.png', 'Seller inventory', 'desktop'], ['04-marketplace-mobile.png', 'Mobile classifieds discovery', 'mobile'], ['05-listing-mobile.png', 'Mobile listing detail', 'mobile']]
  },
  {
    id: 'zenda', title: 'Zenda', subtitle: 'WordPress & WooCommerce storefront', category: 'Ecommerce', type: 'WORDPRESS COMMERCE', client: 'Maison Alder Home', date: 'January 2026', color: '#f2e6e5', cover: '01-home-desktop.png', mobileCover: '05-shop-mobile.png',
    summary: 'A custom lifestyle-store theme with an editorial homepage, WooCommerce product browsing, responsive shopping pages, and editable brand content.',
    description: 'Zenda is a custom WordPress theme for a considered home and lifestyle collection. The design uses generous spacing, natural textures, warm neutrals, and burgundy accents to make product browsing feel like a brand experience. WordPress controls the site content and navigation, while WooCommerce supplies catalog, product, cart, checkout, and customer-account behavior.',
    challenge: 'A store needs a distinctive visual identity while preserving the native commerce workflows and content-editing tools that make WordPress practical for store owners.',
    solution: 'Created an original responsive theme with editable homepage copy, hero photography, custom-logo support, WordPress navigation, accessible mobile controls, and WooCommerce styling through native templates and hooks.',
    features: ['Custom editorial homepage with editable headline, images, and story', 'WordPress menus, logo, search, pages, and posts', 'WooCommerce catalog and product gallery styling', 'Responsive cart, checkout, and customer-account presentation', 'Accessible mobile navigation, search, skip link, and focus states', 'Original illustrative lifestyle and product imagery'],
    stack: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'CSS', 'MySQL'],
    scope: 'Product images and demo catalog entries are illustrative. Real shipping, tax, payment-provider configuration, and production order testing depend on the store setup.',
    screens: [['01-home-desktop.png', 'Lifestyle storefront', 'desktop'], ['02-shop-desktop.png', 'WooCommerce catalog', 'desktop'], ['03-product-desktop.png', 'Product detail', 'desktop'], ['04-home-mobile.png', 'Mobile lifestyle storefront', 'mobile'], ['05-shop-mobile.png', 'Mobile WooCommerce catalog', 'mobile']]
  }
];
