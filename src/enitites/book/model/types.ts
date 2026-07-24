export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
  rating: number;
  isPopular?: boolean;
}