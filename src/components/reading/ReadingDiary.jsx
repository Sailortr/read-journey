import React, { useMemo } from "react";
import blockIcon from "../../assets/block2.svg";
import trashIcon from "../../assets/trash2.svg";

const toKey = (d) => {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const keyToLabel = (k) => k.split("-").reverse().join(".");

const ReadingDiary = ({ entries = [], totalPages = 0, onDelete }) => {
  if (!Array.isArray(entries) || entries.length === 0) {
    return (
      <div className="mt-4 text-sm text-white/60">
        No sessions yet. Start recording to see your progress.
      </div>
    );
  }

  const groups = useMemo(() => {
    const map = new Map();
    for (const s of entries) {
      const when =
        s.date || s.finishReading || s.startReading || new Date().toISOString();
      const key = toKey(when);
      if (!map.has(key)) map.set(key, { total: 0, items: [] });
      const g = map.get(key);
      const pages = Math.max(0, Number(s.pagesRead || 0));
      g.total += pages;
      g.items.push(s);
    }
    return [...map.entries()]
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .map(([key, g]) => ({
        key,
        label: keyToLabel(key),
        total: g.total,
        items: g.items.sort(
          (a, b) =>
            new Date(b.date || b.finishReading || b.startReading || 0) -
            new Date(a.date || a.finishReading || a.startReading || 0)
        ),
      }));
  }, [entries]);

  return (
    <div className="mt-2">
      <div className="relative rounded-3xl bg-black/20 border border-white/10 p-4">
        <div className="absolute left-[24px] top-10 bottom-5 w-px bg-white/10" />

        {groups.map((g, gi) => (
          <div key={g.key} className="relative pl-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-grid place-items-center w-5 h-5 rounded-[6px] ${
                    gi === 0
                      ? "border-4 border-white"
                      : "border-4 border-white/30"
                  }`}
                  aria-hidden="true"
                ></span>

                <span
                  className={`font-extrabold tracking-[-0.02em] ${
                    gi === 0
                      ? "text-white text-[20px] leading-[20px]"
                      : "text-white/70 text-[20px] leading-[20px]"
                  }`}
                >
                  {g.label}
                </span>
              </div>

              <span className="text-white/60 text-[14px] leading-[18px] tracking-[-0.02em]">
                {g.total} pages
              </span>
            </div>

            <ul className="mt-4 space-y-6">
              {g.items.map((s, idx) => {
                const pagesRead = Math.max(0, Number(s.pagesRead || 0));
                const pct = totalPages
                  ? Math.min(100, Math.round((pagesRead / totalPages) * 100))
                  : 0;
                const minutes = Math.max(0, Number(s.minutes || 0));
                const pph = Math.max(0, Number(s.pagesPerHour || 0));

                return (
                  <li
                    key={s.id || `${g.key}-${idx}`}
                    className="grid grid-cols-[1fr_auto_auto] gap-4 items-center"
                  >
                    <div>
                      <div className="text-white text-[20px] leading-[20px] font-medium tracking-[-0.02em]">
                        {pct}%
                      </div>
                      <div className="text-white/60 text-[12px] leading-[14px] tracking-[-0.02em]">
                        {minutes} minutes
                      </div>
                    </div>

                    <div className="flex flex-col items-center mr-2">
                      <img
                        src={blockIcon}
                        alt=""
                        className="object-contain"
                        style={{ width: 59, height: 25 }}
                      />
                      <div className="mt-1 text-white/60 text-[12px] leading-[14px] tracking-[-0.02em] text-center">
                        {pph} pages
                        <br />
                        per hour
                      </div>
                    </div>

                    {onDelete ? (
                      <button
                        onClick={() => onDelete(s.id)}
                        className="w-8 h-8 grid place-items-center rounded-md hover:bg-white/10 transition"
                        title="Delete session"
                        aria-label="Delete session"
                      >
                        <img src={trashIcon} alt="" className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="w-8 h-8" />
                    )}
                  </li>
                );
              })}
            </ul>

            {gi !== groups.length - 1 && <div className="mt-6" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingDiary;
