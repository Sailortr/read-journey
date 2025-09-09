import { useEffect, useRef, useState } from "react";
import fallbackImg from "../../assets/placeholder-cover.png";

const BookCard = ({ book, onClick }) => {
  const { title = "Untitled", author = "Unknown", imageUrl } = book || {};
  const ref = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [src, setSrc] = useState(fallbackImg);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: "200px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) setSrc(imageUrl || fallbackImg);
  }, [isVisible, imageUrl]);

  const onErr = (e) => {
    if (e.currentTarget.src !== fallbackImg) e.currentTarget.src = fallbackImg;
    setImgLoaded(true);
  };

  return (
    <div
      ref={ref}
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
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-[#2A2A2A]" />
        )}

        <img
          src={src}
          alt={title || "Book cover"}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={onErr}
          draggable="false"
          className={`absolute inset-0 block w-full h-full object-cover
                      transition-opacity duration-300 ease-in-out
                      ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      <div className="px-2 pt-2 text-left">
        <h3
          className="truncate font-bold text-[14px] leading-[18px] tracking-[-0.02em] text-[#F9F9F9]"
          style={{ fontFamily: "Gilroy, sans-serif" }}
          title={title}
        >
          {title}
        </h3>
        <p
          className="truncate font-medium text-[10px] leading-[12px] tracking-[-0.02em] text-[#686868]"
          style={{ fontFamily: "Gilroy, sans-serif" }}
          title={author}
        >
          {author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
