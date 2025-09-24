import { HiOutlineX } from "react-icons/hi";
import okIcon from "../../assets/ok.svg";

const RegisterResultModal = ({
  type = "success",
  title,
  message,
  onClose,
  primaryActionText,
  onPrimaryAction,
  autoClose = false,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-[92vw] max-w-[480px]
                   bg-[#1F1F1F] text-white rounded-[30px]
                   border border-white/10 p-8 shadow-xl mx-4"
      >
        {!autoClose && (
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl"
          >
            <HiOutlineX />
          </button>
        )}

        <div className="flex flex-col items-center text-center">
          <img
            src={okIcon}
            alt=""
            className={`w-20 h-20 object-contain mb-4 ${
              type === "error" ? "rotate-180 opacity-90" : ""
            }`}
          />
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-white/70 max-w-xs text-sm">{message}</p>

          {onPrimaryAction && (
            <button
              onClick={onPrimaryAction}
              className="mt-6 px-6 py-2 rounded-full border border-white/20
                         hover:border-white/40 hover:bg-white/10 transition"
            >
              {primaryActionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterResultModal;
