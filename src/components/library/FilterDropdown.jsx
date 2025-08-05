// src/components/library/FilterDropdown.jsx
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const options = ["Unread", "In progress", "Done", "All books"];

const FilterDropdown = ({ selected = "All books", onChange = () => {} }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="relative w-[153px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-[46px] flex items-center justify-between bg-[#1F1F1F] text-white text-sm px-4 border border-[#2D2D2D] rounded-lg focus:outline-none"
      >
        {selected}
        <FaChevronDown className="ml-2 text-xs" />
      </button>

      {open && (
        <ul className="absolute z-10 w-full bg-[#1F1F1F] mt-2 rounded-xl border border-[#2D2D2D] shadow-lg text-sm text-gray-300 overflow-hidden">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-[#2A2A2A] transition ${
                selected === option ? "text-white font-semibold" : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
