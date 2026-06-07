export type Resume = {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: SkillItem[]
}

export type ExperienceItem = {
  id: string
  role: string
  company: string
  dates: string
  details: string[]
}

export type EducationItem = {
  id: string
  school: string
  credential: string
  details: string[]
}

export type SkillItem = {
  id: string
  name: string
}

export type ResumeTextFieldKey = keyof Pick<
  Resume,
  'name' | 'title' | 'email' | 'phone' | 'location' | 'website' | 'summary'
>

export type ResumeField = {
  key: ResumeTextFieldKey
  label: string
  type?: 'input' | 'textarea'
}
