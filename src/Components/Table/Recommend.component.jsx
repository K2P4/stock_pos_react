import React, { useEffect, useState } from "react";
import { useGetStocksQuery } from "../../store/services/endpoints/stock.endpoint";
import TableComponent from "./Table.component";

const RecommendComponent = () => {
  const [search, setSearch] = useState("");
  const [randomItems, setRandomItems] = useState([]);

  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetStocksQuery({
    search,
    page,
  });

  const getRandomElements = (array, count) => {
    let shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // const randomItems = getRandomElements(data?.data || [], 10);

  useEffect(() => {
    if (data?.data) {
      const randomStocks = getRandomElements(data?.data, 10);
      setRandomItems(randomStocks);
    }
  }, [data]);

  return (
    <div className="mt-15">
      <h1 className="text-2xl font-semibold underline ">Featured Stock List</h1>

      {/* table */}
      <TableComponent
        stocksData={data}
        stocks={randomItems}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default RecommendComponent;
