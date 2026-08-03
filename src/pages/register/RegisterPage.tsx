import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { db } from '@/shared/api';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuthStore } from '@/features/auth';
import { AuthLayout } from '@/components';
import { emailSchema, passwordSchemaRegister } from '@/entities/user';

const formSchemaRegister = z
  .object({
    email: emailSchema,
    password: passwordSchemaRegister,
    'password-confirm': z.string().min(1, 'Повторите пароль'),
  })
  .refine((data) => data.password === data['password-confirm'], {
    message: 'Пароли не совпадают',
    path: ['password-confirm'],
  });

type RegistrationFormValues = z.infer<typeof formSchemaRegister>;

export function RegisterPage() {
  const navigate = useNavigate();
  const isLoading = useAuthStore((state) => state.isLoading);
  const setLoading = useAuthStore((state) => state.setLoading);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(formSchemaRegister),
    mode: 'onTouched',
  });

  const getInputValidationClass = (fieldName: keyof RegistrationFormValues) => {
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

  const onSubmit = async (data: RegistrationFormValues) => {
    const setUser = useAuthStore.getState().setUser;

    setLoading(true);

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', data.email.trim()));
      const checkSnapshot = await getDocs(q);

      if (!checkSnapshot.empty) {
        setError('email', { message: 'Данный емейл уже занят' });
        return;
      }

      const newUser = {
        email: data.email.trim(),
        password: data.password.trim(),
      };
      const docRef = await addDoc(usersRef, newUser);
      console.log('Пользователь успешно создан в БД с ID:', docRef.id);

      // Login via zustand
      setUser(newUser);
      navigate('/dashboard');
    } catch (error) {
      console.log('Ошибка регистрации: ', error);
      setError('root', { message: 'Ошибка сервера' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyles =
    'w-full px-3 py-2 bg-slate-50 border rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-200';
  const labelStyles = 'mb-1 text-sm font-medium text-slate-700';
  const errorStyles = 'text-xs text-red-500 mt-1 font-medium';

  return (
    <AuthLayout title="Регистрация">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-4 flex w-full flex-col"
      >
        {/* Поле Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className={labelStyles}>
            Email:
          </label>
          <input
            id="email"
            {...register('email')}
            placeholder="Email"
            className={`${inputStyles} ${getInputValidationClass('email')}`}
          />
          {errors.email && (
            <span className={errorStyles}>{errors.email.message}</span>
          )}
        </div>

        {/* Поле Пароля */}
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
          {errors.password && (
            <span className={errorStyles}>{errors.password.message}</span>
          )}
        </div>

        {/* Поле Подтверждения пароля */}
        <div className="flex flex-col">
          <label htmlFor="password-confirm" className={labelStyles}>
            Confirm password:
          </label>
          <input
            type="password"
            {...register('password-confirm')}
            placeholder="Password-confirm"
            className={`${inputStyles} ${getInputValidationClass('password-confirm')}`}
          />
          {errors['password-confirm'] && (
            <span className={errorStyles}>
              {errors['password-confirm'].message}
            </span>
          )}
        </div>

        {/* Кнопка отправки и ссылка */}
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="sm:w-auto bg-blue-600 text-white font-semibold text-sm md:text-base px-3 py-1 sm:py-1 rounded-xl hover:bg-blue-700 my-2 w-full cursor-pointer transition active:scale-[0.98]"
            disabled={isLoading}
          >
            Регистрация
          </button>
          <p className="mt-4 text-sm text-slate-400 font-normal">
            Есть аккаунт?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-4 transition-colors"
            >
              Войти
            </Link>
          </p>
        </div>

        {/* ОБЩАЯ ОШИБКА */}
        {errors.root && (
          <div className="text-sm bg-red-50 text-red-500 p-2.5 rounded-lg border-red-100 font-medium border text-center">
            {errors.root.message}
          </div>
        )}
      </form>
    </AuthLayout>
  );
}
