import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineX } from "react-icons/hi";
import { logoutThunk } from "../../redux/thunks/authThunks";
import logo from "../../assets/logo.svg";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutThunk());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const formatName = (nameOrEmail) => {
    return nameOrEmail
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const displayName = formatName(user?.name || user?.email || "User");
  const avatarLetter = (user?.name || user?.email || "U")
    .charAt(0)
    .toUpperCase();

  const linkBase = "relative px-1 text-base transition-colors";
  const linkInactive = "text-gray-400 hover:text-white";
  const linkActive =
    "text-white after:content-[''] after:bg-[#6C8CFF] after:h-[3px] after:w-10 after:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2";

  return (
    <header className="w-full bg-#141414 text-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-3">
        <div className="rounded-[15px] bg-[#1F1F1F] border border-[#2D2D2D] h-[74px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={logo}
              alt="Read Journey"
              className="w-[42px] h-[17px] sm:w-8 sm:h-8"
            />
            <span className="hidden md:inline font-semibold tracking-wide">
              READ JOURNEY
            </span>
          </div>

          <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
            <NavLink
              to="/recommended"
              className={({ isActive }) =>
                [linkBase, isActive ? linkActive : linkInactive].join(" ")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/library"
              className={({ isActive }) =>
                [linkBase, isActive ? linkActive : linkInactive].join(" ")
              }
            >
              My library
            </NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <div className="h-[42px] w-[42px] rounded-full border border-[#4B4B4B] flex items-center justify-center text-white font-semibold text-lg">
              {avatarLetter}
            </div>
            <span className="hidden md:inline text-sm text-white font-medium truncate max-w-[120px]">
              {displayName}
            </span>
            <button
              onClick={handleLogout}
              className="hidden md:inline-flex h-[42px] items-center rounded-full border border-[#4B4B4B] px-6 text-[15px] hover:bg-[#242424] transition"
            >
              Log out
            </button>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-3xl"
              aria-label="Open menu"
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </div>
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 right-0 z-50 h-full w-72 max-w-[80%] bg-[#1F1F1F] border-l border-[#2D2D2D] p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <img
                src={logo}
                alt="Read Journey"
                className="w-[42px] h-[17px]"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-2xl"
                aria-label="Close menu"
              >
                <HiOutlineX />
              </button>
            </div>

            <nav className="flex flex-col gap-4 mt-2">
              <NavLink
                to="/recommended"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-white font-medium" : "text-gray-300"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/library"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-white font-medium" : "text-gray-300"
                }
              >
                My library
              </NavLink>
            </nav>

            <div className="mt-auto">
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full h-[42px] rounded-full border border-[#4B4B4B] hover:bg-[#242424] transition"
              >
                Log out
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
