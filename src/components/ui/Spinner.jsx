import React from "react";

const Spinner = () => {
  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
