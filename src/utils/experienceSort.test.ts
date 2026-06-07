import { describe, expect, it } from 'vitest'
import type { ExperienceItem } from '../types/resume'
import { parseExperienceDates, sortExperienceNewestFirst } from './experienceSort'

function experience(
  id: string,
  role: string,
  dates: string,
): ExperienceItem {
  return {
    id,
    role,
    company: 'Example',
    dates,
    details: [],
  }
}

describe('sortExperienceNewestFirst', () => {
  it('puts current roles before completed roles', () => {
    const sorted = sortExperienceNewestFirst([
      experience('older', 'Older Role', '2019 - 2021'),
      experience('current', 'Current Role', '2022 - Present'),
    ])

    expect(sorted.map((item) => item.id)).toEqual(['current', 'older'])
  })

  it('sorts completed roles by latest end year', () => {
    const sorted = sortExperienceNewestFirst([
      experience('first', 'First Role', '2019 - 2020'),
      experience('latest', 'Latest Role', '2021 - 2024'),
      experience('middle', 'Middle Role', '2020 - 2022'),
    ])

    expect(sorted.map((item) => item.id)).toEqual([
      'latest',
      'middle',
      'first',
    ])
  })

  it('uses start year as a tie breaker when end years match', () => {
    const sorted = sortExperienceNewestFirst([
      experience('short', 'Short Role', '2023 - 2024'),
      experience('long', 'Long Role', '2020 - 2024'),
    ])

    expect(sorted.map((item) => item.id)).toEqual(['short', 'long'])
  })

  it('keeps unknown dates at the bottom', () => {
    const sorted = sortExperienceNewestFirst([
      experience('unknown', 'Unknown Role', 'Freelance'),
      experience('dated', 'Dated Role', '2020 - 2022'),
    ])

    expect(sorted.map((item) => item.id)).toEqual(['dated', 'unknown'])
  })

  it('does not mutate the original experience list', () => {
    const original = [
      experience('older', 'Older Role', '2018 - 2019'),
      experience('newer', 'Newer Role', '2020 - 2021'),
    ]

    sortExperienceNewestFirst(original)

    expect(original.map((item) => item.id)).toEqual(['older', 'newer'])
  })
})

describe('parseExperienceDates', () => {
  it('treats present/current/now as an active role', () => {
    expect(parseExperienceDates('2021 - Present').end).toBe(
      Number.POSITIVE_INFINITY,
    )
    expect(parseExperienceDates('2021 - Current').end).toBe(
      Number.POSITIVE_INFINITY,
    )
    expect(parseExperienceDates('2021 - Now').end).toBe(
      Number.POSITIVE_INFINITY,
    )
  })
})
