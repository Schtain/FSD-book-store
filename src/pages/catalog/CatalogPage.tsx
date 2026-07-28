import { BookGrid } from '@/widgets/book-grid';
import { useGetBooks } from '@/entities/book';
import { useState } from 'react';
import { CategoryFilter } from '@/features/filter-by-category/ui/CategoryFilter';

export const CatalogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  //fetch all books data
  const { data: allBooks, isLoading, isError, error } = useGetBooks('All');

  //get all categories from books
  const allCategories = allBooks
    ? Array.from(new Set(allBooks.map((book) => book.category)))
    : [];

  const filtredBooks =
    selectedCategory === 'All'
      ? (allBooks ?? [])
      : (allBooks?.filter((book) => book.category === selectedCategory) ?? []);

  //setting content
  let content;
  if (isLoading) {
    content = <p className="py-10 text-center">Loading books...</p>;
  } else if (isError) {
    content = (
      <p className="py-10 text-red-600 text-center">{`Error occured: ${error.message}`}</p>
    );
  } else if (allBooks) {
    content = <BookGrid books={filtredBooks} />;
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Каталог книг</h1>
      <CategoryFilter
        activeCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={allCategories}
      />
      {content}
    </div>
  );
};
