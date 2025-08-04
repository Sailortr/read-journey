import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import SidebarContent from "../components/layout/SidebarContent";
import BookList from "../components/books/BookList";
import BookModal from "../components/books/BookModal";
import bookService from "../services/bookService";

const RecommendedPage = () => {
  const [filters, setFilters] = useState({ title: "", author: "" });
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await bookService.getRecommendedBooks({ ...filters, page });
        setBooks(res.results);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error("Kitaplar alınamadı", err);
      }
    };
    fetchBooks();
  }, [filters, page]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <MainLayout
      sidebarContent={
        <SidebarContent filters={filters} onFilterChange={handleFilterChange} />
      }
    >
      {/* İçerik: Figma genişlikleri (mobile 335 / tablet 704 / desktop 847). 
          Burada max-width ile sınırlandırıyoruz; hizalama sidebar’ın hemen yanında kalır. */}
      <div className="w-full max-w-[335px] sm:max-w-[704px] lg:max-w-[847px] space-y-6">
        <BookList
          books={books}
          onBookClick={(book) => setSelectedBook(book)}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />

        {selectedBook && (
          <BookModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default RecommendedPage;
