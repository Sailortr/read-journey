// src/pages/MyLibraryPage.jsx
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import AddBookForm from "../components/library/AddBookForm";
import RecommendedBooks from "../components/library/RecommendedBooks";
import FilterDropdown from "../components/library/FilterDropdown";
import BookCard from "../components/books/BookCard";
import {
  removeBookFromLibrary,
  fetchLibraryBooks,
} from "../redux/thunks/bookThunks";

const MyLibraryPage = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books) || [];

  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(books.length / ITEMS_PER_PAGE));

  const pagedBooks = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return books.slice(start, start + ITEMS_PER_PAGE);
  }, [books, page]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const handleRemoveBook = async (id) => {
    try {
      await dispatch(removeBookFromLibrary(id));
      await dispatch(fetchLibraryBooks());
      if ((page - 1) * ITEMS_PER_PAGE >= books.length - 1) {
        setPage((p) => Math.max(1, p - 1));
      }
    } catch (error) {
      console.error("Kitap silinemedi:", error.message);
    }
  };

  // Ortak buton stili (görseldeki gibi ince çerçeveli, dairesel)
  const pagerBtn =
    "w-10 h-10 grid place-items-center rounded-full border border-white/20 " +
    "text-white/90 hover:text-white hover:border-white/40 " +
    "disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white/90 " +
    "transition focus:outline-none focus:ring-2 focus:ring-white/20";

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      {/* LEFT SIDEBAR */}
      <aside className="w-full lg:w-[353px] flex flex-col gap-6 flex-shrink-0 bg-black rounded-[30px]">
        <div className="bg-dark-800 p-6 rounded-[30px] flex flex-col gap-4">
          <h3 className="text-white text-sm font-medium">
            Create your library:
          </h3>
          <AddBookForm />
        </div>
        <RecommendedBooks />
      </aside>

      {/* RIGHT CONTENT */}
      <section className="flex-1 bg-black p-6 rounded-[30px] flex flex-col gap-6 min-h-[400px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-white text-2xl font-semibold">My library</h2>

          <div className="flex items-center gap-3">
            <FilterDropdown />

            {/* ÜST SAĞ: SADECE OK TUŞLARI (sayaç yok) */}
            {books.length > ITEMS_PER_PAGE && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  disabled={page === 1}
                  aria-label="Önceki sayfa"
                  className={pagerBtn}
                >
                  {/* soldaki ok (‹) */}
                  <span
                    className="w-10 h-10 flex items-center justify-center 
              border border-gray-600 rounded-full 
              hover:bg-primary hover:text-white 
              disabled:opacity-30 transition"
                  >
                    ‹
                  </span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  aria-label="Sonraki sayfa"
                  className={pagerBtn}
                >
                  {/* sağdaki ok (›) */}
                  <span
                    className="w-10 h-10 flex items-center justify-center 
              border border-gray-600 rounded-full 
              hover:bg-primary hover:text-white 
              disabled:opacity-30 transition"
                  >
                    ›
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Grid - satırda 5 kart, toplam 10 kart */}
        <div
          className="
            grid gap-3
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
            justify-items-start
          "
        >
          {pagedBooks.map((book) => (
            <div key={book._id || book.id} className="relative">
              <BookCard
                book={{
                  title: book.title,
                  author: book.author,
                  imageUrl: book.imageUrl,
                }}
                onClick={() => {
                  /* modal vs. burada tetiklenebilir */
                }}
              />
              {/* İsteğe bağlı remove */}
              {/* <button
                onClick={() => handleRemoveBook(book._id || book.id)}
                className="absolute top-2 right-2 text-xs bg-red-600 text-white px-2 py-1 rounded hover:opacity-90"
              >
                Remove
              </button> */}
            </div>
          ))}

          {/* 10'dan azsa boş placeholder; layout bozulmasın */}
          {Array.from({
            length: Math.max(0, ITEMS_PER_PAGE - pagedBooks.length),
          }).map((_, i) => (
            <div key={`ph-${i}`} className="w-[137px] h-[248px]" />
          ))}
        </div>

        {/* ALT: aynı stil oklar + arada sayaç */}
        {books.length > ITEMS_PER_PAGE && (
          <div className="mt-3 flex justify-center items-center gap-3 text-white">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              aria-label="Önceki sayfa"
              className={pagerBtn}
            >
              <span
                className="w-10 h-10 flex items-center justify-center 
              border border-gray-600 rounded-full 
              hover:bg-primary hover:text-white 
              disabled:opacity-30 transition"
              >
                ‹
              </span>
            </button>

            <span className="text-xs text-white/60 select-none">
              {page} / {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={page === totalPages}
              aria-label="Sonraki sayfa"
              className={pagerBtn}
            >
              <span
                className="w-10 h-10 flex items-center justify-center 
              border border-gray-600 rounded-full 
              hover:bg-primary hover:text-white 
              disabled:opacity-30 transition"
              >
                ›
              </span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyLibraryPage;
