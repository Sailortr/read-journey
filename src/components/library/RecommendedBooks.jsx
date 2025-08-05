import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fallbackImg from "../../assets/placeholder-cover.png";
import BookModal from "../books/BookModal"; // ✅ modal import

const RecommendedBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // ✅ modal state

  useEffect(() => {
    const fetchBooks = async () => {
      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        console.warn("Access token not found. User might not be logged in.");
        return;
      }

      try {
        const response = await fetch(
          "https://readjourney.b.goit.study/api/books/recommend?limit=3",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Unauthorized or invalid response (${response.status})`
          );
        }

        const raw = await response.json();
        const recommendedBooks = raw.results;

        if (!Array.isArray(recommendedBooks)) {
          throw new Error("Data is not an array");
        }

        setBooks(recommendedBooks);
      } catch (error) {
        console.error("Error fetching recommended books:", error.message);
      }
    };

    fetchBooks();
  }, []);

  const handleImageError = (e) => {
    e.target.src = fallbackImg;
  };

  return (
    <div className="bg-dark-800 p-4 rounded-[30px]">
      <h3 className="text-white text-base font-semibold mb-3">
        Recommended books
      </h3>

      <div className="flex gap-2">
        {books.map((book) => (
          <div
            key={book._id || book.id}
            onClick={() => setSelectedBook(book)}
            className="w-[100px] flex-shrink-0 text-white text-sm cursor-pointer hover:scale-105 hover:opacity-90 transition-transform duration-200"
          >
            <img
              src={book.imageUrl}
              alt={book.title}
              onError={handleImageError}
              className="w-full h-[140px] object-cover rounded-lg mb-1"
            />
            <p className="font-medium truncate">{book.title}</p>
            <p className="text-xs text-gray-400 truncate">{book.author}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-white">
        <Link to="/recommended" className="hover:underline">
          Home
        </Link>
        <Link to="/recommended" className="text-xl">
          →
        </Link>
      </div>

      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
};

export default RecommendedBooks;
