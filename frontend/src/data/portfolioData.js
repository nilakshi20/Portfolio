export const portfolio = {
  name: 'Nilakshi Mishra',
  shortName: 'NM',
  title: 'AI/ML Engineer',
  email: 'nilakshimishra7@gmail.com',
  phone: '9569233645',
  // Same-origin file avoids cross-origin browser caches of an older /resume PDF.
  // Bump resumeVersion whenever you replace public/resume.pdf.
  resumeVersion: '20260906-2c6aed',
  resumeUrl: '/resume.pdf',
  resumeFileName: 'Nilakshi-Mishra-AI-ML-Engineer-Resume.pdf',
  profileImage: '/profile.png',
  socials: {
    github: '',
    linkedin: '',
  },
  nav: [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'research', label: 'Research' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'AI/ML ENGINEER · GENAI · BACKEND',
    heading: "Hi, I'm Nilakshi Mishra.",
    description:
      'AI/ML Engineer building production-ready AI applications with LLMs, RAG, AI Agents, FastAPI, Redis, databases, and AWS.',
    supporting:
      'I build intelligent applications and backend systems that connect AI capabilities with real-world business workflows.',
    // Kept for resume generation and any leftover references.
    greetingLead: "Hi, I'm",
    greetingName: 'Nilakshi Mishra',
    greeting: "Hi, I'm Nilakshi Mishra.",
    headline: 'AI/ML Engineer',
    rotatingTitles: [
      'AI/ML Engineer',
      'RAG & LLM systems',
      'AI Agents · FastAPI · AWS',
    ],
    subtitle:
      'AI/ML Engineer building production-ready AI applications with LLMs, RAG, AI Agents, FastAPI, Redis, databases, and AWS.',
  },
  about: {
    eyebrow: 'About',
    title: 'Engineering AI Systems That Solve Real Problems',
    paragraphs: [
      "I'm an AI/ML Engineer focused on building practical AI systems that move beyond prototypes into real-world applications.",
      'I work across the AI and backend stack — from LLM-powered applications, RAG pipelines, and AI agents to FastAPI services, event-driven architectures, databases, and cloud deployments.',
      'My experience includes building AI chatbots with tool calling, developing Redis-based event processing systems, working with PostgreSQL and MongoDB, and deploying containerized applications on AWS.',
      'I enjoy solving engineering problems where AI, backend development, automation, and cloud infrastructure come together to create reliable and scalable products.',
    ],
    focus: [
      {
        label: 'Generative AI',
        detail: 'LLMs · RAG · Agents · Tool Calling',
      },
      {
        label: 'Backend Engineering',
        detail: 'Python · FastAPI · Redis · REST APIs',
      },
      {
        label: 'Cloud & Deployment',
        detail: 'AWS · Docker · ECS · VPC',
      },
    ],
  },
  experience: [
    {
      role: 'Software AI/ML Engineer',
      company: 'Ommify Technologies Pvt. Ltd.',
      period: 'Jan 2025 – Present',
      location: '',
      summary:
        'Building production-oriented AI applications, backend services, automation workflows, and cloud-based systems.',
      highlights: [
        'Built an LLM-powered campaign chatbot using tool calling to automate marketing workflows through natural-language prompts.',
        'Developed RAG-based AI workflows for retrieving relevant information from private knowledge sources.',
        'Designed an event-driven architecture using MongoDB, Redis queues, and producer-consumer processing.',
        'Implemented LLM-based event classification to determine appropriate notification workflows.',
        'Developed backend services and REST APIs using Python and FastAPI.',
        'Integrated PostgreSQL, MongoDB, Redis, and external APIs into production workflows.',
        'Containerized and deployed applications on AWS ECS using EC2, VPC, ALB, Docker, private subnets, NAT Gateway, and Security Groups.',
      ],
    },
    {
      role: 'AI/ML Intern',
      company: 'CETPA Infotech Pvt. Ltd.',
      period: 'Sep 2024 – Jan 2025',
      location: '',
      summary:
        'Worked on Python, machine learning, data analysis, and AI-focused projects.',
      highlights: [
        'Performed data preprocessing, exploratory data analysis, and visualization.',
        'Built and evaluated machine learning models using Python and Scikit-learn.',
        'Worked with NumPy, Pandas, Matplotlib, and machine learning workflows.',
        'Developed foundational knowledge of machine learning, deep learning, and AI application development.',
      ],
    },
  ],
  projects: [
    {
      title: 'AI Campaign Chatbot',
      description:
        'Built an AI-powered chatbot that uses LLMs, RAG, and tool calling to automate marketing campaign workflows through natural-language instructions.',
      architecture: 'User → FastAPI → RAG → LLM → Tool Calling → Campaign Workflow',
      tags: ['Python', 'FastAPI', 'OpenAI', 'RAG', 'FAISS', 'Tool Calling'],
      github: '',
      demo: '',
    },
    {
      title: 'Event-Driven Notification Service',
      description:
        'Developed an event-driven notification system that processes application events through Redis queues and uses LLM-based classification to trigger appropriate notification workflows.',
      architecture:
        'Event → Producer → Redis Queue → Worker → LLM Classification → Notification',
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'LLM', 'Scheduler'],
      github: '',
      demo: '',
    },
    {
      title: 'Enterprise Scraper Bot Factory',
      description:
        'Designed a scalable scraping workflow using distributed Celery workers, Redis-based task processing, OpenSearch for search and indexing, and MinIO for object storage.',
      architecture: 'Scraping Jobs → Redis → Celery Workers → OpenSearch / MinIO',
      tags: ['Python', 'Celery', 'Redis', 'OpenSearch', 'MinIO'],
      github: '',
      demo: '',
    },
    {
      title: 'SEO Optimization Tool',
      description:
        'Built an AI-powered SEO optimization backend that uses LLM-based analysis and recommendations to improve content and search visibility.',
      architecture: '',
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'LLM'],
      github: '',
      demo: '',
    },
  ],
  skillsTitle: 'My Skills',
  skillsSubtitle: 'Modern applications | Modern technologies',
  skillShowcase: [
    { id: 'python', label: 'Python' },
    { id: 'fastapi', label: 'FastAPI' },
    { id: 'llm', label: 'LLM' },
    { id: 'rag', label: 'RAG' },
    { id: 'react', label: 'React' },
    { id: 'aws', label: 'AWS' },
    { id: 'docker', label: 'Docker' },
    { id: 'postman', label: 'Postman' },
  ],
  skills: [
    {
      category: 'AI / Generative AI',
      note: 'LLM systems and agent workflows',
      featured: true,
      items: [
        'LLM',
        'RAG',
        'LangChain',
        'LangGraph',
        'AI Agents',
        'Tool Calling',
        'MCP',
        'Prompt Engineering',
      ],
    },
    {
      category: 'Backend & APIs',
      note: 'Services and API tooling',
      featured: false,
      items: ['Python', 'FastAPI', 'REST APIs', 'Postman'],
    },
    {
      category: 'Frontend',
      note: 'Interfaces for AI products',
      featured: false,
      items: ['React.js', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      category: 'Databases & Storage',
      note: 'Operational data stores',
      featured: false,
      items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'MinIO'],
    },
    {
      category: 'Vector & Search',
      note: 'Retrieval and indexing',
      featured: false,
      items: ['FAISS', 'Pinecone', 'OpenSearch'],
    },
    {
      category: 'Cloud & DevOps',
      note: 'Deploy and operate on AWS',
      featured: false,
      items: ['AWS', 'EC2', 'ECS', 'VPC', 'ALB', 'Docker'],
    },
    {
      category: 'Data & Machine Learning',
      note: 'Analysis and classical ML',
      featured: false,
      items: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
    },
    {
      category: 'Developer Tools',
      note: 'Day-to-day engineering toolkit',
      featured: false,
      items: ['Git', 'GitHub', 'Bitbucket', 'VS Code', 'Jupyter'],
    },
  ],
  research: [
    {
      title:
        'Triple Band Miniaturized E-Shaped Multistrip Monopole Antenna for Multiband Wireless System',
      venue: 'ICVMWT 2024',
      publisher: 'Springer',
      summary:
        'A compact E-shaped multistrip monopole designed for triple-band wireless operation, studied for Bluetooth, WiMAX, and mobile communication.',
      tags: ['HFSS', 'Bluetooth', 'WiMAX', 'Mobile Communication'],
      url: '',
    },
  ],
  education: [
    {
      degree: 'B.Tech in Electronics and Communication Engineering',
      school: 'Dr. Ram Manohar Lohia Avadh University, Ayodhya',
      period: '2020 – 2024',
      performance: '7.89 CGPA · 75%',
      details: ['Intermediate – 77%', 'High School – 84%'],
    },
  ],
  contact: {
    eyebrow: 'Contact',
    title: "Let's Build Something Intelligent",
    note: "Have an AI project, automation idea, or backend challenge? I'd love to hear about it. Send me a message and let's connect.",
    availability: 'Open to opportunities',
    responseNote:
      'Usually replies within 24 hours. Happy to talk AI systems, backend architecture, or collaboration.',
  },
}

export default portfolio
