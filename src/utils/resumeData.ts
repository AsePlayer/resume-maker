import { initialResume } from '../data/initialResume'
import type { EducationItem, ExperienceItem, Resume, SkillItem } from '../types/resume'

const textKeys = [
  'name',
  'title',
  'email',
  'phone',
  'location',
  'website',
  'summary',
] as const

export function parseResumeData(value: unknown): Resume | null {
  if (isResume(value)) {
    return value
  }

  return migrateLegacyResume(value)
}

export function parseResumeJson(json: string): Resume | null {
  try {
    return parseResumeData(JSON.parse(json))
  } catch {
    return null
  }
}

export function serializeResume(resume: Resume) {
  return JSON.stringify(resume, null, 2)
}

function isResume(value: unknown): value is Resume {
  if (!value || typeof value !== 'object') {
    return false
  }

  const resume = value as Record<keyof Resume, unknown>
  return (
    textKeys.every((key) => typeof resume[key] === 'string') &&
    Array.isArray(resume.experience) &&
    resume.experience.every(isExperienceItem) &&
    Array.isArray(resume.education) &&
    resume.education.every(isEducationItem) &&
    Array.isArray(resume.skills) &&
    resume.skills.every(isSkillItem)
  )
}

function isExperienceItem(value: unknown): value is ExperienceItem {
  if (!value || typeof value !== 'object') {
    return false
  }

  const item = value as Record<keyof ExperienceItem, unknown>
  return (
    typeof item.id === 'string' &&
    typeof item.role === 'string' &&
    typeof item.company === 'string' &&
    typeof item.dates === 'string' &&
    Array.isArray(item.details) &&
    item.details.every((detail) => typeof detail === 'string')
  )
}

function isEducationItem(value: unknown): value is EducationItem {
  if (!value || typeof value !== 'object') {
    return false
  }

  const item = value as Record<keyof EducationItem, unknown>
  return (
    typeof item.id === 'string' &&
    typeof item.school === 'string' &&
    typeof item.credential === 'string' &&
    Array.isArray(item.details) &&
    item.details.every((detail) => typeof detail === 'string')
  )
}

function isSkillItem(value: unknown): value is SkillItem {
  if (!value || typeof value !== 'object') {
    return false
  }

  const item = value as Record<keyof SkillItem, unknown>
  return typeof item.id === 'string' && typeof item.name === 'string'
}

function migrateLegacyResume(value: unknown): Resume | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const legacyResume = value as Record<string, unknown>

  if (!textKeys.every((key) => typeof legacyResume[key] === 'string')) {
    return null
  }

  return {
    name: getLegacyText(legacyResume, 'name'),
    title: getLegacyText(legacyResume, 'title'),
    email: getLegacyText(legacyResume, 'email'),
    phone: getLegacyText(legacyResume, 'phone'),
    location: getLegacyText(legacyResume, 'location'),
    website: getLegacyText(legacyResume, 'website'),
    summary: getLegacyText(legacyResume, 'summary'),
    experience:
      typeof legacyResume.experience === 'string'
        ? parseLegacyExperience(legacyResume.experience)
        : initialResume.experience,
    education:
      typeof legacyResume.education === 'string'
        ? parseLegacyEducation(legacyResume.education)
        : initialResume.education,
    skills:
      typeof legacyResume.skills === 'string'
        ? legacyResume.skills
            .split(',')
            .map((skill) => skill.trim())
            .filter(Boolean)
            .map((name, index) => ({ id: `skill-${index + 1}`, name }))
        : initialResume.skills,
  }
}

function getLegacyText(value: Record<string, unknown>, key: string) {
  const text = value[key]
  return typeof text === 'string' ? text : ''
}

function parseLegacyExperience(experience: string): ExperienceItem[] {
  return experience
    .split('\n\n')
    .map((entry, index) => {
      const [heading = '', dates = '', ...details] = entry.split('\n')
      const [role = heading, company = ''] = heading.split(' - ')

      return {
        id: `experience-${index + 1}`,
        role,
        company,
        dates,
        details: details.map((detail) => detail.replace(/^- /, '')),
      }
    })
    .filter((entry) => entry.role || entry.company || entry.dates)
}

function parseLegacyEducation(education: string): EducationItem[] {
  const [heading = '', ...details] = education.split('\n')
  const [credential = heading, school = ''] = heading.split(' - ')

  return [
    {
      id: 'education-1',
      school,
      credential,
      details,
    },
  ]
}
