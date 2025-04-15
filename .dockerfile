# Stage 1: Builder - Instalar dependencias y construir la aplicación
FROM node:20-alpine AS builder
WORKDIR /app

# Instalar dependencias necesarias para construir (como python, make, g++) si son necesarias para alguna dependencia nativa
# RUN apk add --no-cache libc6-compat python3 make g++

# Copiar archivos de definición de dependencias
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Instalar TODAS las dependencias (incluyendo devDependencies necesarias para el build)
# Usar 'npm ci' o 'yarn install --frozen-lockfile' o 'pnpm i --frozen-lockfile' para asegurar builds reproducibles
RUN yarn install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Next.js
# NEXT_PUBLIC_BASE_URL podría necesitarse en tiempo de build si se usa en generateMetadata estáticamente
# ARG NEXT_PUBLIC_BASE_URL
# ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
RUN yarn build

# Stage 2: Runner - Crear la imagen final de producción
FROM node:20-alpine AS runner
WORKDIR /app

# Establecer entorno de producción
ENV NODE_ENV production
# Deshabilitar telemetría de Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Crear un usuario y grupo no root para seguridad
RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs

# Copiar artefactos de build necesarios desde el stage 'builder'
# Esto usa la salida 'standalone' de Next.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static

# Cambiar al usuario no root
USER nextjs

# Exponer el puerto en el que corre la aplicación Next.js (por defecto 3000)
EXPOSE 3000

# Establecer el puerto para la aplicación (opcional, Next.js lo detecta por defecto)
ENV PORT 3000

# Comando para iniciar el servidor Next.js en modo standalone
CMD ["node", "server.js"]