import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/thunks/authThunks";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import EyeIcon from "../../assets/eye.svg";
import EyeOffIcon from "../../assets/eye-off.svg";

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(registerThunk(data)).unwrap();
      navigate("/recommended");
    } catch (error) {
      toast.error(error || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[440px] mx-auto bg-[#121212] text-white px-6 py-10 rounded-3xl shadow-lg 
                 md:px-8 md:py-12 
                 xl:bg-transparent xl:px-0 xl:py-0"
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400"></label>
          <input
            {...register("name")}
            type="text"
            placeholder="Name: Ilona Ratushniak"
            className="bg-[#1C1C1C] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400"></label>
          <input
            {...register("email")}
            type="email"
            placeholder="Mail: Your@email.com"
            className="bg-[#1C1C1C] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 relative">
          <label className="text-sm text-gray-400"></label>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password: Yourpasswordhere"
            className="bg-[#1C1C1C] px-4 py-3 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 text-white w-full"
          />
          <img
            src={showPassword ? EyeOffIcon : EyeIcon}
            alt="Toggle password"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-80 cursor-pointer"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-start gap-6 mt-auto pt-6">
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition"
          >
            {isSubmitting ? "Registering..." : "Registration"}
          </button>

          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="underline hover:text-white">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
