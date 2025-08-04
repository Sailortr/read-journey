import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/thunks/authThunks";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import eyeIcon from "../../assets/eye.svg";
import eyeOffIcon from "../../assets/eye-off.svg";

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "Minimum 7 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      navigate("/recommended");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm mx-auto text-white h-full flex flex-col justify-between"
    >
      {/* EMAIL */}
      <div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-500"></label>
          <input
            {...register("email")}
            className="w-full px-4 py-3 rounded-lg bg-[#2e2e2e] placeholder-gray-300 text-white focus:outline-none"
            type="email"
            placeholder="Mail: Your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-1 text-gray-500"></label>
          <input
            {...register("password")}
            className="w-full px-4 py-3 pr-12 rounded-lg bg-[#2e2e2e] placeholder-gray-300 text-white focus:outline-none"
            type={showPassword ? "text" : "password"}
            placeholder="Password: Yourpasswordhere"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2"
          >
            <img
              src={showPassword ? eyeOffIcon : eyeIcon}
              alt="Toggle Password"
              className="w-5 h-5 opacity-80"
            />
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {/* ALT KISIM: Buton ve metin yan yana sola sabit */}
      <div className="flex items-center justify-start gap-6 mt-auto pt-6">
        <button
          disabled={isSubmitting}
          className="bg-white text-black font-semibold py-3 px-12 rounded-full hover:bg-gray-200 transition"
          type="submit"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>

        <p className="text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="underline hover:text-white">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}
