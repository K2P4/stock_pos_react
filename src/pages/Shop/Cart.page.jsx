import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const ProductPage = () => {
  return (
    <div>

         {/* nav route */}
         <div className="text-xl  font-semibold text-gray-800">
          <Link
            className="  text-left text-blue-400  border-b-blue-400 border-b"
            to="/home"
          >
            Home
          </Link>
          <ArrowForwardIosIcon className=" text-gray-500   mx-4" />
          <Link to="/stock/cart">Add To Cart List</Link>
        </div>
    </div>
  );
};

export default ProductPage;
