export type Project = {
    id: string;
    title: string;
    subtitle?: string;
    tags: string[];
    cover: string;      // путь к обложке /projects/...
    images?: string[];  // дополнительные картинки для карусели
    href?: string;      // внешняя ссылка (опц.)
    summary: string;    // коротко на карточке
    details: string;    // развернуто в модалке
};

export const projects: Project[] = [
    {
        id: "dapp",
        title: "Mini dApp",
        subtitle: "Next.js · Web3 · SSR",
        tags: ["Next.js", "Web3", "SSR"],
        cover: "/projects/dapp/cover.jpg",
        images: ["/projects/photo1.jpg", "/projects/photo1.jpg"],
        summary: "Кошелёк-коннект, чтение ончейн-данных, упор на DX.",
        details:
            "Поддержка WalletConnect, SSR для критичных страниц, оптимизация bundle, строгая типизация API."
    },
    {
        id: "portfolio",
        title: "Portfolio",
        subtitle: "React · Perf · SEO",
        tags: ["React", "Perf", "SEO"],
        cover: "/projects/portfolio/cover.jpg",
        images: ["/projects/photo1.jpg", "/projects/photo1.jpg"],
        summary: "Лэндинг с OG, быстрым TTFB и Lighthouse 95+.",
        details:
            "Метки OG/Twitter, критический CSS, пререндер, аналитика и события."
    },
    {
        id: "cards-app",
        title: "Cards-App",
        subtitle: "PHP · Bootstrap · i18n",
        tags: ["PHP", "Bootstrap", "i18n"],
        cover: "/projects/cards/cover.jpg",
        images: ["/projects/photo1.jpg", "/projects/photo1.jpg"],
        summary: "Карточки, избранное, прогресс обучения, локализация.",
        details:
            "Гибкие фильтры, сохранение состояния пользователя, экспорт прогресса, адаптивная сетка."
    }
];
