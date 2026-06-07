import { resumeFields } from '../data/initialResume'
import type { Resume } from '../types/resume'

type EditorPanelProps = {
  resume: Resume
  onFieldChange: (key: keyof Resume, value: string) => void
  onPrint: () => void
  onReset: () => void
}

export function EditorPanel({
  resume,
  onFieldChange,
  onPrint,
  onReset,
}: EditorPanelProps) {
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
                rows={field.key === 'experience' ? 9 : 4}
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
  )
}
