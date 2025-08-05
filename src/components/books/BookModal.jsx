import { HiOutlineX } from "react-icons/hi";
import fallbackImg from "../../assets/placeholder-cover.png";
import okIcon from "../../assets/ok.svg";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addRecommendedBookToLibrary } from "../../redux/thunks/bookThunks"; // doğru thunk

const BookModal = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  const handleImageError = (e) => {
    e.target.src = fallbackImg;
  };

  const handleAddToLibrary = async () => {
    try {
      await dispatch(addRecommendedBookToLibrary(book._id)).unwrap(); // sadece ID gönderiyoruz
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose(); // modal kapanıyor
      }, 2000);
    } catch (error) {
      console.error("Kitap eklenemedi:", error.message);
    }
  };

  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#1C1C1C] text-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4 md:mx-0"
      >
        {/* X Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          aria-label="Close modal"
        >
          <HiOutlineX />
        </button>

        {success ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src={okIcon}
              alt="Success"
              className="w-20 h-20 object-contain mb-4"
            />
            <h2 className="text-xl font-semibold text-white mb-2">Good job</h2>
            <p className="text-gray-300 text-center max-w-xs text-sm">
              Your book is now in the{" "}
              <span className="text-white">library</span>! The joy knows no
              bounds and now you can start your training.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={book.imageUrl}
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
            <button
              onClick={handleAddToLibrary}
              className="mt-6 px-5 py-2 border border-gray-400 rounded-full hover:bg-gray-800 transition"
            >
              Add to library
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookModal;
