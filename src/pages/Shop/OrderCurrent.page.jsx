import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useGetOrdersQuery } from "../../store/services/endpoints/order.endpoint";
import { Pagination, Stack } from "@mui/material";

import {
  OrderInfoComponent,
  OrderInvoiceComponent,
  ProgressLoadingComponent,
  SearchComponent,
} from "../../Components";

import moment from "moment";
import { AllContext } from "../../context/AllContext";

const OrderCurrentPage = () => {
  const [progress, setProgress] = useState(10);
  const [openInfo, setOpenInfo] = useState(null);
  const [finalSearch, setFinal] = useState("");
  const [search, setSearch] = useState("");
  const [openInvoice, setOpenInvoice] = useState(null);
  const [sort, setSort] = useState("desc");
  const { addToCart } = useContext(AllContext);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetOrdersQuery({
    search: finalSearch,
    page: page,
    perpage: 2,

    status: [0, 1],
    sort: sort,
  });

  

  const handleOpenInvoice = (orderNumber) => {
    setOpenInvoice(orderNumber);
  };

  const handleCloseInvoice = () => {
    setOpenInvoice(null);
  };

  const handleOpenInfo = (orderNumber) => {
    setOpenInfo(orderNumber);
  };

  const handleCloseInfo = () => {
    setOpenInfo(null);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);


  


  const handleAddToCart = (
    id,
    quantity,
    name,
    description,
    image,
    price,
    discount
  ) => {
    const newCart = {
      id,
      quantity,
      name,
      description,
      image,
      price: price,
      discount: discount,
    };
    addToCart(newCart);
  };

  const orderStatus = (status) => {
    let statusText = "";
    switch (status) {
      case 1:
        statusText = "Processing";
        break;
      default:
        statusText = "Pending";
        break;
    }

    return statusText;
  };

  const statusClassMap = {
    0: "bg-orange-400 text-orange-200 hover:bg-orange-500",
    1: "bg-blue-400 text-blue-200 hover:bg-blue-500",
  };

  const getStatusClasses = (status) =>
    `px-2 py-1 duration-500 rounded-md  w-[170px] mx-auto inline-block  hover:cursor-pointer text-center mx-auto text-xs ${
      statusClassMap[status] || statusClassMap[3]
    }`;

  return (
    <div>
      {/* nav route */}
      <div className="text-xl font-semibold text-gray-800">
        <Link
          className="  text-left text-blue-400  border-b-blue-400 border-b"
          to="/home"
        >
          Home
        </Link>
        <ArrowForwardIosIcon className=" text-gray-500   mx-4" />
        <Link to="/order/current">Current Order</Link>
      </div>

      <SearchComponent
        search={search}
        setSearch={setSearch}
        sort={sort}
        setFinal={setFinal}
        setSort={setSort}
      />
      {/* Order list */}

      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <ProgressLoadingComponent value={progress} />
        </div>
      ) : data?.data?.length == 0 ? (
        <div className="py-10 flex flex-col justify-center  items-center w-full  h-[500px] m-auto ">
          <img
            src="../../public/empty-cart.png"
            className="w-xl m-auto  h-72  object-contain mb-0 "
          />

          <p className="text-center text-gray-500 ">Your Oder List Is Empty</p>
        </div>
      ) : (
        <div>
          {/* Order list */}
          {data?.data?.map((order) => {
            const subTotal = order?.items.reduce((total, item) => {
              return total + item.price;
            }, 0);
            const taxAmount = subTotal > 200000 ? subTotal * 0.005 : 0;
            const deliveryFee = order?.deliveryType == 0 ? 3000 : 5000;
            const isInvoiceOpen = openInvoice === order?.orderNumber;
            const isInfoOpen = openInfo === order?.orderNumber;

            return (
              <div
                key={order?.orderNumber}
                className="border bg-gray-50 shadow-sm rounded-sm   my-10 overflow-hidden mb-4"
              >
                <div className="px-4 py-3 grid grid-cols-12 gap-x-10 items-center">
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">
                      Order number
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {order?.orderNumber}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">
                      Ordered Date
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {moment(order?.createdAt).format("MMM D, YYYY")}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">
                      Total amount
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {order?.totalAmount.toLocaleString()} MMK
                    </p>
                  </div>

                  <div className="col-span-6 flex justify-end items-center gap-4">
                    <OrderInvoiceComponent
                      open={isInvoiceOpen}
                      setOpen={handleOpenInvoice}
                      handleClose={handleCloseInvoice}
                      orders={order}
                      calculateSubTotal={subTotal}
                      taxAmount={taxAmount}
                      deliveryFee={deliveryFee}
                    />
                    <OrderInfoComponent
                      open={isInfoOpen}
                      setOpen={handleOpenInfo}
                      handleClose={handleCloseInfo}
                      order={order}
                    />
                  </div>
                </div>

                {order?.items?.map((item, index) => (
                  <div key={index} className="px-4 py-4 border-t">
                    <div className="grid grid-cols-12 gap-x-1 items-start">
                      <div className="col-span-2">
                        <img
                          src={item?.image || "https://via.placeholder.com/70"}
                          alt={item?.name}
                          className="w-44 h-44 object-cover rounded-md"
                        />
                      </div>
                      <div className="col-span-7 ms-2">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {item?.name}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {item?.description}
                        </p>

                        <p className="mt-3 text-sm text-gray-500">
                          Qty {item?.quantity}
                        </p>
                      </div>
                      <div className="col-span-3 text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {item?.price?.toLocaleString()} MMK
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className={getStatusClasses(order.status)}>
                          {orderStatus(order.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <a
                          href={`/stock/${item.id}`}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          View product
                        </a>
                        <button
                          onClick={() =>
                            handleAddToCart(
                              item?.id,
                              1,
                              item?.name,
                              item?.description,
                              item?.image,
                              item?.price,
                              item?.discount
                            )
                          }
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Buy again
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          {/* Pagination */}

          <Stack
            className="flex items-center  justify-center my-10"
            spacing={2}
          >
            <Pagination
              
              page={page}
              onChange={(event, value) => setPage(value)}
              count={data?.totalPages}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Stack>

        </div>
      )}
    </div>
  );
};

export default OrderCurrentPage;
