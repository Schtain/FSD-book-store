import { BookGrid } from "@/widgets";
import { type Book } from "@/enitites/book";

const mockBooks: Book[] = [
  {
    author: 'George Orwell',
    category: 'Dystopia',
    description:
      'A chilling dystopian novel about life under the totalitarian regime of Big Brother, exploring themes of mass surveillance, government control, and the suppression of individuality.',
    id: crypto.randomUUID(),
    imageUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1327144697i/3744438.jpg',
    price: 45,
    rating: 9.5,
    title: '1984',
    isPopular: true,
  },
  {
    author: 'Ray Bradbury',
    category: 'Sci-Fi',
    description:
      'A classic science fiction novel depicting a future American society where books are outlawed and firemen burn any that are found, focusing on the power of literature and critical thinking.',
    id: crypto.randomUUID(),
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6dgF5bzKHkQY0C-AaKJDzKCMZ--bMpfhKiLHzuXF_uY29m-tlfqdtiEeg&s=10',
    price: 39,
    rating: 8.8,
    title: 'Farenheit 451',
    isPopular: true,
  },
  {
    author: 'Frank Herbert',
    category: 'Sci-Fi',
    description:
      'Set on the desert planet Arrakis, this epic space opera follows young Paul Atreides as his family accepts the stewardship of the dangerous and valuable world rich in the spice Melange.',
    id: crypto.randomUUID(),
    imageUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg',
    price: 89,
    rating: 9.2,
    title: 'Dune',
    isPopular: true,
  },
  {
    author: 'Andrzej Sapkowski',
    category: 'Fantasy',
    description:
      'The first collection of short stories introducing Geralt of Rivia, a mutated monster hunter known as a Witcher, as he navigates a dark, morally gray fairy-tale world.',
    id: crypto.randomUUID(),
    imageUrl: 'https://m.media-amazon.com/images/I/71sZSQ6WS4L._UF1000,1000_QL80_.jpg',
    price: 55,
    rating: 9.0,
    title: 'The Last Wish',
    isPopular: false,
  },
  {
    author: 'Isaac Asimov',
    category: 'Sci-Fi',
    description:
      'The opening novel of the monumental saga where mathematician Hari Seldon uses psychohistory to predict the fall of the Galactic Empire and creates a sanctuary to preserve human knowledge.',
    id: crypto.randomUUID(),
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPE7uNP2Hol4CVmnJ_G6ta3ff3VGdHeCc2v4Mv7vgw-nosKSmrptpe5m-K&s=10',
    price: 49,
    rating: 8.7,
    title: 'Foundation',
    isPopular: false,
  },
  {
    author: 'Stephen King',
    category: 'Horror',
    description:
      'Jack Torrance takes a job as an off-season caretaker at the atmospheric Overlook Hotel, where evil supernatural forces slowly drive him into a violent insanity affecting his family.',
    id: crypto.randomUUID(),
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6ARqWMAAJ43qchiTAwmUZr2PzsaMzxWxA__OaJc8DqrPaayoixckkOPM&s=10',
    price: 65,
    rating: 9.3,
    title: 'The Shining',
    isPopular: true,
  },
  {
    author: 'Douglas Adams',
    category: 'Comedy',
    description:
      'A hilarious sci-fi comedy following the cosmic misadventures of Arthur Dent, an ordinary Englishman who escapes Earth moments before its demolition with his alien friend Ford Prefect.',
    id: crypto.randomUUID(),
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQpNbrTXpcvcqQL4rZe-WC1oTXIbnAoiBzp19saJFIcA8UxUwB7HrA-L2q&s=10',
    price: 35,
    rating: 8.9,
    title: "The Hitchhiker's Guide to the Galaxy",
    isPopular: false,
  },
  {
    author: 'Arthur Conan Doyle',
    category: 'Mystery',
    description:
      'The classic mystery featuring the brilliant consulting detective Sherlock Holmes and his loyal companion Dr. John Watson as they investigate a deadly supernatural curse on Dartmoor.',
    id: crypto.randomUUID(),
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Cover_%28Hound_of_Baskervilles%2C_1902%29.jpg',
    price: 32,
    rating: 8.5,
    title: 'The Hound of the Baskervilles',
    isPopular: false,
  },
  {
    author: 'Brandon Sanderson',
    category: 'Fantasy',
    description:
      'In a world where ash falls from the sky and a dark Lord rules with absolute power, a street thief discovers she is a Mistborn—a person capable of burning metals to gain magical abilities.',
    id: crypto.randomUUID(),
    imageUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1617768316i/68428.jpg',
    price: 79,
    rating: 9.6,
    title: 'Mistborn: The Final Empire',
    isPopular: true,
  },
];




export const CatalogPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Каталог книг</h1>
      <p className="text-muted-foreground">Поиск и фильтрация книг</p>
      <BookGrid books={ mockBooks} />
    </div>
  );
};
