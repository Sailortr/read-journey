import { useSelector, useDispatch } from "react-redux";
import AddBookForm from "../components/library/AddBookForm";
import RecommendedBooks from "../components/library/RecommendedBooks";
import LibraryList from "../components/library/LibraryList";
import FilterDropdown from "../components/library/FilterDropdown";
import { removeBookFromLibrary } from "../redux/thunks/bookThunks";

const MyLibraryPage = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.items); // ← store'daki kitaplar

  const handleRemoveBook = async (id) => {
    try {
      await dispatch(removeBookFromLibrary(id)).unwrap();
    } catch (error) {
      console.error("Kitap silinemedi:", error.message);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <aside className="w-full lg:w-[353px] flex flex-col gap-6 flex-shrink-0 bg-black rounded-[30px]">
        <div className="bg-dark-800 p-6 rounded-[30px] flex flex-col gap-4">
          <h3 className="text-white text-sm font-medium">Filters:</h3>
          <AddBookForm />
        </div>
        <RecommendedBooks />
      </aside>

      {/* Main content */}
      <section className="flex-1 bg-black p-6 rounded-[30px] flex flex-col gap-6 min-h-[400px]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-white text-2xl font-semibold">My library</h2>
          <FilterDropdown />
        </div>
        <LibraryList books={books} onRemove={handleRemoveBook} />{" "}
        {/* Silme fonksiyonu gönderildi */}
      </section>
    </div>
  );
};

export default MyLibraryPage;
