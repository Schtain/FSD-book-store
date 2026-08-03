import { type Book } from '@/entities/book';
import { BookCard } from '@/entities/book';
import { AddToCartButton } from '@/features/cart';

interface BookGridProps {
  books: Book[];
}

export const BookGrid = ({ books }: BookGridProps) => {
  return (
    <section className="md:grid-cols-3 lg:grid-cols-5 gap-4 grid grid-cols-1">
      {books.map((book) => (
        <BookCard
          book={book}
          key={book.id}
          actionButton={<AddToCartButton book={book} />}
        />
      ))}
    </section>
  );
};
