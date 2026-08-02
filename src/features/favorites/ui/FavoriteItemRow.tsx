import type { Book } from '@/entities/book';

interface FavoriteItemRowProps {
  book: Book;
  addToCartButton?: React.ReactNode;
  removeButton?: React.ReactNode;
}

export function FavoriteItemRow({
  book,
  addToCartButton,
  removeButton,
}: FavoriteItemRowProps) {
  return (
    <div className="rounded-2xl p-4 gap-4 max-w-2xl hover:shadow-sm mx-auto flex w-full flex-row items-center justify-between border transition-all duration-200">
      {/* Левая часть: Обложка, Название, Автор */}
      <div className="gap-4 min-w-0 flex flex-1 items-center">
        <div className="w-14 h-20 md:w-16 md:h-24 bg-muted rounded-md shrink-0 overflow-hidden border">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="gap-1 min-w-0 flex flex-col">
          <p className="text-base md:text-lg font-bold leading-tight truncate">
            {book.title}
          </p>
          <p className="text-muted-foreground text-xs md:text-sm truncate">
            {book.author}
          </p>
          <span className="font-bold text-sm text-primary mt-1">
            {book.price} ₽
          </span>
        </div>
      </div>

      {/* Правая часть: Управление (Кнопка "Купить" и "Удалить") */}
      <div className="gap-3 flex shrink-0 items-center justify-end">
        {/* Слот для фичи добавления в корзину */}
        {addToCartButton && <div className="shrink-0">{addToCartButton}</div>}

        {/* Слот для кнопки "Удалить из избранного" */}
        {removeButton && <div className="shrink-0">{removeButton}</div>}
      </div>
    </div>
  );
}
