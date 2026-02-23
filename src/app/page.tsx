import Starfield from "./components/Starfield";
import ProjectsGrid from "./components/ProjectsGrid";
import Education from "./components/Education";
import Skills from "./components/Skills";
import { projects } from "@/data/projects";
import NavBar from "./components/NavBar";

import { i18n } from "@/i18n";

export default function Page() {
  const year = new Date().getFullYear();

  const stats = [
    i18n.home.stats.exp,
    i18n.home.stats.projects,
    i18n.home.stats.quality,
  ];

  return (
    <>
      <Starfield />
      <NavBar />

      <header className="container py-5 text-center">
        <div className="avatar-hero mx-auto" aria-label="Avatar">
          <i className="bi bi-person-circle" aria-hidden="true" />
        </div>

        <span className="display-5 fw-bold mt-3 text-gradient">{i18n.home.hero.name}</span>

        <p className="lead text-secondary mx-auto" style={{ maxWidth: "60ch" }}>
          {i18n.home.hero.subtitle}
        </p>

        <div className="row g-3 g-md-4 mt-1">
          {stats.map((s) => (
            <div key={s.label} className="col-12 col-md-4">
              <div className="card glass border-0 shadow-sm h-100 hover-glass hover-accent">
                <div className="card-body">
                  <div className="fs-2 fw-bold">{s.value}</div>
                  <div className="text-secondary small">{s.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>

      <section id="projects" className="container py-5">
        <div className="container text-center">
          <span className="display-6 fw-bold mb-2 text-gradient">{i18n.home.projects.title}</span>
          <p className="lead text-secondary text-center mb-5">{i18n.home.projects.subtitle}</p>
        </div>

        <ProjectsGrid items={projects} />
      </section>

      <Education />
      <Skills />

      <footer className="container py-4 text-secondary small border-top border-secondary-subtle">
        {i18n.home.footer.text(year)}
      </footer>
    </>
  );
}
