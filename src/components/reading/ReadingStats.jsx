import React from "react";

const ReadingStats = ({ stats }) => {
  return (
    <div className="bg-[#1F1F1F] text-white p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">📊 Reading Statistics</h3>
      <ul className="text-sm space-y-1">
        <li>
          Total pages read: <strong>{stats.totalPages}</strong>
        </li>
        <li>
          Total time: <strong>{stats.totalMinutes} min</strong>
        </li>
        <li>
          Avg speed: <strong>{stats.avgSpeed} pages/min</strong>
        </li>
        <li>
          Completion: <strong>{stats.percentage}%</strong>
        </li>
      </ul>
    </div>
  );
};

export default ReadingStats;
