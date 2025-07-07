import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { Inter, Source_Serif_4 } from 'next/font/google';
import { getLocale } from './actions';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const sourceSerif = Source_Serif_4({
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700', '800'],
    style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Joaquín González Parada',
    default: 'Joaquín González Parada - Desarrollador Full Stack',
  },
  description: 'Portafolio personal de Joaquín González Parada, mostrando proyectos Full Stack con énfasis en Next.js, React y Appwrite.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${sourceSerif.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
        <ThemeProvider>
          <LocaleProvider initialLocale={locale}>
            <div className={`min-h-screen flex flex-col font-sans bg-[var(--bg-primary)]`}>
              <Navbar />
              <main id="main-content" className="flex-grow w-full container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 pt-28 md:pt-32">
                {children}
              </main>
              <Footer />
            </div>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
