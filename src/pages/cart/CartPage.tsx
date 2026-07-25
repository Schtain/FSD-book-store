import { useCartStore } from '@/features/cart';
import { Link } from 'react-router-dom';
import { CartItemRow } from '@/features/cart/ui/CartItemRow';

export function CartPage() {
  const cartItems = useCartStore((state) => state.items);

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>
          Козрина пуста, перейдите в{' '}
          <Link to="/catalog">
            <span className="text-blue-500">каталог</span>
          </Link>{' '}
        </p>
      ) : (
        <div className="max-w-170 flex flex-col">
          {cartItems.map((item) => (
            <CartItemRow key={item.id} cartItem={item} />
          ))}
          <div className="flex items-center self-end border-b-2">
            <span className="text-xl font-bold mr-2">Всего: </span>
            {`${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}`}
          </div>
        </div>
      )}
    </div>
  );
}
