// src/components/books/BookCard.jsx
import fallbackImg from "../../assets/placeholder-cover.png";

const BookCard = ({ book, onClick }) => {
  const { title, author, imageUrl } = book;

  const handleImageError = (e) => {
    e.target.src = fallbackImg;
  };

  return (
    <div
      onClick={() => onClick(book)}
      className="w-[137px] h-[248px] cursor-pointer bg-[#1C1C1C] rounded-2xl overflow-hidden 
      shadow-md hover:shadow-lg hover:scale-[1.03] 
      transition duration-300 ease-in-out"
    >
      <img
        src={imageUrl || fallbackImg}
        alt={title}
        onError={handleImageError}
        className="w-[137px] h-[200px] object-cover rounded-t-2xl"
      />
      <div className="px-2 pt-2 text-center space-y-1">
        <h3
          className="truncate font-bold text-[14px] leading-[18px] tracking-[-0.02em] text-[#F9F9F9]"
          style={{ fontFamily: "Gilroy, sans-serif" }}
        >
          {title}
        </h3>
        <p
          className="truncate font-medium text-[10px] leading-[12px] tracking-[-0.02em] text-[#686868]"
          style={{ fontFamily: "Gilroy, sans-serif" }}
        >
          {author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
