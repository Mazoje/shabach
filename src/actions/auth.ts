'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function adminLoginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Default secure admin credentials (can be overridden in .env.local)
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@shabachempire.com';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'shabach2026';

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('shabach_admin_session', 'authenticated_true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week session
      path: '/',
    });

    redirect('/admin/properties');
  } else {
    return { success: false, error: 'Invalid administrator credentials.' };
  }
}

export async function adminLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('shabach_admin_session');
  redirect('/admin/login');
}