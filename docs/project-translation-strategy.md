# Project Translation Strategy

This document outlines a proposed strategy for managing project translations effectively within the Next.js application.

## 1. Data Structure Recommendation

A file-based approach is recommended, utilizing a single JSON file per project to contain all its metadata and nested translations for translatable fields. This centralizes all project-related data, making it easier to manage and scale for multiple languages.

*   **Location:** A new directory, `data/projects/`, will be created. Each project will have its own JSON file named after its slug (e.g., `data/projects/ear-training-app.json`).
*   **Structure:** Each JSON file will contain:
    *   **Base Metadata:** Non-translatable fields such as `slug`, `tags`, `imageUrl`, `isFeatured`, `isAcademic`, `repoUrl`, and `liveUrl`.
    *   **Translations Object:** A nested object named `translations` where each key is a locale code (e.g., `en`, `es`), and its value is an object containing all translatable fields for that locale.

**Example JSON Structure (`data/projects/[slug].json`):**

```json
{
  "slug": "ear-training-app",
  "tags": ["Next.js", "Appwrite", "Tailwind"],
  "imageUrl": "/images/hospital.png",
  "isFeatured": true,
  "isAcademic": false,
  "repoUrl": "https://github.com/...",
  "liveUrl": "https://liveurl.com",
  "translations": {
    "en": {
      "title": "Ear Training Web Application",
      "summary": "Application to help musicians train their musical ear, with an Appwrite backend.",
      "content": "<p>English HTML content...</p>",
      "progress": {
        "currentFocus": "Implementing authentication and interval module.",
        "stories": [
          { "id": "ET-001", "title": "User Authentication", "asA": "Musician", "iWant": "to sign up and log in", "soThat": "I can save my progress", "status": "In Progress" }
        ],
        "changelog": [
          { "date": "2024-07-15", "version": "v0.1.0", "description": "Initial project setup." }
        ]
      }
    },
    "es": {
      "title": "Aplicación Web de Entrenamiento Auditivo",
      "summary": "Aplicación para ayudar a músicos a entrenar su oído musical, con backend en Appwrite.",
      "content": "<p>Contenido HTML en español...</p>",
      "progress": {
        "currentFocus": "Implementando autenticación y módulo de intervalos.",
        "stories": [
          { "id": "ET-001", "title": "Autenticación de Usuario", "asA": "Músico", "iWant": "registrarme e iniciar sesión", "soThat": "pueda guardar mi progreso", "status": "En Progreso" }
        ],
        "changelog": [
          { "date": "2024-07-15", "version": "v0.1.0", "description": "Setup inicial del proyecto." }
        ]
      }
    }
  }
}
```

## 2. Workflow for Translation

This workflow outlines the steps for adding and managing translations:

1.  **Initial Content Creation:** When a new project is added or an existing one is updated, the content for the primary language (e.g., Spanish) is written directly into the `es` key within the `translations` object of the project's JSON file (e.g., `data/projects/new-project.json`).
2.  **Translation Extraction:** The content from the primary language (`es`) is then extracted. This can be done manually by copying the text or, for larger projects, by using a simple script that parses the JSON files and extracts strings marked for translation.
3.  **Translation Process:** The extracted text is sent to a translator or a translation service.
4.  **Translation Integration:** Once translated content is received, it is carefully placed into the corresponding locale keys (e.g., `en`) within the same project's JSON file.
5.  **Review and Validation:** The integrated translations are reviewed for accuracy, consistency, and proper formatting. Automated JSON schema validation can be implemented to ensure the structural integrity of the translation files.
6.  **Version Control:** All changes to these project JSON files are committed to version control (e.g., Git) to track history and facilitate collaboration.

## 3. Integration with Existing System

The proposed data structure integrates seamlessly with the existing Next.js application with modifications primarily concentrated in `lib/projects.ts`.

*   **`lib/projects.ts` Modifications:**
    *   The `RawProjectData` and `RawProjectContent` types would be updated to reflect the new nested `translations` object, removing the `_es` and `_en` suffixes from individual fields.
    *   The `getAllProjectMetadata`, `getFeaturedProjects`, and `getProjectData` functions would be refactored to:
        1.  Read all project JSON files from the `data/projects/` directory.
        2.  For each project, dynamically access the `translations[locale]` object based on the `locale` parameter passed to the function.
        3.  Construct the `ProjectMetadata` or `ProjectData` object by mapping the localized fields from the `translations[locale]` object to the expected top-level properties (e.g., `title`, `summary`, `content`).
    *   This ensures that the functions continue to return `ProjectMetadata` and `ProjectData` objects with direct `title`, `summary`, `content` properties, just as they do now.

*   **`app/projects/page.tsx` and `app/components/projects/ProjectCard.tsx`:**
    *   These components already receive `ProjectMetadata` or `ProjectData` objects that have `title`, `summary`, and other fields directly. Since `lib/projects.ts` would handle the localization logic before passing the data, these components would require minimal to no changes. They would continue to consume the data in the same way, unaware of the underlying translation structure. The `locale` prop is already being passed down, which is crucial for fetching the correct translation.