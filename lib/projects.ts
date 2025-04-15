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
    slug: 'academic-project-final',
    title_es: 'Proyecto Final - Especialización Front-End', title_en: 'Final Project - Front-End Specialization',
    summary_es: 'Proyecto culminante de la Especialización Front-End de Talento Digital (React).', summary_en: 'Culminating project of the Talento Digital Front-End Specialization (React).',
    tags: ['React', 'JavaScript', 'CSS', 'academic', 'Talento Digital'],
    imageUrl: '/images/placeholder-academic-final.png',
    isAcademic: true, isFeatured: false,
    content_es: '<p>Este proyecto aplicó los conceptos clave del módulo de React, incluyendo manejo de estado, ciclo de vida de componentes, routing y consumo de APIs. Se implementaron mejoras basadas en el feedback recibido sobre [mencionar brevemente feedback/mejoras]. Desplegado en [GitHub Pages/Netlify - Especificar].</p>',
    content_en: '<p>This project applied key concepts from the React module, including state management, component lifecycle, routing, and API consumption. Improvements were implemented based on feedback received regarding [briefly mention feedback/improvements]. Deployed on [GitHub Pages/Netlify - Specify].</p>',
    repoUrl: 'https://github.com/TU_USUARIO_GITHUB/talento-digital-final-project',
    liveUrl: 'URL_DESPLIEGUE_PROYECTO_FINAL',
  },
  {
    slug: 'academic-module-react',
    title_es: 'Ejercicio Módulo React', title_en: 'React Module Exercise',
    summary_es: 'Ejercicio práctico del módulo de React de la especialización.', summary_en: 'Practical exercise from the specialization\'s React module.',
    tags: ['React', 'JavaScript', 'academic', 'Talento Digital'],
    isAcademic: true, isFeatured: false,
    content_es: '<p>Descripción del ejercicio del módulo de React. Enfocado en [concepto específico].</p>',
    content_en: '<p>Description of the React module exercise. Focused on [specific concept].</p>',
    repoUrl: 'https://github.com/TU_USUARIO_GITHUB/talento-digital-module-react',
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
        })).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
