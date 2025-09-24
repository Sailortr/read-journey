import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState, useEffect } from "react";
import AddBookForm from "../components/library/AddBookForm";
import RecommendedBooks from "../components/library/RecommendedBooks";
import FilterDropdown from "../components/library/FilterDropdown";
import BookCard from "../components/books/BookCard";
import ReadingModal from "../components/reading/ReadingModal";
import ReadingSidebar from "../components/reading/ReadingSidebar";
import ReadingPanel from "../components/reading/ReadingPanel";
import EmptyLibraryState from "../components/library/EmptyLibraryState";
import blockIcon from "../assets/block.svg";
import {
  removeBookFromLibrary,
  fetchLibraryBooks,
} from "../redux/thunks/bookThunks";
import readingService from "../services/readingService";
import BookFinishedModal from "../components/reading/BookFinishedModal";

const ITEMS_PER_PAGE = 10;
const apiStatusFor = (filter) => (filter === "all" ? undefined : filter);

const norm = (v, fallback = 0) => {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? Math.max(0, n) : fallback;
};

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
      console.error("The book couldn’t be deleted.", error?.message);
    }
  };

  const [modalBook, setModalBook] = useState(null);
  const [readingBook, setReadingBook] = useState(null);

  const [isRecording, setIsRecording] = useState(false);
  const [busy, setBusy] = useState(false);

  const [startPageVal, setStartPageVal] = useState(0);
  const [stopPageVal, setStopPageVal] = useState(0);

  const [inlineMsg, setInlineMsg] = useState("");

  const [activeSessions, setActiveSessions] = useState([]);
  const [timeLeftText, setTimeLeftText] = useState("");

  const [finishedBook, setFinishedBook] = useState(null);
  const [finishedOpen, setFinishedOpen] = useState(false);

  const refreshActiveBook = async (bookId) => {
    try {
      const b = await readingService.getBookDetails(bookId);
      const sessions = Array.isArray(b.progress) ? b.progress : [];

      const parsed = sessions
        .filter((s) => Number.isFinite(s.startPage))
        .map((s) => {
          const startAt = s.startReading ? new Date(s.startReading) : null;
          const finishAt = s.finishReading ? new Date(s.finishReading) : null;
          const minutes =
            startAt && finishAt
              ? Math.max(1, Math.round((finishAt - startAt) / 60000))
              : 0;
          const pagesRead = Math.max(
            0,
            (s.finishPage ?? s.startPage ?? 0) - (s.startPage ?? 0)
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

      const lastStop = parsed.length ? Math.max(0, parsed[0].stopPage) : 0;
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
      console.error("Failed to fetch book details:", e?.message);
    }
  };

  const enterReadingMode = async (book) => {
    setReadingBook(book);
    setModalBook(null);
    setIsRecording(false);
    setBusy(false);
    setInlineMsg("");
    await refreshActiveBook(getBookId(book));
  };

  const handleStartChange = (v) => {
    setInlineMsg("");
    setStartPageVal(v);
  };
  const handleStopChange = (v) => {
    setInlineMsg("");
    setStopPageVal(v);
  };

  const handleDeleteSession = async (readingId) => {
    if (!readingBook || busy) return;
    try {
      setBusy(true);
      await readingService.deleteReading({
        bookId: getBookId(readingBook),
        readingId,
      });
      await refreshActiveBook(getBookId(readingBook));
    } catch (e) {
      console.error("Failed to delete session:", e?.message);
    } finally {
      setBusy(false);
    }
  };

  const handleFinishedClose = async () => {
    setFinishedOpen(false);
    setFinishedBook(null);
    setReadingBook(null);
    setIsRecording(false);
    setInlineMsg("");
    setFilter("done");
    try {
      await dispatch(fetchLibraryBooks(apiStatusFor("done")));
    } catch {}
  };

  const onRecordClick = async () => {
    if (!readingBook || busy) return;

    const id = getBookId(readingBook);
    const total = Number(readingBook?.totalPages || 0);

    const lastStop = activeSessions[0]?.stopPage ?? 0;
    const expectedNextStart = Math.min(lastStop + 1, total || Infinity);

    try {
      setBusy(true);
      setInlineMsg("");

      if (!isRecording) {
        if (total && lastStop >= total) {
          setInlineMsg("It looks like this book is already finished.");
          setBusy(false);
          return;
        }

        const typedStart = norm(startPageVal, expectedNextStart);

        if (typedStart !== expectedNextStart) {
          setInlineMsg(`The start page can only be ${expectedNextStart}.`);
          setStartPageVal(lastStop);
          setBusy(false);
          return;
        }
        if (total && typedStart > total) {
          setInlineMsg(`Total pages: ${total}. You can’t exceed ${total}.`);
          setBusy(false);
          return;
        }

        setStartPageVal(typedStart);
        setStopPageVal(typedStart);
        await readingService.startReading({ id, page: typedStart });
        setIsRecording(true);
        await refreshActiveBook(id);
      } else {
        const minStop = startPageVal;
        const typedStop = norm(stopPageVal, minStop);

        if (typedStop < minStop) {
          setInlineMsg(`The end page must be at least ${minStop}.`);
          setBusy(false);
          return;
        }
        if (total && typedStop > total) {
          setInlineMsg(`The end page can be at most ${total}.`);
          setBusy(false);
          return;
        }

        setStopPageVal(typedStop);
        await readingService.finishReading({ id, page: typedStop });
        setIsRecording(false);
        await refreshActiveBook(id);

        if (total && typedStop === total) {
          setFinishedBook(readingBook);
          setFinishedOpen(true);
        }
      }
    } catch (e) {
      console.error("Record error:", e?.message);
      setInlineMsg(e?.message || "An error occurred.");
    } finally {
      setBusy(false);
    }
  };

  const pagerBtn =
    "w-10 h-10 grid place-items-center rounded-full border border-white/20 " +
    "text-white/90 hover:text-white hover:border-white/40 " +
    "disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-white/90 " +
    "transition focus:outline-none focus:ring-2 focus:ring-white/20";

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8 lg:px-10 py-4 flex flex-col lg:flex-row gap-6 lg:gap-8">
      <aside className="w-full lg:w-[353px] flex-shrink-0 flex flex-col gap-6 bg-[#1F1F1F] border border-[#2D2D2D] rounded-[30px]">
        {readingBook ? (
          <ReadingSidebar
            isRecording={isRecording}
            startPage={startPageVal}
            stopPage={stopPageVal}
            onChangeStartPage={handleStartChange}
            onChangeStopPage={handleStopChange}
            onStart={onRecordClick}
            onStop={onRecordClick}
            sessions={activeSessions}
            totalPages={readingBook?.totalPages || 0}
            stats={{
              totalPages: activeSessions.reduce((a, s) => a + s.pagesRead, 0),
              totalMinutes: activeSessions.reduce((a, s) => a + s.minutes, 0),
              avgSpeed: (() => {
                const tp = activeSessions.reduce((a, s) => a + s.pagesRead, 0);
                const tm = activeSessions.reduce((a, s) => a + s.minutes, 0);
                return tm ? +(tp / tm).toFixed(2) : 0;
              })(),
              percentage: (() => {
                const tp = activeSessions.reduce((a, s) => a + s.pagesRead, 0);
                return readingBook?.totalPages
                  ? Math.round((tp / readingBook.totalPages) * 100)
                  : 0;
              })(),
            }}
            busy={busy}
            inlineMsg={inlineMsg}
            onDeleteEntry={handleDeleteSession}
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

      <section className="flex-1 min-w-0 bg-[#1F1F1F] border border-[#2D2D2D] p-6 rounded-[30px] flex flex-col gap-6 min-h-[400px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-white text-[28px] leading-8 font-bold tracking-[0.02em]">
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
            {books.length === 0 ? (
              <EmptyLibraryState />
            ) : (
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
            )}
          </>
        ) : (
          <ReadingPanel
            book={readingBook}
            isRecording={isRecording}
            onRecordClick={onRecordClick}
            disabled={busy}
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

      {finishedOpen && finishedBook && (
        <BookFinishedModal book={finishedBook} onClose={handleFinishedClose} />
      )}
    </div>
  );
};

export default MyLibraryPage;
