'use client';
import ContactForm from '../components/ui/ContactForm';
import Link from 'next/link';
import { useLocale } from '@/app/contexts/LocaleContext';
import { translations } from '@/lib/translations';
import { GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL, PHONE_NUMBER_HREF, EMAIL_ADDRESS_HREF, PHONE_NUMBER, EMAIL_ADDRESS } from '@/lib/constants';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';
import SectionTitle from '@/app/components/layout/SectionTitle';

export default function ContactPage() {
  const { locale } = useLocale();
  const dict = translations[locale];

  return (
    <section className="max-w-xl mx-auto py-12 md:py-16">
      <h1 className="font-bold mb-6 text-center text-[var(--text-primary)]">{dict.contactTitle}</h1>
      <p className="text-lg text-center text-[var(--text-secondary)] mb-10">
         {dict.contactSubtitle}
      </p>

      <div className="mb-12 bg-[var(--bg-subtle)] p-6 md:p-8 rounded-lg shadow-[var(--shadow-lg)] border border-[var(--border-primary)]">
         <h2 className="text-2xl font-semibold mb-6 text-center text-[var(--text-primary)]">{locale === 'es' ? 'Enviar un Mensaje' : 'Send a Message'}</h2>
         <ContactForm />
      </div>

      <div className="text-center">
        <SectionTitle as="h3" className="text-2xl border-none mb-6">{dict.contactFindMe}</SectionTitle>
        <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-4 text-base">
           <a href={EMAIL_ADDRESS_HREF} className="inline-flex items-center gap-2 unstyled text-[var(--text-accent)] hover:brightness-115 font-medium group"> <Mail size={20} className="transition-transform group-hover:scale-110"/> Email </a>
           <span className="text-[var(--text-subtle)] hidden sm:inline">|</span>
           <a href={PHONE_NUMBER_HREF} className="inline-flex items-center gap-2 unstyled text-[var(--text-accent)] hover:brightness-115 font-medium group"> <Phone size={20} className="transition-transform group-hover:scale-110"/> {locale === 'es' ? 'Teléfono' : 'Phone'} </a>
           <span className="text-[var(--text-subtle)] hidden sm:inline">|</span>
          <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="inline-flex items-center gap-2 unstyled text-[var(--text-accent)] hover:brightness-115 font-medium group"> <Github size={20} className="transition-transform group-hover:scale-110"/> GitHub </a>
           <span className="text-[var(--text-subtle)] hidden sm:inline">|</span>
          <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="inline-flex items-center gap-2 unstyled text-[var(--text-accent)] hover:brightness-115 font-medium group"> <Linkedin size={20} className="transition-transform group-hover:scale-110"/> LinkedIn </a>
        </div>
      </div>
    </section>
  );
}
