import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from 'react-router-dom';

import { Header } from '@/widgets/header';
import { CatalogPage } from '@/pages/catalog/';
import { HomePage } from '@/pages/home/HomePage';

// import { AdminPage } from '@/pages/admin/';

const MainLayout = () => {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* Временная простая шапка для навигации */}
      <Header />
      {/* Контент текущей страницы подставится вместо Outlet */}
      <main className="px-4 py-6 container mx-auto flex-1">
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/catalog',
        element: <CatalogPage />,
      },
      {
        path: '/',
        element: <HomePage />,
      },

      //   {
      //     path: '/admin',
      //     element: <AdminPage />,
      //   },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
