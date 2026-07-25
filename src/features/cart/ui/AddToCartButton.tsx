import { useCartStore } from '../store/useCartStore';
import type { Book } from '@/entities/book';

interface AddToCartButtonProps {
  book: Book;
}

export function AddToCartButton({ book }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(book)}
      className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 shadow-sm transition-all hover:cursor-pointer active:scale-95"
    >
      В корзину
    </button>
  );
}
