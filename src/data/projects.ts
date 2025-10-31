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
    ,



    {
        id: "hyva-kielipaa",
        title: "Hyvä kielipää - Landing & Store",
        subtitle: "Bootstrap 5 · Vanilla JS",
        tags: ["Landing", "Store", "Multilingual", "Cart", "On-page SEO"],
        cover: "/projects/hkp/cover.jpg",
        previews: [
            "/projects/hkp/kielipaa1.jpg",
            "/projects/hkp/kielipaa2.jpg",
            "/projects/hkp/kielipaa3.jpg",
        ],
        images: [
            "/projects/hkp/kielipaa1.jpg",
            "/projects/hkp/kielipaa2.jpg",
            "/projects/hkp/kielipaa3.jpg",
            "/projects/hkp/kielipaa4.jpg",
            "/projects/hkp/kielipaa5.jpg",
            "/projects/hkp/kielipaa6.jpg",
            "/projects/hkp/kielipaa7.jpg",
            "/projects/hkp/kielipaa8.jpg",
        ],
        summary: "Product landing with a simple store, language switch (FI/UA/EN), and a lightweight cart.",
        details: [
            "Built a clean product landing with a bright accent, responsive grid, and concise sections for hero, features, and product sets.",
            "Added a language switch (FI/UA/EN). Texts and labels change instantly on the page without reload.",
            "Implemented a simple cart: add from product cards, view items, change quantities, and see totals.",
            "The layout is mobile friendly and easy to extend.",
            "Basic on-page SEO is in place: semantic markup, editable meta title and description, and Open Graph sharing tags."
        ].join("\n\n")

    }
    ,


    {
        "id": "clean-email-article",
        "title": "Clean Email - Article Site",
        "subtitle": "Django · Wagtail CMS · Bootstrap 5 · SEO",
        "tags": ["Django", "Wagtail", "Bootstrap","SEO"],
        "cover": "/projects/clean-email/cover.jpg",
        "previews": [
            "/projects/clean-email/email2.jpg",
            "/projects/clean-email/email3.jpg"
        ],
        "images": [
            "/projects/clean-email/email2.jpg",
            "/projects/clean-email/email3.jpg",
            "/projects/clean-email/email1.jpg",
            "/projects/clean-email/email4.jpg"
        ],
        "summary": "A simple site with an article explaining how to clean up an inbox. The page is managed in Wagtail.",
        details: [
            "I built a clean article page that walks the reader through removing unwanted emails and organizing the mailbox. The layout is straightforward: a clear heading, author and date, readable text, and a small call-to-action in the sidebar. The front end uses Bootstrap 5 and adapts well to mobile screens.",
            "The content is powered by Wagtail CMS. I created an ArticlePage model with fields for title, intro, body, author, date, and images. The body uses StreamField blocks (headings, rich text, images, and notes), which makes editing and reordering content simple in the admin.",
            "SEO is in place. The page includes semantic HTML, editable meta title and description, Open Graph and Twitter tags, and an Article schema in JSON-LD. Images are served through Wagtail renditions with appropriate sizes and lazy loading.",
            "The editorial workflow supports drafts, preview, and publishing. URLs are tidy, styles are minimal, and the page loads quickly."
        ].join("\n\n")
    }
    ,

    {
        id: "restaurant-php",
        title: "Restaurant App",
        subtitle: "PHP · MySQL · Bootstrap 5",
        tags: ["PHP", "MySQL", "Bootstrap", "CRUD", "Admin"],
        cover: "/projects/restaurant/cover.jpg",
        previews: [
            "/projects/restaurant/restaurant1.jpg",
            "/projects/restaurant/restaurant2.jpg",
        ],
        images: [
            "/projects/restaurant/restaurant1.jpg",
            "/projects/restaurant/restaurant2.jpg",
            "/projects/restaurant/restaurant5.jpg",
            "/projects/restaurant/restaurant3.jpg",
            "/projects/restaurant/restaurant4.jpg",


        ],
        summary: "A small restaurant site with menu management, a cart, and simple booking.",
        details: [
            "Built a PHP/MySQL application where an admin can add, edit, and remove menu items. The UI uses Bootstrap 5 and works on mobile and desktop.",
            "Menu items have title, description, price, image, and category. Forms include basic validation and image upload. Lists support search and simple filters.",
            "The cart lets users add items from product cards, update quantities, and see a running total. Cart state is kept in session.",
            "A simple booking flow allows users to request a table with date, time, and contact details. There is support for cancellation by the user.",
            "In the admin, bookings can be viewed and removed. Expired reservations can be auto-cleared with a small maintenance script.",
            "Code is organized into clear PHP modules with routed pages, reusable partials, and MySQL queries using prepared statements."
        ].join("\n\n")
    }
    ,


    {
        id: "reflect-email-template",
        title: "Reflect - Email Summary Template",
        subtitle: "HTML + inline CSS (email)",
        tags: ["Email", "Template"],
        cover: "/projects/Email-Summary/Email_Summary.jpg",
        images: ["/projects/Email-Summary/Email_Summary.jpg"],
        summary: "An HTML email template for a daily summary. AI checks the inbox and includes only important emails.",
        details: [
            "Template used by Reflect: the system analyzes the inbox and builds a short summary email.",
            "Content is grouped into clear sections (Work, Personal, Financial) with brief items.",
            "Table-based layout with inline CSS for reliable rendering in Gmail and Outlook; readable on mobile.",
            "Modular blocks so the backend can add or remove sections easily. Calm, neutral styling."
        ].join("\n\n")
    }
    ,

    {
        id: "reflect-landing",
        title: "Reflect - Landing Page",
        subtitle: "Bootstrap 5 · Vanilla JS",
        tags: ["Landing", "Product", "CTA", "Accessibility", "SEO"],
        cover: "/projects/reflect-landing/cover.jpg",
        previews: [
            "/projects/reflect-landing/Reflect1.jpg",
            "/projects/reflect-landing/Reflect4.jpg"
        ],
        images: [
            "/projects/reflect-landing/Reflect1.jpg",
            "/projects/reflect-landing/Reflect3.jpg",
            "/projects/reflect-landing/Reflect4.jpg",
            "/projects/reflect-landing/Reflect6.jpg",

        ],
        summary: "A lightweight marketing page for Reflect with a clear value proposition and a sign-in CTA.",
        details: [
            "Built a single-page landing with a calm color palette, large hero headline, and a clear CTA (“Make it clean”).",
            "Layout is responsive and readable on phones and desktops; typography and spacing are kept simple.",
            "Basic on-page SEO: semantic headings, meta title and description, and Open Graph tags.",
            "Optional analytics events on CTA clicks to track conversions."
        ].join("\n\n")
    }
    ,

    {
        id: "solar-system",
        title: "Solar System - Facts & 3D",
        subtitle: "Content site",
        tags: ["Space", "One-page", "Navigation", "3D"],
        cover: "/projects/solar-system/cover.jpg",
        previews: [
            "/projects/solarsystem/solarsystem5.jpg",
            "/projects/solarsystem/solarsystem2.jpg"
        ],
        images: [
            "/projects/solarsystem/solarsystem5.jpg",
            "/projects/solarsystem/solarsystem1.jpg",
            "/projects/solarsystem/solarsystem2.jpg",
            "/projects/solarsystem/solarsystem3.jpg",
            "/projects/solarsystem/solarsystem4.jpg"

        ],
        summary: "A single-page site about the Solar System with a fixed sidebar and an embedded 3D view.",
        details: [
            "Made as a simple study resource for learning the Solar System.",
            "Clear, sectioned layout in a readable dark theme.",
            "Right-hand navigation highlights the current section while scrolling.",
            "Embedded NASA “Eyes on the Solar System” interactive 3D viewer.",
            "Covers key topics across the system: planets, orbits and rotation, structure, atmosphere, moons, surface, size and distance, formation, and more.",
        ].join("\n\n")

    }


];


