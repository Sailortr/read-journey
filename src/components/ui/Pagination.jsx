import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6 gap-4 items-center text-white">
      <button
        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-30"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Geri
      </button>

      <span className="text-sm">
        Sayfa {currentPage} / {totalPages}
      </span>

      <button
        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-30"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        İleri →
      </button>
    </div>
  );
};

export default Pagination;
