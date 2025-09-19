import React, { useMemo } from "react";

const ReadingStats = ({ stats, totalPages = 0 }) => {
  const pagesRead = Math.max(0, stats?.totalPages ?? 0);

  const pct = useMemo(() => {
    if (Number.isFinite(stats?.percentage)) {
      return Math.max(0, Math.min(100, Math.round(stats.percentage)));
    }
    return totalPages ? Math.round((pagesRead / totalPages) * 100) : 0;
  }, [stats?.percentage, pagesRead, totalPages]);

  const size = 220;
  const strokeWidth = 20;
  const radius = size / 2 - strokeWidth;
  const C = 2 * Math.PI * radius;
  const dash = (pct / 100) * C;

  return (
    <div className="rounded-[20px] border border-white/10 bg-[#161616] p-5">
      <div className="flex flex-col items-center">
        <svg width={size} height={size} className="shrink-0">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#222222"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#22c55e"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C - dash}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white"
            style={{ fontSize: 28, fontWeight: 800 }}
          >
            {pct}%
          </text>
        </svg>

        <div className="mt-4 flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block w-4 h-4 rounded-md"
            style={{ backgroundColor: "#22c55e" }}
          />
          <span className="text-white text-[22px] leading-[26px] font-semibold tracking-[-0.02em]">
            {pct}%
          </span>
        </div>

        <div
          className="mt-2 text-[14px] leading-[18px] tracking-[-0.02em] text-white/60"
          style={{ fontFamily: "Gilroy, sans-serif" }}
        >
          {pagesRead} pages read
        </div>
      </div>
    </div>
  );
};

export default ReadingStats;
