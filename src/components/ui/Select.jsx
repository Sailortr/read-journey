import React from "react";

const Select = ({ label, options = [], error, ...rest }) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <select
        className={`w-full px-3 py-2 rounded-md border text-sm bg-[#2A2A2A] text-white
          ${error ? "border-red-500" : "border-gray-600 focus:border-white"}
          outline-none focus:ring-1 focus:ring-white transition-all`}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Select;
