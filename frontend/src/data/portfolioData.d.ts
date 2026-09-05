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
  tags: string[]
  github: string
  demo: string
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
}

export type Portfolio = {
  name: string
  shortName: string
  title: string
  email: string
  phone: string
  resumeUrl: string
  resumeFileName: string
  socials: SocialLinks
  nav: NavItem[]
  topbar: {
    status: string
    note: string
  }
  hero: {
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
  skills: SkillGroup[]
  research: ResearchItem[]
  education: EducationItem[]
  contact: {
    eyebrow: string
    title: string
    note: string
  }
}

export const portfolio: Portfolio
export default portfolio
