// src/components/layout/SidebarContent.jsx
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import FilterForm from "../dashboard/FilterForm";

// SVG ikonları
import step1Icon from "../../assets/1.svg";
import step2Icon from "../../assets/2.svg";
import booksIcon from "../../assets/books.svg"; // ✅ yeni eklendi

const SidebarContent = ({ filters, onFilterChange }) => {
  return (
    <aside className="w-full lg:w-[353px] shrink-0 bg-black">
      <div className="flex flex-col gap-6 rounded-[30px] bg-[#1F1F1F] p-4 sm:p-6">
        <section className="rounded-[24px] bg-[#1F1F1F] border border-[#262626] p-4 sm:p-5">
          <h3 className="text-xs tracking-wide text-gray-300 mb-3">Filters:</h3>
          <FilterForm filters={filters} onChange={onFilterChange} />
        </section>

        <section className="rounded-[24px] bg-[#262626] border border-[#2D2D2D] p-4 sm:p-5">
          <h3 className="text-white font-semibold text-base mb-4">
            Start your workout
          </h3>

          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <img src={step1Icon} alt="Step 1" className="w-9 h-9 shrink-0" />
              <p className="text-sm text-gray-400 leading-snug">
                <span className="text-white">Create a personal library</span>:
                add the books you intend to read to it.
              </p>
            </li>

            <li className="flex items-start gap-3">
              <img src={step2Icon} alt="Step 2" className="w-9 h-9 shrink-0" />
              <p className="text-sm text-gray-400 leading-snug">
                <span className="text-white">Create your first workout</span>:
                define a goal, choose a period, start training.
              </p>
            </li>
          </ol>

          <div className="mt-5 flex items-center justify-between">
            <Link
              to="/library"
              className="text-sm underline text-[#9CA3AF] hover:text-white transition"
            >
              My library
            </Link>
            <Link
              to="/library"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#3A3A3A] hover:bg-[#323232] transition text-gray-200"
              aria-label="Go to My Library"
            >
              <HiArrowRight />
            </Link>
          </div>
        </section>

        <section className="rounded-[24px] bg-[#262626] border border-[#2D2D2D] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <img
              src={booksIcon}
              alt="Books"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 shrink-0"
            />
            <p className="text-sm text-gray-400 leading-snug">
              Books are <span className="text-white">windows</span> to the
              world, and reading is a journey into the unknown.
            </p>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default SidebarContent;
