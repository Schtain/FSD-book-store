import { type Book } from '../model/types';

interface BookCardProps {
  book: Book;
  // Сюда мы НЕ передаем кнопку "Добавить в корзину"!
  // Сама карточка про корзину ничего знать не должна, кнопка придет позже из слоя features
  actionButton?: React.ReactNode;
}

export const BookCard = ({ book, actionButton }: BookCardProps) => {
  return (
    <div className="md:flex-col bg-card text-card-foreground rounded-xl border-border p-3 gap-4 hover:shadow-md flex flex-row overflow-hidden border transition-all md:max-w-60">
      {/* Обложка книги */}
      <div className="w-24 h-36 md:w-full md:h-64 bg-muted rounded-md relative shrink-0 overflow-hidden ">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Информационная часть */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
            {book.category}
          </span>
          <h3 className="font-semibold text-base mt-1 leading-tight line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{book.author}</p>
        </div>

        {/* Нижняя часть: Цена и Кнопка */}
        <div className="mt-3 md:mt-4 flex items-center justify-between">
          <span className="font-bold text-lg text-primary">{book.price} ₽</span>

          {/* Слот для будущей кнопки из слоя features */}
           {actionButton && <div className="shrink-0">{actionButton}</div>}
        </div>
      </div>
    </div>
  );
};
