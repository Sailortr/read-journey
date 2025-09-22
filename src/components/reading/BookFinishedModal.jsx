import { useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import booksIcon from "../../assets/books.svg";

export default function BookFinishedModal({ book, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 w-[92vw] max-w-[520px] rounded-[30px] border border-white/10 bg-[#1F1F1F] text-white p-8 shadow-xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 grid place-items-center rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition"
        >
          <HiOutlineX />
        </button>

        <div className="flex flex-col items-center text-center">
          <img
            src={booksIcon}
            alt=""
            className="w-16 h-16 object-contain mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">The book is read</h2>
          <p className="text-white/70 text-sm max-w-[360px]">
            It was an <span className="text-white">exciting journey</span>,
            where each page revealed new horizons, and the characters became
            inseparable friends.
          </p>

          <div className="mt-6 text-sm text-white/80">
            <div className="font-medium">{book.title}</div>
            <div className="text-white/60">{book.author}</div>
          </div>

          <button
            onClick={onClose}
            className="mt-8 px-6 py-2 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 active:bg-white/15 transition font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
