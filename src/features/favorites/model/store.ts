import { create } from 'zustand';
import { type Book } from '@/entities/book';
import type { DBUser } from '@/features/auth';
import { useAuthStore } from '@/features/auth';
import { getDocs, collection, query, where, Query, doc, setDoc,deleteDoc } from 'firebase/firestore'
import { db } from '@/shared/api';

interface FavoriteStoreType {
    favBooksIds: string[];
    user?: DBUser | null;
    isLoading: boolean;
    fetchFavs: () => Promise<void>;
    addFavBook: (bookId: string) => Promise<void>;
    removeFavBook: (bookId: string) => Promise<void>;
}


export const useFavoriteBooksStore = create<FavoriteStoreType>((set) => ({
    favBooksIds: [],
    isLoading: false,

    fetchFavs: async () => {
        const user = useAuthStore.getState().user;

        // Offline mode
        if (!user) {
            const local = localStorage.getItem('favorite-books-ids');
            set({
                favBooksIds: local ? JSON.parse(local) : []
            });
            return;
        }

        set({ isLoading: true });
        
        try {
            const favBooksRef = collection(db, `${user.email}-favorite-books`);
            const querySnapshot = await getDocs(favBooksRef);

            const ids = querySnapshot.docs.map(doc => doc.id);

            set({ favBooksIds: ids, isLoading: false }); 
        } catch (error) { 
            console.log(error);
            set({ isLoading: false }); 
        }
    },

    addFavBook: async (bookId: string) => {
        const user = useAuthStore.getState().user;
        // Offline mode
        if (!user) {
            const currentIds = useFavoriteBooksStore.getState().favBooksIds;
            const updatedIds = [...currentIds, bookId];
            localStorage.setItem('favorite-books-ids', JSON.stringify(updatedIds));


            set({ favBooksIds: updatedIds })
            return;
        }

        //! Online mode
        try {
            const docRef = doc(db, `${user.email}-favorite-books`, bookId);
            await setDoc(docRef, { addedAt: new Date() });

            set((state) => ({
                favBooksIds: [...state.favBooksIds, bookId]
            }))
        } catch (error) {
            console.error('Не удалось добавить в избранное Firebase:', error)
        }
    },
    
    removeFavBook: async (bookId: string) => {
        const user = useAuthStore.getState().user;
        // Offline mode
        if (!user) {
            const currentIds = useFavoriteBooksStore.getState().favBooksIds
            const updatedFavs = currentIds.filter(id => id !== bookId)
            set((state) => ({ favBooksIds: updatedFavs }))
            localStorage.setItem('favorite-books-ids', JSON.stringify(updatedFavs))
            return;
           
        }
        //! ONLINE MODE
        try {
            const docRef = doc(db, `${user.email}-favorite-books`, bookId);
            await deleteDoc(docRef);
            const currentIds = useFavoriteBooksStore.getState().favBooksIds;
            set(state => ({favBooksIds: currentIds.filter(id => id !== bookId)}))
        } catch (error) {
            console.error('Не удалось добавить в избранное Firebase:', error)
        }
    }
}));
