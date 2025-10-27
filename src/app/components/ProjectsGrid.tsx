"use client";
import { useId, useMemo, useState } from "react";
import type { Project } from "@/data/projects";
import CardMediaSwiper from "./CardMediaSwiper";

type Props = { items: Project[] };

const FALLBACK =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'>
      <defs><linearGradient id='g' x1='0' x2='1'>
        <stop stop-color='#0ea5e9' offset='0'/><stop stop-color='#a78bfa' offset='1'/>
      </linearGradient></defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            fill='white' opacity='0.85' font-family='system-ui,ui-sans-serif'
            font-size='48'>Preview</text>
    </svg>`
    );

export default function ProjectsGrid({ items }: Props) {
    const modalId = useId().replace(/:/g, "");
    const carouselId = useId().replace(/:/g, "");
    const [active, setActive] = useState<Project | null>(null);

    const onOpen = (p: Project) => setActive(p);
    const onClose = () => setActive(null);

    const activeImages = useMemo(
        () => (active?.images?.length ? active.images : active ? [active.cover] : []),
        [active]
    );

    return (
        <>
            <div className="row g-3 g-md-4">
                {items.map((p) => {
                    const media = p.images?.length ? p.images : [p.cover];
                    return (
                        <div key={p.id} className="col-12 col-sm-6 col-lg-4">
                            <div className="card h-100 border-0 project-card glass hover-glass hover-lift">
                                {/* media (full-bleed) + свайпы + открытие модалки */}
                                <CardMediaSwiper
                                    images={media}
                                    ariaLabel={`Open ${p.title}`}
                                    onClick={() => onOpen(p)}
                                    modalTarget={`#${modalId}`}   // <- важно!
                                />

                                {/* content */}
                                <div className="card-body">
                                    <div className="d-flex align-items-start justify-content-between gap-2">
                                        <div>
                                            <h3 className="h6 mb-1">{p.title}</h3>
                                            {p.subtitle && <div className="text-secondary small">{p.subtitle}</div>}
                                        </div>
                                        {p.href && (
                                            <a
                                                className="btn btn-sm btn-outline-light"
                                                href={p.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()} // чтобы по кнопке Demo модалка не открывалась
                                            >
                                                Demo
                                            </a>
                                        )}
                                    </div>

                                    <p className="text-secondary mt-2 mb-3">{p.summary}</p>

                                    <div className="d-flex flex-wrap gap-1">
                                        {p.tags.map((t) => (
                                            <span key={t} className="badge text-bg-dark border border-secondary-subtle">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MODAL — glass */}
            <div className="modal fade" id={modalId} tabIndex={-1} aria-hidden="true" onClick={onClose}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content modal-solid border-0 shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h5 className="modal-title">{active?.title}</h5>
                                {active?.subtitle && <div className="text-secondary small">{active.subtitle}</div>}
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>

                        {active && (
                            <div className="modal-body">
                                <div id={carouselId} className="carousel slide mb-3">
                                    <div className="carousel-inner rounded-3 overflow-hidden">
                                        {activeImages.map((src, i) => (
                                            <div key={src} className={`carousel-item${i === 0 ? " active" : ""}`}>
                                                <img
                                                    src={src}
                                                    className="d-block w-100"
                                                    alt=""
                                                    onError={(e) => ((e.currentTarget as HTMLImageElement).src = FALLBACK)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {activeImages.length > 1 && (
                                        <>
                                            <button
                                                className="carousel-control-prev"
                                                type="button"
                                                data-bs-target={`#${carouselId}`}
                                                data-bs-slide="prev"
                                            >
                                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button
                                                className="carousel-control-next"
                                                type="button"
                                                data-bs-target={`#${carouselId}`}
                                                data-bs-slide="next"
                                            >
                                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </>
                                    )}
                                </div>

                                <p className="mb-0">{active.details}</p>
                            </div>
                        )}

                        <div className="modal-footer">
                            {active?.href && (
                                <a className="btn btn-primary" href={active.href} target="_blank" rel="noreferrer">
                                    Open demo
                                </a>
                            )}
                            <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
