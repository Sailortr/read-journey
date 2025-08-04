// components/books/BookModal.jsx
import fallbackImg from "../../assets/placeholder-cover.png";

const BookModal = ({ book, onClose }) => {
  const handleImageError = (e) => {
    e.target.src = fallbackImg;
  };

  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1C1C1C] text-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4 md:mx-0"
      >
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
            onClick={onClose}
            className="mt-6 px-5 py-2 border border-gray-400 rounded-full hover:bg-gray-800 transition"
          >
            Add to library
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
