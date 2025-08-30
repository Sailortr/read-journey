import booksIcon from "../../assets/books.svg";

const EmptyLibraryState = () => {
  return (
    <div className="w-full h-[420px] grid place-items-center">
      <div className="flex flex-col items-center">
        <div className="w-[168px] h-[168px] rounded-full bg-white/5 grid place-items-center mb-6">
          <img
            src={booksIcon}
            alt="Books"
            className="w-[72px] h-[72px] object-contain"
            draggable="false"
          />
        </div>

        <p className="text-center text-[14px] leading-[18px] tracking-[-0.02em] font-medium text-white/80 max-w-[274px]">
          To start training, add{" "}
          <span className="text-white/50">some of your books</span> or
          <br className="hidden sm:block" />
          from the recommended ones
        </p>
      </div>
    </div>
  );
};

export default EmptyLibraryState;
