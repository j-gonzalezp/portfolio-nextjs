
'use client';
import React from 'react';
import Link from 'next/link';
import { useLocale } from '@/app/contexts/LocaleContext';
import { translations } from '@/lib/translations';
import { GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL, PHONE_NUMBER_HREF, PHONE_NUMBER } from '@/lib/constants';
import SkillsCard, { TechnicalSkillItem } from '@/app/components/features/about/SkillsCard';
import SectionTitle from '@/app/components/layout/SectionTitle';
import { Mail, Phone, Linkedin, Github, GraduationCap, Briefcase, Languages } from 'lucide-react';

interface ExperienceItem { title: string; place: string; years: string; }
interface EducationItem { title: string; place: string; years: string; }
interface LanguageItem { lang: string; level: string; }

export default function AboutPage() {
  const { locale } = useLocale();
  const dict = translations[locale];

   const experience: ExperienceItem[] = locale === 'es' ? [ { title: "Desarrollador Full Stack (DevOps)", place: "Pinflag", years: "(Septiembre 2025 - Presente)" }, { title: "Desarrollador Front-End (React Native)", place: "OneApps Solutions Spa", years: "(Enero 2025 - Agosto 2025)" }, { title: "Profesor de Matemática", place: "I. Agrícola Pascual Baburriza", years: "(2024)" }, { title: "Profesor de Matemática", place: "Colegio Virtual (Remoto)", years: "(2023)" }, { title: "Profesional Docente", place: "DUOC UC, Valparaíso", years: "(2020 - 2023)" }, ] : [ { title: "Full Stack Developer (DevOps)", place: "Pinflag", years: "(September 2025 - Present)" }, { title: "Front-End Developer (React Native)", place: "OneApps Solutions Spa", years: "(January 2025 - August 2025)" }, { title: "Mathematics Teacher", place: "I. Agrícola Pascual Baburriza", years: "(2024)" }, { title: "Mathematics Teacher", place: "Colegio Virtual (Remote)", years: "(2023)" }, { title: "Professional Instructor", place: "DUOC UC, Valparaíso", years: "(2020 - 2023)" }, ];
   const education: EducationItem[] = locale === 'es' ? [ { title: "Bootcamp Full Stack JavaScript", place: "Talento Digital", years: "(2024)" }, { title: "Especialización Front-End", place: "Adalid", years: "(2025)" }, { title: "Estudiante de Ciencia de Datos", place: "Actualmente", years: "" }, { title: "Pedagogía en Matemática", place: "Pontificia Universidad Católica de Chile", years: "(Titulado 2019)" }, ] : [ { title: "Full Stack JavaScript Bootcamp", place: "Talento Digital", years: "(2024)" }, { title: "Front-End Specialization", place: "Adalid", years: "(2025)" }, { title: "Data Science Student", place: "Currently", years: "" }, { title: "Pedagogy in Mathematics", place: "Pontificia Universidad Católica de Chile", years: "(Graduated 2019)" }, ];
   const languages: LanguageItem[] = locale === 'es' ? [ { lang: "Español", level: "Nativo" }, { lang: "Inglés", level: "Avanzado (C1), certificado TOEFL" }, ] : [ { lang: "Spanish", level: "Native" }, { lang: "English", level: "Advanced (C1), TOEFL certified" }, ];
   const softSkills: string[] = locale === 'es' ? ['Trabajo en equipo', 'Comunicación efectiva', 'Relaciones interpersonales', 'Resolución de problemas', 'Aprendizaje continuo', 'Curiosidad'] : ['Teamwork', 'Effective Communication', 'Interpersonal Skills', 'Problem Solving', 'Continuous Learning', 'Curiosity'];
   const technicalSkills: TechnicalSkillItem[] = [ { category: "Front-End", skills: "React, React Native, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS" }, { category: "Back-End", skills: "Node.js, Express, Python, SQL, APIs RESTful" }, { category: "Cloud & DevOps", skills: "AWS, Git, CI/CD (nociones), Docker (nociones)" }, { category: "Bases de Datos", skills: "PostgreSQL, Supabase, Appwrite" }, { category: "Herramientas", skills: "GitHub, VS Code, Jira, Figma" }, ];

  return (
    <section className="max-w-3xl mx-auto">
      <h1 className="font-bold text-center mb-12 md:mb-16 text-[var(--text-primary)]">{dict.aboutTitle}</h1>

      <div className="space-y-12 md:space-y-16">

         <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none text-center">
             <blockquote className="relative text-xl md:text-2xl italic text-[var(--text-primary)] font-semibold border-none p-0 not-prose my-8 before:content-['“'] before:absolute before:left-[-0.6em] before:top-[-0.2em] before:text-6xl before:text-[var(--text-accent)] before:opacity-30 after:content-['”'] after:absolute after:right-[-0.6em] after:bottom-[-0.4em] after:text-6xl after:text-[var(--text-accent)] after:opacity-30">
                {dict.aboutQuote}
             </blockquote>
         </div>
         <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none">
             <p>
              {locale === 'es' ? 'Desarrollador Full Stack con experiencia en JavaScript, TypeScript, React, React Native, Node.js y AWS. Mi experiencia como Profesor de Matemática me ha dotado de una capacidad analítica avanzada y habilidades de comunicación excepcionales para simplificar problemas complejos. Busco integrarme a un equipo dinámico para construir productos de alto impacto, aplicando mi versatilidad técnica y mi enfoque en la experiencia de usuario para crear soluciones eficientes y escalables.' : 'Full Stack Developer with experience in JavaScript, TypeScript, React, React Native, Node.js, and AWS. My experience as a Mathematics Teacher has provided me with advanced analytical skills and exceptional communication abilities to simplify complex problems. I am looking to join a dynamic team to build high-impact products, applying my technical versatility and focus on user experience to create efficient and scalable solutions.'}
            </p>
         </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            <SkillsCard title={dict.aboutSkillsTechnical} skills={technicalSkills} type="technical" />
            <SkillsCard title={dict.aboutSkillsSoft} skills={softSkills} type="soft" />
        </div>

        <section aria-labelledby="experience-heading" className='not-prose'>
            <SectionTitle id="experience-heading" className="flex items-center gap-2">
                <Briefcase size={22} strokeWidth={2.5}/> {dict.aboutExperience}
            </SectionTitle>
             <dl className="space-y-4 border-l-2 border-[var(--border-secondary)] pl-6 ml-2">
                 {experience.map((item, index) => (
                     <div key={index} className="relative before:content-[''] before:absolute before:w-3 before:h-3 before:bg-[var(--border-secondary)] before:rounded-full before:left-[-31px] before:top-[6px] before:border-2 before:border-[var(--bg-subtle)]">
                         <dt className="font-semibold text-[var(--text-primary)]">{item.title}</dt>
                         <dd className="text-[var(--text-secondary)]">
                            {item.place} <span className="text-[var(--text-subtle)] text-sm block sm:inline">{item.years}</span>
                         </dd>
                     </div>
                 ))}
             </dl>
         </section>

        <section aria-labelledby="education-heading" className='not-prose'>
            <SectionTitle id="education-heading" className="flex items-center gap-2">
                <GraduationCap size={22} strokeWidth={2.5}/> {dict.aboutEducation}
            </SectionTitle>
            <dl className="space-y-4 border-l-2 border-[var(--border-secondary)] pl-6 ml-2">
                 {education.map((item, index) => (
                     <div key={index} className="relative before:content-[''] before:absolute before:w-3 before:h-3 before:bg-[var(--border-secondary)] before:rounded-full before:left-[-31px] before:top-[6px] before:border-2 before:border-[var(--bg-subtle)]">
                         <dt className="font-semibold text-[var(--text-primary)]">{item.title}</dt>
                         <dd className="text-[var(--text-secondary)]">
                             {item.place} <span className="text-[var(--text-subtle)] text-sm block sm:inline">{item.years}</span>
                         </dd>
                     </div>
                 ))}
            </dl>
         </section>

         <section aria-labelledby="languages-heading" className='not-prose'>
            <SectionTitle id="languages-heading" className="flex items-center gap-2">
                <Languages size={22} strokeWidth={2.5}/> {dict.aboutLanguages}
            </SectionTitle>
            <dl className="about-languages-dl ml-2">
                 {languages.map((item, index) => (
                     <React.Fragment key={index}>
                         <dt className="font-semibold text-[var(--text-primary)]">{item.lang}:</dt>
                         <dd className="text-[var(--text-secondary)]">{item.level}</dd>
                     </React.Fragment>
                 ))}
            </dl>
         </section>

        <section aria-labelledby="contact-heading" className='not-prose'>
            <SectionTitle id="contact-heading">{dict.aboutContact}</SectionTitle>
            <div className="text-base md:text-lg text-[var(--text-secondary)] space-y-3 ml-2">
                 <p>
                    <Link href="/contact" className="inline-flex items-center gap-1.5 font-medium unstyled text-[var(--text-accent)] hover:brightness-115 group">
                        <Mail size={18} className="transition-transform group-hover:scale-110" />
                        <span>{locale === 'es' ? 'Envíame un mensaje' : 'Send me a message'}</span>
                    </Link>
                 </p>
                 <p>
                    <a href={PHONE_NUMBER_HREF} className="inline-flex items-center gap-1.5 font-medium unstyled text-[var(--text-accent)] hover:brightness-115 group">
                         <Phone size={18} className="transition-transform group-hover:scale-110" />
                         <span>{PHONE_NUMBER}</span>
                    </a>
                 </p>
                 <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
                      <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noopener noreferrer" aria-label="Perfil de LinkedIn" className="inline-flex items-center gap-1.5 font-medium unstyled text-[var(--text-accent)] hover:brightness-115 group">
                         <Linkedin size={20} className="transition-transform group-hover:scale-110" />
                         <span className="hidden sm:inline">LinkedIn</span>
                      </a>
                      <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" aria-label="Perfil de GitHub" className="inline-flex items-center gap-1.5 font-medium unstyled text-[var(--text-accent)] hover:brightness-115 group">
                         <Github size={20} className="transition-transform group-hover:scale-110" />
                          <span className="hidden sm:inline">GitHub</span>
                      </a>

                 </div>
            </div>
        </section>
      </div>
    </section>
  );
}
