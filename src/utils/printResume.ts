import type { Resume } from '../types/resume'

export function printResume(resume: Resume) {
  const printWindow = window.open('', '_blank', 'noopener,noreferrer')

  if (!printWindow) {
    window.print()
    return
  }

  printWindow.document.write(createPrintableResumeHtml(resume))
  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
}

function createPrintableResumeHtml(resume: Resume) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(resume.name || 'Resume')}</title>
    <style>
      @page {
        margin: 0.55in;
      }

      body {
        color: #1f2933;
        font-family: "Segoe UI", Arial, sans-serif;
        font-size: 12px;
        line-height: 1.4;
        margin: 0;
      }

      header {
        border-bottom: 2px solid #15181f;
        margin-bottom: 24px;
        padding-bottom: 18px;
      }

      h1 {
        color: #15181f;
        font-size: 34px;
        line-height: 1.05;
        margin: 0 0 6px;
      }

      h2 {
        color: #15181f;
        font-size: 13px;
        margin: 26px 0 8px;
        text-transform: uppercase;
      }

      p {
        margin: 0 0 7px;
      }

      ul {
        margin: 8px 0 0;
        padding-left: 19px;
      }

      li {
        margin-bottom: 4px;
      }

      .title {
        color: #1f6f68;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 10px;
      }

      .contact {
        color: #4d5968;
        font-size: 12px;
      }

      .entry {
        break-inside: avoid;
        margin-bottom: 18px;
      }

      .entry-heading {
        display: flex;
        gap: 16px;
        justify-content: space-between;
      }

      .entry-heading strong {
        color: #15181f;
      }

      .entry-heading span {
        color: #4d5968;
        white-space: nowrap;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>${escapeHtml(resume.name)}</h1>
      <p class="title">${escapeHtml(resume.title)}</p>
      <p class="contact">${escapeHtml(
        [resume.email, resume.phone, resume.location, resume.website]
          .filter(Boolean)
          .join(' | '),
      )}</p>
    </header>

    <section>
      <h2>Summary</h2>
      <p>${escapeHtml(resume.summary)}</p>
    </section>

    <section>
      <h2>Experience</h2>
      ${resume.experience
        .map(
          (item) => `<div class="entry">
        <div class="entry-heading">
          <strong>${escapeHtml(
            [item.role, item.company].filter(Boolean).join(' - '),
          )}</strong>
          <span>${escapeHtml(item.dates)}</span>
        </div>
        ${renderDetails(item.details)}
      </div>`,
        )
        .join('')}
    </section>

    <section>
      <h2>Education</h2>
      ${resume.education
        .map(
          (item) => `<div class="entry">
        <div class="entry-heading">
          <strong>${escapeHtml(
            [item.credential, item.school].filter(Boolean).join(' - '),
          )}</strong>
        </div>
        ${renderDetails(item.details)}
      </div>`,
        )
        .join('')}
    </section>

    <section>
      <h2>Skills</h2>
      <p>${escapeHtml(
        resume.skills
          .map((skill) => skill.name.trim())
          .filter(Boolean)
          .join(', '),
      )}</p>
    </section>
  </body>
</html>`
}

function renderDetails(details: string[]) {
  const visibleDetails = details.filter((detail) => detail.trim())

  if (visibleDetails.length === 0) {
    return ''
  }

  return `<ul>${visibleDetails
    .map((detail) => `<li>${escapeHtml(detail)}</li>`)
    .join('')}</ul>`
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    }

    return entities[character]
  })
}
