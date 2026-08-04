import { z } from 'zod'

export const ResumeSchema = z.object({
  title: z.string(),

  summary: z.string(),

  workEligibility: z.object({
    citizenships: z.array(z.string()),
    authorizedRegions: z.array(z.string()),

    spokenLanguages: z.array(
      z.object({
        language: z.string(),
        proficiency: z.string(),
      }),
    ),

    requiresSponsorship: z.boolean(),
    remoteWork: z.boolean(),
  }),

  skills: z.object({
    languagesAndTools: z.array(z.string()),
    certifications: z.array(z.string()),
    exposure: z.array(z.string()),
  }),

  experience: z.array(
    z.object({
      role: z.string(),
      company: z.string(),
      location: z.string(),
      dates: z.string(),
      bullets: z.array(z.string()),
    }),
  ),

  projects: z.array(
    z.object({
      name: z.string(),
      tech: z.array(z.string()),
      description: z.string(),
    }),
  ),

  education: z.object({
    degree: z.string(),
    school: z.string(),
    GPA: z.string(),
    graduationDate: z.string(),
    highlights: z.array(z.string()),
    coreConcepts: z.array(z.string()),
  }),
})

export type ResumeType = z.infer<typeof ResumeSchema>

export const resume: ResumeType = {
  title: 'Software Engineer',
  summary:
    'Creative and results-driven software engineer with hands-on experience building and maintaining full-stack web applications using React, Angular, Java, Next.js, TypeScript, and AWS. Proven ability to translate business needs into scalable, user-friendly solutions. Former professional in banking and supply chain, bringing a unique blend of technical expertise and cross-functional communication. Recognized for leadership, fast problem-solving, and high-impact contributions. Actively seeking opportunities to collaborate on modern, mission-driven web products.',
  workEligibility: {
    citizenships: ['United States', 'Brazil', 'Italy'],
    authorizedRegions: ['United States', 'European Union', 'Brazil'],
    spokenLanguages: [
      { language: 'English', proficiency: 'Fluent' },
      { language: 'Portuguese', proficiency: 'Native' },
    ],
    requiresSponsorship: false,
    remoteWork: true,
  },
  skills: {
    languagesAndTools: [
      'Java',
      'React',
      'Next.js',
      'TypeScript',
      'Angular',
      'JavaScript',
      'CSS',
      'Tailwind',
      'Prisma',
      'Node.js',
      'AWS',
      'AWS CDK',
      'AWS CLI',
      'Lambda',
      'DynamoDB',
      'S3',
      'API Gateway',
      'Cloudwatch',
      'Docker',
      'PostgreSQL',
      'Oracle SQL',
      'PL/SQL',
      'SSRS',
      'REST',
      'SOAP',
      'Redis',
      'JBoss',
      'Splunk',
      'Gitlab',
      'Git',
      'Linux',
      'Shell scripting',
      'Postman',
      'Jira',
      'Confluence',
      'ServiceNow',
    ],
    certifications: [
      'AWS Certified Developer Associate',
      'Oracle Certified Associate - Java SE 8',
    ],
    exposure: [
      'Python',
      'C++',
      'MongoDB',
      'Supabase',
      'Gitlab CI/CD Pipelines',
      'Electron',
      'PGP (GPG Encryption)',
    ],
  },

  experience: [
    {
      role: 'Software Engineer',
      company: 'Capgemini',
      location: 'New York City, NY (Remote)',
      dates: 'June 2022 - Present',
      bullets: [
        'Developed and maintained both legacy and modern systems, supporting high-traffic applications (10,000+ concurrent users) across Java/JBoss/Oracle and microservices-based architectures using Angular, Node.js and AWS (API Gateway, Lambda, DynamoDB).',
        'Automated internal workflows, increasing process efficiency and reducing manual work by up to 80%.',
        'Resolved critical application issues in a timely manner, observing SLAs, and with attention to detail, communicating effectively with clients and end users to meet and exceed their needs.',
        'Created and shared knowledge documents and SOPs, improving team efficiency by up to 95% in tackling issues and performing recurrent tasks.',
        'Served as interim team lead for a global team of 10 engineers, providing technical guidance, mentorship, and delivery coordination.',
      ],
    },
    {
      role: 'Order Fulfillment Specialist',
      company: 'Rhino Foods',
      location: 'Burlington, VT',
      dates: '2019 - 2021',
      bullets: [
        'Proactively built a React application to reduce human error and increase operational efficiency by 90%.',
        'Processed and managed customer orders while analyzing inventory levels and demand projections.',
        'Collaborated cross-functionally with Sales, Scheduling, Materials, QA, and Logistics to ensure on-time, in-full delivery.',
        'Served as the primary point of contact for customers throughout the order lifecycle, proactively resolving issues and maintaining strong client relationships.',
      ],
    },
    {
      role: 'Bank Officer / Teller / Treasurer',
      company: 'Caixa Econômica Federal',
      location: 'Brazil',
      dates: '2010 - 2018',
      bullets: [
        'Managed customer accounts and assessed credit risk for personal and mortgage loans, resolving complex client issues while maintaining high satisfaction.',
        'Drove adoption of financial products (credit cards, insurance, savings accounts), consistently exceeding sales goals through consultative, needs-based recommendations.',
        'Performed daily teller and treasury operations, including vault and ATM reconciliation, in full compliance with security and anti–money laundering regulations.',
        'Reviewed and audited loan and account contracts, collaborating with commercial and corporate banking teams to correct inconsistencies and ensure regulatory compliance.',
      ],
    },
  ],

  projects: [
    {
      name: 'Gotham Lights',
      tech: ['Next.js', 'Prisma', 'Supabase', 'Tailwind'],
      description:
        'Social web app to reconnect people with missed connections in NYC. Built a full-stack app with real-time subscriptions (chat), Google Maps and Places integration, location filtering, and secure authentication.',
    },
    {
      name: 'Order Fulfillment App',
      tech: ['React', 'Electron'],
      description:
        'Internal tool designed to streamline order entry and eliminate manual errors. Recognized for significant improvements in workflow efficiency.',
    },
    {
      name: 'Career Assistant (AI Agent)',
      tech: ['Next.js', 'Node.js', 'OpenAI API', 'PostgreSQL', 'Prisma', 'AWS'],
      description:
        'Built an AI-powered agent that analyzes job descriptions, evaluates candidate fit, and generates tailored resumes and cover letters. Implements a multi-step reasoning loop (analyze → critique → improve → re-evaluate) to iteratively optimize outputs. Includes job scraping, structured data extraction, scoring system, and automated .docx generation.',
    },
  ],

  education: {
    degree: 'BS Computer Science',
    school: 'Southern New Hampshire University',
    GPA: '3.99',
    graduationDate: 'May 2022',
    highlights: [
      "President's List (2019-2022)",
      'Alpha Sigma Lambda Honor Society',
    ],
    coreConcepts: [
      'Data Structures and Algorithms',
      'Applied Statistics for STEM',
      'Discrete Mathematics',
      'Software Development Lifecycle (SDLC)',
      'Object Oriented Programing (OOP)',
      'Software Testing',
      'Automation and QA',
      'Mobile Development',
      'Machine Learning',
      'Full-Stack Development',
    ],
  },
}
