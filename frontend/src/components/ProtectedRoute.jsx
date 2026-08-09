import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  const user = userData ? JSON.parse(userData) : null;

  // No login
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Wrong role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Access allowed
  return children;
}

export default ProtectedRoute;