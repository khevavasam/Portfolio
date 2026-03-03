"use client";

import React from "react";
import { ScrollTimeline, type TimelineEvent } from "@/components/lightswind/scroll-timeline";

const DEFAULT_EVENTS: TimelineEvent[] = [
  {
    year: "09.2024 — 03.2025",
    title: "Reflect",
    subtitle: "Junior Full-Stack Developer",
    description:
      "Built a web app that analyzes incoming emails and decides what to keep or delete. Added Google OAuth2 (Allauth). Created server-rendered pages in Django (responsive, i18n, ARIA). Added small React widgets (confirm modal, tabs) and embedded them via Vite/esbuild. Built an article page and a landing page in Wagtail with SEO. Deployed with Docker and set up env, migrations, basic logs.",
  },
  {
    year: "07.2025 — 10.2025",
    title: "Hyvä kielipää",
    subtitle: "Frontend / Full-Stack Developer (project-based)",
    description:
      "Built a marketing site with a catalog of product cards. Implemented forms, localization, basic SEO and analytics. Set up hosting and domain, migrated content, optimized images and caching. Stack: PHP + MySQL, server-side rendering.",
  },
  {
    year: "03.2025 — 06.2025",
    title: "Restaurant",
    subtitle: "Full-Stack Developer",
    description:
      "Built a restaurant app with an admin panel: menu and item cards, cart, reservations, roles, CRUD. Server templates in PHP, form validation, pagination, responsive layout. Added user cancel flow, admin removal, and auto cleanup for expired reservations.",
  },
  {
    year: "09.2025 — present",
    title: "Personal project",
    subtitle: "Bilingual Children’s Stories (Founder, React/Next.js)",
    description:
      "Building a web app for personalized bilingual stories. In development: Next.js prototype with SSR, basic i18n (FI/EN), simple story draft form. Preview on Vercel. Grant application submitted.",
  },
];

export default function Timeline({
  events = DEFAULT_EVENTS,
  title = "Experience",
  subtitle = "A quick snapshot",
}: {
  events?: TimelineEvent[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <ScrollTimeline
      events={events}
      title={title}
      subtitle={subtitle}
    />
  );
}
