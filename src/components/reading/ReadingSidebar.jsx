import starIcon from "../../assets/star.svg";
import ReadingDiary from "./ReadingDiary";
import ReadingStats from "./ReadingStats"; // ⬅️ ekle

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
}) => {
  return (
    <div className="w-full lg:w-[353px] flex-shrink-0 rounded-[30px]">
      <div className="bg-[#1F1F1F] p-6 rounded-[30px] border border-white/10">
        <h4 className="text-white text-sm font-medium mb-3">
          {isRecording ? "Stop page:" : "Start page:"}
        </h4>

        <input
          type="number"
          min={0}
          value={isRecording ? stopPage : startPage}
          onChange={(e) =>
            (isRecording ? onChangeStopPage : onChangeStartPage)?.(
              Number(e.target.value || 0)
            )
          }
          placeholder="Page number"
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
          className="mt-4 inline-flex items-center justify-center
                     px-4 py-2 text-sm font-medium rounded-full
                     border border-white/20 text-white
                     hover:border-white/40 hover:bg-white/10
                     active:bg-white/15 transition"
        >
          {isRecording ? "To stop" : "To start"}
        </button>
      </div>

      {stats && (
        <div className="mt-6 bg-[#1F1F1F] p-6 rounded-[30px] border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white text-base font-semibold">Statistics</h4>
            <img src={starIcon} alt="" className="w-5 h-5 opacity-80" />
          </div>
          <p className="text-sm text-white/60">
            Each page, each chapter is a new round of knowledge...
          </p>
          <div className="mt-4">
            <ReadingStats stats={stats} />
          </div>
        </div>
      )}

      <div className="mt-6 bg-[#1F1F1F] p-6 rounded-[30px] border border-white/10">
        <div className="flex items-center justify-between">
          <h4 className="text-white text-base font-semibold">Diary</h4>
          <img src={starIcon} alt="" className="w-5 h-5 opacity-80" />
        </div>
        <ReadingDiary entries={sessions} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ReadingSidebar;
