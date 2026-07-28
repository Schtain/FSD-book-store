import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/features/auth';
import { AuthLayout } from '@/components';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/shared/api';

export function LoginPage() {
  const isLoading = useAuthStore((state) => state.isLoading);
  const setLoading = useAuthStore((state) => state.setLoading);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: any) {
    if (data.password.trim() === '' || data.email.trim() === '') {
      return;
    }

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
    'w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200';
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
