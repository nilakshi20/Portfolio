export type SocialLinks = {
  github: string
  linkedin: string
}

export type NavItem = {
  id: string
  label: string
}

export type AboutFocus = {
  label: string
  detail: string
}

export type ExperienceItem = {
  role: string
  company: string
  period: string
  location: string
  summary: string
  highlights: string[]
}

export type ProjectItem = {
  title: string
  description: string
  architecture: string
  tags: string[]
  github: string
  demo: string
}

export type SkillShowcaseItem = {
  id: string
  label: string
}

export type SkillGroup = {
  category: string
  note: string
  featured: boolean
  items: string[]
}

export type ResearchItem = {
  title: string
  venue: string
  publisher: string
  summary: string
  tags: string[]
  url: string
}

export type EducationItem = {
  degree: string
  school: string
  period: string
  performance: string
  details: string[]
}

export type Portfolio = {
  name: string
  shortName: string
  title: string
  email: string
  phone: string
  resumeVersion: string
  resumeUrl: string
  resumeFileName: string
  profileImage: string
  socials: SocialLinks
  nav: NavItem[]
  hero: {
    eyebrow: string
    heading: string
    description: string
    supporting: string
    greetingLead: string
    greetingName: string
    greeting: string
    headline: string
    rotatingTitles: string[]
    subtitle: string
  }
  about: {
    eyebrow: string
    title: string
    paragraphs: string[]
    focus: AboutFocus[]
  }
  experience: ExperienceItem[]
  projects: ProjectItem[]
  skillsTitle: string
  skillsSubtitle: string
  skillShowcase: SkillShowcaseItem[]
  skills: SkillGroup[]
  research: ResearchItem[]
  education: EducationItem[]
  contact: {
    eyebrow: string
    title: string
    note: string
    availability: string
    responseNote: string
  }
}

export const portfolio: Portfolio
export default portfolio
