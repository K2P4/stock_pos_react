import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUpdateOrderMutation } from "../../store/services/endpoints/order.endpoint";

const OrderFormComponent = ({
  orderId,
  statusId,
  setOpen,
  handleClose,
  open,
}) => {
  console.log("id", statusId);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updateOrder] = useUpdateOrderMutation();
  const [formData, setFormData] = useState(
    { status: statusId },
    { deliveryDate: null },
    { payDate: null }
  );

  const orderStatus = [
    { id: 0, name: "Pending" },
    { id: 1, name: "Processing" },
    { id: 2, name: "Delivered" },
    { id: 3, name: "Cancelled" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await updateOrder({
      id: orderId,
      formData: formData,
    });

    if (response.data.success) {
      setSuccess(true);
      setLoading(false);
      setOpen(false);
    }
    console.log("response", response);
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

  return (
    <div>
      {success && (
        <p className="bg-gray-400 fixed top-10 right-10 text-gray-50 text-sm px-2 py-1 float-end mb-1 w-auto shadow-sm rounded-md">
          Edited Order successfully!
        </p>
      )}

      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center hover:cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Edit
      </button>

      {/* edit form */}
      <Dialog
        className="rounded-xl mx-auto  bg-transparent  shadow-sm"
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-paper": { minHeight: "250px", maxHeight: "100vh" },
        }}
      >
        <DialogTitle
          sx={{ fontFamily: "Poppins", textAlign: "center" , display : "flex" , alignItems: "center" , justifyContent:"space-between" }}
          id="responsive-dialog-title"
        >
          <img
            src="/logo-xpos.png"
            className="size-full w-20  h-20 object-cover"
          />
          Edit Order
        </DialogTitle>
        <DialogContent>
          <form method="PUT" onSubmit={handleSubmit}>
            {/* Order Status */}
            <FormControl className="" fullWidth>
              <label id="status-label">Order Status</label>
              <Select
                sx={{ borderRadius: "10px" }}
                labelId="status-label"
                id="status-select"
                value={formData.status || 0}
                onChange={handleChange}
                height="10px"
              >
                {orderStatus?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* delievryDate */}
            {formData?.status === 2 && (
              <div className="flex flex-col space-y-4 mt-5">
                <label htmlFor="deliveryDate">Delivery Date</label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate || null}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      deliveryDate: e.target.value,
                    }))
                  }
                  className="border rounded-md p-2 mt-0"
                  required
                />

                <label htmlFor="payDate">Pay Date</label>
                <input
                  type="date"
                  id="payDate"
                  name="payDate"
                  value={formData.payDate || null}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      payDate: e.target.value,
                    }))
                  }
                  className="border rounded-md p-2 mt-0"
                  required
                />
              </div>
            )}

            {/* Submit GP */}
            <div className="flex items-center justify-center mt-10 gap-20">
              <button
                onClick={() => handleClose}
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
      </Dialog>
    </div>
  );
};

export default OrderFormComponent;
