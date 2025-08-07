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
        <button
          type="submit"
          className="flex items-center justify-center
             w-[98px] h-[38px] sm:w-[110px] sm:h-[40px] lg:w-[122px] lg:h-[42px] 
             border border-white/20 text-white font-semibold rounded-[30px] 
             px-[20px] py-[10px] sm:px-[24px] sm:py-[11px] lg:px-[28px] lg:py-[12px] 
             hover:bg-[#323232] transition-all duration-200"
        >
          To apply
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="flex items-center justify-center
             w-[98px] h-[38px] sm:w-[110px] sm:h-[40px] lg:w-[122px] lg:h-[42px] 
             border border-white/20 text-white font-semibold rounded-[30px] 
             px-[20px] py-[10px] sm:px-[24px] sm:py-[11px] lg:px-[28px] lg:py-[12px] 
             hover:bg-[#323232] transition-all duration-200"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
