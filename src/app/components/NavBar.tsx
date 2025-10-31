// src/app/components/NavBar.tsx
"use client";
import { useEffect, useState } from "react";

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={
                "navbar navbar-expand-md sticky-top glass nav-glass border-bottom border-1 border-secondary-subtle" +
                (scrolled ? " nav-scrolled" : "")
            }
            data-bs-theme="dark"
        >
            <div className="container">
                <a className="navbar-brand d-flex align-items-center gap-2" href="#">
                    <i className="bi bi-stars"></i>
                    <span className="brand-gradient fw-semibold">Khevavasam Artur</span>
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNav"
                    aria-controls="mainNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div id="mainNav" className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto align-items-md-center gap-md-2">
                        <li className="nav-item">
                            <a className="nav-link nav-ux" href="#projects">Projects</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-ux" href="#education">Education</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-ux" href="#skills">Skills</a>
                        </li>
                        <li className="nav-item d-none d-md-block">
                            <a className="btn btn-sm btn-warning hover-accent" href="/CV.pdf" target="_blank" rel="noreferrer">
                                <i className="bi bi-file-earmark-text me-1" />
                                CV
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
