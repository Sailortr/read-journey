// src/components/reading/ReadingDiary.jsx
import React from "react";

const ReadingDiary = ({ diary, onDelete }) => {
  if (!diary?.length) {
    return <p className="text-gray-400">No reading history yet.</p>;
  }

  return (
    <div className="mt-6">
      <h4 className="text-lg font-bold mb-2 text-white">📖 Reading Diary</h4>
      <ul className="space-y-2">
        {diary.map((entry) => (
          <li
            key={entry.id}
            className="bg-[#2A2A2A] text-white px-4 py-2 rounded-md flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Date:</strong> {entry.date}
              </p>
              <p>
                <strong>Pages:</strong> {entry.pages}, <strong>Time:</strong>{" "}
                {entry.minutes} min
              </p>
            </div>
            <button
              onClick={() => onDelete(entry.id)}
              className="text-red-400 hover:text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingDiary;
