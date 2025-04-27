import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Stack,
  Pagination,
} from "@mui/material";
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../context/AllContext";

const ProductsListComponent = ({
  filterStock,
  isLoading,
  total,
  page,
  setPage,
}) => {
  const { addToCart, cart } = useContext(AllContext);
  const nav = useNavigate();

  const handleAddToCart = (
    id,
    quantity,
    name,
    description,
    image,
    price,
    discount
  ) => {
    const newCart = {
      id,
      quantity,
      name,
      description,
      image,
      price: price * (1 - discount / 100) * quantity,
      discount: discount,
    };
    addToCart(newCart);
  };

  console.log('tota', total);

  return (
    <div>
      {filterStock?.length > 0 ? (
        <div>
          <Grid container spacing={2} className="flex items-center">
            {filterStock?.map((product) => (
              <Grid item key={product?._id} xl={3} sm={3} md={3} lg={3}>
                <Card className="my-10  hover:cursor-pointer  hover:opacity-90 ">
                  <div className=" relative  ">
                    <img
                      onClick={() => nav(`/stock/${product?._id}`)}
                      className="object-cover    h-44 w-full "
                      src={
                        product?.images[0]
                          ? product?.images[0]
                          : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUXFRUXFxcVFRUVFRUVFRcXFxUVFRUYHSggGB0lHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAAIDBv/EABoQAQEBAQEBAQAAAAAAAAAAAAABEQIS8CH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9P5a8t+VgMThqRoAMWNIGMKMAGJYCVMQBEAgUDLQWgBrQBJEAjECSQLTRiBIHQUBxYADQoLCMQOkRGApFYYATNbFBiQtAElqBI0AEaAVRQM1YaAQIoKHEQEShoDEVAFDTNBIxADoVA1VLQWI4gbiqQKLQgMVUVgMxJAlEQCKAYGkAWFQAKRQQsK0BixaYCxRIEkgSQBJIAkgKqioJDUDtBSAWKqAFrVFQKjDEAiVUAowUBUaxQahEQKhpmglQrQOIIDixqAGYSACVQIUgBhqVASmggCiDeJKghjTPUArDzEAwwYoCoKBQhAqy1WQPJUiAArAEFaFgCEKA3FRFQS0KgqCMBI0AlixYCQQKxHEDoCsAJSEAUYAwUxUAUgUBhoM0RujAEVMNBnGWxQZtIagMiNADKkAIViBJKgtGkaBFSoCqVGwCmSDojEAUOIFUkAVIAsnEChUpAVloAYaIQZDQBnFpVBlNUAoqcGggYqAqSAUN4zgJVpmgRSKCmpSIHUY1EAxRLANFKoBEWAFhQDUkCqOigYMWqgRSKAqWkFAQBwYYgGBoAMWEaCDQwENKAKmgB+fakgdbDhooJYdQBWGIBhxKgIrCQYipkFBAxAsRxALBjUWAxjRQMxY1QAwFAsSQBYUARQDAaICorVALAdQO4sQBoCICQdAYKUASUAgoBIDiAyAyqgIiABqAIU1AFYcGAEcIM1GrAERAJJAA0LAGBvEDtjDdgwAmhgJYcGADEpAQpxYDLQw2AkMQGg0YBCIMkGAKMaowEsODACOLACIoKs2NDAIqqBJSKwAkgd6sSAKJAVQgRgQEVIAYkCZqQGVUIBTqQJVIEokCxRIECgCqQKKxIEMSBKpAIkgf//Z"
                      }
                    />

                    {product.status == 0 ? (
                      <span className="text-xs absolute top-2 right-3 px-2 py-1 rounded-lg text-center  bg-emerald-200 text-emerald-600 hover:bg-emerald-300 hover:text-emerald-800 duration-700 transition-all ease-in">
                        Available
                      </span>
                    ) : (
                      <span className="text-xs absolute top-2 right-3 px-2 py-1 rounded-lg text-center  bg-orange-200 text-orange-600 hover:bg-orange-300 hover:text-orange-800 duration-700 transition-all ease-in">
                        Out Of Stocks
                      </span>
                    )}
                  </div>

                  <CardContent>
                    <h3 className=" text-lg font-medium flex align-middle justify-between items-center mb-2">
                      {product?.name}
                    </h3>

                    <div className="  ">
                      {product?.discountPercentage ? (
                        <p className="text-md  text-gray-600 flex items-center justify-between ">
                          {Math.round(
                            product?.price *
                              (1 - product?.discountPercentage / 100)
                          )}
                          MMK{" "}
                          <span className="   text-center  px-2 py-1 rounded-md ml-auto  bg-orange-300 text-orange-500  hover:cursor-pointer hover:text-orange-600  font-medium text-xs  ">
                            {product?.discountPercentage}%
                          </span>
                        </p>
                      ) : (
                        <p className="  ">{product?.price}</p>
                      )}{" "}
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button
                      disabled={cart.some((item) => item.id === product._id)}
                      onClick={() =>
                        handleAddToCart(
                          product?._id,
                          1,
                          product?.name,
                          product?.description,
                          product?.images[0],
                          product?.price,
                          product?.discountPercentage
                        )
                      }
                      variant="contained"
                      color="primary"
                      className="flex items-center gap-2 w-full text-center mx-auto bg-blue-500 hover:bg-blue-600"
                    >
                      <ShoppingCartIcon />{" "}
                      <span className="py-1">Add to cart</span>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}

          <Stack
            className="flex items-center  justify-center my-10"
            spacing={2}
          >
            <Pagination
              page={page}
              onChange={(event, value) => setPage(value)}
              count={total > 1 ? total - 1 : total}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      ) : (
        <div className=" m-auto text-center text-xl flex  flex-col justify-center  align-middle  font-medium  ">
          <img
            src="/no-results.png"
            alt="not found"
            className=" h-[400px] object-contain "
          />
          <p>Not Found Products</p>
        </div>
      )}
    </div>
  );
};

export default ProductsListComponent;
