/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLogInMutation } from "../../store/services/endpoints/auth.endpoint";
import { Button } from "../../Components";
import { AllContext } from "../../context/AllContext";
import FormDataComponent from "../../Components/FormComponent/FormData.component";

const LoginPage = () => {
  const [loginFun, data] = useLogInMutation();
  const [errorMessage, setError] = useState("");
  const { registerCheck, setLogin, setRegister, logoutCheck, setLogout } =
    useContext(AllContext);

  const nav = useNavigate();

  useEffect(() => {
    let timer;
    let LogoutTimer;

    if (registerCheck) {
      timer = setTimeout(() => {
        setRegister(false);
      }, 3000);
    }

    if (logoutCheck) {
      LogoutTimer = setTimeout(() => {
        setLogout(false);
      }, 3000);
    }

    // if (localStorage.getItem("token")) {
    //   nav("/dashboard");
    // }

    return () => {
      if (timer) clearTimeout(timer);
      if (LogoutTimer) clearTimeout(LogoutTimer);
    };
  }, [registerCheck]);

  const initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("email is required")
      .email("invalid email format"),
  });

  const handleSubmit = async (value) => {
    try {
      const response = await loginFun(value);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        if (response.data?.user?.isAdmin == 1) {
          nav("/admin/dashboard");
        } else {
          nav("/home");
        }

        setLogin(true);
      } else {
        setError(response.data.message || "Login failed");
        console.log("unsuccessful login", response);
      }
    } catch (error) {
      console.log("Caught error", error);
      setError(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="">
      {registerCheck && (
        <p className="bg-gray-400 text-gray-50 text-sm px-2 py-1 float-end w-auto shadow-sm rounded-md mt-4">
          Register successfully!
        </p>
      )}

      {logoutCheck && (
        <p className="bg-gray-400 text-gray-50 text-sm px-2 py-1 float-end w-auto shadow-sm rounded-md mt-4">
          Logout successfully!
        </p>
      )}
      <div className="  flex flex-col justify-center  h-lvh   m-auto ">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
          initialValues={initialValue}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, handleBlur, values }) => (
            <Form>
              <div className=" border  sm:px-12 sm:py-8 rounded-xl bg-gray-50   sm:w-lg  m-auto  shadow-md">
                <h1 className="  text-xl font-medium  text-center m-auto mb-5">
                  Login Your Account
                </h1>

                <FormDataComponent
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name={"email"}
                  type={"email"}
                  label={" Email "}
                  placeholder="xpos@gmail.com"
                />

                <ErrorMessage
                  component={"p"}
                  className=" text-xs text-red-400 mt-0"
                  name="email"
                />

                <FormDataComponent
                  name={"password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type={"password"}
                  label={" password "}
                />
                {errorMessage && (
                  <p className=" text-xs text-red-400 mt-0">{errorMessage}</p>
                )}

                <p className=" text-gray-600 sm:text-sm  text-xs mb-2">
                  Have you registered account?{" "}
                  <span
                    onClick={() => nav("/register")}
                    className=" active:scale-75  select-none underline text-blue-400 "
                  >
                    Register
                  </span>
                </p>

                <Button
                  disabled={isSubmitting}
                  type={"submit"}
                  name={"Login"}
                  label={"Login"}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
