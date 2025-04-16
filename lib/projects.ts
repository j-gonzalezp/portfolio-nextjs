export type StoryStatus = 'Backlog' | 'Planned' | 'In Progress' | 'Done' | 'Blocked';

export interface UserStory {
    id: string;
    title: string;
    asA: string;
    iWant: string;
    soThat: string;
    status: StoryStatus;
    tags?: string[];
    notes?: string;
    acceptanceCriteria?: string[];
}

interface ChangelogEntry {
    date: string;
    version?: string;
    description_es: string;
    description_en: string;
}

interface AgileProgress {
    currentFocus_es?: string;
    currentFocus_en?: string;
    stories: UserStory[];
    changelog: ChangelogEntry[];
}

interface RawProjectDataBase {
    slug: string;
    tags?: string[];
    imageUrl?: string;
    isFeatured?: boolean;
    isAcademic?: boolean;
    repoUrl?: string;
    liveUrl?: string;
}
interface RawProjectContent {
    title_es: string; title_en: string;
    summary_es: string; summary_en: string;
    content_es: string; content_en: string;
    progress?: AgileProgress;
}
type RawProjectData = RawProjectDataBase & RawProjectContent;

export interface ProjectMetadata extends Omit<RawProjectDataBase, 'repoUrl' | 'liveUrl'> {
    title: string;
    summary: string;
}
export interface LocalizedChangelogEntry {
    date: string;
    version?: string;
    description: string;
}
export interface ProjectData extends RawProjectDataBase {
    title: string;
    summary: string;
    content: string;
    currentFocus?: string;
    stories?: UserStory[];
    localizedChangelog?: LocalizedChangelogEntry[];
}


const placeholderProjects: RawProjectData[] = [
    {
        slug: 'ear-training-app',
        title_es: 'Aplicación Web de Entrenamiento Auditivo', title_en: 'Ear Training Web Application',
        summary_es: 'Aplicación para ayudar a músicos a entrenar su oído musical, con backend en Appwrite.', summary_en: 'Application to help musicians train their musical ear, with an Appwrite backend.',
        tags: ['Next.js', 'Appwrite', 'Tailwind', 'TypeScript', 'Zustand', 'Vercel'],
        imageUrl: '/images/placeholder-ear-training.png',
        isFeatured: true, isAcademic: false,
        repoUrl: 'https://github.com/TU_USUARIO_GITHUB/ear-training-app',
        content_es: '<p>Proyecto personal en desarrollo activo. El objetivo es crear una herramienta PWA completa para practicar intervalos, acordes y melodías. <strong>Backend gestionado con Appwrite</strong> (autenticación, base de datos para progreso de usuario, posiblemente funciones cloud). Frontend construido con Next.js para rendimiento y SEO, estilado con Tailwind.</p>',
        content_en: '<p>Personal project under active development. The goal is to create a complete PWA tool for practicing intervals, chords, and melodies. <strong>Backend managed with Appwrite</strong> (authentication, database for user progress, possibly cloud functions). Frontend built with Next.js for performance and SEO, styled with Tailwind.</p>',
        progress: {
            currentFocus_es: "Implementando autenticación y módulo de intervalos.", currentFocus_en: "Implementing authentication and interval module.",
            stories: [
                { id: "ET-001", title: "User Authentication", asA: "Musician", iWant: "to sign up and log in", soThat: "I can save my progress", status: "In Progress", tags: ["Appwrite Auth", "Backend", "Frontend"], notes: "Initial email/password." },
                { id: "ET-002", title: "Interval Recognition (Asc.)", asA: "Musician", iWant: "to hear two notes and identify the ascending interval", soThat: "I can improve my relative pitch", status: "In Progress", tags: ["Core Feature", "Frontend", "Audio"], acceptanceCriteria: ["Generate random note pair.", "Play audio.", "Display interval options.", "Validate answer."] },
                { id: "ET-003", title: "Progress Database", asA: "Developer", iWant: "to store exercise results per user", soThat: "stats and tracking can be displayed", status: "Planned", tags: ["Appwrite DB", "Backend", "Data Model"] },
                { id: "ET-004", title: "Chord Identification (Maj/Min)", asA: "Musician", iWant: "to hear a basic chord and identify if it's Major or Minor", soThat: "I can recognize chord qualities", status: "Backlog", tags: ["Core Feature", "Frontend", "Audio"] },
                { id: "ET-005", title: "PWA Manifest & Service Worker", asA: "User", iWant: "to install the app on my device and use it offline", soThat: "I can practice anywhere", status: "Planned", tags: ["PWA", "Frontend"] }
            ],
            changelog: [
                { date: "2024-07-15", version: "v0.1.0", description_es: "Setup inicial (Next.js, TS, Tailwind). Layout básico UI.", description_en: "Initial project setup (Next.js, TS, Tailwind). Basic UI layout." },
                { date: "2024-07-20", description_es: "Integración inicial SDK Appwrite y configuración de proyecto.", description_en: "Initial Appwrite SDK integration and project setup." }
            ]
        }
    },
    {
        slug: 'interactive-journal',
        title_es: 'Diario Interactivo con Asistencia AI', title_en: 'Interactive Journal with AI Assistance',
        summary_es: 'Un diario inteligente diseñado para personas con TDAH u otras dificultades de organización, potenciado por IA y Appwrite.', summary_en: 'A smart journal designed for people with ADHD or other organizational difficulties, powered by AI and Appwrite.',
        tags: ['Next.js', 'Appwrite', 'AI', 'Tailwind', 'TypeScript', 'Vercel'],
        imageUrl: '/images/placeholder-journal.png',
        isFeatured: true, isAcademic: false,
        repoUrl: 'https://github.com/TU_USUARIO_GITHUB/interactive-journal',
        content_es: '<p>Concepto de proyecto personal enfocado en crear un diario digital que no solo almacene entradas, sino que utilice IA (probablemente APIs externas como OpenAI) para ofrecer resúmenes, identificar patrones o sugerir reflexiones. <strong>El backend se construirá con Appwrite</strong> para manejar usuarios, entradas de diario y posiblemente funciones cloud para interactuar con la IA. Frontend con Next.js.</p>',
        content_en: '<p>Personal project concept focused on creating a digital journal that not only stores entries but also uses AI (likely external APIs like OpenAI) to offer summaries, identify patterns, or suggest reflections. <strong>The backend will be built with Appwrite</strong> to handle users, journal entries, and possibly cloud functions to interact with the AI. Frontend with Next.js.</p>',
        progress: {
            currentFocus_es: "Diseño de modelo de datos y UI principal.", currentFocus_en: "Designing data model and main UI.",
            stories: [
                { id: "IJ-001", title: "Create/Edit Journal Entries", asA: "User", iWant: "to write and save my daily thoughts", soThat: "I can keep a personal record", status: "Planned", tags: ["Core Feature", "Frontend", "Appwrite DB"] },
                { id: "IJ-002", title: "Secure Authentication", asA: "User", iWant: "to access my journal securely", soThat: "my private information is protected", status: "Planned", tags: ["Appwrite Auth", "Security"] },
                { id: "IJ-003", title: "External AI API Integration (Mock)", asA: "Developer", iWant: "to define how to interact with an AI API (initially mocked)", soThat: "the assistant feature can be planned", status: "Backlog", tags: ["AI", "API", "Backend"] }
            ],
            changelog: [
                { date: "2024-07-10", description_es: "Definición inicial del concepto y stack tecnológico.", description_en: "Initial concept definition and tech stack selection." }
            ]
        }
    },
    {
        "slug": "hospital-modern-app",
        "title_es": "Aplicación Web Moderna para Hospital",
        "title_en": "Modern Hospital Web Application",
        "summary_es": "Aplicación web completa (Next.js 15, Appwrite) para un hospital, con gestión de citas por slots, perfiles de doctores, servicios y despliegue contenerizado.",
        "summary_en": "Full-stack web application (Next.js 15, Appwrite) for a hospital, featuring slot-based appointment scheduling, doctor profiles, services, and containerized deployment.",
        "tags": [
            "Next.js",
            "React",
            "TypeScript",
            "Appwrite",
            "Tailwind CSS",
            "Docker",
            "Server Components",
            "Server Actions",
            "Full Stack",
            "Healthcare",
            "API Integration"
        ],
        "imageUrl": "images/hospital.png",
        "isAcademic": false,
        "isFeatured": true,
        "content_es": "<p>Desarrollo completo de una aplicación web para un hospital moderno usando Next.js 15 (App Router), TypeScript y Tailwind CSS. Incluye autenticación de usuarios, búsqueda de doctores/servicios y un sistema clave de <strong>reservas de citas basado en slots de disponibilidad</strong> gestionados con un backend <strong>Appwrite</strong>.</p><p>Se implementó un enfoque \"Backend First\", definiendo la estructura de datos y lógica de Appwrite (incluyendo colecciones para doctores, citas, y slots de disponibilidad) antes de construir el frontend. Se utilizaron Server Components para fetching de datos y Server Actions para mutaciones.</p><p>La aplicación fue <strong>dockerizada</strong> para un despliegue consistente y se configuró <strong>CI/CD</strong> (inicialmente con Render, adaptable a Vercel o similar) para automatizar el proceso.</p><p><strong>Características Destacadas:</strong> Programación de citas por slot, perfiles de doctores, listado de servicios, artículos de salud, autenticación, diseño responsive con tema claro/oscuro.</p>",
        "content_en": "<p>Full-stack development of a modern hospital web application using Next.js 15 (App Router), TypeScript, and Tailwind CSS. Features user authentication, doctor/service browsing, and a key <strong>slot-based appointment scheduling system</strong> managed by an <strong>Appwrite</strong> backend.</p><p>A \"Backend First\" approach was implemented, defining the Appwrite data structure and logic (including collections for doctors, appointments, and availability slots) before building the frontend. Server Components were used for data fetching and Server Actions for mutations.</p><p>The application was <strong>dockerized</strong> for consistent deployment and <strong>CI/CD</strong> was configured (initially targeting Render, adaptable to Vercel or similar) to automate the process.</p><p><strong>Key Features:</strong> Slot-based appointment booking, doctor profiles, service listings, health articles, authentication, responsive design with light/dark theme.</p>",
        "repoUrl": "https://github.com/j-gonzalezp/hospital_app_final",
        "liveUrl": "https://hospital-app-final.vercel.app/"
    },
    {
        slug: 'portfolio-nextjs-app',
        title_es: 'Portafolio Personal (Next.js)', title_en: 'Personal Portfolio (Next.js)',
        summary_es: 'Este mismo portafolio, reconstruido con Next.js 14 (App Router), TypeScript, Tailwind CSS y desplegado vía Docker en Vercel.',
        summary_en: 'This very portfolio, rebuilt using Next.js 14 (App Router), TypeScript, Tailwind CSS, and deployed via Docker on Vercel.',
        tags: [
            'Next.js',
            'React',
            'TypeScript',
            'Tailwind CSS',
            'App Router',
            'Server Components',
            'Docker',
            'GitHub Actions',
            'Vercel',
            'i18n',
            'Theming',
            'Accessibility',
            'Responsive Design',
        ],
        imageUrl: 'images/portfolio.png',
        isAcademic: false,
        isFeatured: true,
        content_es: `
        <p>Esta es la web que estás viendo ahora mismo. Fue desarrollada desde cero utilizando las últimas características de <strong>Next.js (App Router)</strong>, con un fuerte énfasis en <strong>Server Components</strong> para optimizar el rendimiento y reducir el JavaScript del lado del cliente.</p>
        <p>Características clave:</p>
        <ul>
            <li>Stack moderno: <strong>Next.js 14+, React 19, TypeScript</strong>.</li>
            <li>Estilado con <strong>Tailwind CSS</strong> y variables CSS semánticas para theming (Claro/Oscuro/Sistema).</li>
            <li>Estructura basada en el <strong>App Router</strong> de Next.js.</li>
            <li>Internacionalización (i18n) básica (ES/EN) mediante Context API.</li>
            <li>Diseño responsive y foco en <strong>accesibilidad</strong> (semántica HTML, ARIA, navegación por teclado).</li>
            <li>Construcción y despliegue automatizado con <strong>Docker</strong>, <strong>GitHub Actions</strong> (publicando en GHCR) y <strong>Vercel</strong>.</li>
            <li>Configuración para salida <strong>standalone</strong> de Next.js para imágenes Docker optimizadas.</li>
        </ul>
        <p>El proceso de desarrollo incluyó una refactorización significativa basada en un análisis crítico (¡como el que hicimos!) para mejorar la estructura del código, el rendimiento y la experiencia de usuario, aplicando patrones y prácticas modernas.</p>
    `,
        content_en: `
        <p>This is the website you are currently viewing. It was developed from scratch using the latest features of <strong>Next.js (App Router)</strong>, with a strong emphasis on <strong>Server Components</strong> to optimize performance and reduce client-side JavaScript.</p>
        <p>Key features:</p>
        <ul>
            <li>Modern stack: <strong>Next.js 14+, React 19, TypeScript</strong>.</li>
            <li>Styling with <strong>Tailwind CSS</strong> and semantic CSS variables for theming (Light/Dark/System).</li>
            <li>Architecture based on Next.js <strong>App Router</strong>.</li>
            <li>Basic internationalization (i18n) (ES/EN) using Context API.</li>
            <li>Responsive design with a focus on <strong>accessibility</strong> (semantic HTML, ARIA, keyboard navigation).</li>
            <li>Automated build and deployment pipeline using <strong>Docker</strong>, <strong>GitHub Actions</strong> (publishing to GHCR), and <strong>Vercel</strong>.</li>
            <li>Configuration for Next.js <strong>standalone</strong> output for optimized Docker images.</li>
        </ul>
        <p>The development process included significant refactoring based on critical analysis (like the one we did!) to improve code structure, performance, and user experience, applying modern patterns and practices.</p>
    `,
        repoUrl: 'https://github.com/j-gonzalezp/portfolio-nextjs',
        liveUrl: 'https://portfolio-nextjs-six-vert.vercel.app/',

    },
];

function localizeProjectData<T extends ProjectData | ProjectMetadata>(
    data: RawProjectData,
    locale: 'es' | 'en'
): T {
    const localized: Partial<ProjectData> = {
        slug: data.slug,
        tags: data.tags,
        imageUrl: data.imageUrl,
        isFeatured: data.isFeatured,
        isAcademic: data.isAcademic,
        repoUrl: data.repoUrl,
        liveUrl: data.liveUrl,
    };

    localized.title = data[`title_${locale}`] ?? data.title_es;
    localized.summary = data[`summary_${locale}`] ?? data.summary_es;
    localized.content = data[`content_${locale}`] ?? data.content_es;

    if (data.progress) {
        localized.currentFocus = data.progress[`currentFocus_${locale}`];
        localized.stories = data.progress.stories;
        localized.localizedChangelog = data.progress.changelog.map(entry => ({
            date: entry.date,
            version: entry.version,
            description: entry[`description_${locale}`] ?? entry.description_es,
        })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return localized as T;
}


export async function getAllProjectMetadata(locale: 'es' | 'en'): Promise<ProjectMetadata[]> {
    return placeholderProjects.map(p => {
        const localizedFull = localizeProjectData<ProjectData>(p, locale);
        const metadata: ProjectMetadata = {
            slug: localizedFull.slug,
            title: localizedFull.title,
            summary: localizedFull.summary,
            tags: localizedFull.tags,
            imageUrl: localizedFull.imageUrl,
            isFeatured: localizedFull.isFeatured,
            isAcademic: localizedFull.isAcademic,
        };
        return metadata;
    });
}

export async function getFeaturedProjects(locale: 'es' | 'en'): Promise<ProjectMetadata[]> {
    return placeholderProjects
        .filter(p => p.isFeatured)
        .map(p => {
            const localizedFull = localizeProjectData<ProjectData>(p, locale);
            const metadata: ProjectMetadata = {
                slug: localizedFull.slug,
                title: localizedFull.title,
                summary: localizedFull.summary,
                tags: localizedFull.tags,
                imageUrl: localizedFull.imageUrl,
                isFeatured: localizedFull.isFeatured,
                isAcademic: localizedFull.isAcademic,
            };
            return metadata;
        });
}

export async function getProjectData(slug: string, locale: 'es' | 'en'): Promise<ProjectData | null> {
    const project = placeholderProjects.find((p) => p.slug === slug);
    if (!project) return null;
    return localizeProjectData<ProjectData>(project, locale);
}
export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
    
    return placeholderProjects.map(p => ({
        slug: p.slug,
    }));
}