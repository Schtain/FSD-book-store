import type { ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

export function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    // Обертка для центрирования на весь экран
    <div className="bg-slate-50 p-4 flex min-h-screen items-center justify-center">
      {/* Общая белая карточка */}
      <div className="max-w-md bg-white border-slate-100 rounded-2xl p-6 shadow-xl flex w-full flex-col items-center border">
        {/* Заголовок */}
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{title}</h2>

        {/* Содержимое */}
        {children}
      </div>
    </div>
  );
}
