import type { Resume, ResumeField } from '../types/resume'

export const initialResume: Resume = {
  name: 'Alex Morgan',
  title: 'Software Developer',
  email: 'alex@example.com',
  phone: '(555) 123-4567',
  location: 'Los Angeles, CA',
  website: 'github.com/alexmorgan',
  summary:
    'Practical software developer with experience building reliable tools, debugging complex systems, and turning ambiguous requirements into useful products.',
  experience: [
    {
      id: 'experience-1',
      role: 'Software Developer',
      company: 'Example Studio',
      dates: '2023 - Present',
      details: [
        'Built internal tools with React, Python, and SQL',
        'Improved reporting workflows and reduced manual data cleanup',
        'Collaborated with artists, designers, and engineering leads',
      ],
    },
    {
      id: 'experience-2',
      role: 'Gameplay Programmer',
      company: 'Indie Project',
      dates: '2021 - 2023',
      details: [
        'Prototyped Unity systems in C#',
        'Tuned gameplay feel through rapid iteration',
        'Maintained build scripts and project documentation',
      ],
    },
  ],
  education: [
    {
      id: 'education-1',
      school: 'Example University',
      credential: 'B.S. Computer Science',
      details: ['Relevant work: databases, algorithms, software engineering'],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'C++' },
    { id: 'skill-2', name: 'C#' },
    { id: 'skill-3', name: 'Python' },
    { id: 'skill-4', name: 'SQL' },
    { id: 'skill-5', name: 'TypeScript' },
    { id: 'skill-6', name: 'React' },
    { id: 'skill-7', name: 'Unity' },
    { id: 'skill-8', name: 'Git' },
  ],
}

export const resumeFields: ResumeField[] = [
  { key: 'name', label: 'Name' },
  { key: 'title', label: 'Title' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'location', label: 'Location' },
  { key: 'website', label: 'Website' },
  { key: 'summary', label: 'Summary', type: 'textarea' },
]
