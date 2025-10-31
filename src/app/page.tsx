import Starfield from "./components/Starfield";
import BootstrapClient from "./components/BootstrapClient";
import ProjectsGrid from "./components/ProjectsGrid";
import Education from "./components/Education";
import Skills from "./components/Skills";
import { projects } from "@/data/projects";
import NavBar from "./components/NavBar";


export default function Page() {
  const year = new Date().getFullYear();

  const stats = [
    { value: "1.5+", label: "years of experience" },
    { value: "10+", label: "projects" },
    { value: "100%", label: "quality" },
  ];

  return (
    <>
      {/* интерактивный фон */}
      <Starfield />
      {/* инициализация Bootstrap JS */}
      <BootstrapClient />

      <>
        <Starfield />
        <BootstrapClient />
        <NavBar />
        {}
      </>

      {/* HERO */}
      <header className="container py-5 text-center">

        <div className="avatar-hero mx-auto" aria-label="Avatar">
          <i className="bi bi-person-circle" aria-hidden="true" />
        </div>


        <span className="display-5 fw-bold mt-3 text-gradient">Khevavasam Artur</span>
        <p className="lead text-secondary mx-auto" style={{ maxWidth: "60ch" }}>
          Frontend React Developer. Modern UX, clean architecture, measurable performance.
        </p>
        

        {/* STATS */}
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

      {/* PROJECTS */}
      <section id="projects" className="container py-5">
        <div className="container text-center">
        <span className="display-6 fw-bold center mb-2 text-gradient">Projects</span>
        <p className="lead text-secondary text-center mb-5">
          Selected work: performance-first UI, clean DX, measurable results
        </p>
        </div>
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
