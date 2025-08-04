// src/pages/LibraryPage.jsx
import Sidebar from "../components/layout/Sidebar";
import DashboardPanel from "../components/dashboard/DashboardPanel";
import AddBookForm from "../components/dashboard/AddBookForm";
import BookList from "../components/books/BookList";

const LibraryPage = () => {
  return (
    <div className="min-h-screen flex bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-6">
        <DashboardPanel>
          <AddBookForm />
          <BookList isLibrary />
        </DashboardPanel>
      </main>
    </div>
  );
};

export default LibraryPage;
