import { useCartStore } from '../store/useCartStore';
import { Trash2 } from 'lucide-react';

interface RemoveButtonProps {
  bookId: string;
}

export function RemoveFromCartButton({ bookId }: RemoveButtonProps) {
  //   const onBookDelete = useCartStore.getState().removeItemFromCart;
  const removeItem = useCartStore((state) => state.removeItemFromCart);

  return (
    <button
      onClick={() => removeItem(bookId)}
      className="p-1 text-gray-400 hover:text-red-500 rounded transition"
      title="Удалить из корзины"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
