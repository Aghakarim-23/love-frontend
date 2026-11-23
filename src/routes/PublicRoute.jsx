import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Yalnız daxil olmamış istifadəçilər üçün olan səhifələr (məs. Login)
const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFFFF] text-4xl text-[#000000]">
        <span className="animate-pulse">♡</span>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
