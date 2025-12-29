import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 BLOCK ADMIN FROM USER ROUTES
  if (user.role === "ADMIN") {
    return <Navigate to="/admin/products" replace />;
  }

  return children;
};

export default ProtectedRoute;
