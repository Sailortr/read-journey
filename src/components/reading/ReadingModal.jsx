import { useEffect } from "react";

const ReadingModal = ({ book, onClose, onStart }) => {
  if (!book) return null;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative z-10 w-[92vw] max-w-[520px] bg-[#1F1F1F] text-white
                      rounded-[30px] border border-white/10 p-8 shadow-xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 grid place-items-center
                     rounded-full border border-white/20 text-white/80
                     hover:text-white hover:border-white/40 transition"
        >
          ×
        </button>

        <div className="w-full flex items-center justify-center">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-[170px] h-[250px] object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="mt-1 text-sm text-white/60">{book.author}</p>
          {book.totalPages ? (
            <p className="mt-1 text-xs text-white/50">
              {book.totalPages} pages
            </p>
          ) : null}
        </div>

        <div className="mt-8 w-full flex items-center justify-center">
          <button
            onClick={() => onStart?.(book)}
            className="px-7 py-3 rounded-full border border-white/20
                       hover:border-white/40 text-white font-medium
                       hover:bg-white/10 active:bg-white/15 transition"
          >
            Start reading
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadingModal;
