import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputDir = path.join(rootDir, 'test-output')

const scenarios = [
  {
    fileName: '01-experience-sort-newest-first.txt',
    title: 'Experience Sort - Newest First',
    description:
      'Current roles should appear first, followed by completed roles ordered by latest end year.',
    input: [
      'Contract Tools - 2020 - 2021',
      'Platform Engineer - 2023 - Present',
      'Gameplay Programmer - 2021 - 2022',
    ],
    expected: [
      'Platform Engineer - 2023 - Present',
      'Gameplay Programmer - 2021 - 2022',
      'Contract Tools - 2020 - 2021',
    ],
  },
  {
    fileName: '02-experience-sort-unknown-dates-last.txt',
    title: 'Experience Sort - Unknown Dates Last',
    description:
      'Entries without parseable years stay below dated work so unclear history does not float to the top.',
    input: [
      'Freelance Systems - Freelance',
      'Data Tools - 2019 - 2023',
      'Current Product Work - 2024 - Now',
    ],
    expected: [
      'Current Product Work - 2024 - Now',
      'Data Tools - 2019 - 2023',
      'Freelance Systems - Freelance',
    ],
  },
  {
    fileName: '03-resume-preview-readable-text.txt',
    title: 'Resume Preview - Readable Text',
    description:
      'The app preview and browser print flow render normal HTML text instead of canvas or image-only output.',
    input: [
      'Name: Alex Morgan',
      'Title: Software Developer',
      'Contact: alex@example.com | Los Angeles, CA',
    ],
    expected: [
      'Summary is rendered as paragraph text.',
      'Experience details are rendered as list item text.',
      'Skills are rendered as comma-separated text.',
    ],
  },
]

await rm(outputDir, { recursive: true, force: true })
await mkdir(outputDir, { recursive: true })

for (const scenario of scenarios) {
  await writeFile(path.join(outputDir, scenario.fileName), renderScenario(scenario))
}

await writeFile(
  path.join(outputDir, 'README.md'),
  [
    '# Test Output',
    '',
    'This folder is cleared every time `npm run test:output` starts.',
    '',
    ...scenarios.map(
      (scenario) => `- ${scenario.title}: \`${scenario.fileName}\``,
    ),
    '',
  ].join('\n'),
)

console.log(`Generated ${scenarios.length} text test outputs in ${outputDir}`)

function renderScenario(scenario) {
  return [
    scenario.title,
    '='.repeat(scenario.title.length),
    '',
    scenario.description,
    '',
    'Input order:',
    ...formatList(scenario.input),
    '',
    'Expected output:',
    ...formatList(scenario.expected),
    '',
  ].join('\n')
}

function formatList(items) {
  return items.map((item, index) => `${index + 1}. ${item}`)
}
