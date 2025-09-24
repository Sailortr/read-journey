import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/thunks/authThunks";
import { useNavigate, Link } from "react-router-dom";
import eyeIcon from "../../assets/eye.svg";
import eyeOffIcon from "../../assets/eye-off.svg";
import RegisterResultModal from "./RegisterResultModal";

const ErrorIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#FF4D4F" strokeWidth="2" />
    <path d="M12 7v7" stroke="#FF4D4F" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1.5" fill="#FF4D4F" />
  </svg>
);
const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="2" />
    <path
      d="M7 12.5l3.3 3.2L17.5 9"
      stroke="#22C55E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "Minimum 7 characters")
    .required("Password is required"),
});

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
    autoClose: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
    watch,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const nameVal = watch("name");
  const emailVal = watch("email");
  const passwordVal = watch("password");

  const nameOk = !!nameVal && !errors.name;
  const emailOk = !!emailVal && !errors.email;
  const passwordOk =
    !!passwordVal && !errors.password && passwordVal.length >= 7;

  const onSubmit = async (data) => {
    try {
      await dispatch(registerThunk(data)).unwrap();

      setModal({
        open: true,
        type: "success",
        title: "Registration successful",
        message:
          "Your account has been created. Redirecting to the login page…",
        autoClose: true,
      });

      setTimeout(() => navigate("/login", { replace: true }), 3000);
    } catch (error) {
      setModal({
        open: true,
        type: "error",
        title: "Registration failed",
        message: "We couldn’t create your account. Please try again.",
        autoClose: false,
      });
    }
  };

  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const baseInput =
    "w-full rounded-[12px] bg-[#1C1C1C] text-white placeholder-white/60 " +
    "px-5 py-4 border outline-none transition " +
    "border-white/10 hover:border-white/20 focus:border-white/40 " +
    "focus:ring-2 focus:ring-white/15";

  const classFor = (ok, err, extra = "") => {
    if (err)
      return `${baseInput} border-2 border-[#FF4D4F] focus:ring-[#FF4D4F]/30 ${extra}`;
    if (ok)
      return `${baseInput} border-2 border-[#22C55E] focus:ring-[#22C55E]/25 ${extra}`;
    return `${baseInput} ${extra}`;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="text-white">
        <div className="mb-4">
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            placeholder="Name: Ilona Ratushniak"
            className={classFor(nameOk, !!errors.name)}
          />
          {errors.name ? (
            <p className="text-[13px] mt-2" style={{ color: "#FF4D4F" }}>
              Enter a valid name*
            </p>
          ) : nameOk && dirtyFields.name ? (
            <p className="text-[13px] mt-2" style={{ color: "#22C55E" }}>
              Looks good
            </p>
          ) : null}
        </div>

        <div className="mb-4">
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            placeholder="Mail: Your@email.com"
            className={classFor(emailOk, !!errors.email)}
          />
          {errors.email ? (
            <p className="text-[13px] mt-2" style={{ color: "#FF4D4F" }}>
              Enter a valid email*
            </p>
          ) : emailOk && dirtyFields.email ? (
            <p className="text-[13px] mt-2" style={{ color: "#22C55E" }}>
              Looks good
            </p>
          ) : null}
        </div>

        <div className="mb-2 relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            placeholder="Password: Yourpasswordhere"
            className={classFor(passwordOk, !!errors.password, "pr-12")}
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {errors.password ? (
              <ErrorIcon />
            ) : passwordOk ? (
              <CheckIcon />
            ) : (
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="opacity-80 hover:opacity-100 transition"
              >
                <img
                  src={showPassword ? eyeOffIcon : eyeIcon}
                  alt=""
                  className="w-5 h-5"
                />
              </button>
            )}
          </div>

          {errors.password ? (
            <p className="text-[13px] mt-2" style={{ color: "#FF4D4F" }}>
              Enter a valid Password*
            </p>
          ) : passwordOk ? (
            <p className="text-[13px] mt-2" style={{ color: "#22C55E" }}>
              Password is secure
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-6 pt-6">
          <button
            disabled={isSubmitting}
            type="submit"
            className="
    inline-flex items-center justify-center rounded-[30px]
    h-[42px] px-[29px] text-[14px] leading-[18px] font-bold
    border transition-colors duration-200
    bg-[#F9F9F9] text-black border-transparent
    hover:bg-[#141414] hover:text-white hover:border-[#2E2E2E]
    focus:outline-none focus:ring-2 focus:ring-white/10
    disabled:opacity-60 disabled:hover:bg-[#F9F9F9] disabled:hover:text-black disabled:hover:border-transparent

    md:h-[52px] md:px-[54px] md:text-base md:leading-none
  "
          >
            Registration
          </button>

          <p className="text-sm text-[#9E9E9E]">
            Already have an account?{" "}
            <Link to="/login" className="underline hover:text-white">
              Log in
            </Link>
          </p>
        </div>
      </form>

      {modal.open && (
        <RegisterResultModal
          type={modal.type}
          title={
            modal.type === "success"
              ? "Registration successful"
              : "Registration failed"
          }
          message={modal.message}
          onClose={
            modal.type === "success"
              ? () => navigate("/login", { replace: true })
              : () => closeModal()
          }
          autoClose={modal.autoClose}
          primaryActionText={modal.type === "error" ? "Try again" : undefined}
          onPrimaryAction={modal.type === "error" ? closeModal : undefined}
        />
      )}
    </>
  );
}
