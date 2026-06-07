import { EditorPanel } from '../components/EditorPanel'
import { ResumePreview } from '../components/ResumePreview'
import { useResumeAutosave } from '../hooks/useResumeAutosave'
import type { ResumeTextFieldKey } from '../types/resume'
import { parseResumeJson, serializeResume } from '../utils/resumeData'
import './App.css'

function App() {
  const { resume, setResume, resetResume } = useResumeAutosave()

  const updateField = (key: ResumeTextFieldKey, value: string) => {
    setResume((current) => ({ ...current, [key]: value }))
  }

  const exportResume = () => {
    const fileName = `${slugify(resume.name) || 'resume'}.json`
    const downloadUrl = URL.createObjectURL(
      new Blob([serializeResume(resume)], { type: 'application/json' }),
    )
    const downloadLink = document.createElement('a')
    downloadLink.href = downloadUrl
    downloadLink.download = fileName
    downloadLink.click()
    URL.revokeObjectURL(downloadUrl)
  }

  const importResume = async (file: File) => {
    const importedResume = parseResumeJson(await file.text())

    if (!importedResume) {
      window.alert('That file does not look like a Resume Maker JSON file.')
      return
    }

    setResume(importedResume)
  }

  return (
    <main className="app-shell">
      <EditorPanel
        resume={resume}
        onResumeChange={setResume}
        onFieldChange={updateField}
        onExport={exportResume}
        onImport={importResume}
        onPrint={() => window.print()}
        onReset={resetResume}
      />
      <ResumePreview resume={resume} />
    </main>
  )
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default App
