import type { Book } from "@/entities/book";
import {create} from 'zustand'

export interface CartItemType extends Book {
    quantity: number;
}


interface CartState {
    items: CartItemType[];
    addToCart: (book: Book) => void;
    removeFromCart: (bookId: string) => void;
    removeItemFromCart: (bookId: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    addToCart: (book: Book) => {
        
        set(state => { 
            const existtingItem = state.items.find(item => item.id === book.id);

            if (existtingItem) {
                return {
                    items: state.items.map(item => item.id === book.id ? {...item, quantity: item.quantity + 1} : item)
                }
            }
            return {
                items: [...state.items, {...book, quantity: 1}]
            }
        })
    },
    removeFromCart: (bookId: string) => {
        set(state => {
            const existingItem = state.items.find(book => book.id === bookId)
            if (existingItem && existingItem.quantity > 1) {
                return {items:
                    [...state.items.map((item) => item.id === bookId ? {...item, quantity: item.quantity -1} : item)]
                }
            } else {
                return state;
            }
        })
    },
    removeItemFromCart: (bookId: string) => {
        set(state => {
             return {items: state.items.filter(item => item.id !== bookId)}
        })
    }
    ,
    clearCart: () => set({items: []})
}))