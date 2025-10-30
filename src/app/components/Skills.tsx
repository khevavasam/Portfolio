// src/app/components/Skills.tsx
type SkillCard = {
    title: string;
    note?: string;
    tags: string[];
    icon: string; // Bootstrap Icons class
};

// tag -> Bootstrap Icon
const TAG_ICONS: Record<string, string> = {
    // Frontend
    React: "bi-lightning-charge",
    "Next.js": "bi-rocket",
    TypeScript: "bi-filetype-tsx",
    JavaScript: "bi-filetype-js",
    "HTML/CSS": "bi-code-slash",
    "Tailwind CSS": "bi-wind",
    Bootstrap: "bi-bootstrap",
    SSR: "bi-server",
    i18n: "bi-translate",
    Vite: "bi-lightning",

    // Backend
    Django: "bi-filetype-py",
    Wagtail: "bi-feather",
    PHP: "bi-filetype-php",
    MySQL: "bi-database",
    PostgreSQL: "bi-database",
    "REST APIs": "bi-plug",
    "OAuth2 (Allauth)": "bi-shield-lock",

    // Other / DevOps
    "Git/GitHub": "bi-git",
    Docker: "bi-box-seam",
    Vercel: "bi-cloud-upload",
    Nginx: "bi-shield-check",
};

export default function Skills() {
    const columns: SkillCard[] = [
        {
            title: "Frontend",
            note: "UI and SSR basics",
            tags: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "HTML/CSS",
                "Tailwind CSS",
                "Bootstrap",
                "SSR",
                "i18n",
                "Vite",
            ],
            icon: "bi-braces",
        },
        {
            title: "Backend",
            note: "Servers and data",
            tags: [
                "Django",
                "Wagtail",
                "PHP",
                "MySQL",
                "PostgreSQL",
                "REST APIs",
                "OAuth2 (Allauth)",
            ],
            icon: "bi-hdd-network",
        },
        {
            title: "Other",
            note: "Dev tools & deploy",
            tags: ["Git/GitHub", "Docker", "Vercel", "Nginx"],
            icon: "bi-tools",
        },
    ];

    return (
        <section id="skills" className="container py-5 text-center">
            <span className="display-6 fw-bold text-center mb-2 text-gradient">Skills</span>
            <p className="lead text-secondary text-center mb-5">
                The technology stack and tools I use in development
            </p>

            <div className="row g-4">
                {columns.map((col) => (
                    <div key={col.title} className="col-12 col-md-6 col-xl-4">
                        <div className="card glass hover-glass border-0 shadow-sm h-100 hover-accent">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <span className="icon-bubble-lg">
                                        <i className={`bi ${col.icon}`} />
                                    </span>
                                    <h3 className="h4 mb-0">{col.title}</h3>
                                </div>

                                {col.note && <p className="text-secondary fs-6 mb-4">{col.note}</p>}

                                <div className="d-flex flex-wrap gap-2">
                                    {col.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="chip-lg text-bg-dark border border-secondary-subtle hover-accent"
                                            title={t}
                                        >
                                            {/* иконка для тэга, если есть в мапе */}
                                            {TAG_ICONS[t] && <i className={`bi ${TAG_ICONS[t]} me-1`} />}
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
