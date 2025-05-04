import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../store/services/endpoints/auth.endpoint";

const AdminRouteGuardComponent = () => {
  const token = localStorage.getItem("token");
  const { data, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!token || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  if (data.user.isAdmin !== 1) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default AdminRouteGuardComponent;
