import React from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  incrementQuantity,
  decrementQuantity
} from "../features/products/productsSlice.js";
const CartCard = ({
  id,
  name,
  category,
  description,
  image,
  price,
  quantity,
  total
}) => {
  const dispatch = useDispatch();

  return (
    <div className="rounded-lg md:w-2/3 relative">
      <div
        className="cursor-pointer top-2 right-2 text-bold hover:bg-red-600 hover:rounded-full hover:text-white absolute"
        onClick={() => dispatch(deleteCartItem(id))}
      >
        <GrClose />
      </div>
      <div className="justify-between mb-1 rounded-lg bg-white p-1 shadow-md sm:flex sm:justify-start">
        <img
          src={image}
          className="w-full md:max-h-32 max-h-72 rounded-lg sm:w-40 scale-50"
          alt=""
        />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between items-center">
          <div className="mt-5 sm:mt-0">
            <p class=" text-green-600 font-bold text-lg capitalize">
              {name}
            </p>
            <p class=" text-slate-600 font-medium text-sm">
              {category}
            </p>
            <p class=" text-slate-600 font-medium text-sm">
              {description}
            </p>
            <p class=" text-green-700 font-bold text-xs">
              KES<span className="text-black"> {price}</span>
            </p>
          </div>
          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center justify-center border-gray-100">
              <span
                onClick={() => dispatch(decrementQuantity(id))}
                className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
              >
                {" "}-{" "}
              </span>
              <input
                className="h-8 w-8 border font-bold bg-white text-center text-xs outline-none"
                type="text"
                value={quantity}
                min="1"
              />
              <span
                onClick={() => dispatch(incrementQuantity(id))}
                className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
              >
                {" "}+{" "}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm font-bold">
                <span className="text-semibold text-green-500">Ksh</span>{" "}
                {total}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
