"use server"
import fs from 'fs/promises';
import path from 'path';
import { type Locale } from '@/app/contexts/LocaleContext';

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
    description: string;
}

interface AgileProgress {
    currentFocus?: string;
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
    title: string;
    summary: string;
    content: string;
    progress?: AgileProgress;
}

interface RawProjectData {
    slug: string;
    tags?: string[];
    imageUrl?: string;
    isFeatured?: boolean;
    isAcademic?: boolean;
    repoUrl?: string;
    liveUrl?: string;
    translations: {
        es: RawProjectContent;
        en: RawProjectContent;
    };
}

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
    locale: Locale;
    title: string;
    summary: string;
    content: string;
    currentFocus?: string;
    stories?: UserStory[];
    localizedChangelog?: LocalizedChangelogEntry[];
}

const PROJECTS_DIRECTORY = path.join(process.cwd(), 'data', 'projects');

async function getProjectFileContent(slug: string): Promise<RawProjectData | null> {
    const filePath = path.join(PROJECTS_DIRECTORY, `${slug}.json`);
    try {
        const fileContents = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error(`Failed to read project file ${filePath}:`, error);
        return null;
    }
}

function localizeProjectData<T extends ProjectData | ProjectMetadata>(
    data: RawProjectData,
    locale: Locale
): T {
    const localizedContent = data.translations[locale] || data.translations.es; // Fallback to Spanish

    const localized: Partial<ProjectData> = {
        slug: data.slug,
        tags: data.tags,
        imageUrl: data.imageUrl,
        isFeatured: data.isFeatured,
        isAcademic: data.isAcademic,
        repoUrl: data.repoUrl,
        liveUrl: data.liveUrl,
        title: localizedContent.title,
        summary: localizedContent.summary,
        content: localizedContent.content,
        locale: locale,
    };

    if (localizedContent.progress) {
        localized.currentFocus = localizedContent.progress.currentFocus;
        localized.stories = localizedContent.progress.stories;
        localized.localizedChangelog = localizedContent.progress.changelog.map(entry => ({
            date: entry.date,
            version: entry.version,
            description: entry.description,
        })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return localized as T;
}

export async function getAllProjectMetadata(locale: Locale): Promise<ProjectMetadata[]> {
    const files = await fs.readdir(PROJECTS_DIRECTORY);
    const projectSlugs = files.filter(file => file.endsWith('.json')).map(file => file.replace(/\.json$/, ''));

    const allProjects: ProjectMetadata[] = [];
    for (const slug of projectSlugs) {
        const rawData = await getProjectFileContent(slug);
        if (rawData) {
            const localizedFull = localizeProjectData<ProjectData>(rawData, locale);
            const metadata: ProjectMetadata = {
                slug: localizedFull.slug,
                title: localizedFull.title,
                summary: localizedFull.summary,
                tags: localizedFull.tags,
                imageUrl: localizedFull.imageUrl,
                isFeatured: localizedFull.isFeatured,
                isAcademic: localizedFull.isAcademic,
            };
            allProjects.push(metadata);
        }
    }
    return allProjects;
}

export async function getFeaturedProjects(locale: Locale): Promise<ProjectMetadata[]> {
    const allProjects = await getAllProjectMetadata(locale);
    return allProjects.filter(p => p.isFeatured);
}

export async function getProjectData(slug: string, locale: Locale): Promise<ProjectData | null> {
    const rawData = await getProjectFileContent(slug);
    if (!rawData) return null;
    return localizeProjectData<ProjectData>(rawData, locale);
}

export async function getAllProjectSlugs(): Promise<{ slug: string }[]> {
    const files = await fs.readdir(PROJECTS_DIRECTORY);
    return files.filter(file => file.endsWith('.json')).map(file => ({
        slug: file.replace(/\.json$/, ''),
    }));
}