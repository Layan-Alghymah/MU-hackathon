import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas';
import { useAuth } from '@/app/providers/AuthContext';
import { AuthError } from '@/features/auth/services/authService';
import { getAuthErrorMessage } from '@/features/auth/errorMessages';
import { AuthCardHeader } from '@/features/auth/components/AuthCardHeader';
import { useFormFeedback } from '@/hooks/useFormFeedback';
import { FormAlert } from '@/components/shared/FormAlert';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const feedback = useFormFeedback();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    feedback.clear();
    try {
      await login(values);
      const redirectTo = (location.state as { from?: string } | null)?.from ?? '/innovator/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      feedback.setError(getAuthErrorMessage(error instanceof AuthError ? error.code : undefined));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <AuthCardHeader title="تسجيل الدخول" description="أدخل بيانات حسابك للوصول إلى لوحة المبتكر." />

      <FormAlert message={feedback.message} tone={feedback.tone} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <Input
          label="البريد الإلكتروني"
          type="email"
          autoComplete="email"
          autoFocus
          required
          error={errors.email?.message}
          {...register('email')}
        />

        <PasswordInput
          label="كلمة المرور"
          autoComplete="current-password"
          required
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" size="lg" isLoading={isSubmitting} disabled={isSubmitting} className="w-full">
          تسجيل الدخول
        </Button>

        <Link
          to="/forgot-password"
          className="self-center text-sm font-medium text-brand-800 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 rounded-control"
        >
          نسيت كلمة المرور؟
        </Link>
      </form>
    </div>
  );
}
