import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDetailStockQuery } from "../../store/services/endpoints/stock.endpoint";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import { Button, Skeleton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { MinusIcon, PlusIcon } from "lucide-react";
import { AllContext } from "../../context/AllContext";
import RecommendProductComponent from "./RecommendProduct.component";

const ProductDetailComponent = () => {
  const { id } = useParams();
  const { data, isLoading } = useDetailStockQuery(id);
  const [quantity, setQuanity] = useState(1);
  const [atcDisabled, atcSetDisabled] = useState(false);
  const images = data?.stock?.images || [];
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart,cart } = useContext(AllContext);


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
      discount: data?.stock?.discountPercentage,
    };

    addToCart(newCart);
    atcSetDisabled(true);
  };

  const discountPrice =
    data?.stock?.price * (1 - data?.stock?.discountPercentage / 100) * quantity;

  const finalPrice = quantity * data?.stock?.price;

  console.log("catData", data);

  return (
    <div>
      {/* nav route */}
      <div className="text-xl  mb-17 font-semibold text-gray-800">
        <Link
          className="  text-left text-blue-400  border-b-blue-400 border-b"
          to="/home"
        >
          Home
        </Link>
        <ArrowForwardIosIcon className=" text-gray-500   mx-4" />
        {data?.stock?.name}
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
                    className="w-[180px] h-[85px] rounded-sm shadow-sm object-cover 
                        border-gray-100 hover:border-blue-400 hover:scale-105 transition-transform"
                    src={img}
                    onMouseEnter={() => setSelectedImage(img)}
                  />
                ))}
              </div>
              <img
                className="w-full h-full border-gray-100 duration-500 rounded-sm shadow-sm object-cover"
                src={selectedImage || images[0]}
                alt="No Image"
              />
            </div>
          </div>

          {/* Right - Product Details */}
          <div className="col-span-5 space-y-3 ">
            <div>
              <p className="text-lg capitalize text-gray-600 mb-1">
                {data?.stock?.categoryId?.name || ""}
              </p>

              <div className="flex items-center  justify-between ">
                <h1 className="font-bold text-3xl text-gray-800 mb-4">
                  {data?.stock?.name}{" "}
                </h1>
                {data?.stock?.status == 0 ? (
                  <span className="text-xs px-2 py-1 rounded-lg text-center  bg-emerald-200 text-emerald-600 hover:bg-emerald-300 hover:text-emerald-800 duration-700 transition-all ease-in">
                    Available
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-lg text-center  bg-orange-200 text-orange-600 hover:bg-orange-300 hover:text-orange-800 duration-700 transition-all ease-in">
                    Out Of Stocks
                  </span>
                )}
              </div>

              <p className="text-md text-gray-500">
                {data?.stock?.description || "No description available."}
              </p>
            </div>
            {/* Price */}
            <div>
              {data?.stock?.discountPercentage && (
                <div>
                  <div className="flex items-center gap-10 ">
                    <p className="text-lg font-semibold ">
                      KS {Math.ceil(discountPrice)}
                    </p>

                    <span className="   text-center  px-3  py-1 rounded-md  bg-orange-300 text-orange-500  hover:cursor-pointer hover:text-orange-600  font-medium text-xs  ">
                      {data?.stock?.discountPercentage}%
                    </span>
                  </div>

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
              )}
            </div>

            <div>
              {/* Rating & Status */}
              <div className="flex items-center gap-4 mb-4">
                <p className="text-lg text-gray-600 flex items-center">
                  {Array.from(
                    { length: data?.stock?.rating || 0 },
                    (_, index) => (
                      <StarIcon key={index} className="text-yellow-500 mr-1" />
                    )
                  )}
                </p>
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
                  className="  hover:bg-blue-500 active:scale-95 duration-500 transition-all rounded-full  "
                  onClick={() => quantity > 0 && setQuanity((pre) => pre + 1)}
                />
                <span className="py-1  font-medium  ">{quantity}</span>
                <MinusIcon
                  onClick={() => quantity > 1 && setQuanity((pre) => pre - 1)}
                  className="  hover:bg-blue-500 active:scale-95 duration-500 transition-all rounded-full "
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

      <RecommendProductComponent
        categoryName={data?.stock?.categoryId?.name}
        isLoading={isLoading}
        featureData={data?.stockDataByCategory}
      />
    </div>
  );
};

export default ProductDetailComponent;
