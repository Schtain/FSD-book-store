import { HeartPlus, HeartMinus } from 'lucide-react';

interface FavoriteButtonProps {
  bookId: string;
}

export function ToggleFavoriteButton({ bookId }: FavoriteButtonProps) {
  function handleToggle() {}

  return (
    <button
      onClick={handleToggle}
      className="p-1 text-gray-400 hover:text-yellow-500 rounded transition"
      title="В избранное"
    >
      <HeartPlus className="h-4 w-4" />
    </button>
  );
}
