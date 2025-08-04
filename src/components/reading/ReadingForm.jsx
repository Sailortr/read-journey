import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  startReadingThunk,
  stopReadingThunk,
} from "../../redux/thunks/readingThunks";

const ReadingForm = ({ isReading, currentPage }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const page = Number(data.page);
    if (isReading) {
      dispatch(stopReadingThunk(page));
    } else {
      dispatch(startReadingThunk(page));
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-center">
      <input
        type="number"
        {...register("page", { required: true })}
        placeholder="Page number"
        className="px-4 py-2 border rounded-md w-32 text-black"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        {isReading ? "To stop" : "To start"}
      </button>
    </form>
  );
};

export default ReadingForm;
