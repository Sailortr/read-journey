import React from "react";
import AppRouter from "./routes/router"; // <-- DİKKAT: default export bu
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <AppRouter /> {/* RouterProvider yerine bu */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
