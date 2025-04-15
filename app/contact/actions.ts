'use server';

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

  try {

    await new Promise(resolve => setTimeout(resolve, 1000));
    const emailSentSuccessfully = true;

    if (emailSentSuccessfully) {
        return { message: '¡Mensaje enviado con éxito!', status: 'success', errors: null };
    } else {
        return { message: 'Hubo un problema al enviar el mensaje.', status: 'error', errors: null };
    }

  } catch (error) {
    console.error('Error en Server Action (submitContactForm):', error);
    return {
        message: 'Ocurrió un error inesperado en el servidor.',
        status: 'error',
        errors: null
    };
  }
}
