// src/components/library/AddBookForm.jsx
import { useState } from "react";

const AddBookForm = () => {
  const [form, setForm] = useState({ title: "", author: "", pages: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book added:", form);
    setForm({ title: "", author: "", pages: "" });
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
        name="pages"
        value={form.pages}
        onChange={handleChange}
        placeholder="Number of pages"
        required
        className="bg-[#1C1C1C] text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl outline-none"
      />
      <button
        type="submit"
        className="mt-2 px-5 py-2 text-sm rounded-full border border-white text-white hover:bg-white hover:text-black transition"
      >
        Add book
      </button>
    </form>
  );
};

export default AddBookForm;
