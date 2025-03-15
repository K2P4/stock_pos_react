import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const OrderCurrentPage = () => {
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
        <Link to="/order/current">Current Order</Link>
      </div>

  


      <div className="  shadow-md  rounded-lg mt-10">


      </div>
    </div>
  );
};

export default OrderCurrentPage;
