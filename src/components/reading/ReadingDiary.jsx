const fmt = (d) =>
  new Date(d).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const ReadingDiary = ({ entries = [], totalPages = 0, onDelete }) => {
  if (!entries.length) {
    return (
      <div className="mt-4 text-sm text-white/50">
        No sessions yet. Start recording to see your progress.
      </div>
    );
  }

  return (
    <ul className="mt-4 space-y-3">
      {entries.map((s) => {
        const pct = totalPages
          ? Math.min(100, Math.round((s.pagesRead / totalPages) * 100))
          : 0;
        return (
          <li
            key={s.id}
            className="p-3 bg-black/30 rounded-2xl border border-white/10 flex items-center gap-3"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{fmt(s.date)}</span>
                <span className="text-white/60 text-xs">
                  {s.pagesRead} pages
                </span>
              </div>

              <div className="mt-1 text-white/70 text-xs flex gap-4">
                <span>{pct}%</span>
                <span>{s.minutes} min</span>
                <span>{s.pagesPerHour} pages/hr</span>
              </div>

              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${Math.max(4, pct)}%` }}
                />
              </div>
            </div>

            {onDelete && (
              <button
                onClick={() => onDelete(s.id)}
                className="shrink-0 w-7 h-7 grid place-items-center rounded-full border border-white/15 text-white/70 hover:border-white/30 hover:text-white transition"
                title="Delete session"
                aria-label="Delete session"
              >
                🗑️
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ReadingDiary;
