// src/app/components/Skills.tsx
type SkillCard = {
    title: string;
    note?: string;
    tags: string[];
    icon: string; // Bootstrap Icons класс для заголовка колонки
};

// мапа: тег -> класс иконки (добавляй свои по вкусу)
const TAG_ICONS: Record<string, string> = {
    React: "bi-lightning-charge",
    Next: "bi-rocket",
    Typescript: "bi-filetype-tsx",
    "Tailwind CSS": "bi-wind",
    SCSS: "bi-droplet",
    "Context API": "bi-diagram-3",
    Redux: "bi-recycle",
    "React Query": "bi-cloud-arrow-down",
    "Framer Motion": "bi-camera-video",
    Storybook: "bi-journal-richtext",

    Python: "bi-filetype-py",
    FastAPI: "bi-speedometer2",
    "Node.js": "bi-node-plus",
    Express: "bi-truck",
    "RESTful API": "bi-plugin",
    Swagger: "bi-list-check",

    "Git/GitHub/GitLab": "bi-git",
    PostgreSQL: "bi-database",
    SQLAlchemy: "bi-collection",
    Redis: "bi-memory",
    Docker: "bi-box-seam",
    Nginx: "bi-shield-lock",
    S3: "bi-cloud",
    Web3: "bi-currency-bitcoin",
    Figma: "bi-palette",
};

export default function Skills() {
    const columns: SkillCard[] = [
        {
            title: "Frontend",
            note: "Modern technologies for creating user interfaces",
            tags: [
                "React",
                "Next",
                "Typescript",
                "Tailwind CSS",
                "SCSS",
                "Context API",
                "Redux",
                "React Query",
                "Framer Motion",
                "Storybook",
            ],
            icon: "bi-braces",
        },
        {
            title: "Backend",
            note: "Server technologies and API development",
            tags: ["Python", "FastAPI", "Node.js", "Express", "RESTful API", "Swagger"],
            icon: "bi-hdd-network",
        },
        {
            title: "Other",
            note: "Development tools and DevOps",
            tags: [
                "Git/GitHub/GitLab",
                "PostgreSQL",
                "SQLAlchemy",
                "Redis",
                "Docker",
                "Nginx",
                "S3",
                "Web3",
                "Figma",
            ],
            icon: "bi-tools",
        },
    ];

    return (
        <section id="skills" className="container py-5">
            <h2 className="display-6 fw-bold text-center mb-2 text-gradient">Skills</h2>
            <p className="lead text-secondary text-center mb-5">
                The technology stack and tools I use in development
            </p>

            <div className="row g-4">
                {columns.map((col) => (
                    <div key={col.title} className="col-12 col-md-6 col-xl-4">
                        <div className="card glass hover-glass border-0 shadow-sm h-100">
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
                                            className="chip-lg text-bg-dark border border-secondary-subtle"
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
