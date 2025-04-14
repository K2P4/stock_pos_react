import React, { useContext, useState } from "react";
import { AllContext } from "../context/AllContext";
import { useGetProfileQuery } from "../store/services/endpoints/auth.endpoint";
import { useGetDelieryDetailQuery } from "../store/services/endpoints/delivery.enpoint";
import { useCreateOrderMutation } from "../store/services/endpoints/order.endpoint";
import { CircularProgress } from "@mui/material";

const OrderSummaryComponent = () => {
  const { cart, totalAmount } = useContext(AllContext);
  const [loading, setLoading] = useState(false);
  const { data } = useGetProfileQuery();
  const { data: deliveryData } = useGetDelieryDetailQuery(data?.user?._id);
  const [orderForm] = useCreateOrderMutation();
  const DeliveryFee = deliveryData?.delivery?.deliveryType == 0 ? 3000 : 5000;
  const taxRate = 0.005;

  const calculateTax = (amount) => {
    return amount > 200000 ? amount * taxRate : 0;
  };

  const allTotalAmount = totalAmount + DeliveryFee + calculateTax(totalAmount);

  const handlePlaceOrder = async () => {
    setLoading(true);
    const order = {
      userId: data?.user?._id,
      items: cart,
      totalAmount: allTotalAmount,
      deliveryFee: DeliveryFee,
      shippingAddress: deliveryData?.delivery?.address,
    };


    try {
      const response = await orderForm(order);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="">
      {cart?.length > 0 ? (
        <div className="flex  flex-col rounded-lg   bg-gray-50 w-full shadow-xl">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h1 className="text-lg font-medium text-gray-900">
                Order Summary
              </h1>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product?.image}
                          className="size-full object-cover"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a
                                href={`/stock/${product.id}`}
                                className="text-black hover:underline  duration-500 cursor-pointer "
                              >
                                {product?.name}
                              </a>
                            </h3>

                            <p className=" ml-4"> KS {product?.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                          <p className="text-gray-700  mb-2">
                            {product?.discount}%
                          </p>
                        </div>
                        <p className="text-gray-500">Qty {product?.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t space-y-4  border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>KS {totalAmount}</p>
            </div>

            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Tax</p>
              <p>KS {calculateTax(totalAmount).toFixed(0)}</p>
            </div>

            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Delivery Fee</p>
              KS {DeliveryFee}
            </div>
          </div>

          <div className="border-t space-y-4  border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>All Total</p>
              <p>KS {allTotalAmount}</p>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="flex items-center mt-7 w-full justify-center rounded-md border border-transparent bg-blue-600 duration-500 transition-all px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-blue-700"
            >
              {loading ? (
                <CircularProgress color="inherit" size="30px" />
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="py-10 flex flex-col  justify-center  items-center w-full  h-[500px] m-auto ">
          <img
            src="../../public/empty-cart.png"
            className="w-xl m-auto  h-72  object-contain mb-0 "
          />

          <p className="text-center text-gray-500 ">Your Cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default OrderSummaryComponent;
