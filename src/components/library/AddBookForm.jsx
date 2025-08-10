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
        className="w-full bg-[#1C1C1C] text-white placeholder-white/40 text-sm
               px-4 py-3 rounded-2xl border border-white/10
               hover:border-white/20 focus:border-white/40
               focus:ring-2 focus:ring-white/15 outline-none
               transition-colors"
      />

      <input
        type="text"
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="The author"
        required
        className="w-full bg-[#1C1C1C] text-white placeholder-white/40 text-sm
               px-4 py-3 rounded-2xl border border-white/10
               hover:border-white/20 focus:border-white/40
               focus:ring-2 focus:ring-white/15 outline-none
               transition-colors"
      />

      <input
        type="number"
        name="totalPages"
        value={form.totalPages}
        onChange={handleChange}
        placeholder="Number of pages"
        required
        className="w-full bg-[#1C1C1C] text-white placeholder-white/40 text-sm
               px-4 py-3 rounded-2xl border border-white/10
               hover:border-white/20 focus:border-white/40
               focus:ring-2 focus:ring-white/15 outline-none
               transition-colors
               [appearance:textfield]
               [&::-webkit-outer-spin-button]:appearance-none
               [&::-webkit-inner-spin-button]:appearance-none"
      />

      <button
        type="submit"
        className="mt-6 inline-flex items-center justify-center
               px-5 py-2.5 text-sm font-medium
               rounded-full border border-white/20 text-white
               hover:border-white/40 hover:bg-white/10
               active:bg-white/15
               disabled:opacity-40 disabled:cursor-not-allowed
               focus:outline-none focus:ring-2 focus:ring-white/20
               transition"
      >
        Add book
      </button>
    </form>
  );
};

export default AddBookForm;
