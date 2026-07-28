import type { CartItemType } from '../store/useCartStore';
import { useCartStore } from '../store/useCartStore';

interface CartItemRowProps {
  cartItem: CartItemType;
  actions?: React.ReactNode;
}

export function CartItemRow({ cartItem, actions }: CartItemRowProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="rounded-2xl p-4 sm:flex-row sm:items-center gap-4 max-w-170 md:hover:scale-105 md:hover:shadow-md ease-in-out flex w-full flex-col items-start justify-between border-2 transition-all duration-300">
      {/* Левая часть: Обложка и Описание */}
      <div className="gap-4 min-w-0 sm:w-auto flex w-full flex-1 items-center">
        {/* Обложка  */}
        <div className="w-14 h-20 md:w-20 md:h-28 bg-muted rounded-md relative shrink-0 overflow-hidden border">
          <img
            src={cartItem.imageUrl}
            alt={`Book cover of ${cartItem.title} book`}
            className="h-full w-full object-cover" // object-cover убирает пустые поля вокруг книги
          />
        </div>

        {/* Описание книги */}
        <div className="gap-1 min-w-0 flex flex-col">
          <p className="text-base md:text-lg font-bold leading-tight truncate">
            {cartItem.title}
          </p>
          <p className="text-primary text-xs md:text-sm font-medium truncate">
            {cartItem.author}
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Правая часть: Кнопки и Цена */}
        <div className="sm:justify-end gap-4 sm:w-auto pt-2 sm:pt-0 sm:border-t-0 border-gray-100 flex w-full items-center justify-between border-t">
          {/* Кнопки */}
          <div className="flex items-center">
            <button
              className="h-8 w-8 rounded-l-2xl hover:bg-gray-50 flex cursor-pointer items-center justify-center border-2 active:scale-95"
              onClick={() => removeFromCart(cartItem.id)}
            >
              -
            </button>
            <div className="h-8 w-8 text-sm font-semibold flex items-center justify-center border-y-2 text-center select-none">
              {cartItem.quantity}
            </div>
            <button
              className="h-8 w-8 rounded-r-2xl hover:bg-gray-50 flex cursor-pointer items-center justify-center border-2 active:scale-95"
              onClick={() => addToCart(cartItem)}
            >
              +
            </button>
          </div>

          <span className="text-xl font-bold min-w-20 text-right whitespace-nowrap">
            {cartItem.price * cartItem.quantity} ₽
          </span>
        </div>
        {/* Actions */}
        {actions && <div className="gap-2 mt-2 sm:mt-0 flex">{actions}</div>}
      </div>
    </div>
  );
}
