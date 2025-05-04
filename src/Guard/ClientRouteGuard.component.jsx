import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../store/services/endpoints/auth.endpoint";

const ClientRouteGuardComponent = () => {
  const token = localStorage.getItem("token");
  const { data, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!token || !data?.user) {
    return <Navigate to="/client/login" replace />;
  }

  if (data.user.isAdmin === 1) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default ClientRouteGuardComponent;
