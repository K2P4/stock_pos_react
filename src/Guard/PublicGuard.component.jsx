import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../store/services/endpoints/auth.endpoint";

const PublicGuardComponent = () => {
  const token = localStorage.getItem("token");
  const { data, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <div className="flex flex-col justify-center  h-lvh  text-center m-auto ">Loading...</div>;
  }

  if (token && data?.user?.isAdmin === 1) {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (token && data?.user?.isAdmin === 0) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicGuardComponent;
