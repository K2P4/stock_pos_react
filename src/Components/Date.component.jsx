import React from "react";

const DateComponent = ({dateRef,handleDate}) => {
  return (
    <div>
      <input
        ref={dateRef}
        onChange={handleDate}
        type="date"
        placeholder="Selected Dates"
        className=" hidden "
      />
    </div>
  );
};

export default DateComponent;
