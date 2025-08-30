import React, { useEffect, useState } from "react";
import AppRouter from "./routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { restoreUserFromLocalStorage } from "./redux/thunks/authThunks";
import { fetchLibraryBooks } from "./redux/thunks/bookThunks";
import Toast from "./components/ui/Toast";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isInitialCheckDone, setIsInitialCheckDone] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        await dispatch(restoreUserFromLocalStorage()).unwrap();
      } catch (error) {
        console.log("No active session found.");
      } finally {
        setIsInitialCheckDone(true);
      }
    };

    restoreSession();
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchLibraryBooks());
    }
  }, [token, dispatch]);

  if (!isInitialCheckDone) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white p-6">
        Loading...
      </div>
    );
  }

  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        theme="dark"
      />
      <Toast />
    </>
  );
};

export default App;
