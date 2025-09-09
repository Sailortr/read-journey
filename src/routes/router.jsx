import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RecommendedPage from "../pages/RecommendedPage";
import MyLibraryPage from "../pages/MyLibraryPage";
import ReadingPage from "../pages/ReadingPage";
import ProtectedRoute from "./ProtectedRoute";
import Header from "../components/layout/Header";
import NotFoundPage from "../pages/NotFoundPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/recommended"
          element={
            <ProtectedRoute>
              <RecommendedPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Header />
              <MyLibraryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reading"
          element={
            <ProtectedRoute>
              <ReadingPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
