import { useCartStore } from '../store/useCartStore';
import type { Book } from '@/entities/book';
import { useNavigate } from 'react-router-dom';
interface AddToCartButtonProps {
  book: Book;
}

export function AddToCartButton({ book }: AddToCartButtonProps) {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const inCart = useCartStore((state) =>
    state.items.some((item) => item.id === book.id),
  );

  if (inCart) {
    return (
      <button
        onClick={() => navigate('/cart')}
        className="px-4 py-2 bg-blue-400 text-sm font-medium rounded-lg hover:bg-blue-800 hover:text-blue-50 shadow-sm transition-all hover:cursor-pointer active:scale-95"
      >
        Оформить
      </button>
    );
  }

  return (
    <button
      onClick={() => addToCart(book)}
      className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 shadow-sm transition-all hover:cursor-pointer active:scale-95"
    >
      В корзину
    </button>
  );
}
