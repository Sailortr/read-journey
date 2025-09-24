const Spinner = ({ className = "", color = "#30B94D" }) => (
  <svg
    viewBox="0 0 24 24"
    className={`animate-spin ${className}`}
    style={{ color }}
    fill="none"
    aria-hidden="true"
  >
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 2 L12 5" />
      <path d="M18.062 4.938 L16 7" opacity=".65" />
      <path d="M22 12 L19 12" opacity=".5" />
      <path d="M18.062 19.062 L16 17" opacity=".35" />
      <path d="M12 22 L12 19" opacity=".2" />
      <path d="M4.938 19.062 L7 17" opacity=".35" />
      <path d="M2 12 L5 12" opacity=".5" />
      <path d="M4.938 4.938 L7 7" opacity=".65" />
    </g>
  </svg>
);

export default Spinner;
