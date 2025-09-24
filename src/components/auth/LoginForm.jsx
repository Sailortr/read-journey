import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/thunks/authThunks";
import { fetchLibraryBooks } from "../../redux/thunks/bookThunks";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import eyeIcon from "../../assets/eye.svg";
import eyeOffIcon from "../../assets/eye-off.svg";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      await dispatch(fetchLibraryBooks());
      navigate("/recommended");
    } catch (error) {
      toast.error(error?.message || "Login failed");
    }
  };

  const baseInput =
    "w-full rounded-[12px] bg-[#1C1C1C] text-white placeholder-white/60 " +
    "border outline-none transition " +
    "border-white/10 hover:border-white/20 focus:border-white/40 " +
    "focus:ring-2 focus:ring-white/15 " +
    "h-[44px] px-4 text-[14px] " +
    "md:h-[50px] md:px-5 md:text-base";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-white">
      <div className="mb-4">
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="Mail: Your@email.com"
          className={baseInput}
        />
      </div>

      <div className="mb-2 relative">
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Password: Yourpasswordhere"
          className={`${baseInput} pr-12`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 transition"
        >
          <img
            src={showPassword ? eyeOffIcon : eyeIcon}
            alt=""
            className="w-5 h-5"
          />
        </button>
      </div>

      <div className="flex items-center gap-6 pt-6">
        <button
          disabled={isSubmitting}
          type="submit"
          className="
            inline-flex items-center justify-center rounded-[30px]
            font-bold leading-none border transition-colors duration-200
            bg-[#F9F9F9] text-black border-transparent
            hover:bg-[#141414] hover:text-white hover:border-[#2E2E2E]
            focus:outline-none focus:ring-2 focus:ring-white/10
            disabled:opacity-60 disabled:hover:bg-[#F9F9F9] disabled:hover:text-black disabled:hover:border-transparent

            h-[42px] px-[45px] text-[14px]        /* mobile (Figma) */
            md:h-[52px] md:px-[54px] md:text-base  /* ≥ md: eski değerler */
          "
        >
          Log in
        </button>

        <p className="text-sm text-[#9E9E9E]">
          Don’t have an account?{" "}
          <Link to="/register" className="underline hover:text-white">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}
