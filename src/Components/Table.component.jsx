import React, { useState } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import {
  useDeleteStockMutation,
  useDetailStockQuery,
  useGetStocksQuery,
} from "../store/services/endpoints/stock.endpoint";
import EditFormComponent from "./EditForm.componet";

const TableComponent = ({
  stocks,
  isError,
  page,
  setPage,
  stocksData,
}) => {
  const [deleteStock] = useDeleteStockMutation();
  const { isLoading } = useGetStocksQuery({
    search: "",
    page,
    perpage: stocks?.perpage || 10,
  });
  const [editId, setEditId] = useState("");
  const { data } = useDetailStockQuery(editId);
  const [open, setOpen] = useState(false);

  const TimeFormatter = (time) => {
    const t = new Date(time);
    return t.toLocaleDateString();
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
          await deleteStock(id).unwrap();
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Something went wrong!", "error");
        }
      }
    });
  };

  console.log(page);
  const handleEditData = (id) => {
    setOpen(true);
    setEditId(id);
  };

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
          <TableHead className="  bg-gray-200  ">
            <TableRow className="">
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
                Code
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Price
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Discount Percentage
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                In Stock
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Reorder Level
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Date Time
              </TableCell>
              <TableCell
                sx={{
                  color: "#363434",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                }}
              >
                Created By
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
            ) : stocks?.length > 0 ? (
              stocks?.map((stock, index) => (
                <TableRow
                  sx={{ height: "40px" }}
                  className="bg-gray-50"
                  key={stock._id}
                >
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell className="   " sx={{ fontFamily: "Poppins" }}>
                    <a
                      href={`/stock/${stock._id}`}
                      className="text-blue-500 underline"
                    >
                      {stock.code}
                    </a>
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {stock.name}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {stock.price.toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {stock.discountPercentage} %
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {stock.inStock}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {stock.reorderLevel}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {TimeFormatter(stock.time)}
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Poppins", textTransform: "capitalize" }}
                  >
                    {stock.createdBy}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    <IconButton color="primary">
                      <EditIcon onClick={() => handleEditData(stock?._id)} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(stock?._id)}
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
                  sx={{ fontFamily: "Poppins", textTransform: "capitalize" , textAlign: "center",padding : "40px"}}
                >
                  Not Found Stock Item 
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* edit form */}
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
        <EditFormComponent
          handleClose={handleClose}
          editId={editId}
          editData={data?.stock}
        />
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
              disabled={page * stocksData?.perpage >= stocksData?.total}
              onClick={() => page > 0 && setPage((pre) => pre + 1)}
              className="bg-blue-500   py-2 text-gray-50 disabled:bg-gray-50 disabled:text-gray-500   hover:bg-blue-400 duration-500 transition-all rounded-md    min-w-32 shadow-sm "
            >
              Next
            </button>
          </div>

          <button className=" bg-gray-50 flex items-center gap-1 text-md   px-3 py-2  rounded-lg shadow-md text-gray-500 ">
            Total : {stocksData?.total}
          </button>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
