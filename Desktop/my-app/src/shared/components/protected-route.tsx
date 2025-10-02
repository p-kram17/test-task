import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/shared/store/use-auth-store";
import type { UserRole } from "@/shared/types/user.types";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  roomId?: string;
}

export function ProtectedRoute({
  children,
  requiredRole = "user",
  roomId,
}: ProtectedRouteProps) {
  const { user, hasRoomAccess } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole === "admin" && user.role !== "admin") {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  if (roomId && !hasRoomAccess(roomId, requiredRole)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
