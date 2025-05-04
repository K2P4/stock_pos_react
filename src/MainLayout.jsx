import React, { useEffect } from "react";
import { AdminNav, NavComponent } from "./Components";
import { Outlet } from "react-router-dom";
import { useGetProfileQuery } from "./store/services/endpoints/auth.endpoint";

const MainLayout = () => {
  const token = localStorage.getItem("token");

  const { data, isLoading, refetch } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);

  const isAdmin = data?.user?.isAdmin === 1;
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {isAdmin && isAdminRoute ? <AdminNav /> : <NavComponent />}
      <div
        className={`flex-1 px-6 ${
          data?.user?.isAdmin !== 1 ? "mt-14" : "mt-10"
        } `}
        style={{ marginLeft: "75px" }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
