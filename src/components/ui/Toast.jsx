import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToast } from "../../redux/uiSlice";

const colorByType = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-amber-500",
  info: "bg-slate-600",
};

export default function Toast() {
  const dispatch = useDispatch();
  const toast = useSelector((s) => s.ui.toast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => dispatch(clearToast()), 3000);
    return () => clearTimeout(t);
  }, [toast, dispatch]);

  if (!toast) return null;

  const tone = colorByType[toast.type] || colorByType.info;

  return (
    <div className="fixed z-[1000] bottom-6 left-1/2 -translate-x-1/2">
      <div
        className={`text-white px-4 py-3 rounded-xl shadow-lg border border-white/10 ${tone}
                    animate-[fadeIn_.2s_ease-out]`}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5">🔔</span>
          <span className="max-w-[70vw]">{toast.message}</span>
          <button
            onClick={() => dispatch(clearToast())}
            className="ml-2 -mr-1 px-2 py-1 rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translate(-50%, 8px);} to { opacity:1; transform:translate(-50%, 0);} }
      `}</style>
    </div>
  );
}
