import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment/moment";
import { useOrderDetailQuery } from "../../store/services/endpoints/order.endpoint";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Dialog } from "@mui/material";
import {
  OrderFormComponent,
  OrderInfoComponent,
  OrderInvoiceComponent,
  ProductTableComponent,
} from "../../Components";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [openForm, setOpenForm] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const { data, isLoading } = useOrderDetailQuery(id);

  console.log("data", data);

  const handleClose = () => {
    setOpen(false);
  };

  const calculateSubTotal = data?.order?.items?.reduce((total, item) => {
    return total + item.price;
  }, 0);
  const deliveryFee = data?.order?.deliveryType == 0 ? 3000 : 5000;

  const taxAmount = calculateSubTotal > 200000 ? calculateSubTotal * 0.005 : 0;

  const statusClassMap = {
    0: "bg-orange-400 text-orange-200 hover:bg-orange-500",
    1: "bg-blue-400 text-blue-200 hover:bg-blue-500",
    2: "bg-emerald-400 text-emerald-200 hover:bg-emerald-500",
    3: "bg-red-400 text-red-200 hover:bg-red-500",
  };

  const getStatusClasses = (status) =>
    `px-2 py-1 duration-500 rounded-xl  w-[85px]  inline-block  hover:cursor-pointer text-center mx-auto text-xs ${
      statusClassMap[status] || statusClassMap[3]
    }`;

  const orderStatus = (status) => {
    let statusText = "";
    switch (status) {
      case 1:
        statusText = "Processing";
        break;
      case 2:
        statusText = "Delivered";
        break;
      case 3:
        statusText = "Cancelled";
        break;
      default:
        statusText = "Pending";
        break;
    }

    return statusText;
  };

  return (
    <div>
      {/* nav route */}
      <div className="text-xl  mb-15 font-semibold text-gray-800">
        <Link
          className="  text-left text-blue-400  border-b-blue-400 border-b"
          to="/admin/order/history"
        >
          Order Lists
        </Link>
        <ArrowForwardIosIcon className=" text-gray-500   mx-4" /> Order{" "}
        {data?.order?.orderNumber}
      </div>

      <div className="bg-gray-50 rounded-sm overflow-hidden shadow-md">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="grid grid-cols-5   gap-x-12">
            <div>
              <p className="text-sm font-medium text-gray-500">Customer Name</p>
              <p className="mt-1 text-sm text-gray-900">{data?.order?.name}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1 text-sm text-gray-900">{data?.order?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date Placed</p>
              <p className="mt-1 text-sm text-gray-900">
                {data?.order?.deliveryDate
                  ? moment(data?.order?.deliveryDate).format("DD.MM.YY")
                  : "Undone"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Order Number</p>
              <p className="mt-1 text-sm text-gray-900">
                {data?.order?.orderNumber}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Amount</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                {data?.order?.totalAmount.toLocaleString()} MMK
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <OrderFormComponent
              open={openForm}
              setOpen={setOpenForm}
              handleClose={() => setOpenForm(false)}
              orderId={data?.order?._id}
              statusId={data?.order?.status}
            />

            <OrderInvoiceComponent
              open={openInvoice}
              setOpen={setOpenInvoice}
              handleClose={() => setOpenInvoice(false)}
              orders={data?.order}
              calculateSubTotal={calculateSubTotal}
              taxAmount={taxAmount}
              deliveryFee={deliveryFee}
            />

            <OrderInfoComponent
              open={openInfo}
              setOpen={setOpenInfo}
              handleClose={() => setOpenInfo(false)}
              order={data?.order}
            />
          </div>
        </div>
      </div>

     <ProductTableComponent products={data?.order?.items} status={data?.order?.status} />
    </div>
  );
};

export default OrderDetailPage;
