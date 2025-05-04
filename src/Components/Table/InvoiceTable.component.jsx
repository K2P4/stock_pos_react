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
import DownloadIcon from "@mui/icons-material/Download";

import moment from "moment";

const InvoiceTableComponent = ({
  invoices,
  isError,
  page,
  setPage,
  isLoading,
  ordersData,
}) => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const TimeFormatter = (time) => {
    return moment(time).format("DD.MM.YYYY");
  };

  const calculateTax = (items, delivery) => {
    const calculateSubTotal = items?.reduce((total, item) => {
      return total + item.price;
    }, 0);

    return calculateSubTotal > 200000 ? calculateSubTotal * 0.005 : 0;
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
                Invoice No
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
                Issue Date
              </TableCell>

              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Delivery Fee
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Tax
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
            ) : invoices?.length > 0 ? (
              invoices?.map((invoice, index) => (
                <TableRow
                  sx={{ height: "40px" }}
                  className="bg-gray-50"
                  key={invoice._id}
                >
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell className="   " sx={{ fontFamily: "Poppins" }}>
                    <a
                      href={`/admin/invoice/${invoice._id}`}
                      className="text-blue-500 underline"
                    >
                      {invoice?.invoiceNumber}
                    </a>
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {invoice.name}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {invoice.email}
                  </TableCell>

                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {invoice?.payDate !== null ? (
                      <span
                        className={`px-2 py-1 duration-500 rounded-xl  w-[85px]  inline-block  hover:cursor-pointer text-center mx-auto text-xs bg-emerald-400 text-emerald-200 hover:bg-emerald-500`}
                      >
                        Paid
                      </span>
                    ) : (
                      <span
                        className={`px-2 py-1 duration-500 rounded-xl  w-[85px]  inline-block  hover:cursor-pointer text-center mx-auto text-xs bg-orange-400 text-orange-200 hover:bg-orange-500`}
                      >
                        UnPaid
                      </span>
                    )}
                  </TableCell>

                  <TableCell
                    sx={{ fontFamily: "Poppins", textTransform: "capitalize" }}
                  >
                    {TimeFormatter(invoice?.payDate)}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {invoice?.deliveryType == 0 ? 3000 : 5000}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {calculateTax(
                      invoice?.items,
                      invoice?.deliveryType
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    <span className="font-medium ">
                      MMK {invoice.totalAmount.toLocaleString()}
                    </span>
                  </TableCell>

                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    <IconButton color="primary">
                      <DownloadIcon />
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
                  Not Found Customer Invoice
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
          <div className="flex items-center gap-2">
            <button className=" bg-gray-50 flex items-center gap-1 text-md   px-3 py-2  rounded-lg shadow-md text-gray-500 ">
              Total Amount : <span className="font-medium ">{ordersData?.allTotalAmount.toLocaleString()} MMK</span>
            </button>
            <button className=" bg-gray-50 flex items-center gap-1 text-md   px-3 py-2  rounded-lg shadow-md text-gray-500 ">
              Total  : {ordersData?.total}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceTableComponent;
