// src/components/library/AddBookForm.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addBookToLibraryThunk,
  fetchLibraryBooks,
} from "../../redux/thunks/bookThunks";

const AddBookForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: "", author: "", totalPages: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addBookToLibraryThunk(form)).unwrap();
      dispatch(fetchLibraryBooks());
      toast.success("Kitap başarıyla eklendi!");
      setForm({ title: "", author: "", totalPages: "" });
    } catch (err) {
      toast.error(err || "Kitap eklenemedi!");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Book title"
        required
        className="bg-[#1C1C1C] text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl outline-none"
      />
      <input
        type="text"
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="The author"
        required
        className="bg-[#1C1C1C] text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl outline-none"
      />
      <input
        type="number"
        name="totalPages"
        value={form.totalPages}
        onChange={handleChange}
        placeholder="Number of pages"
        required
        className="bg-[#1C1C1C] text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl outline-none"
      />
      <button
        type="submit"
        className="mt-6 px-2 py-2 text-sm rounded-full border border-white text-white hover:bg-white hover:text-black transition"
      >
        Add book
      </button>
    </form>
  );
};

export default AddBookForm;
