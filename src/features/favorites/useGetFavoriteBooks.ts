import { useGetBooks } from "@/entities/book";
import { useFavoriteBooksStore } from "./model/store";





export function useGetFavoriteBooks() {
    const favBooksIds: string[] = useFavoriteBooksStore(state => state.favBooksIds);

    const { data: allBooks, isLoading, error } = useGetBooks();

    const favoriteBooks = allBooks?.filter(book => favBooksIds.includes(book.id)) || [];

    return {
        data: favoriteBooks,
        isLoading,
        error
    }
}