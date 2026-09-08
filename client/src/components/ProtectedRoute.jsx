import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";

export function ProtectedRoute({ children, roles, requireSuperAdmin = false }) {
  const { token, user } = useContext(UserContext);
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles && !roles.includes(user.userType)) {
    return <Navigate to="/" replace />;
  }

  if (requireSuperAdmin && !user.superAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export function GuestRoute({ children }) {
  const { token, user } = useContext(UserContext);
  if (token && user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
