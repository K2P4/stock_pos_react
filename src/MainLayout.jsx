import React from "react";
import { Nav } from "./Components";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Nav />
      <div className="flex-1  px-6 mt-10 " style={{ marginLeft: "75px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
