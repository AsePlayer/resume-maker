import { EditorPanel } from '../components/EditorPanel'
import { ResumePreview } from '../components/ResumePreview'
import { useResumeAutosave } from '../hooks/useResumeAutosave'
import type { Resume } from '../types/resume'
import './App.css'

function App() {
  const { resume, setResume, resetResume } = useResumeAutosave()

  const updateField = (key: keyof Resume, value: string) => {
    setResume((current) => ({ ...current, [key]: value }))
  }

  return (
    <main className="app-shell">
      <EditorPanel
        resume={resume}
        onFieldChange={updateField}
        onPrint={() => window.print()}
        onReset={resetResume}
      />
      <ResumePreview resume={resume} />
    </main>
  )
}

export default App
