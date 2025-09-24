import React, { useEffect, useState } from "react";

export default function FilterForm({ filters = {}, onChange }) {
  const [localFilters, setLocalFilters] = useState({
    title: filters.title || "",
    author: filters.author || "",
  });

  useEffect(() => {
    setLocalFilters({
      title: filters.title || "",
      author: filters.author || "",
    });
  }, [filters.title, filters.author]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const t = setTimeout(() => {
      onChange?.(localFilters);
    }, 300000);
    return () => clearTimeout(t);
  }, [localFilters, onChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange?.(localFilters);
  };

  const handleClear = () => {
    const cleared = { title: "", author: "" };
    setLocalFilters(cleared);
    onChange?.(cleared);
  };

  const btnBase =
    "inline-flex items-center justify-center whitespace-nowrap " +
    "rounded-[30px] border border-white/20 text-white font-bold " +
    "text-[14px] leading-[18px] tracking-[0.02em] " +
    "h-[38px] px-[20px] hover:bg-[#323232] transition-all duration-200 " +
    "sm:h-[40px] sm:px-[24px] lg:h-[42px] lg:px-[28px]";

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

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <button type="submit" className={btnBase}>
          To apply
        </button>

        <button type="button" onClick={handleClear} className={btnBase}>
          Clear
        </button>
      </div>
    </form>
  );
}
