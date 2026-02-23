export const en = {
  nav: {
    brand: 'Khevavasam Artur',
    projects: 'Projects',
    education: 'Education',
    skills: 'Skills',
    cv: 'CV',
    menuLabel: 'Open menu',
    menu: 'Menu',
    close: 'Close',
  },

  home: {
    hero: {
      name: 'Khevavasam Artur',
      subtitle: 'Frontend React Developer. Modern UX, clean architecture, measurable performance.',
      avatarLabel: 'Avatar',
    },
    stats: {
      exp: { value: '1.5+', label: 'years of experience' },
      projects: { value: '10+', label: 'projects' },
      quality: { value: '100%', label: 'quality' },
    },
    projects: {
      title: 'Projects',
      subtitle: 'Selected work: performance-first UI, clean DX, measurable results',
    },
    footer: {
      text: (year: number) => `© ${year} Khevavasam Artur — Portfolio — Built with React`,
    },
  },

  education: {
    title: 'Education',
    subtitle: 'Academic Background and Recognized Achievements in IT',
    items: [
      {
        title: 'Bachelor of Engineering (ICT), Information and Communication Technology',
        org: 'Metropolia University of Applied Sciences',
        year: '2025',
        desc:
          'A leading university of applied sciences in the Helsinki metropolitan area. Coursework and project-based labs covered software engineering, networks, cloud fundamentals, and modern web development. Emphasis on practical collaboration with industry partners and international study environment.',
      },
      {
        title: 'Vocational Qualification in Information and Communication Technology (Software Development)',
        org: 'Luksia — Western Uusimaa Education and Training Consortium',
        year: '2023–2025',
        desc:
          'Hands-on program focused on building real products and completing internships. Core stack: React, TypeScript, and FastAPI; additional modules in version control, testing, and deployment. Completed the qualification externally via accelerated competency assessments after passing the required examinations.',
      },
    ],
  },
} as const;

export type I18n = typeof en;
