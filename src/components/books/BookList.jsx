import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BookCard from "./BookCard";

const BookList = ({ books, onBookClick, page, setPage, totalPages }) => {
  if (!books?.length) {
    return <p className="text-center text-gray-400 mt-10">No books found.</p>;
  }

  return (
    <div
      className="space-y-6 bg-[#1F1F1F] rounded-[30px] p-6
      border border-[#262626]"
    >
      {/* Başlık ve pagination */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Recommended
        </h2>
        <div className="flex items-center gap-4 text-white">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page <= 1}
            className="w-10 h-10 flex items-center justify-center 
              border border-gray-600 rounded-full 
              hover:bg-primary hover:text-white 
              disabled:opacity-30 transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
            className="w-10 h-10 flex items-center justify-center 
              border border-gray-600 rounded-full 
              hover:bg-primary hover:text-white 
              disabled:opacity-30 transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Kitap Grid */}
      <div
        className="grid gap-x-6 gap-y-8
        grid-cols-2
        sm:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-5"
      >
        {books.map((book) => (
          <BookCard
            key={book._id || book.id || book.slug}
            book={book}
            onClick={onBookClick}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
