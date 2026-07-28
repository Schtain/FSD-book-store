import { NavLink, Outlet } from 'react-router-dom';

const DASHBOARD_LINKS = [
  { to: '/dashboard/cart', label: 'Корзина' },
  { to: '/dashboard/pending', label: 'Ожидаемые заказы' },
  { to: '/dashboard/favorites', label: 'Избранное' },
  { to: '/dashboard/history', label: 'История заказов' },
];

export function DashboardPage() {
  return (
    <div className="max-w-7xl px-4 mx-auto w-full">
      {/* Контейнер навигации */}
      <nav className="gap-6 border-border text-sm font-medium flex justify-start border-b">
        {DASHBOARD_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `pb-3 border-b-2 transition-colors duration-200 ${
                isActive
                  ? 'border-primary text-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground border-transparent'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Контент выбранных табов*/}
      <div className="py-6">
        <Outlet />
      </div>
    </div>
  );
}
