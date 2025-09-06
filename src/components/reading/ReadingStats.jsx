import React, { useMemo } from "react";
import recIcon from "../../assets/rec.svg";

const ReadingStats = ({ stats, totalPages = 0 }) => {
  const pagesRead = Math.max(0, stats?.totalPages ?? 0);
  const totalMin = Math.max(0, stats?.totalMinutes ?? 0);
  const avgSpeed = Math.max(0, Number(stats?.avgSpeed ?? 0));

  const pct = useMemo(() => {
    if (Number.isFinite(stats?.percentage))
      return Math.max(0, Math.min(100, Math.round(stats.percentage)));
    return totalPages ? Math.round((pagesRead / totalPages) * 100) : 0;
  }, [stats?.percentage, pagesRead, totalPages]);

  const radius = 54;
  const C = 2 * Math.PI * radius;
  const dash = (pct / 100) * C;

  return (
    <div className="bg-[#1F1F1F] text-white p-5 rounded-[20px] border border-white/10">
      <div className="flex items-center gap-4">
        <svg width="140" height="140" className="shrink-0">
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="#2A2A2A"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#22c55e"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C - dash}`}
            transform="rotate(-90 70 70)"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white"
            style={{ fontSize: 20, fontWeight: 700 }}
          >
            {pct}%
          </text>
        </svg>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img
              src={recIcon}
              alt=""
              className="inline-block"
              style={{ width: 12, height: 12 }}
            />
            <span className="text-white/90 text-sm font-medium">
              {pct}%{" "}
              <span className="text-white/60 font-normal">
                ({pagesRead} pages read)
              </span>
            </span>
          </div>

          <div className="text-white/60 text-xs">Avg {avgSpeed} pages/min</div>
          <div className="text-white/60 text-xs">Total {totalMin} min</div>
        </div>
      </div>
    </div>
  );
};

export default ReadingStats;
