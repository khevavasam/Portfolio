export type Project = {
    id: string;
    title: string;
    subtitle?: string;
    tags: string[];
    cover: string;      // путь к обложке /projects/...
    images?: string[];  // дополнительные картинки для карусели
    previews?: string[];    // маленькие (для карточки)
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
        images: ["/projects/photo1.jpg", "/projects/photo1.jpg", ],
        summary: "Лэндинг с OG, быстрым TTFB и Lighthouse 95+.",
        details:
            "Метки OG/Twitter, критический CSS, пререндер, аналитика и события."
    },
    {
        id: "cards-app",
        title: "Cards-App",
        subtitle: "PHP · MySQL · Bootstrap 5 · Bootstrap Icons · JavaScript · i18n",
        tags: ["PHP", "MySQL", "Bootstrap", "JavaScript", "i18n"],
        cover: "/projects/cards-app/profile.jpg",
        previews: [
            "/projects/cards-app/profile.jpg",
            "/projects/cards-app/admin.jpg",
        ],
        images: [
            "/projects/cards-app/profile.jpg",
            "/projects/cards-app/admin.jpg",
            "/projects/cards-app/register.jpg",
            "/projects/cards-app/cards1.jpg",
            "/projects/cards-app/cards2.jpg",
            "/projects/cards-app/cards3.jpg",
            "/projects/cards-app/cards4.jpg",
            "/projects/cards-app/admin1.jpg",
            "/projects/cards-app/admin2.jpg",
            "/projects/cards-app/admin3.jpg",


            
        ],
        summary: "Flashcards with decks, progress tracking, and localization.",
        details: [
            "An app for learning words in multiple languages. You can create decks and categories, add cards with a term, translation, and hint. The interface and content are localized: the language is detected and can be switched with one click; labels and messages update instantly. There’s a training mode with answer reveal, shuffling, and repeat for difficult cards; you can mark learned and favorite cards. Progress is saved and restored on your next visit from the same device. Simple stats show how much you’ve learned, what’s left, and when you last trained. Search and filters help you find the right cards, return to recent sessions, and hide already learned ones. The layout is responsive-comfortable on phones and desktops.",
            "",
            "Tech: PHP backend, MySQL data (tables for decks, categories, cards, and progress). UI built with Bootstrap 5 and Bootstrap Icons; interactions in plain JavaScript. Localization is handled via i18n.php (PHP string arrays and language switching); content and UI stay in sync. User state is stored in the database.",
            "",
            "An admin panel in PHP lets you create, edit, and delete decks, categories, and cards; reorder items; toggle publication; search the database quickly; and preview cards right in the panel. The admin includes item counters, basic per-deck stats, interface language switching, form validation, and convenient forms for bulk adding cards."
        ].join("\n\n")

    }




];


