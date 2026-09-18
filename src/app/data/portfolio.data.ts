export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  portfolio: string;
  linkedin: string;
  github: string;
  twitter: string;
  facebook: string;
  resumeUrl: string;
}

export interface SkillItem {
  name: string;
  category: string;
}

export interface ProjectCase {
  name: string;
  role: string;
  problem: string;
  tech: string[];
  impact: string;
  url?: string;
}

export interface CatalogProject {
  name: string;
  company: string;
  stack: string;
  year: string;
  url?: string;
  logo?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  url?: string;
}

export interface Award {
  title: string;
  org: string;
  date: string;
  detail: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  logo: string;
  logoDark?: boolean;
}

export interface EducationItem {
  period: string;
  title: string;
  detail: string;
  short: string;
  icon: string;
}

export interface LanguageItem {
  name: string;
  level: string;
  icon: string;
}

export interface InterestItem {
  name: string;
  detail: string;
  icon: string;
}

export interface ServiceItem {
  name: string;
  detail: string;
  icon: string;
}

export const PROFILE: Profile = {
  name: 'Adeel Zahid',
  title: 'Senior ASP.NET Developer',
  tagline: 'Senior ASP.NET Developer | Angular 20 · .NET 8 · Clean Architecture',
  location: 'Faisalabad, Pakistan',
  email: 'developer.adeelzahid@gmail.com',
  phone: '+923157011812',
  phoneDisplay: '+92 315 7011812',
  portfolio: 'https://adeelzahid.surge.sh',
  linkedin: 'https://linkedin.com/in/adeelzahid1',
  github: 'https://github.com/adeelzahid1',
  twitter: 'https://www.twitter.com/adeelzahid1',
  facebook: 'https://www.facebook.com/mian214',
  resumeUrl: 'https://docs.google.com/document/d/1ygZQP30Bgt4k-C3GLs1yVKGfTJdRK9AG/export?format=pdf',
};

export const SUMMARY = `Senior ASP.NET Developer with 7 years of professional experience and 5+ years of hands-on .NET development, specializing in architecting scalable enterprise applications, microservices, and RESTful APIs using ASP.NET Core, C#, SQL Server, and Angular 20. Built and maintained logistics platforms processing 300K+ monthly shipments across 2,500+ drivers with 15+ third-party integrations, real-time tracking, and automated reporting. Experienced in Azure cloud services, CI/CD pipelines, and clean architecture principles (SOLID, DDD, Repository Pattern). Two-time award recipient recognized by company leadership for exceptional productivity and agile delivery.`;

export const KNOWLEDGE_BLURB =
  'Started with HTML, CSS, Bootstrap, and JavaScript, then spent a year on Flutter mobile apps. For the last several years the focus has been .NET, ASP.NET Core, Web APIs, and SQL Server — with Angular 20 on the frontend.';

export interface FocusStat {
  value: string;
  label: string;
}

export interface FocusWorkItem {
  name: string;
  summary: string;
  url?: string;
}

export interface CurrentFocus {
  role: string;
  company: string;
  period: string;
  location: string;
  companyUrl: string;
  summary: string;
  stats: FocusStat[];
  work: FocusWorkItem[];
  highlights: string[];
  stack: string[];
}

export const CURRENT_FOCUS: CurrentFocus = {
  role: 'Senior ASP.NET Developer',
  company: 'Techno Batch',
  period: 'May 2023 – Present',
  location: 'Faisalabad · UAE & regional markets',
  companyUrl: 'https://www.technobatch.com/',
  summary:
    'Lead delivery on Dispatch EX and Shipra.io — logistics and commerce platforms for UAE and Arab markets — with ASP.NET Core, Angular 20, SQL Server, and clean architecture.',
  stats: [
    { value: '2,500+', label: 'Active drivers' },
    { value: '300K+', label: 'Shipments / month' },
    { value: '15+', label: 'Third-party integrations' },
    { value: '18+', label: 'Dispatch partners' },
  ],
  work: [
    {
      name: 'Dispatch EX',
      summary:
        'End-to-end courier platform: shippers, drivers, collections, expenses, SMS/notifications, live tracking, JWT auth, multi-language, and multi-tenant client cloning (onboarding cut from 2 weeks to 2 days).',
      url: 'https://www.technobatch.com/',
    },
    {
      name: 'Shipra.io',
      summary:
        'Commerce operations layer for orders, inventory, warehouse, shipping, and returns across Shopify, Amazon, WooCommerce, Magento, and carriers — REST APIs with ~40% better partner interoperability.',
      url: 'https://shipra.io/',
    },
  ],
  highlights: [
    'Owned production delivery on a team of 8, including mentoring juniors.',
    'Integrations with WooCommerce, Shopify, C3X, Prestige, and other dispatch partners.',
    'CI/CD, Azure, and AI-assisted workflows with Cursor IDE.',
  ],
  stack: ['.NET 8', 'Angular 20', 'SQL Server', 'Hangfire', 'Firebase', 'Dapper', 'Azure'],
};

export const SKILLS: SkillItem[] = [
  { name: 'Angular 20', category: 'Frontend' },
  { name: 'Angular 14/12', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Bootstrap', category: 'Frontend' },
  { name: '.NET 8', category: 'Backend' },
  { name: 'ASP.NET Core', category: 'Backend' },
  { name: 'C#', category: 'Languages' },
  { name: 'SQL Server', category: 'Database' },
  { name: 'Dapper', category: 'Database' },
  { name: 'EF Core', category: 'Database' },
  { name: 'Microservices', category: 'Architecture' },
  { name: 'Hangfire', category: 'Backend' },
  { name: 'Firebase', category: 'Cloud' },
  { name: 'AWS S3', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'GitHub Actions', category: 'DevOps' },
  { name: 'Crystal Reports', category: 'Reporting' },
  { name: 'iTextSharp', category: 'Reporting' },
  { name: 'xUnit', category: 'Quality' },
  { name: 'SOLID / DI', category: 'Architecture' },
  { name: 'Flutter', category: 'Mobile' },
  { name: 'Cursor IDE', category: 'Tools' },
];

export const PROJECTS: ProjectCase[] = [
  {
    name: 'Dispatch EX',
    role: 'Senior ASP.NET Developer · Techno Batch',
    problem:
      'Courier/logistics operators needed a reliable platform for shippers, drivers, money collection, expenses, SMS/notifications, and live tracking across UAE and Arab markets.',
    tech: ['.NET 8', '.NET MVC 5', 'SQL Server', 'Hangfire', 'Firebase', 'iTextSharp', 'Dapper'],
    impact:
      'Platform serves 2,500+ active drivers and processes 300K+ monthly shipments with JWT auth, multi-language support, and multi-tenant client cloning (onboarding cut from 2 weeks to 2 days).',
    url: 'https://www.technobatch.com/',
  },
  {
    name: 'Shipra.io',
    role: 'Core team · Backend APIs & integrations',
    problem:
      'Merchants needed one commerce operations layer for orders, inventory, warehouse, shipping, tracking, returns, and storefronts across Shopify, Amazon, WooCommerce, Magento, and carriers.',
    tech: ['Angular 20', '.NET 8', 'SQL Server', 'Clean Architecture', 'SOLID', 'Dependency Injection'],
    impact:
      'Unified carrier/channel integrations across 18+ dispatch partners; improved partner interoperability by ~40% with microservice-style REST APIs.',
    url: 'https://shipra.io/',
  },
  {
    name: 'Prime HRMS / Prime Ledge',
    role: '.NET Developer · H3 Solutions',
    problem:
      'Enterprises needed payroll/HR compliance plus textile mill cloth inventory with automated tax workflows.',
    tech: ['.NET 8', 'Angular 12', 'SQL Server', 'Crystal Reports', 'FBR API', 'xUnit'],
    impact:
      'FBR tax automation reduced manual errors by 80%; delivered 20+ features and cut report generation time by 35%. Built a new Angular 14 project from scratch at H3.',
    url: 'https://h3solution.net/',
  },
  {
    name: 'MREP / M-Talib',
    role: 'Junior .NET Developer · Tharsol',
    problem:
      'Pharma sales teams needed CRM automation; corporate training needed cloud LMS APIs with offline learning support.',
    tech: ['ASP.NET Core', 'Web APIs', 'SQL Server', 'Dapper', 'DevExpress'],
    impact:
      'Built REST APIs for course access, offline learning, and progress tracking for 1,000+ learners; sales dashboards with pipeline and field expense tools.',
    url: 'https://www.tharsol.com/',
  },
  {
    name: 'Flutter apps (Sumo Sushi, Smart Gym, TOOK)',
    role: 'Mobile Developer · Andropple Lab / Coders Cube',
    problem:
      'Clients needed cross-platform iOS/Android apps with clean state management and reusable architecture.',
    tech: ['Flutter', 'Dart', 'Cubit/BLoC', 'Provider', 'MVVM'],
    impact:
      'Shipped small-scale apps (Sumo Sushi, Smart Gym, Meet Doctor) plus remote work on TOOK Driver and TOOK Passenger.',
    url: 'https://coderscube.co/',
  },
];

export const ALL_PROJECTS: CatalogProject[] = [
  {
    name: 'Dispatch EX',
    company: 'Techno Batch',
    stack: '.NET 8 · SQL Server',
    year: '2023 – Present',
    url: 'https://www.technobatch.com/',
  },
  {
    name: 'Shipra.io',
    company: 'Techno Batch',
    stack: 'Angular 20 · .NET 8',
    year: '2023 – Present',
    url: 'https://shipra.io/',
  },
  {
    name: 'Prime HRMS',
    company: 'H3 Solutions',
    stack: '.NET · Angular · SQL',
    year: '2022 – 2023',
    url: 'https://h3solution.net/',
  },
  {
    name: 'Prime Ledge',
    company: 'H3 Solutions',
    stack: '.NET · Crystal Reports',
    year: '2022 – 2023',
    url: 'https://h3solution.net/',
  },
  {
    name: 'MREP',
    company: 'Tharsol',
    stack: 'ASP.NET Core · DevExpress',
    year: '2021 – 2022',
    url: 'https://www.tharsol.com/',
  },
  {
    name: 'M-Talib',
    company: 'Tharsol',
    stack: 'REST APIs · SQL Server',
    year: '2021 – 2022',
    url: 'https://www.tharsol.com/',
  },
  {
    name: 'Sumo Sushi',
    company: 'Coders Cube',
    stack: 'Flutter · Dart',
    year: '2020 – 2021',
    url: 'https://coderscube.co/',
  },
  {
    name: 'Smart Gym',
    company: 'Coders Cube',
    stack: 'Flutter · BLoC',
    year: '2020 – 2021',
    url: 'https://coderscube.co/',
  },
  {
    name: 'TOOK Driver',
    company: 'Coders Cube',
    stack: 'Flutter · Cubit',
    year: '2020 – 2021',
    url: 'https://coderscube.co/',
  },
  {
    name: 'TOOK Passenger',
    company: 'Coders Cube',
    stack: 'Flutter · Cubit',
    year: '2020 – 2021',
    url: 'https://coderscube.co/',
  },
  {
    name: 'Meet Doctor',
    company: 'Coders Cube',
    stack: 'Flutter · MVVM',
    year: '2020 – 2021',
    url: 'https://coderscube.co/',
  },
];

const COMPANY_LOGO_FILES = [
  'AL-DHABI DELIVERY.png',
  'AL-NAJAM DELIVERY.jpg',
  'ARAMEX.png',
  'C3X.png',
  'DARB.jpg',
  'GET GIVE DELIVERY.png',
  'H3.png',
  'HALAN DELIVERY.jpg',
  'I FAST.png',
  'J AND T .jpg',
  'M-TALIB.png',
  'MEET DOCTOR.jpg',
  'MREP.png',
  'PANDA DELIVERY.png',
  'PRESTIGE PULSE.png',
  'PRIME HRMS.png',
  'PRIME LEDGE.png',
  'QUICK PICK.png',
  'QUICK SEND.png',
  'SALASA DELIVERY.png',
  'SHIPRA.png',
  'SHOPIFY DELIVERY.jpg',
  'SMSA EXPRESS.jpg',
  'SORDER.png',
  'SUMO AND SUSHI.jpg',
  'TAALUQ.png',
  'TEAM EXPRESS.png',
  'TECHNOBATCH.png',
  'tharsol.png',
  'TOOK.jpg',
  'TOPEX.png',
  'VNLIN DELIVERY.png',
  'WE SHIP.png',
];

const STOP_WORDS = new Set(['and', 'the', 'io', 'llc', 'pvt', 'ltd', 'app']);

function normalizeName(value: string): string {
  return value.toLowerCase().replace(/\.[a-z0-9]+$/i, '').replace(/[^a-z0-9]+/g, '');
}

function nameTokens(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function logoMatchScore(projectName: string, fileName: string): number {
  const projectNorm = normalizeName(projectName);
  const fileNorm = normalizeName(fileName);

  if (!projectNorm || !fileNorm) {
    return 0;
  }

  if (projectNorm === fileNorm) {
    return 100;
  }

  if (projectNorm.includes(fileNorm) || fileNorm.includes(projectNorm)) {
    return 80;
  }

  const projectTokens = nameTokens(projectName);
  const fileTokens = nameTokens(fileName);
  if (!projectTokens.length || !fileTokens.length) {
    return 0;
  }

  const [shorter, longer] =
    projectTokens.length <= fileTokens.length
      ? [projectTokens, fileTokens]
      : [fileTokens, projectTokens];

  if (shorter.every((token) => longer.includes(token))) {
    return 60 + (shorter.length / longer.length) * 15;
  }

  return 0;
}

export function logoForProject(project: Pick<CatalogProject, 'name' | 'company' | 'logo'>): string | undefined {
  if (project.logo) {
    return project.logo;
  }

  let bestFile: string | undefined;
  let bestScore = 0;

  for (const file of COMPANY_LOGO_FILES) {
    const score = Math.max(
      logoMatchScore(project.name, file),
      project.company ? logoMatchScore(project.company, file) * 0.7 : 0,
    );

    if (score > bestScore) {
      bestScore = score;
      bestFile = file;
    }
  }

  return bestScore >= 50 && bestFile ? `company-logo/${encodeURIComponent(bestFile)}` : undefined;
}

export interface CompanyLogo {
  file: string;
  name: string;
  src: string;
}

export interface LogoGalleryGroup {
  id: string;
  title: string;
  detail: string;
  headingLogo?: CompanyLogo;
  logos: CompanyLogo[];
}

function toCompanyLogo(file: string): CompanyLogo {
  return {
    file,
    name: file.replace(/\.[^.]+$/, '').replace(/\s+/g, ' ').trim(),
    src: `company-logo/${encodeURIComponent(file)}`,
  };
}

const H3_LOGO_FILES = ['PRIME HRMS.png', 'PRIME LEDGE.png'];
const THARSOL_LOGO_FILES = ['MREP.png', 'M-TALIB.png', 'TAALUQ.png', 'SORDER.png'];
const OTHER_LOGO_FILES = ['TOOK.jpg', 'SUMO AND SUSHI.jpg', 'MEET DOCTOR.jpg'];
const HEADING_LOGO_FILES = ['TECHNOBATCH.png', 'H3.png', 'tharsol.png'];

const ASSIGNED_LOGO_FILES = new Set([
  ...H3_LOGO_FILES,
  ...THARSOL_LOGO_FILES,
  ...OTHER_LOGO_FILES,
  ...HEADING_LOGO_FILES,
]);

export const LOGO_GALLERY: LogoGalleryGroup[] = [
  {
    id: 'technobatch',
    title: 'TechnoBatch',
    detail: 'Dispatch EX, Shipra.io, and the courier / commerce integrations around them.',
    headingLogo: toCompanyLogo('TECHNOBATCH.png'),
    logos: COMPANY_LOGO_FILES.filter((file) => !ASSIGNED_LOGO_FILES.has(file)).map(toCompanyLogo),
  },
  {
    id: 'h3',
    title: 'H3',
    detail: 'Prime HRMS and Prime Ledge from the H3 Solutions years.',
    headingLogo: toCompanyLogo('H3.png'),
    logos: H3_LOGO_FILES.map(toCompanyLogo),
  },
  {
    id: 'tharsol',
    title: 'Tharsol',
    detail: 'MREP, M-Talib, Taaluq, and Sorder from the Tharsol chapter.',
    headingLogo: toCompanyLogo('tharsol.png'),
    logos: THARSOL_LOGO_FILES.map(toCompanyLogo),
  },
  {
    id: 'other',
    title: 'Other',
    detail: 'Earlier mobile work — TOOK, Sumo Sushi, and Meet Doctor.',
    logos: OTHER_LOGO_FILES.map(toCompanyLogo),
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Senior ASP.NET Developer',
    company: 'Techno Batch (Dispatch EX LLC)',
    period: 'May 2023 – Present',
    location: 'Faisalabad · Team of 8',
    summary: 'Lead delivery on Dispatch EX and Shipra.io logistics/commerce platforms.',
    highlights: [
      'Owned end-to-end delivery of Dispatch EX logistics platform (2,500+ drivers, 300K+ shipments/month).',
      'Engineered Shipra.io commerce APIs with Angular 20, .NET 8, and clean architecture.',
      'Third-party integrations: WooCommerce, Shopify, C3X, Prestige.',
      'Mentored juniors and championed AI-assisted workflows with Cursor IDE.',
    ],
    url: 'https://www.technobatch.com/',
  },
  {
    title: '.NET Developer',
    company: 'H3 Solutions Pvt Ltd',
    period: 'May 2022 – May 2023',
    location: 'Faisalabad',
    summary: 'Enterprise HRMS and textile mill software with FBR tax integration.',
    highlights: [
      'Led Prime HRMS for 500+ employees with a cross-functional team of 5.',
      'Owned delivery of 20+ features and 100+ critical bug fixes.',
      'Stood up a new Angular 14 project from scratch alongside AngularJS legacy UI.',
    ],
    url: 'https://h3solution.net/',
  },
  {
    title: 'Junior .NET Developer',
    company: 'Tharsol Pvt Ltd',
    period: 'Nov 2021 – May 2022',
    location: 'Faisalabad',
    summary: 'CRM and LMS products for pharma and corporate learning.',
    highlights: [
      'Built and owned MREP CRM features and M-Talib learning APIs.',
      'Wrote high-volume SQL against one of the larger databases in Faisalabad.',
    ],
    url: 'https://www.tharsol.com/',
  },
  {
    title: 'Earlier roles',
    company: 'Freelance · Andropple Lab · Sherserve',
    period: 'Sep 2019 – Nov 2021',
    location: 'Faisalabad',
    summary: 'Internship through Flutter mobile work and freelance ASP.NET Core projects.',
    highlights: [
      'Freelance ASP.NET Core / REST API work (Mar–Jul 2020).',
      'Flutter apps at Andropple Lab / Coders Cube (Sumo Sushi, Smart Gym, TOOK).',
      'ASP.NET Web Forms internship at Sherserve — first professional .NET role.',
    ],
    url: 'https://www.sherserve.com/',
  },
];

export const AWARDS: Award[] = [
  {
    title: '"Minimum Time, Maximum Output" Shield',
    org: 'Techno Batch',
    date: 'September 2026',
    detail: 'Awarded by the company founder for exceptional productivity and efficient delivery.',
  },
  {
    title: 'Employee of the Year',
    org: 'Techno Batch',
    date: 'August 2024',
    detail: 'Recognized for performance, problem-solving, and team collaboration.',
  },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    period: '2022 – paused',
    title: 'M.S. Information Technology',
    short: 'M.S.',
    icon: 'fa-solid fa-graduation-cap',
    detail: 'Faisalabad — freeze after 2 semesters.',
  },
  {
    period: '2014 – 2019',
    title: 'B.S. Information Technology (Hons)',
    short: 'B.S.',
    icon: 'fa-solid fa-user-graduate',
    detail: 'Virtual University, Faisalabad — CGPA 3.3 / 4.0.',
  },
  {
    period: '2018 – 2019',
    title: 'MEAN Stack Development',
    short: 'MEAN',
    icon: 'fa-solid fa-laptop-code',
    detail: 'Saylani Mass IT Training — web development certification.',
  },
  {
    period: '2012 – 2014',
    title: 'Intermediate (Computer Science)',
    short: 'ICS',
    icon: 'fa-solid fa-school',
    detail: 'BISE Faisalabad.',
  },
  {
    period: '2011 – 2012',
    title: 'Matriculation (Computer Science)',
    short: 'Matric',
    icon: 'fa-solid fa-book-open',
    detail: 'Technical High School, Faisalabad.',
  },
];

export const EDUCATION = {
  degree: 'BS, Information Technology',
  school: 'Virtual University, Faisalabad',
  year: '2019',
  cert: 'MEAN Stack Development — Saylani Mass IT Training (2018–2019)',
};

export const LANGUAGES: LanguageItem[] = [
  { name: 'Urdu', level: 'Native / fluent — speaking and writing', icon: 'fa-solid fa-language' },
  { name: 'English', level: 'Professional working — technical writing, meetings, email', icon: 'fa-solid fa-globe' },
  { name: 'Arabic', level: 'Beginner — common phrases; learning for UAE work', icon: 'fa-solid fa-moon' },
];

export const INTERESTS: InterestItem[] = [
  {
    name: 'Soccer',
    icon: 'fa-solid fa-futbol',
    detail:
      'I enjoy the thrill of the game, teamwork, and strategy involved. It keeps me active and sharpens my coordination.',
  },
  {
    name: 'Camping',
    icon: 'fa-solid fa-campground',
    detail:
      'Being in nature helps me unwind, and I love the adventure of exploring new places and outdoor survival skills.',
  },
  {
    name: 'Travel & Mountains',
    icon: 'fa-solid fa-mountain-sun',
    detail:
      'I love traveling to new places and hiking in the mountains — the views, the climb, and the quiet reset that comes with being at altitude.',
  },
  {
    name: 'Music',
    icon: 'fa-solid fa-music',
    detail:
      'Music inspires me; I enjoy listening to different genres and occasionally playing instruments to relax and express creativity.',
  },
  {
    name: 'Gaming',
    icon: 'fa-solid fa-gamepad',
    detail:
      'I love immersive storytelling, problem-solving, and the competitive spirit in gaming, which also enhances my strategic thinking.',
  },
  {
    name: 'Swimming',
    icon: 'fa-solid fa-person-swimming',
    detail:
      'It’s both a refreshing workout and a great way to relax. I enjoy the challenge and freedom of being in the water.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    name: 'Web application development',
    icon: 'fa-solid fa-code',
    detail: 'Scalable apps with ASP.NET Core, .NET MVC, Angular 20, and SQL Server.',
  },
  {
    name: 'API design & integrations',
    icon: 'fa-solid fa-plug',
    detail: 'REST APIs for web/mobile plus third-party dispatch, tax, and commerce systems.',
  },
  {
    name: 'Database & reporting',
    icon: 'fa-solid fa-database',
    detail: 'Query optimization, indexes, Crystal Reports, iTextSharp, ApexCharts / D3.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Abdullah Saeed',
    role: 'CEO, Techno Batch',
    logo: 'company-logo/TECHNOBATCH.png',
    quote:
      "Adeel's dedication and technical expertise made a significant impact at Technobatch. His proficiency in .NET, Web APIs, and SQL helped streamline development — reflected in Employee of the Year recognition. Adeel is our undercover agent — he gets every job done.",
  },
  {
    name: 'Nauman Sarwar',
    role: 'CEO, H3 Solutions',
    logo: 'company-logo/H3.png',
    logoDark: true,
    quote:
      'Adeel was a key asset at H3, excelling in .NET development and FBR integration. His proactive approach ensured smooth delivery on PRIME HRMS and Prime Ledge.',
  },
  {
    name: 'Mohammad Nasser',
    role: 'CTO, Tharsol Pvt Ltd',
    logo: 'company-logo/tharsol.png',
    logoDark: true,
    quote:
      'Contributions to MREP and M-Talib were invaluable — Web APIs and DevExpress reporting improved functionality and data management.',
  },
];
