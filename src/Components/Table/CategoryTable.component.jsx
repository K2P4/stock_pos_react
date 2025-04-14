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

import EditFormComponent from "../FormComponent/EditForm.componet";
import {
  useDeleteCategoryMutation,
  useDetailCategoryQuery,
  useGetCategoryQuery,
} from "../../store/services/endpoints/category.endpoint";

const CategoryTableComponent = ({
  categories,
  isError,
  page,
  setPage,
  categoryPage,
}) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const { isLoading } = useGetCategoryQuery({
    search: "",
    page,
    perpage: categories?.perpage || 10,
  });
  const [editId, setEditId] = useState("");
  const { data } = useDetailCategoryQuery(editId);
  const [open, setOpen] = useState(false);

  console.log(categories);

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
          await deleteCategory(id).unwrap();
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Something went wrong!", "error");
        }
      }
    });
  };

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
                Category ID
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
            ) : categories?.length > 0 ? (
              categories?.map((category, index) => (
                <TableRow
                  sx={{ height: "40px" }}
                  className="bg-gray-50"
                  key={category._id}
                >
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell className="   " sx={{ fontFamily: "Poppins" }}>
                    {category._id}
                  </TableCell>

                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {category.name}
                  </TableCell>

                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    {TimeFormatter(category.time)}
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Poppins", textTransform: "capitalize" }}
                  >
                    {category.createdBy}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins" }}>
                    <IconButton color="primary">
                      <EditIcon onClick={() => handleEditData(category?._id)} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(category?._id)}
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
                  Not Found Category Item
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
          checkCategory={true}
          handleClose={handleClose}
          editId={editId}
          editData={data?.category}
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
              disabled={page * categoryPage?.perpage >= categoryPage?.total}
              onClick={() => page > 0 && setPage((pre) => pre + 1)}
              className="bg-blue-500   py-2 text-gray-50 disabled:bg-gray-50 disabled:text-gray-500   hover:bg-blue-400 duration-500 transition-all rounded-md    min-w-32 shadow-sm "
            >
              Next
            </button>
          </div>

          <button className=" bg-gray-50 flex items-center gap-1 text-md   px-3 py-2  rounded-lg shadow-md text-gray-500 ">
            Total : {categoryPage?.total}
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryTableComponent;
