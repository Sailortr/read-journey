import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fallbackImg from "../../assets/placeholder-cover.png";
import BookModal from "../books/BookModal";

const RecommendedBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const accessToken = localStorage.getItem("token");
      if (!accessToken) return;

      try {
        const res = await fetch(
          "https://readjourney.b.goit.study/api/books/recommend?limit=3",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!res.ok) throw new Error(`Bad response ${res.status}`);
        const { results } = await res.json();
        if (Array.isArray(results)) setBooks(results);
      } catch (e) {
        console.error("recommend error:", e?.message);
      }
    };

    fetchBooks();
  }, []);

  const onImgErr = (e) => {
    if (e.currentTarget.src !== fallbackImg) e.currentTarget.src = fallbackImg;
  };

  return (
    <div
      className="
        rounded-[12px] border border-white/10 bg-[#262626]
        p-4 sm:p-5
      "
    >
      <h3 className="text-[#E3E3E3] text-base font-semibold mb-3">
        Recommended books
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {books.map((b) => (
          <button
            key={b._id || b.id}
            type="button"
            onClick={() => setSelectedBook(b)}
            className="group flex flex-col items-center outline-none"
            aria-label={`${b.title} – ${b.author}`}
            title={b.title}
          >
            <div
              className="
                w-[71px] h-[107px] md:w-[84px] md:h-[126px]
                rounded-[8px] overflow-hidden
                shadow-sm ring-1 ring-white/5
                transition-transform duration-200 group-hover:scale-[1.03]
              "
            >
              <img
                src={b.imageUrl || fallbackImg}
                alt={b.title}
                onError={onImgErr}
                className="w-full h-full object-cover block"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </div>

            <div className="mt-2 w-[71px] md:w-[84px] text-center">
              <p className="truncate text-[12px] leading-4 font-medium text-[#E3E3E3]">
                {b.title}
              </p>
              <p className="truncate text-[10px] leading-4 text-[#686868]">
                {b.author}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <Link to="/recommended" className="text-[#E3E3E3] hover:underline">
          Home
        </Link>
        <Link to="/recommended" className="text-[#E3E3E3] text-xl leading-none">
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
