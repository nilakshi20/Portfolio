export const portfolio = {
  name: 'Nilakshi Mishra',
  shortName: 'NM',
  title: 'AI/ML Engineer',
  email: 'nilakshimishra7@gmail.com',
  phone: '9569233645',
  resumeUrl: '/resume.pdf',
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
  topbar: {
    status: 'Open to AI/ML roles',
    note: 'LLMs · RAG · Agents · FastAPI · AWS',
  },
  hero: {
    greetingLead: "Hi, I'm",
    greetingName: 'Nilakshi Mishra',
    greeting: "Hi, I'm Nilakshi Mishra",
    headline: 'AI/ML Engineer',
    rotatingTitles: [
      'AI/ML Engineer',
      'RAG & LLM systems',
      'AI Agents · FastAPI · AWS',
    ],
    subtitle:
      'Building AI-powered applications with LLMs, RAG, AI Agents, FastAPI and AWS.',
  },
  about: {
    eyebrow: 'About',
    title: 'Engineering reliable AI systems',
    paragraphs: [
      'I am an AI/ML Engineer focused on turning language models into products people can actually use. My work sits at the intersection of retrieval, agents, and backend systems — designing LLM applications that reason over real data and run as dependable services.',
      'I build with Python and FastAPI, retrieve with RAG and vector search, and orchestrate agents with tool calling. I care about clean interfaces, grounded responses, and shipping systems that hold up beyond a demo.',
    ],
    focus: [
      { label: 'LLMs & RAG', detail: 'Grounded generation over private knowledge' },
      { label: 'AI Agents', detail: 'Tool calling, workflows, and MCP' },
      { label: 'Backend APIs', detail: 'FastAPI services ready for production' },
      { label: 'Cloud delivery', detail: 'AWS, Docker, and operational hygiene' },
    ],
  },
  experience: [
    {
      role: 'Software AI/ML Engineer',
      company: 'Ommify Technologies Pvt. Ltd.',
      period: 'Jan 2025 – Present',
      location: '',
      summary:
        'Designing and shipping AI-powered applications — LLM products, retrieval pipelines, and FastAPI services on AWS.',
      highlights: [
        'Building LLM applications with RAG, agents, and tool calling.',
        'Developing FastAPI backends that connect models to real product workflows.',
        'Deploying and operating services on AWS with an eye for reliability.',
      ],
    },
    {
      role: 'AI Intern',
      company: 'CETPA Infotech Pvt. Ltd.',
      period: 'Sep 2024 – Jan 2025',
      location: '',
      summary:
        'Applied machine learning and Python to practical problems, building a foundation in model-driven features and AI application engineering.',
      highlights: [
        'Worked on applied AI/ML tasks and Python-based development.',
        'Explored how models move from notebooks into usable application flows.',
      ],
    },
  ],
  projects: [
    {
      title: 'AI Campaign Chatbot',
      description:
        'A campaign assistant that answers from retrieved knowledge instead of guessing. FastAPI serves the conversation layer; OpenAI handles generation; FAISS keeps campaign context close to the query.',
      tags: ['Python', 'FastAPI', 'OpenAI', 'RAG', 'FAISS'],
      github: '',
      demo: '',
    },
    {
      title: 'Event-Driven Notification Service',
      description:
        'A notification backend that reacts to system events, persists delivery state in PostgreSQL, and uses Redis to coordinate fast, reliable fan-out.',
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      github: '',
      demo: '',
    },
    {
      title: 'Enterprise Scraper Bot Factory',
      description:
        'A distributed scraping platform: Celery workers pull jobs from Redis, results are indexed in OpenSearch, and artifacts land in MinIO for later use.',
      tags: ['Python', 'Celery', 'Redis', 'OpenSearch', 'MinIO'],
      github: '',
      demo: '',
    },
    {
      title: 'SEO Optimization Tool',
      description:
        'An SEO analysis service that uses LLMs for recommendations, FastAPI for the API layer, and PostgreSQL to store site and keyword data.',
      tags: ['Python', 'FastAPI', 'PostgreSQL', 'AI/LLM'],
      github: '',
      demo: '',
    },
  ],
  skills: [
    {
      category: 'Languages',
      items: ['Python', 'JavaScript', 'C'],
    },
    {
      category: 'Frontend',
      items: ['React.js'],
    },
    {
      category: 'AI & Systems',
      items: [
        'FastAPI',
        'LLM',
        'RAG',
        'LangChain',
        'LangGraph',
        'AI Agents',
        'Tool Calling',
        'MCP',
      ],
    },
    {
      category: 'Data & Retrieval',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Pinecone', 'FAISS'],
    },
    {
      category: 'Cloud & Tools',
      items: ['AWS', 'Docker', 'Git'],
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
      degree: 'B.Tech Electronics & Communication Engineering',
      school: 'Dr. Ram Manohar Lohia Awadh University',
      period: '2020 – 2024',
    },
  ],
  contact: {
    eyebrow: 'Contact',
    title: 'Let’s build something precise',
    note: 'For roles, collaborations, or a conversation about applied AI — write to me directly or use the form. Backend delivery will be connected next.',
  },
}

export default portfolio
