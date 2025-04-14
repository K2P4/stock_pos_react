import React, { useContext, useEffect, useRef, useState } from "react";
import {
  useGetStocksQuery,
  useUpdateStockMutation,
} from "../../store/services/endpoints/stock.endpoint";
import {
  DialogTitle,
  DialogContent,
  Grid,
  Select,
  InputLabel,
  CircularProgress,
  MenuItem,
  FormControl,
  Snackbar,
} from "@mui/material";

import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../store/services/endpoints/category.endpoint";
import { AllContext } from "../../context/AllContext";

const EditFormComponent = ({
  handleClose,
  editData,
  checkCategory = false,
}) => {
  const [editForm] = useUpdateStockMutation();
  const [editCategory] = useUpdateCategoryMutation();
  const { setEditSuccess } = useContext(AllContext);
  const [loading, setLoading] = useState(false);
  const { data } = useGetCategoryQuery({
    search: "",
    perpage: 15,
  });
  const imageRef = useRef();

  const statusList = [
    {
      id: 0,
      name: "Available",
    },

    {
      id: 1,
      name: "Out Of Stocks",
    },
  ];

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    price: "",
    status: 0,
    discountPercentage: "",
    inStock: "",
    reorderLevel: "",
    categoryId: null,
    description: "",
    images: [],
  });

  useEffect(() => {
    setFormData({
      code: editData?.code || "",
      name: editData?.name || "",
      price: editData?.price || "",
      discountPercentage: editData?.discountPercentage || "",
      inStock: editData?.inStock || "",
      status: editData?.status || 0,
      reorderLevel: editData?.reorderLevel || "",
      categoryId: editData?.categoryId?._id || null,
      description: editData?.description || "",
      images: editData?.images || [],
    });
  }, [editData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (checkCategory) {
      try {
        const response = await editCategory({
          id: editData?._id,
          formData,
        });

        console.log(response);

        if (response.data.success) {
          setEditSuccess(true);
        } else {
          alert("Something went wrong! Try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to edit stock.");
      }
    } else {
      const formDataApi = new FormData();
      formDataApi.append("code", formData.code);
      formDataApi.append("name", formData.name);
      formDataApi.append("price", formData.price);
      formDataApi.append("status", formData.status);
      formDataApi.append("discountPercentage", formData.discountPercentage);
      formDataApi.append("inStock", Number(formData.inStock));
      formDataApi.append("reorderLevel", Number(formData.reorderLevel));
      formDataApi.append("categoryId", formData.categoryId);
      formDataApi.append("description", formData.description);

      formData.images.forEach((image) => {
        if (image instanceof File) {
          formDataApi.append("images", image);
        }
      });

      try {
        const response = await editForm({
          id: editData?._id,
          formData: formDataApi,
        });

        console.log(response);

        if (response.data.success) {
          setEditSuccess(true);
        } else {
          alert("Something went wrong! Try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to edit stock.");
      }
    }

    setLoading(false);
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (event) => {
    setFormData((prev) => ({
      ...prev,
      status: event.target.value,
    }));
  };

  const handleCategory = (event) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    setFormData((prev) => ({
      ...prev,
      images: [...(Array.isArray(prev.images) ? prev.images : []), ...files],
    }));
  };

  const imageDisplay = () => {
    imageRef.current.click();
  };

  console.log(editData?.categoryId?.name);

  return (
    <div className="">
      <DialogTitle
        sx={{ fontFamily: "Poppins", textAlign: "center" }}
        id="responsive-dialog-title"
      >
        Edit New Stock
      </DialogTitle>
      <DialogContent>
        <form method="PUT" onSubmit={handleSubmit}>
          {checkCategory ? (
            <div className=" mb-3 ">
              <p>Name</p>
              <input
                required
                className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          ) : (
            <Grid container spacing={5} className="">
              {/* Form Section One */}
              <Grid item xl={7} sm={7} md={7} lg={7}>
                <div>
                  {/* Code */}
                  <div className=" mb-3 ">
                    <p>Code</p>
                    <input
                      required
                      className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Name */}
                  <div className=" mb-3 ">
                    <p>Name</p>
                    <input
                      required
                      className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    {/* Price */}
                    <div className=" mb-3 w-auto ">
                      <p>Price</p>
                      <div className="rounded-xl flex items-center border w-48 ">
                        <p className="bg-gray-100 w-auto py-2 px-4 border-r rounded-l-xl ">
                          Ks
                        </p>
                        <input
                          required
                          className="focus:outline-none ps-2 "
                          type="text"
                          name="price"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <FormControl className="w-full">
                      <InputLabel id="stauts-label">Status</InputLabel>
                      <Select
                        sx={{ borderRadius: "15px" }}
                        labelId="stauts-label"
                        id="category-select"
                        value={formData.status || 0}
                        onChange={handleSelect}
                      >
                        {statusList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </Grid>

              {/* Image */}
              <Grid item xl={4} sm={4} md={4} lg={4}>
                <div
                  onClick={imageDisplay}
                  className=" h-full border-dashed w-full border rounded-xl cursor-pointer "
                >
                  {formData?.images.length > 0 &&
                    formData.images.map((item, index) => (
                      <p
                        key={index}
                        className="text-sm line-clamp-1 mx-auto mt-5 text-center text-gray-700"
                      >
                        {typeof item === "string" ? item : item.name}
                      </p>
                    ))}

                  <input
                    ref={imageRef}
                    className=" hidden "
                    type="file"
                    name="images"
                    onChange={handleImageChange}
                  />
                </div>
              </Grid>
            </Grid>
          )}

          {!checkCategory && (
            <Grid
              container
              spacing={2}
              sx={{
                marginTop: "5px",
              }}
            >
              {/* Order Section  */}
              <Grid item xl={4} sm={4} md={4} lg={4}>
                {/* Discount */}
                <div className=" mb-5 ">
                  <p>Discount Percentage</p>
                  <input
                    className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                    type="number"
                    name="discountPercentage"
                    placeholder="0"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                  />
                </div>
              </Grid>

              <Grid item xl={4} sm={4} md={4} lg={4}>
                {/* Instock */}
                <div className=" mb-5 ">
                  <p>In Stock</p>
                  <input
                    required
                    className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                    type="number"
                    name="inStock"
                    placeholder="0"
                    value={formData.inStock}
                    onChange={handleChange}
                  />
                </div>
              </Grid>

              <Grid item xl={4} sm={4} md={4} lg={4}>
                {/* Reorder Level */}
                <div className=" mb-5 ">
                  <p>Reorder Level</p>
                  <input
                    className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                    type="number"
                    name="reorderLevel"
                    placeholder="0"
                    value={formData.reorderLevel}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
            </Grid>
          )}

          {/* Category */}
          {!checkCategory && (
            <FormControl className="" fullWidth>
              <label  id="category-label">Category</label>
              <Select
                sx={{ borderRadius: "15px" }}
                labelId="category-label"
                id="category-select"
                value={formData.categoryId || null}
                onChange={handleCategory}
              >
                {data?.data?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Desccription */}
          <div className=" mb-5 mt-5">
            <p>Description</p>
            <textarea
              className="border p-2 mt-1 focus:outline-none w-full rounded-xl  h-28 "
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Submit GP */}
          <div className="flex items-center justify-center gap-20">
            <button
              onClick={handleClose}
              className="bg-blue-500 font-medium px-4 py-2 text-gray-50 hover:bg-blue-400 duration-500 transition-all rounded-full w-38"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-500 font-medium px-4 py-2 text-gray-50 hover:bg-blue-400 duration-500 transition-all rounded-full w-38"
            >
              {loading ? (
                <CircularProgress
                  color="inherit"
                  size="23px"
                  className="mx-auto"
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </div>
  );
};

export default EditFormComponent;
