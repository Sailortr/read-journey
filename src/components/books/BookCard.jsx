// src/components/books/BookCard.jsx
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import fallbackImg from "../../assets/placeholder-cover.png";
import Spinner from "../ui/Spinner";

const BookCard = ({ book, onClick }) => {
  const { title = "Untitled", author = "Unknown", imageUrl } = book || {};
  const [loaded, setLoaded] = useState(false);

  const onErr = (e) => {
    if (e.currentTarget?.src !== fallbackImg) e.currentTarget.src = fallbackImg;
    setLoaded(true);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(book)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.(book)}
      aria-label={`${title} by ${author}`}
      title={title}
      className="relative w-[137px] h-[248px] cursor-pointer bg-[#1C1C1C]
                 rounded-2xl overflow-hidden shadow-md
                 hover:shadow-lg hover:scale-[1.03] transition duration-300 ease-in-out
                 focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      <div className="relative w-full h-[200px] rounded-2xl overflow-hidden bg-[#2A2A2A]">
        {!loaded && (
          <div className="absolute inset-0 z-20 grid place-items-center pointer-events-none">
            <Spinner className="w-7 h-7 text-white/90" />
          </div>
        )}

        <LazyLoadImage
          src={imageUrl || fallbackImg}
          alt={title || "Book cover"}
          effect="blur"
          placeholderSrc={fallbackImg}
          afterLoad={() => setLoaded(true)}
          onError={onErr}
          draggable={false}
          wrapperClassName="absolute inset-0 block w-full h-full z-0"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-2 pt-2 text-left">
        <h3 className="truncate font-bold text-[14px] leading-[18px] tracking-[-0.02em] text-[#F9F9F9]">
          {title}
        </h3>
        <p className="truncate font-medium text-[10px] leading-[12px] tracking-[-0.02em] text-[#686868]">
          {author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
