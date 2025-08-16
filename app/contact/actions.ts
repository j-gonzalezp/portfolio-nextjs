// app/contact/actions.ts
'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

export type ContactFormState = {
    message: string;
    status: 'success' | 'error' | 'idle';
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    } | null;
};


export async function submitContactForm(
    prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {

  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
        message: "Error de validación. Por favor, revisa los campos.",
        status: 'error',
        errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validatedFields.data;

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'joaquin.gonzalezparada@gmail.com',
      subject: `Nuevo mensaje de ${name} (Portafolio)`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return { message: '¡Mensaje enviado con éxito!', status: 'success', errors: null };
  } catch (error) {
    console.error('Error al enviar el email con Resend:', error);
    return {
      message: 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.',
      status: 'error',
      errors: null
    };
  }
}