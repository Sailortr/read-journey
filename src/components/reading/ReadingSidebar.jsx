import { useEffect, useState } from "react";
import starIcon from "../../assets/star.svg";
import hourglassIcon from "../../assets/hourglass.svg";
import pieIcon from "../../assets/pie-chart.svg";
import ReadingDiary from "./ReadingDiary";
import ReadingStats from "./ReadingStats";

const ReadingSidebar = ({
  isRecording,
  startPage,
  onChangeStartPage,
  stopPage,
  onChangeStopPage,
  onStart,
  onStop,
  sessions = [],
  totalPages = 0,
  stats,
  busy = false,
}) => {
  const [tab, setTab] = useState("time");

  useEffect(() => {
    if (isRecording) setTab("time");
  }, [isRecording]);

  const showProgressPlaceholder =
    !isRecording && (!sessions || sessions.length === 0);

  return (
    <div className="w-full lg:w-[353px] flex-shrink-0 rounded-[30px]">
      <div className="bg-[#1F1F1F] p-6 rounded-[30px] border border-white/10">
        <h4 className="text-white text-sm font-medium mb-3">
          {isRecording ? "Stop page:" : "Start page:"}
        </h4>

        <input
          type="number"
          min={1}
          value={isRecording ? stopPage : startPage}
          onChange={(e) =>
            (isRecording ? onChangeStopPage : onChangeStartPage)?.(
              Number(e.target.value || 1)
            )
          }
          placeholder="1"
          className="w-full bg-[#1C1C1C] text-white placeholder-white/40 text-sm
                     px-4 py-3 rounded-2xl border border-white/10
                     hover:border-white/20 focus:border-white/40
                     focus:ring-2 focus:ring-white/15 outline-none
                     [appearance:textfield]
                     [&::-webkit-outer-spin-button]:appearance-none
                     [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          onClick={isRecording ? onStop : onStart}
          disabled={busy}
          className={`mt-4 inline-flex items-center justify-center
                     px-4 py-2 text-sm font-medium rounded-full
                     border border-white/20 text-white transition
                     ${
                       busy
                         ? "opacity-60 cursor-not-allowed"
                         : "hover:border-white/40 hover:bg-white/10 active:bg-white/15"
                     }`}
        >
          {isRecording ? "To stop" : "To start"}
        </button>
      </div>

      {showProgressPlaceholder && (
        <div className="mt-6 bg-[#1F1F1F] p-6 rounded-[30px] border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white text-base font-semibold">Progress</h4>
            <img src={starIcon} alt="" className="w-5 h-5 opacity-80" />
          </div>
          <p className="text-sm text-white/70">
            Here you will see when and how much you read.
            <br />
            To record, click on the red button above.
          </p>

          <div className="mt-8 w-full flex items-center justify-center">
            <div className="w-[88px] h-[88px] rounded-full bg-black/30 border border-white/10 grid place-items-center">
              <img src={starIcon} alt="" className="w-8 h-8 opacity-90" />
            </div>
          </div>
        </div>
      )}

      {!showProgressPlaceholder && (
        <div className="mt-6 bg-[#1F1F1F] p-6 rounded-[30px] border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white text-base font-semibold">Diary</h4>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTab("time")}
                title="Reading time"
                className={`w-8 h-8 grid place-items-center rounded-full border transition
                            ${
                              tab === "time"
                                ? "border-white/40 bg-white/10"
                                : "border-white/15 hover:border-white/30"
                            }`}
              >
                <img src={hourglassIcon} alt="" className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setTab("stats")}
                title="Statistics"
                className={`w-8 h-8 grid place-items-center rounded-full border transition
                            ${
                              tab === "stats"
                                ? "border-white/40 bg-white/10"
                                : "border-white/15 hover:border-white/30"
                            }`}
              >
                <img src={pieIcon} alt="" className="w-4 h-4" />
              </button>
            </div>
          </div>

          {tab === "time" ? (
            <ReadingDiary entries={sessions} totalPages={totalPages} />
          ) : (
            <ReadingStats stats={stats} />
          )}
        </div>
      )}
    </div>
  );
};

export default ReadingSidebar;
