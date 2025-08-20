import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState, useEffect } from "react";
import AddBookForm from "../components/library/AddBookForm";
import RecommendedBooks from "../components/library/RecommendedBooks";
import FilterDropdown from "../components/library/FilterDropdown";
import BookCard from "../components/books/BookCard";
import ReadingModal from "../components/reading/ReadingModal";
import ReadingSidebar from "../components/reading/ReadingSidebar";
import ReadingPanel from "../components/reading/ReadingPanel";
import blockIcon from "../assets/block.svg";
import {
  removeBookFromLibrary,
  fetchLibraryBooks,
} from "../redux/thunks/bookThunks";
import readingService from "../services/readingService";

const ITEMS_PER_PAGE = 10;
const apiStatusFor = (filter) => (filter === "all" ? undefined : filter);

const MyLibraryPage = () => {
  const dispatch = useDispatch();
  const books = useSelector((s) => s.books.books) || [];

  const [filter, setFilter] = useState("all");
  useEffect(() => {
    dispatch(fetchLibraryBooks(apiStatusFor(filter)));
  }, [dispatch, filter]);

  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [filter]);
  const totalPages = Math.max(1, Math.ceil(books.length / ITEMS_PER_PAGE));
  const pagedBooks = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return books.slice(start, start + ITEMS_PER_PAGE);
  }, [books, page]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const getBookId = (b) => b?._id || b?.id || b?.slug;

  const handleRemoveBook = async (id) => {
    try {
      await dispatch(removeBookFromLibrary(id));
      await dispatch(fetchLibraryBooks(apiStatusFor(filter)));
      if ((page - 1) * ITEMS_PER_PAGE >= books.length - 1) {
        setPage((p) => Math.max(1, p - 1));
      }
    } catch (error) {
      console.error("Kitap silinemedi:", error?.message);
    }
  };

  const [modalBook, setModalBook] = useState(null);
  const [readingBook, setReadingBook] = useState(null);

  const [isRecording, setIsRecording] = useState(false);
  const [startPageVal, setStartPageVal] = useState(0);
  const [stopPageVal, setStopPageVal] = useState(0);

  const [activeSessions, setActiveSessions] = useState([]);
  const [timeLeftText, setTimeLeftText] = useState("");

  const refreshActiveBook = async (bookId) => {
    try {
      const b = await readingService.getBookDetails(bookId);
      const sessions = Array.isArray(b.progress) ? b.progress : [];

      const parsed = sessions
        .filter(
          (s) => Number.isFinite(s.startPage) && Number.isFinite(s.finishPage)
        )
        .map((s) => {
          const startAt = s.startReading ? new Date(s.startReading) : null;
          const finishAt = s.finishReading ? new Date(s.finishReading) : null;
          const minutes =
            startAt && finishAt
              ? Math.max(1, Math.round((finishAt - startAt) / 60000))
              : 0;
          const pagesRead = Math.max(
            0,
            (s.finishPage ?? 0) - (s.startPage ?? 0)
          );
          const pph = minutes ? Math.round(pagesRead / (minutes / 60)) : 0;
          return {
            id: `${s._id || `${s.startReading}-${s.finishReading}`}`,
            date: s.finishReading || s.startReading || new Date().toISOString(),
            startPage: s.startPage ?? 0,
            stopPage: s.finishPage ?? s.startPage ?? 0,
            pagesRead,
            minutes,
            pagesPerHour: pph,
          };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setActiveSessions(parsed);

      const lastStop = parsed[0]?.stopPage ?? 0;
      setStartPageVal(lastStop);
      setStopPageVal(lastStop);

      if (typeof b.timeLeftToRead === "string" && b.timeLeftToRead.trim()) {
        setTimeLeftText(b.timeLeftToRead);
      } else {
        const totalPagesRead = parsed.reduce((a, s) => a + s.pagesRead, 0);
        const totalMinutes = parsed.reduce((a, s) => a + s.minutes, 0);
        const pagesPerHour = totalMinutes
          ? totalPagesRead / (totalMinutes / 60)
          : 0;
        const remaining = Math.max(0, (b.totalPages || 0) - totalPagesRead);
        if (pagesPerHour > 0) {
          const hours = remaining / pagesPerHour;
          const h = Math.floor(hours);
          const m = Math.round((hours - h) * 60);
          setTimeLeftText(`${h} hours and ${m} minutes left`);
        } else {
          setTimeLeftText("");
        }
      }
    } catch (e) {
      console.error("Kitap detayları alınamadı:", e?.message);
    }
  };

  const enterReadingMode = async (book) => {
    setReadingBook(book);
    setModalBook(null);
    await refreshActiveBook(getBookId(book));
    setIsRecording(false);
  };

  const onRecordClick = async () => {
    if (!readingBook) return;
    const id = getBookId(readingBook);

    if (!isRecording) {
      try {
        setIsRecording(true);
        await readingService.startReading({
          id,
          page: Number(startPageVal) || 0,
        });
      } catch (e) {
        console.error("Start failed:", e?.message);
        setIsRecording(false);
      }
    } else {
      try {
        setIsRecording(false);
        await readingService.finishReading({
          id,
          page: Number(stopPageVal) || 0,
        });
        await refreshActiveBook(id);
      } catch (e) {
        console.error("Finish failed:", e?.message);
        setIsRecording(true);
      }
    }
  };

  const pagerBtn =
    "w-10 h-10 grid place-items-center rounded-full border border-white/20 " +
    "text-white/90 hover:text-white hover:border-white/40 " +
    "disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white/90 " +
    "transition focus:outline-none focus:ring-2 focus:ring-white/20";

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      <aside className="w-full lg:w-[353px] flex flex-col gap-6 flex-shrink-0 bg-black rounded-[30px]">
        {readingBook ? (
          <ReadingSidebar
            isRecording={isRecording}
            startPage={startPageVal}
            stopPage={stopPageVal}
            onChangeStartPage={setStartPageVal}
            onChangeStopPage={setStopPageVal}
            onStart={() => !isRecording && onRecordClick()}
            onStop={() => isRecording && onRecordClick()}
            sessions={activeSessions}
            totalPages={readingBook?.totalPages || 0}
            stats={{
              totalPages: activeSessions.reduce((a, s) => a + s.pagesRead, 0),
              totalMinutes: activeSessions.reduce((a, s) => a + s.minutes, 0),
              avgSpeed: (() => {
                const tp = activeSessions.reduce((a, s) => a + s.pagesRead, 0);
                const tm = activeSessions.reduce((a, s) => a + s.minutes, 0);
                return tm ? +(tp / tm).toFixed(2) : 0; // pages/min
              })(),
              percentage: (() => {
                const tp = activeSessions.reduce((a, s) => a + s.pagesRead, 0);
                return readingBook?.totalPages
                  ? Math.round((tp / readingBook.totalPages) * 100)
                  : 0;
              })(),
            }}
          />
        ) : (
          <>
            <div className="bg-dark-800 p-6 rounded-[30px] flex flex-col gap-4">
              <h3 className="text-white text-sm font-medium">
                Create your library:
              </h3>
              <AddBookForm />
            </div>
            <RecommendedBooks />
          </>
        )}
      </aside>

      <section className="flex-1 bg-black p-6 rounded-[30px] flex flex-col gap-6 min-h-[400px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-white text-2xl font-semibold">
            {readingBook ? "My reading" : "My library"}
          </h2>

          {!readingBook ? (
            <div className="flex items-center gap-3">
              <FilterDropdown value={filter} onChange={setFilter} />
              {books.length > ITEMS_PER_PAGE && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    aria-label="Prev"
                    className={pagerBtn}
                  >
                    <span className="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-full hover:bg-primary hover:text-white disabled:opacity-30 transition">
                      ‹
                    </span>
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    aria-label="Next"
                    className={pagerBtn}
                  >
                    <span className="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-full hover:bg-primary hover:text-white disabled:opacity-30 transition">
                      ›
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-white/60 text-sm ml-auto">{timeLeftText}</div>
          )}
        </div>

        {!readingBook ? (
          <>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-items-start">
              {pagedBooks.map((book) => (
                <div key={getBookId(book)} className="relative">
                  <BookCard
                    book={{
                      title: book.title,
                      author: book.author,
                      imageUrl: book.imageUrl,
                      totalPages: book.totalPages,
                      _id: book._id,
                      id: book.id,
                      slug: book.slug,
                    }}
                    onClick={() => setModalBook(book)}
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const id = getBookId(book);
                      if (id) handleRemoveBook(id);
                    }}
                    aria-label="Remove from My Library"
                    title="Remove from My Library"
                    className="absolute z-10 bottom-2 right-2 w-8 h-8 grid place-items-center
                               rounded-full border border-red-500/40 bg-black/30
                               hover:border-red-500/70 hover:bg-red-500/10 active:bg-red-500/20 transition"
                  >
                    <img
                      src={blockIcon}
                      alt=""
                      className="w-4 h-4 pointer-events-none"
                    />
                  </button>
                </div>
              ))}
              {Array.from({
                length: Math.max(0, ITEMS_PER_PAGE - pagedBooks.length),
              }).map((_, i) => (
                <div key={`ph-${i}`} className="w-[137px] h-[248px]" />
              ))}
            </div>

            {books.length > ITEMS_PER_PAGE && (
              <div className="mt-3 flex justify-center items-center gap-3 text-white">
                <button
                  onClick={handlePrev}
                  disabled={page === 1}
                  aria-label="Prev"
                  className={pagerBtn}
                >
                  <span className="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-full hover:bg-primary hover:text-white disabled:opacity-30 transition">
                    ‹
                  </span>
                </button>
                <span className="text-xs text-white/60 select-none">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  aria-label="Next"
                  className={pagerBtn}
                >
                  <span className="w-10 h-10 flex items-center justify-center border border-gray-600 rounded-full hover:bg-primary hover:text-white disabled:opacity-30 transition">
                    ›
                  </span>
                </button>
              </div>
            )}
          </>
        ) : (
          <ReadingPanel
            book={readingBook}
            isRecording={isRecording}
            onRecordClick={onRecordClick}
          />
        )}
      </section>

      {modalBook && (
        <ReadingModal
          book={modalBook}
          onClose={() => setModalBook(null)}
          onStart={(b) => enterReadingMode(b)}
        />
      )}
    </div>
  );
};

export default MyLibraryPage;
