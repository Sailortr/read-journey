import { useEffect, useRef, useState } from "react";
import fallbackImg from "../../assets/placeholder-cover.png";

const BookCard = ({ book, onClick }) => {
  const { title, author, imageUrl } = book || {};
  const containerRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [src, setSrc] = useState(fallbackImg);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "200px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      setSrc(imageUrl || fallbackImg);
    }
  }, [isVisible, imageUrl]);

  const handleImageError = (e) => {
    if (e.currentTarget.src !== fallbackImg) {
      e.currentTarget.src = fallbackImg;
    }
    setImgLoaded(true);
  };

  return (
    <div
      ref={containerRef}
      onClick={() => onClick?.(book)}
      className="relative w-[137px] h-[248px] cursor-pointer bg-[#1C1C1C] rounded-2xl overflow-hidden 
                 shadow-md hover:shadow-lg hover:scale-[1.03] transition duration-300 ease-in-out"
      title={title}
    >
      <img
        src={src}
        alt={title || "Book cover"}
        loading="lazy"
        decoding="async"
        onLoad={() => setImgLoaded(true)}
        onError={handleImageError}
        className={`w-[137px] h-[200px] object-cover rounded-t-2xl
                    transition-opacity duration-300 ease-in-out
                    ${imgLoaded ? "opacity-100" : "opacity-0"} 
                    ${!imgLoaded ? "blur-sm" : "blur-0"}`}
        sizes="137px"
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

      {(!isVisible || !imgLoaded) && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-[137px] h-[200px] bg-[#2A2A2A] animate-pulse rounded-t-2xl" />
          <div className="px-2 pt-2">
            <div className="h-[14px] w-[90%] bg-[#2A2A2A] rounded animate-pulse mb-1" />
            <div className="h-[10px] w-[70%] bg-[#2A2A2A] rounded animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
