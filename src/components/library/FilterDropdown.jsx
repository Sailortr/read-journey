import { useEffect, useRef, useState } from "react";

const OPTIONS = [
  { key: "unread", label: "Unread" },
  { key: "in-progress", label: "In progress" },
  { key: "done", label: "Done" },
  { key: "all", label: "All books" },
];

export default function FilterDropdown({ value = "all", onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) =>
      ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = OPTIONS.find((o) => o.key === value) || OPTIONS[3];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-44 px-4 py-2 rounded-2xl bg-[#1F1F1F] text-white
                   border border-white/10 hover:border-white/20
                   flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{current.label}</span>
        <span className={`transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-20 mt-2 w-48 rounded-2xl bg-[#181818]
                     border border-white/10 shadow-lg py-2"
        >
          {OPTIONS.map((opt) => (
            <button
              key={opt.key}
              role="option"
              aria-selected={value === opt.key}
              onClick={() => {
                onChange?.(opt.key);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-white hover:bg-white/5 transition
                         ${
                           value === opt.key ? "font-semibold" : "text-white/90"
                         }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
