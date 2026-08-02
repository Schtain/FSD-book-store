import { useQuery } from '@tanstack/react-query';
import {collection, getDocs} from 'firebase/firestore'
import { db } from '@/shared/api';
import { type Book } from '../model/types';

async function fetchBooks(): Promise<Book[]> {
    const querySnapshot = await getDocs(collection(db, 'books'))


    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Book[];
}



export function useGetBooks(category:string = 'All') {
    
    return useQuery({
        queryKey: ['books', category],
        queryFn: fetchBooks,
        select: (books) => category === 'All' ? books : books.filter(book => book.category === category)
    });
}