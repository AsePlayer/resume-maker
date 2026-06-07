import type { ReactNode } from 'react'
import { resumeFields } from '../data/initialResume'
import type {
  EducationItem,
  ExperienceItem,
  Resume,
  ResumeTextFieldKey,
  SkillItem,
} from '../types/resume'

type EditorPanelProps = {
  resume: Resume
  onResumeChange: (resume: Resume) => void
  onFieldChange: (key: ResumeTextFieldKey, value: string) => void
  onPrint: () => void
  onReset: () => void
}

export function EditorPanel({
  resume,
  onResumeChange,
  onFieldChange,
  onPrint,
  onReset,
}: EditorPanelProps) {
  const updateExperience = (
    id: string,
    updates: Partial<Omit<ExperienceItem, 'id'>>,
  ) => {
    onResumeChange({
      ...resume,
      experience: resume.experience.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    })
  }

  const updateEducation = (
    id: string,
    updates: Partial<Omit<EducationItem, 'id'>>,
  ) => {
    onResumeChange({
      ...resume,
      education: resume.education.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    })
  }

  const updateSkill = (id: string, updates: Partial<Omit<SkillItem, 'id'>>) => {
    onResumeChange({
      ...resume,
      skills: resume.skills.map((item) =>
        item.id === id ? { ...item, ...updates } : item,
      ),
    })
  }

  return (
    <section className="editor-panel" aria-label="Resume editor">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Resume Maker</p>
          <h1>Build a clean first draft</h1>
        </div>
        <div className="panel-actions">
          <button type="button" className="secondary-button" onClick={onReset}>
            Reset
          </button>
          <button type="button" onClick={onPrint}>
            Print / PDF
          </button>
        </div>
      </div>

      <div className="editor-stack">
        <section className="editor-group">
          <h2>Basics</h2>
          <div className="field-grid">
            {resumeFields.map((field) => (
              <label
                className={field.type === 'textarea' ? 'field wide' : 'field'}
                key={field.key}
              >
                <span>{field.label}</span>
                {field.type === 'textarea' ? (
                  <textarea
                    value={resume[field.key]}
                    onChange={(event) =>
                      onFieldChange(field.key, event.target.value)
                    }
                    rows={4}
                  />
                ) : (
                  <input
                    value={resume[field.key]}
                    onChange={(event) =>
                      onFieldChange(field.key, event.target.value)
                    }
                  />
                )}
              </label>
            ))}
          </div>
        </section>

        <section className="editor-group">
          <GroupHeader
            title="Experience"
            onAdd={() =>
              onResumeChange({
                ...resume,
                experience: [
                  ...resume.experience,
                  {
                    id: createId('experience'),
                    role: '',
                    company: '',
                    dates: '',
                    details: [''],
                  },
                ],
              })
            }
          />
          {resume.experience.map((item, index) => (
            <EditableCard
              key={item.id}
              title={`Experience ${index + 1}`}
              onMoveUp={() =>
                onResumeChange({
                  ...resume,
                  experience: moveItem(resume.experience, index, -1),
                })
              }
              onMoveDown={() =>
                onResumeChange({
                  ...resume,
                  experience: moveItem(resume.experience, index, 1),
                })
              }
              onRemove={() =>
                onResumeChange({
                  ...resume,
                  experience: resume.experience.filter(
                    (entry) => entry.id !== item.id,
                  ),
                })
              }
              disableMoveUp={index === 0}
              disableMoveDown={index === resume.experience.length - 1}
            >
              <div className="field-grid">
                <Field
                  label="Role"
                  value={item.role}
                  onChange={(value) => updateExperience(item.id, { role: value })}
                />
                <Field
                  label="Company"
                  value={item.company}
                  onChange={(value) =>
                    updateExperience(item.id, { company: value })
                  }
                />
                <Field
                  label="Dates"
                  value={item.dates}
                  onChange={(value) =>
                    updateExperience(item.id, { dates: value })
                  }
                />
                <Field
                  label="Details"
                  value={item.details.join('\n')}
                  onChange={(value) =>
                    updateExperience(item.id, {
                      details: splitLines(value),
                    })
                  }
                  multiline
                />
              </div>
            </EditableCard>
          ))}
        </section>

        <section className="editor-group">
          <GroupHeader
            title="Education"
            onAdd={() =>
              onResumeChange({
                ...resume,
                education: [
                  ...resume.education,
                  {
                    id: createId('education'),
                    school: '',
                    credential: '',
                    details: [''],
                  },
                ],
              })
            }
          />
          {resume.education.map((item, index) => (
            <EditableCard
              key={item.id}
              title={`Education ${index + 1}`}
              onMoveUp={() =>
                onResumeChange({
                  ...resume,
                  education: moveItem(resume.education, index, -1),
                })
              }
              onMoveDown={() =>
                onResumeChange({
                  ...resume,
                  education: moveItem(resume.education, index, 1),
                })
              }
              onRemove={() =>
                onResumeChange({
                  ...resume,
                  education: resume.education.filter(
                    (entry) => entry.id !== item.id,
                  ),
                })
              }
              disableMoveUp={index === 0}
              disableMoveDown={index === resume.education.length - 1}
            >
              <div className="field-grid">
                <Field
                  label="School"
                  value={item.school}
                  onChange={(value) =>
                    updateEducation(item.id, { school: value })
                  }
                />
                <Field
                  label="Credential"
                  value={item.credential}
                  onChange={(value) =>
                    updateEducation(item.id, { credential: value })
                  }
                />
                <Field
                  label="Details"
                  value={item.details.join('\n')}
                  onChange={(value) =>
                    updateEducation(item.id, {
                      details: splitLines(value),
                    })
                  }
                  multiline
                />
              </div>
            </EditableCard>
          ))}
        </section>

        <section className="editor-group">
          <GroupHeader
            title="Skills"
            onAdd={() =>
              onResumeChange({
                ...resume,
                skills: [...resume.skills, { id: createId('skill'), name: '' }],
              })
            }
          />
          <div className="skill-list">
            {resume.skills.map((item, index) => (
              <div className="skill-editor-row" key={item.id}>
                <Field
                  label={`Skill ${index + 1}`}
                  value={item.name}
                  onChange={(value) => updateSkill(item.id, { name: value })}
                />
                <div className="row-actions">
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() =>
                      onResumeChange({
                        ...resume,
                        skills: moveItem(resume.skills, index, -1),
                      })
                    }
                    disabled={index === 0}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() =>
                      onResumeChange({
                        ...resume,
                        skills: moveItem(resume.skills, index, 1),
                      })
                    }
                    disabled={index === resume.skills.length - 1}
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    className="danger-button"
                    onClick={() =>
                      onResumeChange({
                        ...resume,
                        skills: resume.skills.filter(
                          (skill) => skill.id !== item.id,
                        ),
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

function GroupHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="group-header">
      <h2>{title}</h2>
      <button type="button" className="secondary-button" onClick={onAdd}>
        Add
      </button>
    </div>
  )
}

function EditableCard({
  title,
  children,
  onMoveUp,
  onMoveDown,
  onRemove,
  disableMoveUp,
  disableMoveDown,
}: {
  title: string
  children: ReactNode
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
  disableMoveUp: boolean
  disableMoveDown: boolean
}) {
  return (
    <article className="editable-card">
      <div className="card-header">
        <h3>{title}</h3>
        <div className="row-actions">
          <button
            type="button"
            className="icon-button"
            onClick={onMoveUp}
            disabled={disableMoveUp}
          >
            Up
          </button>
          <button
            type="button"
            className="icon-button"
            onClick={onMoveDown}
            disabled={disableMoveDown}
          >
            Down
          </button>
          <button type="button" className="danger-button" onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
      {children}
    </article>
  )
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
}) {
  return (
    <label className={multiline ? 'field wide' : 'field'}>
      <span>{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
        />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  )
}

function moveItem<Item>(items: Item[], currentIndex: number, direction: -1 | 1) {
  const nextIndex = currentIndex + direction

  if (nextIndex < 0 || nextIndex >= items.length) {
    return items
  }

  const nextItems = [...items]
  const [item] = nextItems.splice(currentIndex, 1)
  nextItems.splice(nextIndex, 0, item)
  return nextItems
}

function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`
}

function splitLines(value: string) {
  return value.split('\n').map((line) => line.trim())
}
