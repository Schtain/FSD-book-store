import { useCartStore } from '@/features/cart';
import { Link } from 'react-router-dom';
import { ShoppingCart, LogIn } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { LogoutButton } from '@/features/auth';

export function Header() {
  const cartItems = useCartStore((state) => state.items);
  const user = useAuthStore((state) => state.user);

  const cartItemsQuantity = cartItems
    ? cartItems.reduce((acc, book) => acc + book.quantity, 0)
    : 0;

  return (
    <header className="top-0 border-border bg-card/95 backdrop-blur sticky z-50 w-full border-b">
      <div className="h-16 max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto flex items-center justify-between">
        <div className="gap-6 flex items-center">
          <Link
            to="/"
            className="font-bold text-lg tracking-tight hover:opacity-90"
          >
            📚 BookStore
          </Link>

          {/* Навигация для компьютеров */}
          <nav className="md:flex gap-6 text-sm font-medium hidden items-center">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Главная
            </Link>
            <Link
              to="/catalog"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Каталог
            </Link>
            <Link
              to="/admin"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Админка
            </Link>
          </nav>
        </div>
        {/* Икноки управления */}

        <div className="flex">
          {/* Логин */}
          {!user && (
            <div className="gap-4 flex items-center">
              <div className="p-2 hover:bg-muted relative flex cursor-pointer items-center rounded-full transition-colors">
                <Link to="/login">
                  <LogIn />
                </Link>
              </div>
            </div>
          )}

          {user && (
            <div
              className="hover:bg-muted cursor-pointer"
              title="Личный кабинет"
            >
              <Link to="/dashboard">{user.email}</Link>
            </div>
          )}

          {user && <LogoutButton />}

          {/* Корзина */}
          <div className="gap-4 flex items-center">
            <div
              className="p-2 hover:bg-muted relative flex cursor-pointer items-center rounded-full transition-colors"
              title="Корзина"
            >
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
              {/* Счетчик айтемов в корзине */}
              {cartItemsQuantity > 0 && (
                <span className="-top-1 -right-1 h-5 w-5 bg-primary font-bold text-primary-foreground absolute flex items-center justify-center rounded-full text-[10px]">
                  {cartItemsQuantity}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Мобильное навигационное меню*/}
      <nav className="md:hidden gap-6 border-border/50 py-2.5 bg-muted/30 text-xs font-medium flex items-center justify-center border-t">
        <Link to="/" className="hover:text-primary transition-colors">
          Главная
        </Link>
        <Link to="/catalog" className="hover:text-primary transition-colors">
          Каталог
        </Link>
        <Link to="/admin" className="hover:text-primary transition-colors">
          Админка
        </Link>
      </nav>
    </header>
  );
}
