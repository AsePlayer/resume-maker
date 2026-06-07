import { useMemo, useState } from 'react'
import './App.css'

type Resume = {
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

const initialResume: Resume = {
  name: 'Alex Morgan',
  title: 'Software Developer',
  email: 'alex@example.com',
  phone: '(555) 123-4567',
  location: 'Los Angeles, CA',
  website: 'github.com/alexmorgan',
  summary:
    'Practical software developer with experience building reliable tools, debugging complex systems, and turning ambiguous requirements into useful products.',
  experience:
    'Software Developer - Example Studio\n2023 - Present\n- Built internal tools with React, Python, and SQL\n- Improved reporting workflows and reduced manual data cleanup\n- Collaborated with artists, designers, and engineering leads\n\nGameplay Programmer - Indie Project\n2021 - 2023\n- Prototyped Unity systems in C#\n- Tuned gameplay feel through rapid iteration\n- Maintained build scripts and project documentation',
  education:
    'B.S. Computer Science - Example University\nRelevant work: databases, algorithms, software engineering',
  skills:
    'C++, C#, Python, SQL, TypeScript, React, Unity, debugging, data modeling, Git',
}

const fields: Array<{
  key: keyof Resume
  label: string
  type?: 'input' | 'textarea'
}> = [
  { key: 'name', label: 'Name' },
  { key: 'title', label: 'Title' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'location', label: 'Location' },
  { key: 'website', label: 'Website' },
  { key: 'summary', label: 'Summary', type: 'textarea' },
  { key: 'experience', label: 'Experience', type: 'textarea' },
  { key: 'education', label: 'Education', type: 'textarea' },
  { key: 'skills', label: 'Skills', type: 'textarea' },
]

function App() {
  const [resume, setResume] = useState<Resume>(initialResume)

  const contactLine = useMemo(
    () =>
      [resume.email, resume.phone, resume.location, resume.website]
        .filter(Boolean)
        .join(' | '),
    [resume.email, resume.location, resume.phone, resume.website],
  )

  const updateField = (key: keyof Resume, value: string) => {
    setResume((current) => ({ ...current, [key]: value }))
  }

  return (
    <main className="app-shell">
      <section className="editor-panel" aria-label="Resume editor">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Resume Maker</p>
            <h1>Build a clean first draft</h1>
          </div>
          <button type="button" onClick={() => window.print()}>
            Print / PDF
          </button>
        </div>

        <div className="field-grid">
          {fields.map((field) => (
            <label
              className={field.type === 'textarea' ? 'field wide' : 'field'}
              key={field.key}
            >
              <span>{field.label}</span>
              {field.type === 'textarea' ? (
                <textarea
                  value={resume[field.key]}
                  onChange={(event) =>
                    updateField(field.key, event.target.value)
                  }
                  rows={field.key === 'experience' ? 9 : 4}
                />
              ) : (
                <input
                  value={resume[field.key]}
                  onChange={(event) =>
                    updateField(field.key, event.target.value)
                  }
                />
              )}
            </label>
          ))}
        </div>
      </section>

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
    </main>
  )
}

function ResumeSection({ title, content }: { title: string; content: string }) {
  return (
    <section className="resume-section">
      <h3>{title}</h3>
      {content.split('\n').map((line, index) => (
        <p className={line.startsWith('-') ? 'bullet-line' : ''} key={index}>
          {line || '\u00a0'}
        </p>
      ))}
    </section>
  )
}

export default App
