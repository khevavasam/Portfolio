// src/app/components/Education.tsx
export default function Education() {
    const items = [
        {
            title:
                "Bachelor of Engineering, Information and Communication Technology",
            org: "Metropolia, University of Applied Sciences",
            year: "2025",
            desc:
                "One of the best University of Applied Sciences in Helsinki, Finland.",
        },
        {
            title:
                "Vocation Qualification in Information and Communication Technology, software developer",
            org: "Luksia, Länsi-Uudenmaan koulutuskuntayhtymä",
            year: "2024",
            desc:
                "Internships and interesting projects during studies, with a focus on React, TypeScript and FastAPI. I completed my studies externally, as I quickly passed all exams and received my diploma.",
        },
    ];

    return (
        <section id="education" className="container py-5">
            <h2 className="display-6 fw-bold text-center mb-2 text-gradient">Education</h2>
            <p className="lead text-secondary text-center mb-5">
                Academic education and achievements in the field of information technology
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
