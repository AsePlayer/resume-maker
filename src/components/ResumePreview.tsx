import { useMemo } from 'react'
import type { Resume } from '../types/resume'
import { ResumeSection } from './ResumeSection'

type ResumePreviewProps = {
  resume: Resume
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  const contactLine = useMemo(
    () =>
      [resume.email, resume.phone, resume.location, resume.website]
        .filter(Boolean)
        .join(' | '),
    [resume.email, resume.location, resume.phone, resume.website],
  )

  return (
    <section className="preview-panel" aria-label="Resume preview">
      <article className="resume-page">
        <header className="resume-header">
          <h2>{resume.name}</h2>
          <p className="resume-title">{resume.title}</p>
          <p className="contact-line">{contactLine}</p>
        </header>

        <ResumeSection title="Summary" content={resume.summary} />
        <ResumeSection title="Experience" content={resume.experience} />
        <ResumeSection title="Education" content={resume.education} />
        <ResumeSection title="Skills" content={resume.skills} />
      </article>
    </section>
  )
}
