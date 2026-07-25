import { type Book } from '@/enitites/book'
import { BookCard } from '@/enitites/book';


interface BookGridProps {
    books: Book[];
}

export const BookGrid = ({books}:BookGridProps) => {

    return (
        <section className='grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grid gap-4'>
            {books.map((book) => <BookCard book={book} key={book.id } />)}
        </section>
    )
}