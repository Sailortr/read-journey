import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/layout/Header";
import booksArt from "../assets/books.svg";
import pieIcon from "../assets/pie-chart.svg";
import starIcon from "../assets/star.svg";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const token =
    useSelector((state) => state.auth?.token) ||
    localStorage.getItem("accessToken");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && navigate(-1);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const primaryHref = token ? "/library" : "/login";

  return (
    <div className="min-h-screen bg-black">
      {token ? <Header /> : null}

      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <main
          className="relative bg-[#1F1F1F] rounded-[30px] border border-white/10 overflow-hidden p-8 sm:p-10 lg:p-12"
          style={{ fontFamily: "Gilroy, system-ui, sans-serif" }}
        >
          <div className="pointer-events-none absolute right-4 top-4 flex gap-2 opacity-70">
            <span className="inline-flex w-8 h-8 rounded-full bg-black/30 border border-white/10 items-center justify-center">
              <img src={pieIcon} alt="" className="w-4 h-4" />
            </span>
            <span className="inline-flex w-8 h-8 rounded-full bg-black/30 border border-white/10 items-center justify-center">
              <img src={starIcon} alt="" className="w-4 h-4" />
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="text-white/15 text-[64px] leading-none font-extrabold tracking-[-0.02em] select-none">
                404
              </div>

              <h1 className="mt-2 text-white text-[28px] leading-8 font-bold tracking-[0.02em]">
                Page not found
              </h1>

              <p className="mt-3 text-white/70 text-[14px] leading-[18px] tracking-[-0.02em]">
                We couldn’t find the page you’re looking for. It may have been
                moved or removed. Let’s get you back to your reading.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to={primaryHref}
                  className="px-6 py-2 rounded-full border border-white/20 text-white
                             hover:border-white/40 hover:bg-white/10 active:bg-white/15 transition text-sm font-medium"
                >
                  {token ? "Back to My Library" : "Go to Login"}
                </Link>

                <Link
                  to="/recommended"
                  className="px-6 py-2 rounded-full border border-white/10 text-white/80
                             hover:text-white hover:border-white/30 hover:bg-white/5 transition text-sm"
                >
                  Explore Recommended
                </Link>
              </div>

              <div className="mt-4 text-white/50 text-xs">
                Tip: Press{" "}
                <span className="text-white/80 font-semibold">Double Esc</span>{" "}
                to go back.
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-6 rounded-[36px] bg-black/20 blur-2xl"
                aria-hidden
              />
              <div className="relative w-full rounded-[24px] bg-black/30 border border-white/10 grid place-items-center p-6">
                <img
                  src={booksArt}
                  alt="Books illustration"
                  className="max-w-[420px] w-full h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFoundPage;
