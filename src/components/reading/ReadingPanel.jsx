const ReadingPanel = ({
  book,
  isRecording,
  onRecordClick,
  disabled = false,
}) => {
  if (!book) return null;

  const showRecordingAnim = isRecording && !disabled;

  return (
    <div className="flex flex-col items-center">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-[280px] h-[400px] object-cover rounded-xl shadow-lg border border-white/10"
      />
      <div className="mt-4 text-center">
        <h3 className="text-white font-semibold">{book.title}</h3>
        <p className="text-white/60 text-sm">{book.author}</p>
      </div>
      <button
        onClick={onRecordClick}
        disabled={disabled}
        aria-pressed={isRecording}
        aria-busy={disabled || undefined}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
        title={isRecording ? "Stop" : "Start"}
        className={`relative mt-6 w-12 h-12 rounded-full border-4 border-white/20 grid place-items-center transition
          ${
            disabled ? "opacity-60 cursor-not-allowed" : "hover:border-white/40"
          }`}
      >
        {showRecordingAnim && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 rounded-full
                         border-2 border-white/10 border-t-white/60 animate-spin"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-full
                         bg-red-500/20 blur-md animate-pulse"
            />
          </>
        )}
        {disabled && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 rounded-full
                       border-2 border-white/20 border-t-transparent animate-spin"
          />
        )}
        {isRecording ? (
          <span className="block w-6 h-6 rounded-[6px] bg-red-600" />
        ) : (
          <span className="block w-8 h-8 rounded-full bg-red-600" />
        )}
        <span className="sr-only">
          {disabled ? "Processing…" : isRecording ? "Recording" : "Idle"}
        </span>
      </button>
    </div>
  );
};

export default ReadingPanel;
