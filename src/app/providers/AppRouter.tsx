import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';

import { Header } from '@/widgets/header';
import { CatalogPage } from '@/pages/catalog/';
import { HomePage } from '@/pages/home/';
import { CartPage } from '@/pages/cart';
import { RegisterPage } from '@/pages/register';
import { LoginPage } from '@/pages/login';
import { DashboardPage } from '@/pages/dashboard';
import { CartContent } from '@/widgets/cart-content';
import { FavoriteBooksPage } from '@/pages/favorite-books';

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
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
        children: [
          { index: true, element: <Navigate to="cart" replace /> },
          {
            path: 'cart',
            element: <CartContent />,
          },
          {
            path: 'favorites',
            element: <FavoriteBooksPage />,
          },
        ],
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
