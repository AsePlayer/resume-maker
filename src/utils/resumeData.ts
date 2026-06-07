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

  return null
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
