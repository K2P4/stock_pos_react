import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AllContext } from "../../context/AllContext";

const DashboardPage = () => {
  const { loginCheck, setLogin } = useContext(AllContext);
 
  const nav = useNavigate();
  useEffect(() => {
    let timer;

    if (loginCheck) {
      timer = setTimeout(() => {
        setLogin(false);
      }, 3000);
    }

    // if (!localStorage.getItem("token")) {
    //   nav("/login");
    // } else {
    //   nav("/dashboard");
    // }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loginCheck]);

  return (
    <div className="   ">
      {loginCheck && (
        <p className="bg-gray-400 text-gray-50 text-sm px-2 py-1 float-end w-auto shadow-sm rounded-md">
          Login successfully!
        </p>
      )}
      <h1 className="text-xl font-semibold  text-left text-blue-400 border-b-blue-400 border-b  inline ">
        <Link to="/dashboard">Dashboard</Link>
      </h1>
    </div>
  );
};

export default DashboardPage;
