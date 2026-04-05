'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { loginSchema, LoginFormInputs } from '@/lib/schemas';
import { loginAction, FormState } from '@/modules/auth/actions';
import { Input } from '@/core/components/Input';
import { Button } from '@/core/components/Button';
import { Card } from '@/core/components/Card';

const initialState: FormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Logging in...' : 'Login'}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (state.message && !state.success) {
      // Here you might want to use a toast notification
      console.error('Login failed:', state.message);
    }
  }, [state]);

  return (
    <Card>
      <form onSubmit={handleSubmit((data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formAction(formData);
      })}>
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        
        {state.message && !state.success && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{state.message}</span>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
        </div>

        <div className="mt-6">
          <SubmitButton />
        </div>
      </form>
    </Card>
  );
}