import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { db } from '@/shared/api';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuthStore } from '@/features/auth';
import { AuthLayout } from '@/components';

export function RegisterPage() {
  const navigate = useNavigate();
  const isLoading = useAuthStore((state) => state.isLoading);
  const setLoading = useAuthStore((state) => state.setLoading);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (data.email.trim() === '' || data.password.trim() === '') {
      return;
    }
    if (data.password !== data['password-confirm']) {
      setError('password-confirm', { message: 'Пароли не совпадают' });
      return;
    }

    const setUser = useAuthStore.getState().setUser;

    setLoading(true);

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', data.email.trim()));
      const checkSnapshot = await getDocs(q);

      if (!checkSnapshot.empty) {
        setError('tmail', { message: 'Данный емейл уже занят' });
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
    'w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200';
  const labelStyles = 'mb-1 text-sm font-medium text-slate-700';
  return (
    <AuthLayout title="Регистрация">
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
            {...register('email', { required: true })}
            placeholder="Email"
            className={inputStyles}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className={labelStyles}>
            Password:
          </label>
          <input
            type="password"
            {...register('password', { required: true })}
            placeholder="Password"
            className={inputStyles}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password-confirm" className={labelStyles}>
            Confirm password:
          </label>
          <input
            type="password"
            {...register('password-confirm', { required: true })}
            placeholder="Password-confirm"
            className={inputStyles}
          />
        </div>

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
        {errors.root && (
          <div className="text-sm bg-red-50 text-red-500 p-2.5 rounded-lg border-red-100 font-medium border text-center">
            {errors.root.message as string}
          </div>
        )}
      </form>
    </AuthLayout>
  );
}
