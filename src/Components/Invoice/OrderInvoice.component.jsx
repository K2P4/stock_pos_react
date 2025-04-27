import React from "react";
import {
  Dialog
} from "@mui/material";

const OrderInvoiceComponent = ({open,setOpen,handleClose,orders,calculateSubTotal,taxAmount,deliveryFee}) => {

  return (
    <div>
      <button
        onClick={() => setOpen(orders?.orderNumber)}
        type="button"
        className="inline-flex items-center hover:cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        View Invoice
      </button>


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
        <div className="flex p-5  flex-col rounded-lg   bg-gray-50 w-full ">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h1 className="text-lg font-medium text-gray-900">Invoice</h1>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-2 divide-y divide-gray-200">
                  {orders?.items?.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className=" w-14 h-14 shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product?.image}
                          className="size-full w-14 h-14 object-cover"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3>
                              <a
                                className="text-black hover:underline  duration-500 cursor-pointer "
                              >
                                {product?.name}
                              </a>
                            </h3>

                            <p className=" text-sm ml-4">
                              {" "}
                              {product?.price.toLocaleString()} KS
                            </p>
                          </div>

                          <p className="text-gray-700 text-sm  mb-0">
                            {product?.discount}%
                          </p>
                        </div>
                        <p className="text-gray-500 text-sm">
                          Qty {product?.quantity}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t space-y-4  border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-sm font-medium text-gray-900">
              <p>Subtotal</p>
              <p>
                {" "}
                {calculateSubTotal &&
                  calculateSubTotal.toLocaleString()} KS{" "}
              </p>
            </div>

            <div className="flex justify-between text-sm  font-medium text-gray-900">
              <p>Tax</p>
              <p> {taxAmount.toLocaleString()} KS</p>
            </div>

            <div className="flex justify-between text-sm  font-medium text-gray-900">
              <p>Delivery Fee</p>
              <p> {deliveryFee} KS</p>
            </div>
          </div>

          <div className="border-t space-y-4  border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-sm  font-medium text-gray-900">
              <p>All Total</p>
              <p> {orders?.totalAmount.toLocaleString()} KS</p>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default OrderInvoiceComponent;
