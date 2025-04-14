import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const OrderHistoryPage = () => {
  return (
    <div>
      {/* nav route */}
      <div className="text-xl font-semibold text-gray-800">
        <Link
          className="  text-left text-blue-400  border-b-blue-400 border-b"
          to="/dashboard"
        >
          Dashboard
        </Link>
        <ArrowForwardIosIcon className=" text-gray-500   mx-4" />
        <Link to="/order">Order</Link>
      </div>

      {/* main */}
      <div className="text-left mt-10">
        <h1 className="font-medium text-2xl">Order history</h1>
        <p className="text-gray-500 text-sm mt-1">
          Check the status of recent orders, manage returns, and discover
          similar products.
        </p>
      </div>


      <div className="  shadow-md  rounded-lg mt-10">


      </div>
    </div>
  );
};

export default OrderHistoryPage;
