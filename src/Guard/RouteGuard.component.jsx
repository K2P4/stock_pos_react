import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../store/services/endpoints/auth.endpoint";

const RouteGuardComponent = () => {
  const { data, isLoading } = useGetProfileQuery();
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center  h-lvh  text-center m-auto ">
        Loading...
      </div>
    );
  }

  if (!token || !data) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = data?.user?.isAdmin === 1;

  // if (token && data) {
  //   if (location.pathname.startsWith("/admin")) {
  //     if (!isAdmin) {
  //       return <Navigate to="/home" replace />;
  //     }
  //   } else {
  //     if (isAdmin) {
  //       return <Navigate to="/admin/dashboard" replace />;
  //     }
  //   }
  // }

  if (location.pathname.startsWith("/admin") && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default RouteGuardComponent;
