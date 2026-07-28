import { useCartStore } from '@/features/cart';
import { Link } from 'react-router-dom';
import { CartItemRow } from '@/features/cart/ui/CartItemRow';
import { RemoveFromCartButton } from '@/features/cart';
import { ToggleFavoriteButton } from '@/features/favorites';

export function CartContent() {
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  function handleClearCart() {
    const agreeToClear = confirm('Очистить корзину?');
    if (!agreeToClear) {
      return;
    } else {
      clearCart();
    }
  }

  if (cartItems.length === 0) {
    return (
      <p>
        Корзина пуста, перейдите в{' '}
        <Link to="/catalog" className="text-blue-500">
          каталог
        </Link>
      </p>
    );
  }

  return (
    <div className="max-w-170 gap-4 p-4 md:p-6 mx-auto flex w-full flex-col">
      {cartItems.map((item) => (
        <CartItemRow
          key={item.id}
          cartItem={item}
          actions={
            <>
              <RemoveFromCartButton bookId={item.id} />
              <ToggleFavoriteButton bookId={item.id} />
            </>
          }
        />
      ))}
      <div className="sm:flex-row sm:items-start gap-6 mt-4 pt-4 flex flex-col items-stretch justify-between border-t-2">
        {/* ЛЕВЫЙ БЛОК */}
        <div className="sm:w-auto bg-blue-600 text-white font-semibold text-sm md:text-base px-6 py-3 sm:py-2.5 rounded-xl hover:bg-blue-700 sm:order-1 order-2 w-full cursor-pointer transition active:scale-[0.98]">
          Оформить заказ
        </div>
        {/* ПРАВЫЙ БЛОК */}
        <div className="sm:flex-col sm:items-end gap-3 sm:order-2 order-1 flex flex-row items-center justify-between">
          {/* ВСЕГО */}
          <div className="text-sm md:text-base flex items-baseline">
            <span className="text-gray-500 mr-2">Всего: </span>
            <span className="text-xl md:text-2xl font-black">
              {`${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}`}{' '}
              ₽
            </span>
          </div>
          <button
            onClick={handleClearCart}
            className="text-xs md:text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 sm:px-3 sm:py-1.5 p-1 rounded-lg cursor-pointer transition"
          >
            Очистить
          </button>
        </div>
      </div>
    </div>
  );
}
