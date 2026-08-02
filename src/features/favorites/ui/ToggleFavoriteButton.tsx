import { HeartPlus, HeartMinus } from 'lucide-react';
import { useFavoriteBooksStore } from '../model/store';

interface FavoriteButtonProps {
  bookId: string;
}

export function ToggleFavoriteButton({ bookId }: FavoriteButtonProps) {
  const { addFavBook, removeFavBook, favBooksIds } = useFavoriteBooksStore();

  const inFavorite = favBooksIds.includes(bookId);

  function handleToggle(inFavorite: boolean) {
    if (inFavorite) {
      removeFavBook(bookId);
    } else {
      addFavBook(bookId);
    }
  }

  return (
    <button
      onClick={() => handleToggle(inFavorite)}
      className="p-1 text-gray-400 hover:text-yellow-500 rounded cursor-pointer transition"
      title="В избранное"
    >
      {inFavorite ? (
        <HeartMinus className="h-4 w-4 text-red-500" />
      ) : (
        <HeartPlus className="h-4 w-4 text-green-500" />
      )}
    </button>
  );
}
