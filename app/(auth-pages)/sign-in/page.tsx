import { signInAction } from '@/app/actions';
import { FormMessage, Message } from '@/components/ui/form-message';
import { SubmitButton } from '@/components/ui/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TwitterSignIn } from '@/components/ui/twitter-sign-in';
import Link from 'next/link';

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className='rounded-3xl border-2 p-10'>
      <form className='flex min-w-64 flex-1 flex-col'>
        <h1 className='text-2xl font-bold'>Sign in</h1>
        <p className='text-sm text-foreground'>
          Don't have an account?{' '}
          <Link className='font-md text-foreground underline' href='/sign-up'>
            Sign up
          </Link>
        </p>
        <div className='mt-8 flex flex-col gap-2 [&>input]:mb-3'>
          <Label htmlFor='email'>Email</Label>
          <Input name='email' placeholder='you@example.com' required />
          <div className='flex items-center justify-between'>
            <Label htmlFor='password'>Password</Label>
            <Link
              className='text-xs text-foreground underline'
              href='/forgot-password'
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type='password'
            name='password'
            placeholder='Your password'
            required
          />
          <SubmitButton pendingText='Signing In...' formAction={signInAction}>
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
          <TwitterSignIn />
        </div>
      </form>
    </div>
  );
}
