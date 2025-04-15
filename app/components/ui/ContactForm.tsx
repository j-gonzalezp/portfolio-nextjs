'use client';
import React, { useState } from 'react';
import Button from './Button';
import { useLocale } from '@/app/contexts/LocaleContext';
import { translations } from '@/lib/translations';

export default function ContactForm() {
  const { locale } = useLocale();
  const dict = translations[locale];
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const inputStyles = "w-full px-4 py-3 border border-[var(--border-primary)] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring-color)] focus:border-transparent bg-[var(--bg-primary)] text-[var(--text-primary)] disabled:opacity-50 text-base placeholder:text-[var(--text-subtle)] transition-colors duration-150";
  const labelStyles = "block text-sm font-medium text-[var(--text-primary)] mb-2";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className={labelStyles}>{dict.contactFormName}</label>
        <input type="text" name="name" id="name" required autoComplete='name' value={formData.name} onChange={handleChange} className={inputStyles} disabled={status === 'loading'} placeholder={locale === 'es' ? 'Tu nombre completo' : 'Your full name'} />
      </div>
      <div>
        <label htmlFor="email" className={labelStyles}>{dict.contactFormEmail}</label>
        <input type="email" name="email" id="email" required autoComplete='email' value={formData.email} onChange={handleChange} className={inputStyles} disabled={status === 'loading'} placeholder={locale === 'es' ? 'tu@email.com' : 'you@email.com'} />
      </div>
      <div>
        <label htmlFor="message" className={labelStyles}>{dict.contactFormMessage}</label>
        <textarea name="message" id="message" required rows={5} value={formData.message} onChange={handleChange} className={inputStyles} disabled={status === 'loading'} placeholder={locale === 'es' ? 'Escribe tu mensaje aquí...' : 'Write your message here...'} />
      </div>
      <div className="pt-3">
        <Button type="submit" disabled={status === 'loading'} className="w-full" size="lg" variant="primary">
          {status === 'loading' ? dict.contactFormSending : dict.contactFormSend}
        </Button>
      </div>

      <div className="h-6 mt-4 text-center">
        {status === 'success' && (<p className="text-[var(--color-success-fixed)] font-medium">{feedbackMessage}</p>)}
        {status === 'error' && (<p className="text-[var(--color-danger-fixed)] font-medium">{dict.contactFormError} {feedbackMessage}</p>)}
      </div>
    </form>
  );
}
