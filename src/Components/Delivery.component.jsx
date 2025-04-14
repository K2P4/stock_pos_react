import { Field, ErrorMessage } from "formik";
import React, { useContext } from "react";

const DeliveryComponent = () => {
 
  const deliveryOptions = [
    { id: 0, name: "Standard", duration: "4-10 business days", price: "3000" },
    { id: 1, name: "Express", duration: "2-5 business days", price: "5000" },
  ];

  return (
    <div className="">
      <div className="flex gap-4">
        {deliveryOptions.map((option) => (
          <label
            key={option.id}
            className="border rounded-lg p-4 w-full cursor-pointer flex flex-col gap-1 transition-all duration-300"
          >
            <Field
              type="radio"
              name="deliveryType"
              value={option.id}
              className="hidden"
            />
            <div className="flex items-center justify-between">
              <span className="font-semibold">{option.name}</span>
              <Field name="deliveryType">
                {({ field }) =>
                  field.value == option.id && (
                    <span className="text-blue-500 font-bold  ">✔</span>
                  )
                }
              </Field>
            </div>
            <p className="text-gray-600 text-sm">{option.duration}</p>
            <p className=" font-medium text-md text-gray-700 mt-2 ">
              KS {option.price}
            </p>
          </label>
        ))}
      </div>
      <ErrorMessage
        component="p"
        className="text-xs text-red-400 mt-0"
        name="deliveryType"
      />
    </div>
  );
};

export default DeliveryComponent;
