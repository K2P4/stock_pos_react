import React, { useEffect, useState } from "react";
import { useGetProfileQuery } from "../../store/services/endpoints/auth.endpoint";
import { useGetCategoryQuery } from "../../store/services/endpoints/category.endpoint";
import { useGetStocksQuery } from "../../store/services/endpoints/stock.endpoint";
import { ProductListComponent, SearchComponent } from "../../Components";

const HomePage = () => {
  const { data } = useGetProfileQuery();
  const [search, setSearch] = useState("");
  const [selectCategory, setSelectCat] = useState("");
  const [filterStock, setFilterStock] = useState([]);
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);

  const [finalSearch, setFinal] = useState("");
  const { data: categoryData } = useGetCategoryQuery({
    search: "",
    perpage: 15,
  });

  const { data: productData, isLoading } = useGetStocksQuery({
    search: finalSearch,
    perpage:15,
    page: page,
  });

  console.log('data' , productData);







  const changeCategory = (data) => {
    setSelectCat(data);
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
        <SearchComponent
          search={search}
          setSearch={setSearch}
          sort={sort}
          setFinal={setFinal}
          setSort={setSort}
        />
      </div>

      <div className="flex items-center gap-2">
        {categoryData?.data?.slice(0,5).map((cat) => (
          <button
            key={cat?._id}
            onClick={() => changeCategory(cat?._id)}
            className={` border bg-gray-50  transition-all  ${
              selectCategory == cat?._id ? "bg-gray-200" : ""
            }  shadow hover:bg-gray-200 duration-500 hover:cursor-pointer  w-28 px-3 py-2 rounded-lg `}
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

      <ProductListComponent filterStock={filterStock} total={productData?.totalPage} page={page} setPage={setPage} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
