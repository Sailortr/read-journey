import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addBookToLibrary } from "../../redux/thunks/bookThunks";
import { useDispatch } from "react-redux";
import okIcon from "../../assets/ok.svg"; // ✅ görsel import

const AddBookForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      await dispatch(addBookToLibrary(data)).unwrap();
      reset();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error("Kitap eklenemedi:", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Title"
          className="px-4 py-2 rounded-xl bg-dark-600 text-white placeholder:text-gray-400"
        />
        <input
          type="text"
          {...register("author", { required: true })}
          placeholder="Author"
          className="px-4 py-2 rounded-xl bg-dark-600 text-white placeholder:text-gray-400"
        />
        <input
          type="number"
          {...register("totalPages", { required: true })}
          placeholder="Total Pages"
          className="px-4 py-2 rounded-xl bg-dark-600 text-white placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="bg-primary text-white py-2 rounded-xl hover:opacity-90 transition"
        >
          Add book
        </button>
      </form>

      {/* Modal görünümü */}
      {success && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1C1C1C] rounded-2xl p-6 flex flex-col items-center">
            <img src={okIcon} alt="Success" className="w-20 h-20 mb-4" />
            <p className="text-white font-medium">Book successfully added!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBookForm;
