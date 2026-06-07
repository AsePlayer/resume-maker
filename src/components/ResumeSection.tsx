type ResumeSectionProps = {
  title: string
  content: string
}

export function ResumeSection({ title, content }: ResumeSectionProps) {
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
