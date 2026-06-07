import { useState, type DragEvent, type ReactNode } from 'react'
import { resumeFields } from '../data/initialResume'
import type {
  EducationItem,
  ExperienceItem,
  Resume,
  ResumeTextFieldKey,
  SkillItem,
} from '../types/resume'
import { sortExperienceNewestFirst } from '../utils/experienceSort'

type EditorPanelProps = {
  resume: Resume
  onResumeChange: (resume: Resume) => void
  onFieldChange: (key: ResumeTextFieldKey, value: string) => void
  onExport: () => void
  onImport: (file: File) => void
  onPrint: () => void
  onReset: () => void
}

type DragList = 'experience' | 'education' | 'skills'

type DragData = {
  list: DragList
  index: number
}

type SummaryPart = {
  label: string
  priority?: boolean
}

export function EditorPanel({
  resume,
  onResumeChange,
  onFieldChange,
  onExport,
  onImport,
  onPrint,
  onReset,
}: EditorPanelProps) {
  const [collapsedCards, setCollapsedCards] = useState<Record<string, boolean>>(
    {},
  )

  const toggleCollapsedCard = (id: string) => {
    setCollapsedCards((current) => ({ ...current, [id]: !current[id] }))
  }

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

  const reorderExperience = (fromIndex: number, toIndex: number) => {
    onResumeChange({
      ...resume,
      experience: reorderItems(resume.experience, fromIndex, toIndex),
    })
  }

  const reorderEducation = (fromIndex: number, toIndex: number) => {
    onResumeChange({
      ...resume,
      education: reorderItems(resume.education, fromIndex, toIndex),
    })
  }

  const reorderSkills = (fromIndex: number, toIndex: number) => {
    onResumeChange({
      ...resume,
      skills: reorderItems(resume.skills, fromIndex, toIndex),
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
          <label className="file-button">
            Import
            <input
              type="file"
              accept="application/json,.json"
              onChange={(event) => {
                const [file] = Array.from(event.target.files ?? [])
                if (file) {
                  onImport(file)
                }
                event.target.value = ''
              }}
            />
          </label>
          <button type="button" className="secondary-button" onClick={onExport}>
            Export
          </button>
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
            actionLabel="Sort newest first"
            onAction={() =>
              onResumeChange({
                ...resume,
                experience: sortExperienceNewestFirst(resume.experience),
              })
            }
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
              summaryParts={[
                { label: item.role || 'No role yet' },
                { label: item.company || 'No company yet' },
                { label: item.dates || 'No dates yet', priority: true },
              ]}
              isCollapsed={Boolean(collapsedCards[item.id])}
              onToggleCollapsed={() => toggleCollapsedCard(item.id)}
              dragLabel={`${item.role || 'Experience item'} drag handle`}
              dragList="experience"
              dragIndex={index}
              onDropItem={reorderExperience}
              onRemove={() =>
                onResumeChange({
                  ...resume,
                  experience: resume.experience.filter(
                    (entry) => entry.id !== item.id,
                  ),
                })
              }
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
              summaryParts={[
                { label: item.credential || 'No credential yet' },
                { label: item.school || 'No school yet' },
              ]}
              isCollapsed={Boolean(collapsedCards[item.id])}
              onToggleCollapsed={() => toggleCollapsedCard(item.id)}
              dragLabel={`${item.credential || 'Education item'} drag handle`}
              dragList="education"
              dragIndex={index}
              onDropItem={reorderEducation}
              onRemove={() =>
                onResumeChange({
                  ...resume,
                  education: resume.education.filter(
                    (entry) => entry.id !== item.id,
                  ),
                })
              }
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
              <div
                className="skill-editor-row"
                draggable
                key={item.id}
                onDragStart={(event) => {
                  event.dataTransfer.effectAllowed = 'move'
                  setDragData(event, 'skills', index)
                }}
                onDragOver={(event) => {
                  event.preventDefault()
                  event.dataTransfer.dropEffect = 'move'
                }}
                onDrop={(event) => {
                  event.preventDefault()
                  const dragData = getDragData(event)
                  if (dragData?.list === 'skills') {
                    reorderSkills(dragData.index, index)
                  }
                }}
              >
                <span
                  className="drag-handle compact"
                  aria-label={`${item.name || 'Skill'} drag handle`}
                >
                  ::::
                </span>
                <Field
                  label={`Skill ${index + 1}`}
                  value={item.name}
                  onChange={(value) => updateSkill(item.id, { name: value })}
                />
                <div className="row-actions">
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

function GroupHeader({
  title,
  actionLabel,
  onAction,
  onAdd,
}: {
  title: string
  actionLabel?: string
  onAction?: () => void
  onAdd: () => void
}) {
  return (
    <div className="group-header">
      <h2>{title}</h2>
      <div className="group-actions">
        {actionLabel && onAction ? (
          <button
            type="button"
            className="secondary-button"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        ) : null}
        <button type="button" className="secondary-button" onClick={onAdd}>
          Add
        </button>
      </div>
    </div>
  )
}

function EditableCard({
  title,
  summaryParts,
  children,
  isCollapsed,
  onToggleCollapsed,
  dragLabel,
  dragList,
  dragIndex,
  onDropItem,
  onRemove,
}: {
  title: string
  summaryParts: SummaryPart[]
  children: ReactNode
  isCollapsed: boolean
  onToggleCollapsed: () => void
  dragLabel: string
  dragList: DragList
  dragIndex: number
  onDropItem: (fromIndex: number, toIndex: number) => void
  onRemove: () => void
}) {
  return (
    <article
      className="editable-card"
      draggable
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = 'move'
        setDragData(event, dragList, dragIndex)
      }}
      onDragOver={(event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
      }}
      onDrop={(event) => {
        event.preventDefault()
        const dragData = getDragData(event)
        if (dragData?.list === dragList) {
          onDropItem(dragData.index, dragIndex)
        }
      }}
    >
      <div className="card-header">
        <div className="card-title">
          <span className="drag-handle" aria-label={dragLabel}>
            ::::
          </span>
          <div>
            <h3>{title}</h3>
            <div className="card-summary">
              {summaryParts.map((part) => (
                <span
                  className={part.priority ? 'summary-chip priority' : 'summary-chip'}
                  key={part.label}
                >
                  {part.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="card-actions">
          <button
            type="button"
            className="icon-button"
            onClick={onToggleCollapsed}
          >
            {isCollapsed ? 'Expand' : 'Collapse'}
          </button>
          <button type="button" className="danger-button" onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
      {!isCollapsed && children}
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

function reorderItems<Item>(items: Item[], fromIndex: number, toIndex: number) {
  if (
    Number.isNaN(fromIndex) ||
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= items.length ||
    toIndex >= items.length
  ) {
    return items
  }

  const nextItems = [...items]
  const [item] = nextItems.splice(fromIndex, 1)
  nextItems.splice(toIndex, 0, item)
  return nextItems
}

function setDragData(
  event: DragEvent<HTMLElement>,
  list: DragList,
  index: number,
) {
  const dragData: DragData = { list, index }
  event.dataTransfer.setData('application/json', JSON.stringify(dragData))
}

function getDragData(event: DragEvent<HTMLElement>) {
  try {
    const dragData = JSON.parse(event.dataTransfer.getData('application/json'))
    if (
      isDragList(dragData.list) &&
      typeof dragData.index === 'number' &&
      Number.isInteger(dragData.index)
    ) {
      return dragData as DragData
    }
  } catch {
    return null
  }

  return null
}

function isDragList(value: unknown): value is DragList {
  return value === 'experience' || value === 'education' || value === 'skills'
}

function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`
}

function splitLines(value: string) {
  return value.split('\n').map((line) => line.trim())
}
