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
  experience:
    'Software Developer - Example Studio\n2023 - Present\n- Built internal tools with React, Python, and SQL\n- Improved reporting workflows and reduced manual data cleanup\n- Collaborated with artists, designers, and engineering leads\n\nGameplay Programmer - Indie Project\n2021 - 2023\n- Prototyped Unity systems in C#\n- Tuned gameplay feel through rapid iteration\n- Maintained build scripts and project documentation',
  education:
    'B.S. Computer Science - Example University\nRelevant work: databases, algorithms, software engineering',
  skills:
    'C++, C#, Python, SQL, TypeScript, React, Unity, debugging, data modeling, Git',
}

export const resumeFields: ResumeField[] = [
  { key: 'name', label: 'Name' },
  { key: 'title', label: 'Title' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'location', label: 'Location' },
  { key: 'website', label: 'Website' },
  { key: 'summary', label: 'Summary', type: 'textarea' },
  { key: 'experience', label: 'Experience', type: 'textarea' },
  { key: 'education', label: 'Education', type: 'textarea' },
  { key: 'skills', label: 'Skills', type: 'textarea' },
]
