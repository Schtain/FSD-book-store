import { FavoriteItemRow, useGetFavoriteBooks } from '@/features/favorites';
import { AddToCartButton } from '@/features/cart';

import { ToggleFavoriteButton } from '@/features/favorites';

export function FavoriteBooksPage() {
  const { data: favoriteBooks } = useGetFavoriteBooks();

  let content;

  if (!favoriteBooks) content = <p>Нет избранных книг</p>;
  if (favoriteBooks) {
    content = (
      <ul>
        {favoriteBooks.map((book) => (
          <li key={book.id}>
            <FavoriteItemRow
              book={book}
              addToCartButton={<AddToCartButton book={book} />}
              removeButton={<ToggleFavoriteButton bookId={book.id} />}
            />
          </li>
        ))}
      </ul>
    );
  }

  return <ul>{content}</ul>;
}
