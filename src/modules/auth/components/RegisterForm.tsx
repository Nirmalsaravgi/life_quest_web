'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { registerSchema, RegisterFormInputs } from '@/lib/schemas';
import { registerAction, FormState } from '@/modules/auth/actions';
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
      {pending ? 'Creating account...' : 'Create Account'}
    </Button>
  );
}

export function RegisterForm() {
  const [state, formAction] = useFormState(registerAction, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (state.message && !state.success) {
      // Here you might want to use a toast notification
      console.error('Registration failed:', state.message);
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
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
        
        {state.message && !state.success && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{state.message}</span>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Username"
            type="text"
            {...register('username')}
            error={errors.username?.message ?? state.errors?.username?.[0]}
          />
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message ?? state.errors?.email?.[0]}
          />
          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message ?? state.errors?.password?.[0]}
          />
          <Input
            label="Confirm Password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message ?? state.errors?.confirmPassword?.[0]}
          />
        </div>

        <div className="mt-6">
          <SubmitButton />
        </div>
      </form>
    </Card>
  );
}