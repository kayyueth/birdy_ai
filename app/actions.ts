'use server';

import { encodedRedirect } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpAction = async (formData: FormData) => {
  const username = formData.get('username')?.toString();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const supabase = await createClient();

  if (!username || !email || !password) {
    return 'All fields are required';
  }

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (error) {
      return error.message;
    } else {
      return 'Thanks for signing up! Please check your email for a verification link.';
    }
  } catch (err) {
    const error = err as Error;
    return error.message;
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message);
  }

  return redirect('/seek');
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      'error',
      '/forgot-password',
      'Could not reset password'
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Passwords do not match'
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password update failed'
    );
  }

  encodedRedirect('success', '/protected/reset-password', 'Password updated');
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/sign-in');
};

// Twitter sign-up/sign-in actions
export const signUpWithTwitterAction = async () => {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'twitter',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback'
    }
  });

  if (error) {
    return encodedRedirect('error', '/sign-up', error.message);
  }

  if (data?.url) {
    return redirect(data.url);
  }

  return encodedRedirect('error', '/sign-up', 'Could not connect to Twitter');
};

export const signInWithTwitterAction = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'twitter',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback'
    }
  });

  if (error) return encodedRedirect('error', '/sign-in', error.message);
  if (data?.url) return redirect(data.url);
  return encodedRedirect('error', '/sign-in', 'Could not connect to Twitter');
};
