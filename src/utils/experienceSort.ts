import type { ExperienceItem } from '../types/resume'

export function sortExperienceNewestFirst(items: ExperienceItem[]) {
  return [...items].sort((left, right) => {
    const leftDate = parseExperienceDates(left.dates)
    const rightDate = parseExperienceDates(right.dates)

    if (leftDate.end !== rightDate.end) {
      return rightDate.end - leftDate.end
    }

    if (leftDate.start !== rightDate.start) {
      return rightDate.start - leftDate.start
    }

    return 0
  })
}

export function parseExperienceDates(value: string) {
  const normalizedValue = value.toLowerCase()
  const years = [...normalizedValue.matchAll(/\b(19|20)\d{2}\b/g)].map(
    ([year]) => Number(year),
  )
  const hasCurrentRole =
    normalizedValue.includes('present') ||
    normalizedValue.includes('current') ||
    normalizedValue.includes('now')

  if (hasCurrentRole) {
    return {
      start: years[0] ?? Number.NEGATIVE_INFINITY,
      end: Number.POSITIVE_INFINITY,
    }
  }

  if (years.length === 0) {
    return {
      start: Number.NEGATIVE_INFINITY,
      end: Number.NEGATIVE_INFINITY,
    }
  }

  return {
    start: years[0],
    end: years.at(-1) ?? years[0],
  }
}
