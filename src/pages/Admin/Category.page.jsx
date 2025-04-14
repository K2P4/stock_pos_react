import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Grid,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Snackbar,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import TableComponent from "../../Components/Table/Table.component";
import CreateFormComponent from "../../Components/FormComponent/CreateForm.component";
import { AllContext } from "../../context/AllContext";
import {
  useGetCategoryQuery,
  useLazyExportCategoryQuery,
} from "../../store/services/endpoints/category.endpoint";
import CategoryTableComponent from "../../Components/Table/CategoryTable.component";
import ImportComponent from "../../Components/Import.component";

const CategoryPage = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [finalSearch, setFinal] = useState("");
  const [sortActive, setSort] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [triggerExport] = useLazyExportCategoryQuery();
  const dateRef = useRef();
  const [sortFilter, setSortFilter] = useState("desc");
  const [selectedDate, setSelectedDate] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetCategoryQuery({
    search: finalSearch,
    page,
    time:selectedDate,
    sort: sortFilter,
  });

  const openDatePicker = () => {
    dateRef.current.showPicker();
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
  };

  const { success, setSuccess, editSuccess, setEditSuccess } =
    useContext(AllContext);

  useEffect(() => {
    let timer;
    let editTimer;

    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);

      if (editSuccess) {
        editTimer = setTimeout(() => {
          setEditSuccess(false);
        }, 5000);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (editTimer) clearTimeout(editTimer);
    };
  }, [success, editSuccess]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleExport = async () => {
    try {
      const response = await triggerExport().unwrap();
      const blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CategoryData.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting category data:", error.message);
    }
  };

  const searchData = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      setFinal(search);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeImport = () => {
    setImportOpen(false);
  };

  const handleImport = () => {
    setImportOpen(true);
  };

  const hanldeSort = () => {
    setSort(!sortActive);

    setSortFilter((prev) => (prev == "desc" ? "asc" : "desc"));
  };

  return (
    <div className="  ">
      <div className="">
        {success && (
          <p className="bg-gray-400 text-gray-50 text-sm px-2 py-1 float-end w-auto shadow-sm rounded-md">
            Category added successfully!
          </p>
        )}

        {editSuccess && (
          <p className="bg-gray-400 text-gray-50 text-sm px-2 py-1 float-end w-auto shadow-sm rounded-md">
            Category Upated successfully!
          </p>
        )}

        {/* import form */}
        <Dialog
          className="rounded-xl mx-auto  bg-transparent  shadow-sm"
          fullWidth
          maxWidth="md"
          open={importOpen}
          onClose={closeImport}
          aria-labelledby="responsive-dialog-title"
          sx={{
            "& .MuiDialog-paper": { minHeight: "200px" },
          }}
        >
          <ImportComponent categoryCheck={true} closeImport={closeImport} />
        </Dialog>

        {/* nav route */}
        <div className="text-xl font-semibold text-gray-800">
          <Link
            className="  text-left text-blue-400  border-b-blue-400 border-b"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <ArrowForwardIosIcon className=" text-gray-500   mx-4" />
          <Link to="/stock">Category</Link>
        </div>

        {/* create form */}
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
          <CreateFormComponent
            refetch={refetch}
            handleClose={handleClose}
            checkCategory={true}
          />
        </Dialog>

        {/* btn group */}
        <div className="flex items-center gap-2 mt-2  justify-end ml-auto  w-[30%] ">
          <button
            onClick={handleExport}
            className="bg-blue-500   font-medium flex items-center  text-gray-50  text-center  justify-center py-2 hover:bg-blue-400 duration-500 transition-all rounded-lg w-full"
          >
            <ArrowDownwardIcon className=" me-1" />
            Export{" "}
          </button>
          <button
            onClick={handleImport}
            className="bg-blue-500 font-medium flex items-center  text-gray-50  text-center  justify-center py-2 hover:bg-blue-400 duration-500 transition-all rounded-lg w-full"
          >
            <ArrowUpwardIcon className=" me-1" />
            Import{" "}
          </button>
          <button
            onClick={handleClickOpen}
            className="bg-blue-500 font-medium px-4 py-2 text-center text-gray-50 hover:bg-blue-400 duration-500 transition-all rounded-lg w-full"
          >
            Add Category
          </button>
        </div>

        <Grid container>
          <Grid
            item
            sm={12}
            xs={12}
            md={6}
            lg={6}
            xl={6}
            className="flex items-center gap-2"
          >
            {/* form group */}

            <button className=" bg-gray-50 w-auto flex items-center gap-2 text-md justify-between  px-3 py-2   rounded-lg shadow-md text-gray-500 ">
              <input
                type="text"
                value={search}
                onKeyDown={searchData}
                onChange={handleSearch}
                placeholder="Search..."
                className=" border-0 focus:border-0 outline-none   "
              />
              <SearchIcon className="text-gray-400" />
            </button>

            <div className="flex items-center gap-2">
              <div className="relative bg-gray-50 ">
                <input
                  type="text"
                  value={selectedDate ? selectedDate : ""}
                  readOnly
                  placeholder="Select Date"
                  className="border  px-4 py-2 rounded-lg shadow-sm w-40 text-gray-500 cursor-pointer"
                  onClick={openDatePicker}
                />
                <CalendarMonthIcon
                  className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                  onClick={openDatePicker}
                />
              </div>

              <input
                type="date"
                ref={dateRef}
                onChange={handleDateChange}
                style={{ position: "relative", zIndex: 1 }}
                className="hidden"
              />
            </div>

            <button
              onClick={hanldeSort}
              className=" bg-gray-50 w-auto flex items-center gap-1 text-md   px-3 py-2  rounded-lg shadow-md text-gray-500 "
            >
              Sort
              <ImportExportIcon
                className={`${
                  sortActive && "text-blue-400 duration-500 transition-all "
                }`}
              />
            </button>

            <FilterAltOutlinedIcon
              sx={{ fontSize: 40 }}
              className=" bg-gray-50 w-auto shadow-md p-2  rounded-full  "
            />
          </Grid>
        </Grid>

        {/* table */}
        <CategoryTableComponent
          categoryPage={data}
          categories={data?.data}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
