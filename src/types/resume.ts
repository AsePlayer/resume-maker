export type Resume = {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
  experience: string
  education: string
  skills: string
}

export type ResumeField = {
  key: keyof Resume
  label: string
  type?: 'input' | 'textarea'
}
