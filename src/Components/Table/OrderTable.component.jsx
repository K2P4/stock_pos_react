import React, { use, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Dialog,
} from "@mui/material";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import VerifiedIcon from "@mui/icons-material/Verified";
import { XIcon } from "lucide-react";

import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";

import Swal from "sweetalert2";
import {
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} from "../../store/services/endpoints/order.endpoint";

const OrderTableComponent = ({
  orders,
  isError,
  page,
  setPage,
  isLoading,
  ordersData,
}) => {
  const [open, setOpen] = useState(false);
  const [transitionImage, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [verifyId, setVerifyId] = useState(null);
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const TimeFormatter = (time) => {
    return moment(time).format("DD.MM.YYYY");
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteOrder(id).unwrap();
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Something went wrong!", "error");
        }
      }
    });
  };

  console.log("orders", orders);

  const handleTransition = (id, transitionImage) => {
    setOpen(true);
    setImage(transitionImage);
    setVerifyId(id);
  };

  const updateStatus = async () => {
    const formData = { status: 1 };
    const response = await updateOrder({
      id: verifyId,
      formData: formData,
    });
    setSuccess(true);
    console.log("response", response);
  };

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

  useEffect(() => {
    let timer;

    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }

    return clearTimeout(timer);
  }, [success]);

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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {success && (
        <p className="bg-gray-400 text-gray-50 text-sm px-2 py-1 fixed top-8 right-5 mb-1 w-auto shadow-sm rounded-md">
          Checked Transition successfully!
        </p>
      )}

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "100%",
          margin: "auto",
          marginTop: 3,
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
          borderRadius: "10px",
        }}
      >
        <Table sx={{ fontFamily: "Poppins" }}>
          <TableHead className="      bg-gray-200  ">
            <TableRow className="  ">
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                #
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Order No
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Customer Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                City
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Delivery Type
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Total Amount
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Ordered Date
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell className=" h-40 " colSpan={10} align="center">
                  <CircularProgress color="inherit" size="30px" />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  Error : {isError}
                </TableCell>
              </TableRow>
            ) : orders?.length > 0 ? (
              orders?.map((order, index) => (
                <TableRow
                  sx={{ height: "40px" }}
                  className="bg-gray-50"
                  key={order._id}
                >
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell className="   " sx={{ fontFamily: "Poppins" }}>
                    <a
                      href={`/admin/order/${order._id}`}
                      className="text-blue-500 underline"
                    >
                      {order?.orderNumber}
                    </a>
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {order.name}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {order.email}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {order.city}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    <span className={getStatusClasses(order.status)}>
                      {orderStatus(order.status)}
                    </span>
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {order.deliveryType == 0 ? "Standard" : "Express"}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    <span className="font-medium ">
                      MMK {order.totalAmount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Poppins", textTransform: "capitalize" }}
                  >
                    {TimeFormatter(order.createdAt)}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {order.status == 0 ? (
                      <IconButton
                        onClick={() =>
                          handleTransition(order._id, order.transitionRecord)
                        }
                        color="warning"
                      >
                        <NewReleasesIcon />
                      </IconButton>
                    ) : (
                      <IconButton color="success">
                        <VerifiedIcon />
                      </IconButton>
                    )}

                    <IconButton
                      onClick={() => handleDelete(order?._id)}
                      color="gray"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={10}
                  sx={{
                    fontFamily: "Poppins",
                    textTransform: "capitalize",
                    textAlign: "center",
                    padding: "40px",
                  }}
                >
                  Not Found Customer Order
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* verify record form */}
      <Dialog
        className="rounded-xl mx-auto  bg-transparent  shadow-sm"
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-paper": { minHeight: "500px", maxHeight: "100vh" },
        }}
      >
        <div className=" p-5">
          <div className="flex items-center justify-between mb-1">
            <button
              onClick={updateStatus}
              className=" hover:cursor-pointer w-auto text-center rounded-md border border-transparent bg-blue-600 duration-500 transition-all px-4 py-2 text-base font-medium text-white shadow-xs hover:bg-blue-700"
            >
              Verify Transition
            </button>

            <button
              onClick={handleClose}
              type="button"
              className="font-medium text-gray-400 active:scale-95 cursor-pointer hover:text-gray-500 duration-500 transition-all "
            >
              <XIcon />
            </button>
          </div>

          <img
            src={transitionImage}
            alt="test"
            className=" mx-auto object-cover"
          />
        </div>
      </Dialog>

      {/* pagination group */}
      {!isLoading && (
        <div className="my-3 flex items-center justify-between ">
          <div className="space-x-3">
            <button
              disabled={page == 1}
              onClick={() =>
                page > 1 && setPage((prev) => Math.max(prev - 1, 1))
              }
              className="bg-blue-500   py-2 disabled:bg-gray-50 disabled:text-gray-500  text-gray-50  hover:opacity-95 duration-500 transition-all rounded-md    min-w-32 shadow-sm "
            >
              Previous
            </button>

            <button
              disabled={page * ordersData?.perpage >= ordersData?.total}
              onClick={() => page > 0 && setPage((pre) => pre + 1)}
              className="bg-blue-500   py-2 text-gray-50 disabled:bg-gray-50 disabled:text-gray-500   hover:bg-blue-400 duration-500 transition-all rounded-md    min-w-32 shadow-sm "
            >
              Next
            </button>
          </div>

          <button className=" bg-gray-50 flex items-center gap-1 text-md   px-3 py-2  rounded-lg shadow-md text-gray-500 ">
            Total : {ordersData?.total}
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderTableComponent;
