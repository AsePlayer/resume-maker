import { useMemo } from 'react'
import type { Resume } from '../types/resume'

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

        <section className="resume-section">
          <h3>Summary</h3>
          <p>{resume.summary}</p>
        </section>

        <section className="resume-section">
          <h3>Experience</h3>
          {resume.experience.map((item) => (
            <div className="resume-entry" key={item.id}>
              <div className="entry-heading">
                <strong>
                  {[item.role, item.company].filter(Boolean).join(' - ')}
                </strong>
                <span>{item.dates}</span>
              </div>
              <ul>
                {item.details
                  .filter((detail) => detail.trim())
                  .map((detail, index) => (
                    <li key={`${item.id}-${index}`}>{detail}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h3>Education</h3>
          {resume.education.map((item) => (
            <div className="resume-entry" key={item.id}>
              <div className="entry-heading">
                <strong>
                  {[item.credential, item.school].filter(Boolean).join(' - ')}
                </strong>
              </div>
              <ul>
                {item.details
                  .filter((detail) => detail.trim())
                  .map((detail, index) => (
                    <li key={`${item.id}-${index}`}>{detail}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="resume-section">
          <h3>Skills</h3>
          <p>
            {resume.skills
              .map((skill) => skill.name.trim())
              .filter(Boolean)
              .join(', ')}
          </p>
        </section>
      </article>
    </section>
  )
}
