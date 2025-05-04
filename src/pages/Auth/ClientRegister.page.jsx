/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormDataComponent from "../../Components/FormComponent/FormData.component";
import { Button } from "../../Components";
import { AllContext } from "../../context/AllContext";
import { useRegisterMutation } from "../../store/services/endpoints/auth.endpoint";

const RegisterPage = () => {
  const [registerFun, data] = useRegisterMutation();
  const [errorMessage, setError] = useState("");

  const { registerCheck, setRegister } = useContext(AllContext);

  const nav = useNavigate();

  const initialValue = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(2, "name should be longer than 2")
      .required("name is required"),

    email: yup
      .string()
      .required("email is required")
      .email("invalid email format"),
    password: yup
      .string()
      .min(5, "password must be at least 5 characters")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]/,
        "password must contain at least one letter, one number, and one special character"
      )
      .required("Password is required"),

    password_confirmation: yup
      .string()
      .required("confirm password is required")
      .oneOf(
        [yup.ref("password"), null],

        "password confirm should be match with password"
      ),
  });

  const handleSubmit = async (value) => {

    console.log('valie', value);
    try {
      const response = await registerFun({...value, isAdmin: 0 });
      if (response?.data.success) {
        nav("/client/login");
        setRegister(true);
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
      <div className="  flex flex-col justify-center  h-lvh   m-auto ">
        <img
          src="/logo-xpos.png"
          className="size-full w-32 mx-auto h-24 object-cover"
        />
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
                  Register Your Client Account
                </h1>

                <FormDataComponent
                  name={"name"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  type={"text"}
                  label={"Enter Your Username "}
                />
                <ErrorMessage
                  component={"p"}
                  className=" text-xs text-red-400 mt-0"
                  name="name"
                />

                <FormDataComponent
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name={"email"}
                  type={"email"}
                  label={"Enter Your Email "}
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
                  label={"Enter Your password "}
                />
                <ErrorMessage
                  component={"p"}
                  className=" text-xs text-red-400 mt-0"
                  name="password"
                />

                <FormDataComponent
                  name={"password_confirmation"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password_confirmation}
                  type={"password"}
                  label={"Confirm Password "}
                />
                <ErrorMessage
                  component={"p"}
                  className=" text-xs text-red-400 mt-0"
                  name="password_confirmation"
                />

                {errorMessage && (
                  <p className=" text-xs text-red-400 mt-1">{errorMessage}</p>
                )}

                <p className=" text-gray-600 sm:text-sm  text-xs mb-2">
                  Already have an account?{" "}
                  <span
                    onClick={() => nav("/client/login")}
                    className=" active:scale-75  select-none underline text-blue-400 "
                  >
                    Login
                  </span>
                </p>

                <Button
                  disabled={isSubmitting}
                  type={"submit"}
                  name={"Register"}
                  label={"Register"}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
