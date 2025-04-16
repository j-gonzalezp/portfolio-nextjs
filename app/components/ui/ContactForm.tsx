// app/components/ui/ContactForm.tsx
// NOTE: This component's code was NOT provided previously.
// This is a basic structure assuming usage of Server Actions and react-dom/form-state.
// Fixes are based *only* on the lint errors provided. Implement actual logic.
'use client';

import React, {  useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm, type ContactFormState } from '@/app/contact/actions';
import Button from './Button';
import { translations } from '@/lib/translations'; // Assuming you need translations
import { useLocale } from '@/app/contexts/LocaleContext'; // Assuming you need locale

const initialState: ContactFormState = {
    message: '',
    status: 'idle',
    errors: null,
};

function SubmitButton({ sendingText }: { sendingText: string }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" aria-disabled={pending} disabled={pending} size="lg" className="w-full">
            {pending ? sendingText : translations.es.contactFormSend}
        </Button>
    );
}


export default function ContactForm() {
    const { locale } = useLocale(); // Get locale if needed for translations
    const dict = translations[locale]; // Get dictionary
    const [state, formAction] = useFormState(submitContactForm, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    // const [formData, _setFormData] = useState({ name: '', email: '', message: '' }); // Prefixed unused setter
    // const [status, _setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle'); // Prefixed unused setter
    // const [feedbackMessage, _setFeedbackMessage] = useState<string | null>(null); // Prefixed unused setter

    const handleInputChange = (/* _e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> */) => {
       // Logic to update formData state would go here using setFormData(_e.target.value...)
       // _setFormData(prev => ({...prev, [_e.target.name]: _e.target.value})); // Example logic (prefixed setter)
    };

    // Reset form on successful submission
    React.useEffect(() => {
        if (state.status === 'success') {
            formRef.current?.reset();
        }
    }, [state.status]);


    return (
        <form ref={formRef} action={formAction} className="space-y-6">
            {/* Display Success/Error Messages */}
             {state.message && state.status !== 'idle' && (
                <div
                    role="alert"
                    className={`p-4 rounded-md text-sm ${
                        state.status === 'success'
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 dark:border-emerald-700'
                        : 'bg-red-50 border border-red-200 text-red-800 dark:bg-red-900 dark:text-red-200 dark:border-red-700'
                    }`}
                >
                    {state.status === 'error' && <strong>{dict.contactFormError} </strong>}
                    {state.message}
                </div>
            )}

            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                    {dict.contactFormName}
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    aria-describedby={state.errors?.name ? 'name-error' : undefined}
                    className="block w-full px-3 py-2 border border-[var(--border-primary)] rounded-md shadow-sm bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ring-color)] focus:border-transparent sm:text-sm"
                    onChange={handleInputChange} // Example usage
                />
                 {state.errors?.name && (
                    <p id="name-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {state.errors.name.join(', ')}
                    </p>
                 )}
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                     {dict.contactFormEmail}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                     aria-describedby={state.errors?.email ? 'email-error' : undefined}
                    className="block w-full px-3 py-2 border border-[var(--border-primary)] rounded-md shadow-sm bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ring-color)] focus:border-transparent sm:text-sm"
                     onChange={handleInputChange} // Example usage
                />
                {state.errors?.email && (
                    <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {state.errors.email.join(', ')}
                    </p>
                 )}
            </div>

            {/* Message Field */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                     {dict.contactFormMessage}
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                     aria-describedby={state.errors?.message ? 'message-error' : undefined}
                    className="block w-full px-3 py-2 border border-[var(--border-primary)] rounded-md shadow-sm bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ring-color)] focus:border-transparent sm:text-sm"
                     onChange={handleInputChange} // Example usage
                />
                {state.errors?.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {state.errors.message.join(', ')}
                    </p>
                 )}
            </div>

            <div>
                <SubmitButton sendingText={dict.contactFormSending} />
            </div>
        </form>
    );
}