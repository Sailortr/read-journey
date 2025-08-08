import fallbackImg from "../../assets/placeholder-cover.png";
import emptyIcon from "../../assets/books.svg";
import blockIcon from "../../assets/block.svg";

const LibraryList = ({ books = [], onRemove }) => {
  const handleImageError = (e) => {
    e.target.src = fallbackImg;
  };

  const validBooks = Array.isArray(books)
    ? books.filter((book) => book && typeof book === "object")
    : [];

  if (validBooks.length === 0) {
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
      {validBooks.map((book) => {
        const id = book._id || book.id;
        return (
          <div
            key={id}
            className="relative bg-[#1F1F1F] text-white p-3 rounded-xl border border-[#2D2D2D] hover:shadow-md transition"
          >
            {onRemove && (
              <button
                onClick={() => onRemove(id)}
                title="Remove book"
                aria-label="Remove book"
                className="absolute bottom-1 right-1 p-1 hover:scale-110 transition-transform"
              >
                <img
                  src={blockIcon}
                  alt="Remove icon"
                  className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity"
                />
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
        );
      })}
    </div>
  );
};

export default LibraryList;
