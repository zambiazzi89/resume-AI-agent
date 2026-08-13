export type ExperienceLevel = 'hands-on' | 'working-knowledge' | 'exposure'

export type ExperienceContext = 'professional' | 'personal-project' | 'academic'

export type EvidenceType =
  | 'responsibility'
  | 'accomplishment'
  | 'incident'
  | 'project'
  | 'leadership'
  | 'automation'
  | 'bug-fix'

export type TechnicalExperience = {
  technology: string
  category: string
  context: ExperienceContext
  experienceLevel: ExperienceLevel
  evidence: string[]
}

export type Accomplishment = {
  id: string
  title: string
  description: string
  type: EvidenceType
  context: ExperienceContext
  technologies: string[]
  impact?: string
}

export type Incident = {
  id: string
  title: string
  severity?: 'Low' | 'Medium' | 'High' | 'Critical'

  problem: string

  investigation: string[]

  rootCause: string

  resolution: string[]

  demonstratedSkills: string[]

  technologies: string[]
}

export type Experience = {
  id: string
  role: string
  company: string
  location: string
  dates: string

  primaryFocus?: string

  responsibilities: string[]

  technologies: string[]

  developmentAllocation?: number

  accomplishments?: string[]
}

export type CareerProfile = {
  identity: {
    targetTitle: string

    citizenships: string[]

    authorizedRegions: string[]

    spokenLanguages: {
      language: string
      proficiency: string
    }[]

    requiresSponsorship: boolean

    remoteWork: boolean
  }

  professionalSummary: string

  technicalExperience: TechnicalExperience[]

  experience: Experience[]

  incidents: Incident[]

  accomplishments: Accomplishment[]

  capabilities: {
    category: string
    skills: string[]
    evidence: string[]
  }[]

  projects: {
    id: string
    name: string
    context: 'personal-project'
    technologies: string[]
    description: string
    accomplishments: string[]
  }[]

  certifications: string[]

  education: {
    degree: string
    school: string
    GPA?: string
    graduationDate: string
    highlights: string[]
    coreConcepts: string[]
  }
}

export const careerProfile: CareerProfile = {
  identity: {
    targetTitle: 'Software Engineer',

    citizenships: ['United States', 'Brazil', 'Italy'],

    authorizedRegions: ['United States', 'European Union', 'Brazil'],

    spokenLanguages: [
      {
        language: 'English',
        proficiency: 'Fluent',
      },
      {
        language: 'Portuguese',
        proficiency: 'Native',
      },
    ],

    requiresSponsorship: false,
    remoteWork: true,
  },

  professionalSummary:
    'Software Engineer with extensive experience in enterprise production support, application troubleshooting, root-cause analysis, AWS, Java, Oracle, and distributed systems. Strong track record of independently investigating complex production issues, implementing permanent fixes and operational automation, mentoring engineers, and coordinating high-severity incidents with technical and business stakeholders. Additional hands-on full-stack development experience through professional enhancements and personal projects.',

  technicalExperience: [
    {
      technology: 'Java',
      category: 'Backend',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Investigated Java application issues using stack traces and source code.',
        'Traced production failures from Java exceptions to DAO classes and database queries.',
        'Implemented bug fixes for application defects.',
        'Developed application enhancements using Java.',
      ],
    },

    {
      technology: 'Angular',
      category: 'Frontend',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Worked on application enhancements using Angular.',
        'Investigated frontend-related production issues as part of end-to-end troubleshooting.',
      ],
    },

    {
      technology: 'Node.js',
      category: 'Backend',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: ['Developed application enhancements using Node.js.'],
    },

    {
      technology: 'AWS',
      category: 'Cloud',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Regularly troubleshoot production applications across multiple AWS services.',
        'Investigate AWS metrics, logs, configurations, and application data during production incidents.',
        'Use AWS CLI and shell scripting to automate operational tasks.',
        'Use AWS CDK and CloudFormation for application enhancements.',
      ],
    },

    {
      technology: 'EC2',
      category: 'AWS',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Investigate EC2 metrics and logs during production incidents.',
        'Use EC2 information to troubleshoot application and infrastructure issues.',
      ],
    },

    {
      technology: 'ECS',
      category: 'AWS',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Investigate ECS cluster, task metrics, and task logs during production incidents.',
        'ECS clusters scale to approximately 20 tasks per application during peak periods.',
        'Created AWS CLI and shell automation to discover ECS task IPs and execute commands across running tasks.',
      ],
    },

    {
      technology: 'Lambda',
      category: 'AWS',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Investigate Lambda code and CloudWatch logs during production incidents.',
        'Develop Lambda functions for application enhancements.',
      ],
    },

    {
      technology: 'API Gateway',
      category: 'AWS',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Investigate API Gateway configurations during production incidents.',
        'Created API Gateway endpoints as part of application enhancements using AWS CDK/CloudFormation.',
      ],
    },

    {
      technology: 'DynamoDB',
      category: 'AWS',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Investigate DynamoDB records during production incidents.',
        'Identified and fixed a defect causing duplicate DynamoDB records.',
        'Created data remediation scripts for DynamoDB issues.',
      ],
    },

    {
      technology: 'S3',
      category: 'AWS',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Investigate S3 files and access policies.',
        'Created shell automation that generates XML files and uploads them to S3 to trigger SOAP integrations.',
      ],
    },

    {
      technology: 'CloudWatch',
      category: 'AWS',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Regularly investigate CloudWatch logs during production incidents.',
      ],
    },

    {
      technology: 'SNS/SQS',
      category: 'AWS',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: ['Investigate SNS/SQS setup and subscription configurations.'],
    },

    {
      technology: 'Secrets Manager',
      category: 'AWS',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Inspect Secrets Manager configuration when troubleshooting environment and connectivity issues.',
      ],
    },

    {
      technology: 'Parameter Store',
      category: 'AWS',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Inspect Parameter Store values when troubleshooting environment configuration issues.',
      ],
    },

    {
      technology: 'AWS CDK',
      category: 'Infrastructure as Code',
      context: 'professional',
      experienceLevel: 'working-knowledge',
      evidence: [
        'Used AWS CDK to create API Gateway endpoints and Lambda functions for application enhancements.',
      ],
    },

    {
      technology: 'CloudFormation',
      category: 'Infrastructure as Code',
      context: 'professional',
      experienceLevel: 'working-knowledge',
      evidence: [
        'Used CloudFormation for application infrastructure enhancements.',
      ],
    },

    {
      technology: 'Oracle',
      category: 'Database',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Regularly investigate production data using Oracle SQL.',
        'Create SQL update queries to remediate production data issues.',
        'Investigate application SQL queries and database state during incidents.',
      ],
    },

    {
      technology: 'PL/SQL',
      category: 'Database',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Develop PL/SQL scripts to remediate production data issues.',
        'Created cursor-based scripts to reconstruct missing database records.',
        'Developed SQL solutions to support business and production needs.',
      ],
    },

    {
      technology: 'Shell scripting',
      category: 'Automation',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Created automation for XML generation and S3 uploads.',
        'Created AWS CLI automation for ECS/JBoss cache clearing.',
        'Use shell scripts to automate repetitive production-support tasks.',
      ],
    },

    {
      technology: 'Splunk',
      category: 'Observability',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Regularly analyze Splunk logs during production incidents.',
        'Use exception traces and transaction logs to identify application failures.',
      ],
    },

    {
      technology: 'JBoss',
      category: 'Application Server',
      context: 'professional',
      experienceLevel: 'hands-on',
      evidence: [
        'Troubleshoot JBoss application-server issues.',
        'Investigate JBoss logs and configuration during production incidents.',
        'Automated JBoss cache clearing across ECS tasks.',
      ],
    },

    {
      technology: 'React',
      category: 'Frontend',
      context: 'personal-project',
      experienceLevel: 'hands-on',
      evidence: [
        'Built React applications for personal projects.',
        'Built an internal React/Electron order-fulfillment application at Rhino Foods.',
      ],
    },

    {
      technology: 'TypeScript',
      category: 'Programming',
      context: 'personal-project',
      experienceLevel: 'hands-on',
      evidence: [
        'Used TypeScript extensively in personal full-stack projects.',
        'Used TypeScript in the Career Assistant project.',
      ],
    },

    {
      technology: 'Next.js',
      category: 'Full Stack',
      context: 'personal-project',
      experienceLevel: 'hands-on',
      evidence: [
        'Built full-stack applications using Next.js.',
        'Built the Career Assistant AI application using Next.js.',
      ],
    },
  ],

  experience: [
    {
      id: 'capgemini',
      role: 'Software Engineer',
      company: 'Capgemini',
      location: 'New York City, NY (Remote)',
      dates: 'June 2022 - Present',

      primaryFocus: 'Production Support',

      developmentAllocation: 0.1,

      responsibilities: [
        'Provide production support for enterprise applications serving more than 10,000 concurrent users during peak periods.',
        'Perform root-cause analysis of production incidents across application, database, and infrastructure layers.',
        'Investigate ServiceNow incidents and coordinate technical resolution.',
        'Analyze Splunk, application-server, CloudWatch, and JBoss logs.',
        'Investigate Java code, Oracle SQL, PL/SQL, AWS services, and application data.',
        'Create SQL and PL/SQL remediation scripts for production data issues.',
        'Create and maintain shell-script automation for operational tasks.',
        'Coordinate high-severity incidents, RCAs, problem management, change requests, and releases.',
        'Communicate daily with product owners, managers, developers, and other technical teams.',
      ],

      technologies: [
        'Java',
        'Angular',
        'Node.js',
        'AWS',
        'EC2',
        'ECS',
        'Lambda',
        'API Gateway',
        'DynamoDB',
        'S3',
        'CloudWatch',
        'SNS',
        'SQS',
        'Secrets Manager',
        'Parameter Store',
        'AWS CLI',
        'AWS CDK',
        'CloudFormation',
        'Oracle',
        'PL/SQL',
        'Splunk',
        'JBoss',
        'Shell scripting',
        'ServiceNow',
        'Jira',
      ],

      accomplishments: [
        'Identified the root cause of approximately 75% of assigned production investigations within a team of approximately 10 engineers.',
        'Maintained zero SLA misses for high-priority/high-severity ServiceNow tickets during tenure on the team.',
        'Served as interim technical lead for a global team of approximately 10 engineers.',
        'Mentored engineers on application troubleshooting, debugging, SQL remediation, and application architecture.',
      ],
    },

    {
      id: 'rhino-foods',
      role: 'Order Fulfillment Specialist',
      company: 'Rhino Foods',
      location: 'Burlington, VT',
      dates: '2019 - 2021',

      primaryFocus: 'Order Fulfillment and Process Improvement',

      responsibilities: [
        'Managed customer orders, inventory levels, and demand projections.',
        'Collaborated with Sales, Scheduling, Materials, QA, and Logistics.',
        'Served as primary customer contact throughout the order lifecycle.',
      ],

      technologies: ['React', 'Electron'],

      accomplishments: [
        'Independently built a React/Electron application that reduced manual errors and improved workflow efficiency by approximately 90%.',
      ],
    },

    {
      id: 'caixa',
      role: 'Bank Officer / Teller / Treasurer',
      company: 'Caixa Econômica Federal',
      location: 'Brazil',
      dates: '2010 - 2018',

      responsibilities: [
        'Managed customer accounts and assessed credit risk for personal and mortgage loans.',
        'Performed teller and treasury operations.',
        'Reviewed and audited loan and account contracts.',
        'Collaborated with commercial and corporate banking teams.',
      ],

      technologies: [],

      accomplishments: [
        'Consistently exceeded sales goals through consultative, needs-based recommendations of financial products.',
      ],
    },
  ],

  incidents: [
    {
      id: 'http-413-ajp',
      title: 'HTTP 413 / JBoss AJP packet-size production incident',
      severity: 'High',

      problem:
        'Multiple users reported that the application appeared broken and that links were not working.',

      investigation: [
        'Connected directly with affected users and observed the issue through screen sharing.',
        'Inspected browser Network requests and identified HTTP 413 Request Entity Too Large responses.',
        'Collected and compared HAR files from affected and unaffected sessions.',
        'Identified larger request headers caused by additional cookies.',
        'Investigated Apache and JBoss configuration and documentation.',
      ],

      rootCause:
        'The JBoss/Apache environment relied on the default AJP packet size of approximately 8KB because it was not explicitly configured.',

      resolution: [
        'Updated Apache and JBoss configuration to explicitly increase the AJP packet size.',
        'Tested the configuration in lower environments.',
        'Coordinated production deployment with technical leads.',
        'Confirmed resolution with affected users.',
      ],

      demonstratedSkills: [
        'Root-cause analysis',
        'HTTP troubleshooting',
        'Browser debugging',
        'HAR analysis',
        'Apache',
        'JBoss',
        'Production incident management',
        'User communication',
        'Cross-team coordination',
      ],

      technologies: ['Apache', 'JBoss', 'HTTP'],
    },

    {
      id: 'missing-db-values',
      title: 'Critical application failure caused by missing database values',
      severity: 'High',

      problem:
        'Multiple users were unable to perform a critical application task.',

      investigation: [
        'Analyzed JSession logs from affected users.',
        'Identified an exception stack trace.',
        'Located the relevant Java classes from the stack trace.',
        'Traced the failure to a SQL query in a DAO class.',
        'Executed the query in SQL Developer using the required binding variables.',
        'Identified missing values in a database column required by the query.',
        'Determined that newer records were missing the values because of a defect in a newer implementation.',
      ],

      rootCause:
        'A software defect caused required database values to be omitted for newly created records.',

      resolution: [
        'Created an SQL update script to populate the missing values for impacted records.',
        'Opened a Jira ticket for the permanent application fix.',
      ],

      demonstratedSkills: [
        'Java debugging',
        'Stack-trace analysis',
        'Oracle SQL',
        'Root-cause analysis',
        'Production data remediation',
        'Incident response',
      ],

      technologies: ['Java', 'Oracle', 'SQL', 'Jira'],
    },

    {
      id: 'soap-failures',
      title: 'Large-scale SOAP transaction failure',
      severity: 'Critical',

      problem:
        'Hundreds of critical SOAP requests from an upstream system were failing.',

      investigation: [
        'Analyzed Splunk logs for failed SOAP transactions.',
        'Identified a NullPointerException.',
        'Investigated application logs and database queries.',
        'Identified the relevant database tables and columns.',
        'Found missing records required for successful processing.',
      ],

      rootCause:
        'Required database records were missing for affected SOAP transactions.',

      resolution: [
        'Created a PL/SQL script using cursors to reconstruct missing records from data in other tables.',
        'Coordinated with the upstream system to retry failed transactions.',
        'Confirmed successful processing after remediation.',
      ],

      demonstratedSkills: [
        'Production incident response',
        'Splunk',
        'Java troubleshooting',
        'SOAP troubleshooting',
        'Oracle',
        'PL/SQL',
        'Data remediation',
        'Cross-team coordination',
      ],

      technologies: ['SOAP', 'Java', 'Splunk', 'Oracle', 'PL/SQL'],
    },
  ],

  accomplishments: [
    {
      id: 'dynamodb-duplicate-records',
      title: 'DynamoDB duplicate-record defect',

      description:
        'Identified a production defect causing duplicate DynamoDB records, determined the root cause, implemented the code fix, deployed it to lower environments, and validated the solution.',

      type: 'bug-fix',
      context: 'professional',

      technologies: ['DynamoDB', 'AWS'],
    },

    {
      id: 'xml-generation',
      title: 'XML/S3 automation',

      description:
        'Created a shell script that generates dozens of XML files from an input text file and uploads them to S3 to trigger SOAP requests.',

      type: 'automation',
      context: 'professional',

      technologies: ['Shell scripting', 'AWS S3', 'SOAP'],
    },

    {
      id: 'ecs-jboss-cache',
      title: 'ECS/JBoss cache automation',

      description:
        'Created AWS CLI and shell automation that discovers ECS task IPs and executes commands across running tasks to clear JBoss caches.',

      type: 'automation',
      context: 'professional',

      technologies: ['AWS CLI', 'ECS', 'Shell scripting', 'JBoss'],
    },

    {
      id: 'server-clock',
      title: 'Server-side time validation',

      description:
        'Identified recurring application access failures caused by relying on users’ computer clocks. Proposed changing validation to use the server clock instead, eliminating the dependency on client machine time.',

      type: 'accomplishment',
      context: 'professional',

      technologies: ['Application troubleshooting'],
    },

    {
      id: 'upstream-data-sync',
      title: 'Upstream data synchronization improvement',

      description:
        'Investigated recurring annual manual updates across Oracle and DynamoDB, identified a code path that incorrectly skipped an upstream-data processing step, and proposed a permanent solution adopted by product owners and development leadership.',

      type: 'accomplishment',
      context: 'professional',

      technologies: ['Oracle', 'DynamoDB'],
    },
  ],

  capabilities: [
    {
      category: 'Problem Solving',
      skills: [
        'Root-cause analysis',
        'Independent investigation',
        'Cross-layer debugging',
        'Incident triage',
        'Production troubleshooting',
        'Workaround development',
        'Permanent remediation',
      ],

      evidence: [
        'Independently investigate production issues and return with proposed solutions.',
        'Identify root causes in approximately 75% of assigned investigations.',
        'Regularly troubleshoot issues across browser, application, infrastructure, AWS, and database layers.',
        'Develop temporary workarounds while continuing investigation toward permanent fixes.',
      ],
    },

    {
      category: 'Ownership',
      skills: [
        'Initiative',
        'Problem ownership',
        'Process improvement',
        'Automation',
        'Technical decision-making',
      ],

      evidence: [
        'Regularly self-assign and take ownership of ServiceNow tickets.',
        'Proactively identify recurring production problems.',
        'Build automation for repetitive operational tasks.',
        'Propose permanent solutions rather than repeatedly addressing symptoms.',
      ],
    },

    {
      category: 'Leadership',
      skills: [
        'Technical mentorship',
        'Onboarding',
        'Technical guidance',
        'Incident coordination',
        'Cross-team collaboration',
      ],

      evidence: [
        'Mentor teammates daily on debugging and SQL remediation.',
        'Review and authorize production SQL remediation queries.',
        'Onboard engineers by explaining application architecture and core concepts.',
        'Previously served as interim technical lead for a global team of approximately 10 engineers.',
      ],
    },

    {
      category: 'Communication',
      skills: [
        'Client communication',
        'Technical communication',
        'Stakeholder management',
        'Incident communication',
      ],

      evidence: [
        'Communicate daily with product owners and managers.',
        'Explain technical issues to nontechnical stakeholders during major incidents.',
        'Write RCA documents and SOPs.',
        'Present technical investigations and proposed solutions to leadership.',
      ],
    },

    {
      category: 'Business Impact',
      skills: [
        'Operational efficiency',
        'Downtime reduction',
        'Customer impact mitigation',
        'Process improvement',
      ],

      evidence: [
        'Resolve high-severity incidents affecting large numbers of users during peak periods.',
        'Restore critical business operations during production outages.',
        'Build automation and permanent fixes that reduce recurring manual work.',
      ],
    },
  ],

  projects: [
    {
      id: 'gotham-lights',
      name: 'Gotham Lights',
      context: 'personal-project',

      technologies: [
        'Next.js',
        'TypeScript',
        'React',
        'Prisma',
        'Supabase',
        'PostgreSQL',
        'Tailwind',
      ],

      description:
        'Social web application for reconnecting people through NYC missed connections.',

      accomplishments: [
        'Built full-stack application with authentication, real-time chat, location filtering, and Google Maps/Places integration.',
      ],
    },

    {
      id: 'order-fulfillment',
      name: 'Order Fulfillment App',
      context: 'personal-project',

      technologies: ['React', 'Electron'],

      description:
        'Internal application designed to streamline order entry and reduce manual errors.',

      accomplishments: [
        'Built an application that improved workflow efficiency by approximately 90%.',
      ],
    },

    {
      id: 'career-assistant',
      name: 'Career Assistant (AI Agent)',
      context: 'personal-project',

      technologies: [
        'Next.js',
        'TypeScript',
        'Node.js',
        'OpenAI API',
        'PostgreSQL',
        'Prisma',
        'AWS',
      ],

      description:
        'AI-powered application that analyzes job descriptions, evaluates candidate fit, and generates tailored resumes and cover letters.',

      accomplishments: [
        'Implemented an analyze → critique → improve → re-evaluate reasoning pipeline.',
        'Implemented structured model outputs and scoring.',
        'Implemented job-data extraction and automated DOCX generation.',
      ],
    },
  ],

  certifications: [
    'AWS Certified Developer Associate',
    'Oracle Certified Associate - Java SE 8',
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
      'Object Oriented Programming (OOP)',
      'Software Testing',
      'Automation and QA',
      'Mobile Development',
      'Machine Learning',
      'Full-Stack Development',
    ],
  },
}
