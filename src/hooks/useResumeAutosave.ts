import { useEffect, useState } from 'react'
import { initialResume } from '../data/initialResume'
import type { Resume } from '../types/resume'

const STORAGE_KEY = 'resume-maker.resume'
const resumeKeys = Object.keys(initialResume) as Array<keyof Resume>

export function useResumeAutosave() {
  const [resume, setResume] = useState<Resume>(() => loadSavedResume())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume))
  }, [resume])

  const resetResume = () => {
    setResume(initialResume)
    localStorage.removeItem(STORAGE_KEY)
  }

  return { resume, setResume, resetResume }
}

function loadSavedResume(): Resume {
  const savedResume = localStorage.getItem(STORAGE_KEY)

  if (!savedResume) {
    return initialResume
  }

  try {
    const parsedResume = JSON.parse(savedResume)

    if (isResume(parsedResume)) {
      return parsedResume
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }

  return initialResume
}

function isResume(value: unknown): value is Resume {
  if (!value || typeof value !== 'object') {
    return false
  }

  const resume = value as Record<keyof Resume, unknown>
  return resumeKeys.every((key) => typeof resume[key] === 'string')
}
