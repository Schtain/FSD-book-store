import { useAuthStore } from '../index';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const navigate = useNavigate();
  function handleLogout() {
    const logout = useAuthStore.getState().logout;

    logout();
    navigate('/login');
  }

  return (
    <button
      onClick={handleLogout}
      className="p-2 hover:bg-muted relative flex cursor-pointer items-center rounded-full border-0 bg-transparent transition-colors"
      title="Выйти"
    >
      <LogOut className="h-5 w-5" />
    </button>
  );
}
