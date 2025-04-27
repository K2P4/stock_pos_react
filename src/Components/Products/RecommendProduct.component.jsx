import React from "react";
import { ProductListComponent } from "..";

const RecommendProductComponent = ({
  featureData,
  categoryName,
  isLoading,
}) => {
  console.log("fa", featureData);

  return (
    <div className="mt-15 ">
      <h1 className="text-2xl font-semibold underline text-nowrap ">
        Featured List {categoryName}{" "}
      </h1>

      <ProductListComponent checkPaginate={false} filterStock={featureData} isLoading={isLoading} />
    </div>
  );
};

export default RecommendProductComponent;
