import fallbackImg from "../../assets/placeholder-cover.png";
import emptyIcon from "../../assets/books.svg";

const LibraryList = ({ books = [], onRemove }) => {
  const handleImageError = (e) => {
    e.target.src = fallbackImg;
  };

  if (!Array.isArray(books) || books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-gray-400 mt-10">
        <img
          src={emptyIcon}
          alt="Empty Library"
          className="w-24 h-24 mb-4 opacity-50"
        />
        <p className="text-sm">
          To start training, <span className="text-white">add</span> some of
          your books <br />
          or choose from the recommended ones.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {books.map((book) => (
        <div
          key={book._id || book.id}
          className="relative bg-[#1F1F1F] text-white p-3 rounded-xl border border-[#2D2D2D] hover:shadow-md transition"
        >
          {/* ❌ Silme butonu */}
          {onRemove && (
            <button
              onClick={() => onRemove(book._id || book.id)}
              className="absolute top-2 right-2 text-sm text-gray-400 hover:text-red-500 transition"
              title="Remove book"
            >
              🗑️
            </button>
          )}

          <img
            src={book.imageUrl || fallbackImg}
            alt={book.title || "Book cover"}
            onError={handleImageError}
            className="w-full h-[140px] object-cover rounded mb-2"
          />
          <p className="text-sm font-semibold truncate">
            {book.title || "Untitled"}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {book.author || "Unknown author"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LibraryList;
