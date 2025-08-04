import React from "react";
import { useForm } from "react-hook-form";
import { addBookToLibrary } from "../../redux/thunks/bookThunks"; // ✅ düzeltilmiş satır
import { useDispatch } from "react-redux";

const AddBookForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(addBookToLibrary(data)).unwrap(); // ✅ thunk doğru şekilde çağrıldı
      reset();
      // toast veya modal aç: Kitap eklendi!
    } catch (error) {
      console.error(error);
      // toast: Kitap eklenemedi
    }
  };

  return (
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
  );
};

export default AddBookForm;
