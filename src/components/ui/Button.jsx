import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  variant = "primary",
  type = "button",
  ...rest
}) => {
  const base =
    "py-2 px-4 rounded-lg font-semibold text-sm transition-colors duration-300";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "bg-transparent text-white hover:bg-white/10 border border-white/20",
  };

  return (
    <button type={type} className={clsx(base, variants[variant])} {...rest}>
      {children}
    </button>
  );
};

export default Button;
