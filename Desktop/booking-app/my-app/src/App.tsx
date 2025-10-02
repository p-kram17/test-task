import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "@/modules/home-page/page";
import { LoginPage } from "@/modules/login-page/page";
import { RegisterPage } from "@/modules/register-page/page";
import RoomsPage from "@/modules/meetings-rooms-page/page";
import BookingsPage from "@/modules/bookin-page/page";
import type { ReactNode } from "react";
 

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = true;
  return isAuth ? children : <Navigate to="/unauthorized" replace />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/meetings"
          element={
            <ProtectedRoute>
              <RoomsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings/:roomId"
          element={
            <ProtectedRoute>
              <BookingsPage />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<div>Доступ заборонено</div>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
