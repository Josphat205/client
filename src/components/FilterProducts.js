import React from "react";
import { RiFilter3Fill } from "react-icons/ri";
const FilterProducts = ({ category, onClick, loading }) => {
  return (
    <div className="" onClick={onClick}>
      {category
        ?
        <>
        <div className="text-3xl rounded-full p-4 bg-green-500 hover:bg-green-700 cursor-pointer">
        <RiFilter3Fill />
      </div>
      <p className="text-center  text-sm capitalize text-bold text-slate-900 hover:text-slate-300">
        {category}
      </p>
        </>
        :
        <div className="text-3xl rounded-full p-2 bg-green-500">
        <p className="animate-pulse text-bold text-white text-xs">{loading}</p>
        </div>
        }
    </div>
  );
};

export default FilterProducts;
