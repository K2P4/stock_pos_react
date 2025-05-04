import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Grid from "@mui/material/Grid";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormDataComponent from "../../Components/FormComponent/FormData.component";
import { Delivery } from "../../Components";
import ImageIcon from "@mui/icons-material/Image";
import { AllContext } from "../../context/AllContext";
import { useCreateOrderMutation } from "../../store/services/endpoints/order.endpoint";

const CheckOutPage = () => {
  const transitionRef = useRef(null);
  const { cart, cartTotalAmount, setCart } = useContext(AllContext);
  const [orderForm] = useCreateOrderMutation();
  const [success, setSuccess] = useState(false);
  const nav = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().required("email is required"),
    name: yup.string().required("name is required"),
    address: yup.string().required("address is required"),
    city: yup.string().required("city is required"),
    phone: yup.string().required("phone is required"),
    deliveryType: yup.number().required("Delivery is required"),
    township: yup.string().required("township is required"),
    paymentType: yup.number().required("Payment type is required"),

    transitionRecord: yup.string().when("paymentType", {
      is: (val) => val !== 2,
      then: (schema) => schema.required("Payment proof is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const taxRate = 0.005;
  const calculateTax = (amount) => {
    return amount > 200000 ? amount * taxRate : 0;
  };

  const calculateTotalAmount = (delivery) => {
    const deliveryCost = delivery == 0 ? 3000 : 5000;
    const subtotal = cartTotalAmount + deliveryCost;
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  const initialValue = {
    email: "",
    name: "",
    address: "",
    deliveryType: 0,
    city: "",
    phone: "",
    township: "",
    transitionRecord: "",
    paymentType: 0,
    items: cart,
  };

  const handleSubmit = async (value) => {
    const formDataApi = new FormData();
    formDataApi.append("email", value.email);
    formDataApi.append("name", value.name);
    formDataApi.append("phone", value.phone);
    formDataApi.append("address", value.address);
    formDataApi.append("paymentType", value.paymentType);
    formDataApi.append("deliveryType", Number(value.deliveryType));
    formDataApi.append("township", value.township);
    formDataApi.append("city", value.city);
    formDataApi.append("items", JSON.stringify(value.items));

    if (value.transitionRecord) {
      formDataApi.append("transitionRecord", value.transitionRecord);
    }

    const response = await orderForm(formDataApi);
    if (response.error) {
      console.error(response.error.data.message);
    } else {
      setSuccess(true);
      setCart([]);
      nav("/order/current");
    }
  };

  const uploadTransition = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("transitionRecord", file);
    }
  };

  const hanldeTransition = () => {
    transitionRef.current.click();
  };

  return (
    <div>
      {/* Snack Bar */}
      {success && (
        <p className="bg-gray-400 text-gray-50 text-sm px-2 py-1 float-end w-auto shadow-sm rounded-md">
          Order successfully!
        </p>
      )}

      {/* nav route */}
      <div className="text-xl  mb-17 font-semibold text-gray-800">
        <Link
          className="  text-left text-blue-400  border-b-blue-400 border-b"
          to="/stock/cart"
        >
          Cart List
        </Link>
        <ArrowForwardIosIcon className=" text-gray-500   mx-4" />
        <Link to="/stock/checkout">Check Out</Link>
      </div>

      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validationSchema}
        initialValues={initialValue}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, handleBlur, values }) => (
          <Form className="pb-5">
            <Grid container spacing={2}>
              <Grid item sm={12} md={7} lg={7}>
                <div className=" border  rounded-xl  p-5 bg-gray-50 w-full shadow-xl">
                  <h1 className="  text-xl font-medium  text-left mb-5">
                    Contact Information
                  </h1>

                  <Grid container className="   border-b-gray-300" spacing={2}>
                    <Grid item sm={4} md={4} lg={4}>
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
                    </Grid>

                    <Grid item sm={4} md={4} lg={4}>
                      <FormDataComponent
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        name={"name"}
                        type={"name"}
                        label={" Full Name "}
                      />

                      <ErrorMessage
                        component={"p"}
                        className=" text-xs text-red-400 mt-0"
                        name="name"
                      />
                    </Grid>

                    <Grid item sm={4} md={4} lg={4}>
                      <FormDataComponent
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        name={"phone"}
                        type={"phone"}
                        label={" Phone "}
                      />

                      <ErrorMessage
                        component={"p"}
                        className=" text-xs text-red-400 mt-0"
                        name="phone"
                      />
                    </Grid>
                  </Grid>

                  <hr className="mt-7 mb-14 " />
                  <h1 className="   text-xl font-medium  text-left mb-5">
                    Shipping Information
                  </h1>
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={12} lg={12}>
                      <FormDataComponent
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        name={"address"}
                        type={"address"}
                        label={" Address "}
                      />

                      <ErrorMessage
                        component={"p"}
                        className=" text-xs text-red-400 mt-0"
                        name="address"
                      />
                    </Grid>

                    <Grid item sm={6} md={6} lg={6}>
                      <FormDataComponent
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        name={"city"}
                        type={"city"}
                        label={" City "}
                      />

                      <ErrorMessage
                        component={"p"}
                        className=" text-xs text-red-400 mt-0"
                        name="city"
                      />
                    </Grid>

                    <Grid item sm={6} md={6} lg={6}>
                      <FormDataComponent
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.township}
                        name={"township"}
                        type={"township"}
                        label={" township "}
                      />

                      <ErrorMessage
                        component={"p"}
                        className=" text-xs text-red-400 mt-0"
                        name="township"
                      />
                    </Grid>
                  </Grid>

                  <hr className="mt-7 mb-14 " />
                  <h1 className=" flex items-center gap-3  text-xl font-medium  text-left mb-5">
                    Delivery Method{" "}
                    <p className="text-sm text-red-400">
                      {" "}
                      (Currently It Available Only Within Yangon)
                    </p>
                  </h1>
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={12} lg={12}>
                      <Delivery handleChange={handleChange} values={values} />
                      <ErrorMessage
                        component={"p"}
                        className=" text-xs text-red-400 mt-0"
                        name="deliveryType"
                      />
                    </Grid>
                  </Grid>

                  <hr className="mt-7 mb-14 " />

                  <h1 className="   text-xl font-medium  text-left mb-5">
                    Payment Method
                  </h1>

                  <Grid container spacing={2}>
                    <Grid item sm={12} md={12} lg={12}>
                      <RadioGroup
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "30px",
                        }}
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="0"
                        value={values.paymentType}
                        onChange={handleChange}
                        name={"paymentType"}
                      >
                        <FormControlLabel
                          sx={{ fontFamily: "Poppins" }}
                          value="0"
                          control={<Radio />}
                          label="KBZ Pay"
                        />
                        <FormControlLabel
                          sx={{ fontFamily: "Poppins" }}
                          value="1"
                          control={<Radio />}
                          label="Wave Pay"
                        />
                        <FormControlLabel
                          sx={{ fontFamily: "Poppins" }}
                          value="2"
                          control={<Radio />}
                          label="Cash On Delivery"
                        />
                      </RadioGroup>

                      <ErrorMessage
                        component={"p"}
                        className=" text-xs text-red-400 mt-0"
                        name="paymentType"
                      />
                    </Grid>
                  </Grid>

                  {values.paymentType === "0" || values.paymentType === "1" ? (
                    <p className="text-xs text-red-400 mt-0">
                      *Please note that you must send the transition slip to our
                      system after you paid.

                      <p>*We will contact within 15 mins after ordered</p>

                    </p>
                  ) : (
                    <p className="text-xs text-red-400 mt-0">
                      *Don't need to send the transition slip.
                      <p>*We will contact within 15 mins after ordered</p>
                    </p>
                  )}

                  <div className="mt-8 mb-1">
                    <p>
                      <span className="   w-48 inline-flex  text-left">
                        Pay No
                      </span>{" "}
                      <span className="text-gray-400 text-left">
                        {" "}
                        : 09968213232
                      </span>
                    </p>
                    <p>
                      <span className="   w-48 inline-flex  text-left">
                        Account Name
                      </span>{" "}
                      <span className="text-gray-400 text-left">
                        {" "}
                        : Phyo Thura
                      </span>
                    </p>
                  </div>

                  <div
                    onClick={hanldeTransition}
                    className=" border-gray-500 mb-8 p-8 flex items-center cursor-pointer border border-dashed rounded-lg"
                  >
                    <Field name="transitionRecord">
                      {({ field, form }) => (
                        <input
                          ref={transitionRef}
                          className="hidden"
                          name={"transitionRecord"}
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            uploadTransition(e, form.setFieldValue)
                          }
                        />
                      )}
                    </Field>

                    <p className="text-sm text-gray-400 m-auto text-center">
                      {values.transitionRecord
                        ? "uploaded "
                        : "upload slip here"}
                      <ImageIcon className="text-gray-400 " />
                    </p>
                  </div>

                  <div className=" border-t-gray-300 ">
                    <p className="text-xs text-gray-400 mt-0">
                      *If you have any question, please contact us at
                      <span className="text-blue-400"> 0968213232</span>
                    </p>
                  </div>
                </div>
              </Grid>

              <Grid item sm={12} md={5} lg={5}>
                {cart?.length > 0 ? (
                  <div className="flex  flex-col rounded-lg   bg-gray-50 w-full shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h1 className="text-lg font-medium text-gray-900">
                          Order Summary
                        </h1>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cart.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product?.image}
                                    className="size-full object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a
                                          href={`/stock/${product.id}`}
                                          className="text-black hover:underline  duration-500 cursor-pointer "
                                        >
                                          {product?.name}
                                        </a>
                                      </h3>

                                      <p className=" ml-4">
                                        {" "}
                                        {product?.price.toLocaleString()} MMK
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {product.color}
                                    </p>
                                    <p className="text-gray-700  mb-2">
                                      {product?.discount}%
                                    </p>
                                  </div>
                                  <p className="text-gray-500">
                                    Qty {product?.quantity}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t space-y-4  border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p> {cartTotalAmount.toLocaleString()} MMK</p>
                      </div>

                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Tax</p>
                        <p>
                          {" "}
                          {calculateTax(cartTotalAmount)
                            .toFixed(0)
                            .toLocaleString()}{" "}
                          MMK
                        </p>
                      </div>

                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Delivery Fee</p>
                        <p> {values.deliveryType == 0 ? 3000 : 5000} MMK</p>
                      </div>
                    </div>

                    <div className="border-t space-y-4  border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>All Total</p>
                        <p>
                          {calculateTotalAmount(
                            values.deliveryType
                          ).toLocaleString()}{" "}
                          MMK
                        </p>
                      </div>

                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="flex items-center hover:cursor-pointer mt-7 w-full justify-center rounded-md border border-transparent bg-blue-600 duration-500 transition-all px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-blue-700"
                      >
                        {isSubmitting ? (
                          <CircularProgress color="inherit" size="30px" />
                        ) : (
                          "Place Order"
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-10 flex flex-col  justify-center  items-center w-full  h-[500px] m-auto ">
                    <img
                      src="../../public/empty-cart.png"
                      className="w-xl m-auto  h-72  object-contain mb-0 "
                    />

                    <p className="text-center text-gray-500 ">
                      Your Cart is empty
                    </p>
                  </div>
                )}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckOutPage;
