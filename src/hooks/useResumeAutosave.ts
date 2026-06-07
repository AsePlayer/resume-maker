import { useEffect, useState } from 'react'
import { initialResume } from '../data/initialResume'
import type { Resume } from '../types/resume'
import { parseResumeJson } from '../utils/resumeData'

const STORAGE_KEY = 'resume-maker.resume'

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
    const parsedResume = parseResumeJson(savedResume)
    if (parsedResume) {
      return parsedResume
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }

  return initialResume
}
