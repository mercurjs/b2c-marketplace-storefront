'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FieldError, FieldValues, FormProvider, useForm, useFormContext } from 'react-hook-form';

import { Button } from '@/components/atoms';
import { Alert } from '@/components/atoms/Alert/Alert';
import { LabeledInput } from '@/components/cells';
import { login } from '@/lib/data/customer';
import { toast } from '@/lib/helpers/toast';

import { LoginFormData, loginFormSchema } from './schema';

export const LoginForm = () => {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
};

const Form = () => {
  const [isAuthError, setIsAuthError] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useFormContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSessionExpired = searchParams.get('sessionExpired') === 'true';
  const isSessionRequired = searchParams.get('sessionRequired') === 'true';

  const submit = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    const res = await login(formData);
    if (res) {
      // Temporary solution. API returns 200 code in case of auth error. To change when API is updated.
      const isCredentialsError =
        res.toLowerCase().includes('invalid email or password') ||
        res.toLowerCase().includes('unauthorized') ||
        res.toLowerCase().includes('incorrect') ||
        res.toLowerCase().includes('credentials');

      setIsAuthError(isCredentialsError);

      const errorMessage = isCredentialsError ? 'Incorrect email or password' : res;

      toast.error({ title: errorMessage || 'An error occurred. Please try again.' });
      return;
    }
    setIsAuthError(false);
    router.push('/user');
  };

  const clearApiError = () => {
    isAuthError && setIsAuthError(false);
  };

  const getAuthMessage = () => {
    if (isSessionExpired) {
      return 'Your session has expired. Please log in to continue.';
    }
    if (isSessionRequired) {
      return 'Please log in to continue.';
    }
    return null;
  };

  const authMessage = getAuthMessage();

  return (
    <main className="container">
      <div className="mx-auto mt-6 w-full max-w-xl space-y-4">
        {authMessage && (
          <Alert
            title={authMessage}
            className="w-full"
            icon
          />
        )}
        <div className="rounded-sm border p-4">
          <h1 className="heading-md mb-8 uppercase text-primary">Log in</h1>
          <form onSubmit={handleSubmit(submit)}>
            <div className="space-y-4">
              <LabeledInput
                label="E-mail"
                placeholder="Your e-mail address"
                error={
                  (errors.email as FieldError) ||
                  (isAuthError ? ({ message: '' } as FieldError) : undefined)
                }
                {...register('email', {
                  onChange: clearApiError
                })}
              />
              <LabeledInput
                label="Password"
                placeholder="Your password"
                type="password"
                error={
                  (errors.password as FieldError) ||
                  (isAuthError ? ({ message: '' } as FieldError) : undefined)
                }
                {...register('password', {
                  onChange: clearApiError
                })}
              />
            </div>

            {/* TODO: Add forgot password link when forgot password page is implemented */}
            {/* <Link href="/user/forgot-password" className="block text-right label-md uppercase text-action-on-secondary mt-4">
              Forgot your password?
            </Link> */}

            <Button
              className="mt-8 w-full uppercase"
              disabled={isSubmitting}
            >
              Log in
            </Button>
          </form>
        </div>

        <div className="rounded-sm border p-4">
          <h2 className="heading-md mb-4 uppercase text-primary">
            Don&apos;t have an account yet?
          </h2>
          <Link href="/register">
            <Button
              variant="tonal"
              className="mt-8 flex w-full justify-center uppercase"
            >
              Create account
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};
