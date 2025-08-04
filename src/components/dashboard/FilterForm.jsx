import React, { useEffect, useState } from "react";

export default function FilterForm({ filters = {}, onChange }) {
  // Formu lokal state ile kontrol ediyoruz
  const [localFilters, setLocalFilters] = useState({
    title: filters.title || "",
    author: filters.author || "",
  });

  // Dışarıdan gelen filters değişirse formu senkronla
  useEffect(() => {
    setLocalFilters({
      title: filters.title || "",
      author: filters.author || "",
    });
  }, [filters.title, filters.author]);

  // Yazdıkça lokal state'i güncelle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Kullanıcı yazmayı bıraktıktan 300ms sonra onChange çağır
  useEffect(() => {
    const t = setTimeout(() => {
      onChange?.(localFilters);
    }, 300); // debounce süresi

    return () => clearTimeout(t);
  }, [localFilters, onChange]);

  // Butona basılırsa hemen uygula
  const handleSubmit = (e) => {
    e.preventDefault();
    onChange?.(localFilters);
  };

  const handleClear = () => {
    const cleared = { title: "", author: "" };
    setLocalFilters(cleared);
    onChange?.(cleared); // hemen temiz filtre gönder
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="title"
        value={localFilters.title}
        onChange={handleChange}
        placeholder="Book title"
        className="bg-[#2e2e2e] text-white placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
      />

      <input
        type="text"
        name="author"
        value={localFilters.author}
        onChange={handleChange}
        placeholder="Author"
        className="bg-[#2e2e2e] text-white placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-[#627EFF] text-white font-semibold py-3 rounded-xl hover:bg-[#546ce0] transition"
        >
          To apply
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-3 rounded-xl border border-[#3A3A3A] text-gray-300 hover:bg-[#323232] transition"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
