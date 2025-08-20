const ReadingPanel = ({ book, isRecording, onRecordClick }) => {
  if (!book) return null;

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
        aria-pressed={isRecording}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
        title={isRecording ? "Stop" : "Start"}
        className="mt-6 w-12 h-12 rounded-full border-4 border-white/20 grid place-items-center
                   hover:border-white/40 transition"
      >
        {isRecording ? (
          <span className="block w-6 h-6 rounded-[6px] bg-red-600" />
        ) : (
          <span className="block w-8 h-8 rounded-full bg-red-600" />
        )}
      </button>
    </div>
  );
};

export default ReadingPanel;
