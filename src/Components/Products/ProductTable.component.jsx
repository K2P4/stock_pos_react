import React from "react";

const ProductTableComponent = ({products,status}) => {


  const statusClassMap = {
    0: "bg-orange-400 text-orange-200 hover:bg-orange-500",
    1: "bg-blue-400 text-blue-200 hover:bg-blue-500",
    2: "bg-emerald-400 text-emerald-200 hover:bg-emerald-500",
    3: "bg-red-400 text-red-200 hover:bg-red-500",
  };

  const getStatusClasses = (status) =>
    `px-2 py-1 duration-500 rounded-xl  w-[85px]  inline-block  hover:cursor-pointer text-center mx-auto text-xs ${
      statusClassMap[status] || statusClassMap[3]
    }`;

  const orderStatus = (status) => {
    let statusText = "";
    switch (status) {
      case 1:
        statusText = "Processing";
        break;
      case 2:
        statusText = "Delivered";
        break;
      case 3:
        statusText = "Cancelled";
        break;
      default:
        statusText = "Pending";
        break;
    }

    return statusText;
  };

  return (
    <div className="bg-white rounded-md my-5 shadow-md overflow-hidden">
      <table className="w-full text-left">
        <thead
          className="border-b hover:bg-gray-100 cursor-pointer
       duration-500 "
        >
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Quantity
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>

            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Discount Percentage
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Info
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products?.map((item, index) => (
            <tr
              className="border-b hover:bg-gray-100 cursor-pointer
          duration-500  py-5"
              key={index}
            >
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-14 w-14 flex-shrink-0">
                    <img
                      className="h-14 w-14 rounded-sm object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm  text-gray-900">{item.quantity}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {item.price.toLocaleString()}
                </div>
              </td>

              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.discount} %</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className={getStatusClasses(status)}>
                  {orderStatus(status)}
                </span>
              </td>
              <td className="px-4  py-4 whitespace-nowrap text-sm font-medium">
                <a
                  href={`/admin/stock/${item.id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  View Product
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTableComponent;
