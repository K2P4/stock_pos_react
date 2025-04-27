import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDetailStockQuery } from "../store/services/endpoints/stock.endpoint";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import { Button, Skeleton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Minus, MinusIcon, PlusIcon } from "lucide-react";
import RecommendComponent from "../Components/Recommend.component";
import { AllContext } from "../context/AllContext";

const StockDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useDetailStockQuery(id);
  const [quantity, setQuanity] = useState(1);
  const [atcDisabled, atcSetDisabled] = useState(false);
  const images = data?.stock?.images || [];
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart } = useContext(AllContext);

  const { cart } = useContext(AllContext);

  useEffect(() => {
    const existingItem = cart.find((item) => item.id === data?.stock?._id);

    if (existingItem) {
      if (existingItem) {
        setQuanity(existingItem.quantity);
        atcSetDisabled(true);
      }
    }
  }, [cart, data]);

  const handleAddToCart = () => {
    const newCart = {
      id: data?.stock?._id,
      quantity,
      name: data?.stock?.name,
      description:data?.stock?.description,
      image: data?.stock?.images[0],
      price: discountPrice,
      discount: discountPrice,
    };

    addToCart(newCart);
    atcSetDisabled(true);
  };

  const discountPrice =
    data?.stock?.price * (1 - data?.stock?.discountPercentage / 100) * quantity;

  const finalPrice = quantity * data?.stock?.price;

  return (
    <div>
      {/* nav route */}
      <div className="text-xl  mb-17 font-semibold text-gray-800">
        <Link
          className="  text-left text-blue-400  border-b-blue-400 border-b"
          to="/stock"
        >
          Stock
        </Link>
        <ArrowForwardIosIcon className=" text-gray-500   mx-4" />
        <Link to="/stock"> {data?.stock?.name}</Link>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-15 mx-auto ">
          <Skeleton variant="rounded" width={450} height={250} />

          <div className="space-y-1">
            <Skeleton variant="rounded" width={250} height={15} />
            <Skeleton
              className="mb-3"
              variant="rounded"
              width={200}
              height={15}
            />
            <Skeleton variant="rounded" width={700} height={10} />
            <Skeleton variant="rounded" width={700} height={10} />
            <Skeleton variant="rounded" width={700} height={10} />
            <Skeleton variant="rounded" width={700} height={10} />
            <Skeleton variant="rounded" width={700} height={10} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 items-center  gap-10">
          <div className="col-span-7">
            <div className="flex gap-5 my-4 items-center align-middle h-[365px]">
              <div className="flex flex-col gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    className="w-[180px] h-[90px] rounded-lg shadow-sm object-cover 
                    border-gray-100 hover:border-blue-400 hover:scale-105 transition-transform"
                    src={img}
                    onMouseEnter={() => setSelectedImage(img)}
                  />
                ))}
              </div>
              <img
                className="w-full h-full border-gray-100 duration-500 rounded-lg shadow-sm object-cover"
                src={selectedImage || images[0]}
                alt="No Image"
              />
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="col-span-5 space-y-3 ">
            <div>
              <p className="text-lg text-gray-500 mb-1">
                {data?.stock?.categoryId?.name || "Unknown Category"}
              </p>
              <h1 className="font-bold text-3xl text-gray-800 mb-1">
                {data?.stock?.name}{" "}
              </h1>
              <p className="text-md text-gray-500">
                {data?.stock?.description || "No description available."}
              </p>
            </div>
            {/* Price */}
            <div>
              {data?.stock?.discountPercentage && (
                <div className="flex items-center gap-4 ">
                  <p className="text-xl font-semibold ">
                    KS {Math.ceil(discountPrice)}
                  </p>

                  <p className="border-blue-500 bg-blue-300 text-blue-500 text-center px-2 py-1 rounded-sm text-xs">
                    {data?.stock?.discountPercentage}%
                  </p>
                </div>
              )}

              <p
                className={` ${
                  data?.stock?.discountPercentage
                    ? " line-through text-gray-400 "
                    : "text-xl font-semibold"
                }`}
              >
                KS {Math.ceil(finalPrice)}
              </p>
            </div>

            <div>
              {/* Rating & Status */}
              <div className="flex items-center gap-4 mb-1">
                <p className="text-lg text-gray-600 flex items-center">
                  {Array.from(
                    { length: data?.stock?.rating || 0 },
                    (_, index) => (
                      <StarIcon key={index} className="text-yellow-500 mr-1" />
                    )
                  )}
                </p>
                <p
                  className={`text-lg ${
                    data?.stock?.status === 0 ? "text-blue-400" : "text-red-500"
                  }`}
                >
                  {data?.stock?.status == 0 ? "Available" : "Out Of Stocks"}
                </p>
              </div>

              {/* In Stock */}
              <div className="text-lg font-medium text-gray-700 mb-1 ">
                <p className=" w-32  inline-flex ">InStock Pcs</p>
                <span className="text-gray-500 text-left ">
                  : {data?.stock?.inStock} Pcs
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5">
              {/* Quantity Button */}
              <Button
                elevation
                variant="contained"
                color="primary"
                className="flex items-center py-2  gap-5 bg-blue-500 "
              >
                <PlusIcon
                  className="  hover:bg-gray-400 active:scale-95 duration-500 transition-all rounded-full  "
                  onClick={() => quantity > 0 && setQuanity((pre) => pre + 1)}
                />
                <span className="py-1  font-medium  ">{quantity}</span>
                <MinusIcon
                  onClick={() => quantity > 1 && setQuanity((pre) => pre - 1)}
                  className="  hover:bg-gray-400 active:scale-95 duration-500 transition-all rounded-full "
                />
              </Button>

              {/* Add to Cart Button */}
              <Button
                disabled={atcDisabled}
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
              >
                <ShoppingCartIcon /> <span className="py-1">Add to cart</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      <div>
        <RecommendComponent />
      </div>
    </div>
  );
};

export default StockDetailPage;
