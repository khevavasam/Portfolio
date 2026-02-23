export const en = {
    home: {
      hero: {
        name: "Khevavasam Artur",
        subtitle: "Frontend React Developer. Modern UX, clean architecture, measurable performance.",
      },
      stats: {
        exp: { value: "1.5+", label: "years of experience" },
        projects: { value: "10+", label: "projects" },
        quality: { value: "100%", label: "quality" },
      },
      projects: {
        title: "Projects",
        subtitle: "Selected work: performance-first UI, clean DX, measurable results",
      },
      footer: {
        text: (year: number) => `© ${year} Khevavasam Artur — Portfolio — Built with React`,
      },
    },
  } as const;
  
  export type I18n = typeof en;
  