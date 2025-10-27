import Starfield from "./components/Starfield"; // или ./components/StarfieldPro
import BootstrapClient from "./components/BootstrapClient";
import ProjectsGrid from "./components/ProjectsGrid";
import Education from "./components/Education";
import Skills from "./components/Skills";
import { projects } from "@/data/projects";


export default function Page() {
  const year = new Date().getFullYear();

  const stats = [
    { value: "2+", label: "years of experience" },
    { value: "19+", label: "projects" },
    { value: "100%", label: "quality" },
  ];

  return (
    <>
      {/* интерактивный фон */}
      <Starfield />
      {/* инициализация Bootstrap JS (модалки/карусели/навигация) */}
      <BootstrapClient />

      {/* NAV (стекло) */}
      <nav className="navbar navbar-expand-md sticky-top border-bottom border-1 border-secondary-subtle glass">
        <div className="container">
          <a className="navbar-brand fw-semibold" href="#">Khevavasam Artur</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
            aria-controls="nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div id="nav" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto align-items-md-center gap-md-2">
              <li className="nav-item"><a className="nav-link" href="#projects">Projects</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="container py-5 text-center">

        <div className="avatar-hero mx-auto" aria-label="Avatar">
          <i className="bi bi-person-circle" aria-hidden="true" />
        </div>


        <h1 className="display-5 fw-bold mt-3 text-gradient">Khevavasam Artur</h1>
        <p className="text-secondary mx-auto" style={{ maxWidth: "60ch" }}>
          Frontend React Developer. Modern UX, clean architecture, measurable performance.
        </p>

        {/* STATS (стекло) */}
        <div className="row g-3 g-md-4 mt-1">
          {stats.map((s) => (
            <div key={s.label} className="col-12 col-md-4">
              <div className="card glass border-0 shadow-sm h-100 hover-glass">
                <div className="card-body">
                  <div className="fs-2 fw-bold">{s.value}</div>
                  <div className="text-secondary small">{s.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* PROJECTS */}
      <section id="projects" className="container py-5">
        <h2 className="display-6 fw-bold text-center mb-2 text-gradient">Projects</h2>
        <p className="lead text-secondary text-center mb-5">
          Selected work: performance-first UI, clean DX, measurable results
        </p>

        <ProjectsGrid items={projects} />
      </section>


      {/* EDUCATION */}
      <Education />

      {/* SKILLS */}
      <Skills />


      {/* FOOTER */}
      <footer className="container py-4 text-secondary small border-top border-secondary-subtle">
        © {year} Khevavasam Artur
      </footer>




    </>
  );
}
