import { CartContent } from '@/widgets/cart-content';

export function CartPage() {
  return (
    <div className="py-10 container mx-auto">
      <h1 className="text-2xl font-bold mb-6 px-4 md:px-6">Ваша корзина</h1>
      <CartContent />
    </div>
  );
}
