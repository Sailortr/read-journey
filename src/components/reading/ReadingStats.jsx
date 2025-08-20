import React from "react";

const ReadingStats = ({ stats }) => {
  const pct = Math.max(0, Math.min(100, stats?.percentage ?? 0));
  const radius = 54;
  const C = 2 * Math.PI * radius;
  const dash = (pct / 100) * C;

  return (
    <div className="bg-[#1F1F1F] text-white p-4 rounded-[20px] border border-white/10">
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

        <div className="space-y-1">
          <div className="text-white/90 text-base font-medium">{pct}%</div>
          <div className="text-white/60 text-xs">
            {stats?.totalPages ?? 0} pages read
          </div>
          <div className="text-white/60 text-xs">
            Avg {stats?.avgSpeed ?? 0} pages/min
          </div>
          <div className="text-white/60 text-xs">
            Total {stats?.totalMinutes ?? 0} min
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingStats;
