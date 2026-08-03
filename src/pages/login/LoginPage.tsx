import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/features/auth';
import { AuthLayout } from '@/components';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { emailSchema, passwordSchemaLogin } from '@/entities/user';
import { db } from '@/shared/api';

const formSchema = z.object({
  email: emailSchema,
  password: passwordSchemaLogin,
});

type LoginFormValues = z.infer<typeof formSchema>;

export function LoginPage() {
  const isLoading = useAuthStore((state) => state.isLoading);
  const setLoading = useAuthStore((state) => state.setLoading);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
  });

  const getInputValidationClass = (fieldName: keyof LoginFormValues) => {
    const hasError = !!errors[fieldName];
    const isTouched = !!touchedFields[fieldName];
    const isDirty = !!dirtyFields[fieldName];

    if (hasError) {
      return 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/10';
    }
    if (isTouched && isDirty && !hasError) {
      return 'border-emerald-500 text-emerald-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 bg-emerald-50/10';
    }
    return 'border-slate-300 focus:ring-blue-500 ';
  };

  async function onSubmit(data: LoginFormValues) {
    const setUser = useAuthStore.getState().setUser;
    setLoading(true);

    try {
      const usersRef = collection(db, 'users');

      //query
      const q = query(usersRef, where('email', '==', data.email));

      const userSnapshot = await getDocs(q);

      if (userSnapshot.empty) {
        setError('root', { message: 'Пользователь с такой почтой не найден' });
        return;
      }

      const userData = userSnapshot.docs[0].data();

      if (userData.password !== data.password) {
        setError('root', { message: 'Неверный пароль' });
        return;
      }

      setUser({ email: userData.email, password: userData.password });
      console.log('Вход выполнен успешно!');
      navigate('/dashboard');
    } catch (error) {
      console.log('Login failed:', error);
      setError('root', { message: 'Произошла ошибка' });
    } finally {
      setLoading(false);
    }
  }

  const inputStyles =
    'w-full px-3 py-2 bg-slate-50 border rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-200';
  const labelStyles = 'mb-1 text-sm font-medium text-slate-700';
  return (
    <AuthLayout title="Вход">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-4 flex w-full flex-col"
      >
        <div className="flex flex-col">
          <label htmlFor="email" className={labelStyles}>
            Email:
          </label>
          <input
            id="email"
            {...register('email')}
            placeholder="Email"
            className={`${inputStyles} ${getInputValidationClass('email')}`}
          />{' '}
          {/* EMAIL ERRORS DISPLAY */}
          {errors.email && (
            <span className="text-xs text-red-500 mt-1 font-medium">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className={labelStyles}>
            Password:
          </label>
          <input
            type="password"
            {...register('password')}
            placeholder="Password"
            className={`${inputStyles} ${getInputValidationClass('password')}`}
          />
          {/* PASSWORD ERROR DISPLAY */}
          {errors.password && (
            <span className="text-xs text-red-500 mt-1 font-medium">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="sm:w-auto bg-blue-600 text-white font-semibold text-sm md:text-base px-3 py-1 sm:py-1 rounded-xl hover:bg-blue-700 my-2 w-full cursor-pointer transition active:scale-[0.98]"
            disabled={isLoading}
          >
            Войти
          </button>
          <p className="mt-4 text-sm text-slate-400 font-normal">
            Нет аккаунта?{' '}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-4 transition-colors"
            >
              Регистрация
            </Link>
          </p>
        </div>
        {errors.root && (
          <div className="text-sm bg-red-50 text-red-500 p-2.5 rounded-lg border-red-100 font-medium border text-center">
            {errors.root.message as string}
          </div>
        )}
      </form>
    </AuthLayout>
  );
}
