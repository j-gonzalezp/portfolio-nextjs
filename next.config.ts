// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // O tu configuración existente
  // Añade esta línea:
  output: 'standalone',
};

module.exports = nextConfig;