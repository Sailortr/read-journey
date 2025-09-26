import React from "react";

export default function DashboardPanel({ children }) {
  return (
    <div
      className="w-full bg-[#141414] rounded-3xl p-6 md:p-8 lg:p-10
                 shadow-md border border-[#2A2A2A] transition-all duration-300"
    >
      {children}
    </div>
  );
}
