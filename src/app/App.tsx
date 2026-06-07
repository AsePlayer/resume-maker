import { useState } from 'react'
import { EditorPanel } from '../components/EditorPanel'
import { ResumePreview } from '../components/ResumePreview'
import { initialResume } from '../data/initialResume'
import type { Resume } from '../types/resume'
import './App.css'

function App() {
  const [resume, setResume] = useState<Resume>(initialResume)

  const updateField = (key: keyof Resume, value: string) => {
    setResume((current) => ({ ...current, [key]: value }))
  }

  return (
    <main className="app-shell">
      <EditorPanel
        resume={resume}
        onFieldChange={updateField}
        onPrint={() => window.print()}
      />
      <ResumePreview resume={resume} />
    </main>
  )
}

export default App
