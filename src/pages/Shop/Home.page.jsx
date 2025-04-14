import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useGetProfileQuery } from "../../store/services/endpoints/auth.endpoint";
import { useGetCategoryQuery } from "../../store/services/endpoints/category.endpoint";
import { useGetStocksQuery } from "../../store/services/endpoints/stock.endpoint";
import { ProductListComponent } from "../../Components";

const HomePage = () => {
  const { data } = useGetProfileQuery();
  const [search, setSearch] = useState("");
  const [selectCategory, setSelectCat] = useState("");
  const [filterStock, setFilterStock] = useState([]);
  const [finalSearch, setFinal] = useState("");
  const { data: categoryData } = useGetCategoryQuery({
    search: "",
    perpage: 15,
  });

  const { data: productData, isLoading } = useGetStocksQuery({
    search: finalSearch,
    page: 1,
  });

  const filterCatData = categoryData?.data?.slice((0, 6));

  const changeCategory = (data) => {
    setSelectCat(data);

  };

  const searchData = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      setFinal(search);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (!productData?.data) return;

    const filteredData = selectCategory
      ? productData.data.filter((pd) => pd?.categoryId?._id == selectCategory)
      : productData.data;


    setFilterStock(filteredData);
  }, [productData, selectCategory]);
  return (
    <div className=" space-y-9 ">
      <div className="flex items-center justify-between align-middle">
        <div>
          <h1 className="text-xl font-semibold text-left text-blue-400 inline">
            Welcome to <span className="text-black text-md">My XPOS Store</span>{" "}
            , {data?.user?.name}
          </h1>
          <p className="text-gray-400 text-sm">
            Discover whatever you need easily
          </p>
        </div>

        {/* Search Section */}
        <div className="flex items-center gap-5">
          <button className=" bg-gray-50 w-auto flex items-center gap-2  text-md justify-between  px-3 py-2   rounded-lg shadow-md text-gray-500 ">
            <input
              type="text"
              value={search}
              onKeyDown={searchData}
              onChange={handleSearch}
              placeholder="Search..."
              className=" border-0 focus:border-0    outline-none   "
            />
            <SearchIcon className="text-gray-400" />
          </button>

          <FilterAltOutlinedIcon
            sx={{ fontSize: 40 }}
            className={` bg-gray-50 w-auto shadow-md p-2 "}  rounded-full  `}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {filterCatData?.map((cat) => (
          <button
            key={cat?._id}
            onClick={() => changeCategory(cat?._id)}
            className={` border bg-gray-50  transition-all  ${
              selectCategory == cat?._id ? "bg-gray-200" : ""
            }  shadow hover:bg-gray-200 duration-500 hover:cursor-pointer  w-32 px-3 py-2 rounded-lg `}
          >
            {cat?.name}
          </button>
        ))}
        <p
          onClick={() => changeCategory("")}
          className="text-orange-500 hover:bg-orange-300  duration-700 transition-all rounded-lg  py-2 px-3  cursor-pointer "
        >
          Clear Filter
        </p>
      </div>

      <ProductListComponent filterStock={filterStock} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
