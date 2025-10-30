// src/app/components/Education.tsx
export default function Education() {
    const items = [
        {
            title: "Bachelor of Engineering (ICT), Information and Communication Technology",
            org: "Metropolia University of Applied Sciences",
            year: "2025",
            desc:
                "A leading university of applied sciences in the Helsinki metropolitan area. Coursework and project-based labs covered software engineering, networks, cloud fundamentals, and modern web development. Emphasis on practical collaboration with industry partners and international study environment.",
        },
        {
            title: "Vocational Qualification in Information and Communication Technology (Software Development)",
            org: "Luksia — Western Uusimaa Education and Training Consortium",
            year: "2023–2025",
            desc:
                "Hands-on program focused on building real products and completing internships. Core stack: React, TypeScript, and FastAPI; additional modules in version control, testing, and deployment. Completed the qualification externally via accelerated competency assessments after passing the required examinations.",
        },
    ];

    return (
        <section id="education" className="container py-5 edu-theme text-center">
            <span className="display-6 fw-bold text-center mb-2 text-gradient">Education</span>
            <p className="lead text-secondary text-center mb-5">
                Academic Background and Recognized Achievements in IT
            </p>

            <div className="accordion" id="edu">
                {items.map((e, i) => (
                    <div
                        key={e.title}
                        className="accordion-item border-0 mb-3 glass hover-glass shadow-sm rounded-3 overflow-hidden"
                    >
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed py-3 px-4 bg-transparent"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#edu-${i}`}
                            >
                                <div className="w-100">
                                    <div className="d-flex align-items-start gap-3">
                                        <span className="icon-bubble-lg mt-1">
                                            <i className="bi bi-mortarboard" />
                                        </span>

                                        <div className="flex-grow-1">
                                            <div className="fw-semibold fs-5 lh-sm">{e.title}</div>

                                            <div className="d-flex flex-wrap align-items-center gap-3 mt-2">
                                                <span className="text-secondary d-inline-flex align-items-center gap-2">
                                                    <i className="bi bi-building" />
                                                    {e.org}
                                                </span>

                                                <span className="badge year-badge d-inline-flex align-items-center gap-2">
                                                    <i className="bi bi-calendar2" />
                                                    {e.year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </h2>

                        <div
                            id={`edu-${i}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#edu"
                        >
                            <div className="accordion-body p-4 border-top border-secondary-subtle">
                                <p className="mb-0">{e.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
