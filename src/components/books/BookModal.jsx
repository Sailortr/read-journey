// src/components/books/BookModal.jsx
import { HiOutlineX } from "react-icons/hi";
import fallbackImg from "../../assets/newbookimage.svg";
import okIcon from "../../assets/ok.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { addRecommendedBookToLibrary } from "../../redux/thunks/bookThunks";

const BookModal = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const library = useSelector((s) => s.books?.books) || [];

  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);

  if (!book) return null;

  const id = book._id || book.id;

  const alreadyInLib = useMemo(() => {
    const t = (book.title || "").trim().toLowerCase();
    const a = (book.author || "").trim().toLowerCase();
    return library.some(
      (b) =>
        (b._id || b.id) === id ||
        ((b.title || "").trim().toLowerCase() === t &&
          (b.author || "").trim().toLowerCase() === a)
    );
  }, [library, id, book.title, book.author]);

  const handleImageError = (e) => {
    e.currentTarget.src = fallbackImg;
  };

  const handleAddToLibrary = async () => {
    if (!id || loading) return;

    if (alreadyInLib) {
      setStatus("duplicate");
      return;
    }

    setLoading(true);
    try {
      await dispatch(addRecommendedBookToLibrary(id)).unwrap();
      setStatus("success");
      setTimeout(() => onClose?.(), 1500);
    } catch (err) {
      const code =
        err?.code ||
        (typeof err === "string" && /duplicate/i.test(err)
          ? "duplicate"
          : "error");
      setStatus(code === "duplicate" ? "duplicate" : "error");
    } finally {
      setLoading(false);
    }
  };

  const SuccessView = () => (
    <div className="flex flex-col items-center justify-center">
      <img src={okIcon} alt="" className="w-20 h-20 object-contain mb-4" />
      <h2 className="text-xl font-semibold text-white mb-2">Good job</h2>
      <p className="text-gray-300 text-center max-w-xs text-sm">
        Your book is now in the <span className="text-white">library</span>! The
        joy knows no bounds and now you can start your training.
      </p>
    </div>
  );

  const DuplicateView = () => (
    <div className="flex flex-col items-center justify-center">
      <img
        src={okIcon}
        alt=""
        className="w-20 h-20 object-contain mb-4 rotate-180 opacity-90"
      />
      <h2 className="text-xl font-semibold text-white mb-2">
        Already in your library
      </h2>
      <p className="text-gray-300 text-center max-w-xs text-sm">
        This book is already in your <span className="text-white">library</span>
        , so it can’t be added again.
      </p>
      <button
        onClick={onClose}
        className="mt-6 px-5 py-2 border border-gray-400 rounded-full hover:bg-gray-800 transition"
      >
        Close
      </button>
    </div>
  );

  const ErrorView = () => (
    <div className="flex flex-col items-center justify-center">
      <img
        src={okIcon}
        alt=""
        className="w-20 h-20 object-contain mb-4 rotate-180 grayscale"
      />
      <h2 className="text-xl font-semibold text-white mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-300 text-center max-w-xs text-sm">
        We couldn’t add the book right now. Please try again.
      </p>
      <button
        onClick={handleAddToLibrary}
        disabled={loading}
        className={`mt-6 px-5 py-2 border rounded-full transition ${
          loading
            ? "opacity-60 cursor-not-allowed border-gray-600"
            : "border-gray-400 hover:bg-gray-800"
        }`}
      >
        {loading ? "Adding…" : "Try again"}
      </button>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#1C1C1C] text-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4 md:mx-0"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          aria-label="Close modal"
        >
          <HiOutlineX />
        </button>

        {status === "success" ? (
          <SuccessView />
        ) : status === "duplicate" ? (
          <DuplicateView />
        ) : status === "error" ? (
          <ErrorView />
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={book.imageUrl || fallbackImg}
              alt={book.title}
              onError={handleImageError}
              className="w-32 h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold mb-1 text-center">
              {book.title}
            </h2>
            <p className="text-gray-400 text-sm">{book.author}</p>
            <p className="text-gray-500 text-sm">
              {book.totalPages || "?"} pages
            </p>

            {alreadyInLib && (
              <p className="mt-4 text-sm text-amber-300">
                This book is already in your library.
              </p>
            )}

            <button
              onClick={handleAddToLibrary}
              disabled={loading}
              className={`mt-4 px-5 py-2 border rounded-full transition ${
                loading
                  ? "opacity-60 cursor-not-allowed border-gray-600"
                  : "border-gray-400 hover:bg-gray-800"
              }`}
            >
              {loading ? "Adding…" : "Add to library"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookModal;
