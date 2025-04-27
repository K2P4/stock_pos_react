import React, { useContext, useRef, useState } from "react";
import { useCreateStockMutation } from "../../store/services/endpoints/stock.endpoint";
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
  useCreateCategoryMutation,
  useGetCategoryQuery,
} from "../../store/services/endpoints/category.endpoint";
import { AllContext } from "../../context/AllContext";

const CreateFormComponent = ({ handleClose, checkCategory = false }) => {
  const [uploadStock] = useCreateStockMutation();
  const [uploadCategory] = useCreateCategoryMutation();
  const { setSuccess } = useContext(AllContext);
  const [loading, setLoading] = useState(false);
  const { data } = useGetCategoryQuery({
    search: "",
    perpage: 15,
  });
  const imageRef = useRef();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    price: "",
    discountPercentage: "",
    inStock: "",
    reorderLevel: "",
    categoryId: "",
    description: "",
    images: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;


    if(name == "discountPercentage"){
      const numberValue = Number(value);

      if(numberValue > 99){
        alert('Discount Percentage Must Be Shorter Than 99 %')
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      images: [...prev.images, ...files],
    }));
  };

  const imageDisplay = () => {
    imageRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (checkCategory) {
      try {
        const response = await uploadCategory(formData);
        if (response.data.success) {
          setSuccess(true);
        } else {
          alert("Something went wrong! Try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to create stock.");
      }
    } else {
      const formDataApi = new FormData();
      formDataApi.append("code", formData.code);
      formDataApi.append("name", formData.name);
      formDataApi.append("price", formData.price);
      formDataApi.append("discountPercentage", formData.discountPercentage);
      formDataApi.append("inStock", Number(formData.inStock));
      formDataApi.append("reorderLevel", Number(formData.reorderLevel));
      formDataApi.append("description", formData.description);

      formData.images.forEach((image) => {
        formDataApi.append("images", image);
      });

      if (formData.categoryId) {
        formDataApi.append("categoryId", formData.categoryId);
      } else {
        formDataApi.append("categoryId", "");
      }

      console.log(formDataApi);

      try {
        const response = await uploadStock(formDataApi);
        console.log(response);
        if (response.data.success) {
          setSuccess(true);
        } else {
          alert("Something went wrong! Try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to create stock.");
      }
    }

    setLoading(false);
    handleClose();
  };

  return (
    <div className="">
      <DialogTitle
        sx={{ fontFamily: "Poppins", textAlign: "center" }}
        id="responsive-dialog-title"
      >
        {checkCategory ? "Create New Category" : "Create New Stock"}
      </DialogTitle>
      <DialogContent>
        <form method="POST" onSubmit={handleSubmit}>
          {/* Name */}

          {checkCategory && (
            <div className=" mb-3  ">
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
          )}

          {!checkCategory && (
            <Grid container spacing={5} className="">
              {/* Form Section One */}
              <Grid item xl={7} sm={7} md={7} lg={7}>
                <div>
                  {/* Code */}

                  <div className=" mb-3 ">
                    <p>Code</p>
                    <input
                      className="border p-2 mt-1 focus:outline-none w-full rounded-xl"
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Name */}
                  <div className=" mb-3  ">
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

                  {/* Price */}

                  <div className=" mb-3 w-auto ">
                    <p>Price</p>
                    <div className="rounded-xl flex items-center border mt-1    w-56 ">
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
                </div>
              </Grid>

              {/* Images */}
              {!checkCategory && (
                <Grid item xl={4} sm={4} md={4} lg={4}>
                  <div
                    onClick={imageDisplay}
                    className=" h-full border-dashed w-full border rounded-xl cursor-pointer "
                  >
                    {formData?.images.length > 0 &&
                      formData?.images?.map((img) => (
                        <p className="text-sm line-clamp-1 mx-auto flex justify-center flex-col align-middle items-center mt-2 text-center text-gray-700">
                          {img.name}
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
              )}
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
                    type="text"
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
                    type="text"
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
            <FormControl className=" scroll-auto " fullWidth>
              <label id="category-label">Category</label>
              <Select
                className=" scroll-auto "
                sx={{ borderRadius: "15px" }}
                labelId="category-label"
                id="category-select"
                value={formData.categoryId}
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
          <div
            className={`flex items-center justify-center gap-20  ${
              checkCategory && "mt-10"
            } `}
          >
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

export default CreateFormComponent;
