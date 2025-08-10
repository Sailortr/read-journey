import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BookCard from "./BookCard";

const Ellipsis = () => {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % 4), 450);
    return () => clearInterval(id);
  }, []);
  const dots = [" ", ".", "..", "..."][frame];

  return (
    <span
      aria-hidden="true"
      className="inline-block align-baseline"
      style={{ width: "1.6em" }}
    >
      {dots}
    </span>
  );
};

const BookList = ({ books, onBookClick, page, setPage, totalPages }) => {
  if (!books?.length) {
    return (
      <div className="flex items-center justify-center min-h-[360px]">
        <p
          className="text-gray-400 text-base"
          aria-live="polite"
          aria-atomic="true"
        >
          Books Found
          <Ellipsis />
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[#1F1F1F] rounded-[30px] p-6 border border-[#262626]">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Recommended
        </h2>

        <div className="flex items-center gap-4 text-white">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page <= 1}
            className="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-full hover:bg-primary hover:text-white disabled:opacity-30 transition"
            aria-label="Previous page"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
            className="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-full hover:bg-primary hover:text-white disabled:opacity-30 transition"
            aria-label="Next page"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="grid gap-x-6 gap-y-20 grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
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
