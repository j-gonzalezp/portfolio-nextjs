# Recordatorio de Personalización del Portafolio (Tailwind v4 Alpha)

Este archivo lista los puntos clave que necesitas actualizar con tu información y contenido real, considerando la configuración de Tailwind v4 alpha.

**I. Información Personal y Contacto:**

*   **`app/about/page.tsx`**:
    *   Revisar/expandir la sección "Sobre Mí".
    *   Verificar "Aptitudes Técnicas" y "Blandas".
    *   Verificar "Experiencia Profesional" y "Formación".
    *   **IMPORTANTE:** Reemplazar `TU_PERFIL_LINKEDIN` y `TU_USUARIO_GITHUB`.
    *   (Opcional) Añadir enlace a CV en `/public/resume.pdf`.
*   **`app/contact/page.tsx`**:
    *   Verificar email y teléfono.
    *   **IMPORTANTE:** Reemplazar `TU_USUARIO_GITHUB` y `TU_PERFIL_LINKEDIN`.
    *   Añadir otras redes si aplica.
*   **`app/api/contact/route.ts`**:
    *   **IMPORTANTE:** Implementar lógica real de envío de correo (Resend, SendGrid, etc.) o guardado en DB (¡posible uso de Appwrite aquí!). Configurar variables de entorno para claves API.

**II. Datos de Proyectos:**

*   **`lib/projects.ts` (Actualmente con datos placeholder):**
    *   **IMPORTANTE:** Reemplazar `TU_USUARIO_GITHUB` en `repoUrl`.
    *   **Proyecto Final Académico (`academic-project-final`):**
        *   Ajustar `title`, `summary`, `tags`.
        *   Reemplazar `URL_DESPLIEGUE_PROYECTO_FINAL` en `liveUrl`.
        *   Actualizar `content` (detalles, feedback, mejoras).
        *   Añadir `imageUrl`.
    *   **Otros Proyectos Académicos:**
        *   Crear entradas para cada uno.
        *   Ajustar `slug`, `title`, `summary`, `tags`, `repoUrl`, `liveUrl`, `content`.
    *   **Proyectos Personales (`ear-training-app`, `interactive-journal`):**
        *   Mantener `Appwrite` destacado.
        *   Actualizar `summary`, `content`, `liveUrl` (cuando se despliegue).
        *   Actualizar `status`, `roadmap`, `changelog` periódicamente.
        *   **IMPORTANTE:** Reemplazar `imageUrl` con rutas reales en `/public/images/`.
    *   **Implementación Futura:** Considerar mover datos a `/content/projects/` (archivos `.mdx` o `.json`) y actualizar `lib/projects.ts` para leerlos (usando `gray-matter`, `next-mdx-remote`, `contentlayer`, etc.).

**III. Contenido Visual:**

*   **`/public/images/`**:
    *   Añadir imágenes reales para proyectos (capturas). Nombres deben coincidir con `imageUrl`.
    *   (Opcional) Añadir foto profesional si se usa en `app/about/page.tsx`.
    *   (Opcional) Añadir CV en PDF (`resume.pdf`).
*   **`app/favicon.ico`**: Reemplazar con tu propio favicon.

**IV. Estilos y Diseño (Tailwind v4 Alpha):**

*   **`app/globals.css`**:
    *   **Personalización del Tema:** Si necesitas añadir colores, fuentes, breakpoints personalizados, etc., hazlo dentro del bloque `@theme { ... }`.
    *   **Estilos Base:** Ajusta estilos en `@layer base` si es necesario (ej. `body`, fuentes globales).
    *   **Componentes Personalizados:** Si usas `@apply` para clases reutilizables, defínelas en `@layer components`.
*   Revisar componentes y páginas para ajustar clases de Tailwind y lograr el diseño deseado.

**V. Funcionalidad Adicional:**

*   **Navbar Móvil (`app/components/layout/Navbar.tsx`)**: Implementar lógica para menú hamburguesa.
*   **MDX:** Si usas MDX para contenido de proyectos, instala y configura las herramientas necesarias (`next-mdx-remote`, `contentlayer`) y ajusta `getProjectData`.

¡Nuevamente, gracias por la corrección! Este enfoque debería alinearse mejor con las últimas versiones de Next.js y Tailwind.