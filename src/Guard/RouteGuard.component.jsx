import { Navigate, Outlet } from "react-router-dom";

const RouteGuardComponent = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RouteGuardComponent;
