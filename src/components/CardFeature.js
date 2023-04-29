import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AddButton from "./AddButton.js";
import {useDispatch} from "react-redux";
import {addCartItems} from "../features/products/productsSlice.js";
const CardFeature = ({ category, name, price, image, description, loading, id }) => {
  const dispatch = useDispatch();

  const handleSubmitToCart = () => {
    dispatch(addCartItems({ category, name, price, description, image, id }));
  };
  return (
    <motion.div  animate={name && {
      scale: [0, 1]
    }}
    transition={name && { duration: 1 }} className="block min-w-[176px] p-1 bg-white border border-gray-200 drop-shadow-full hover:shadow-lg rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 scale-100">
     {name ? <>
      <Link to={`/product/${id}`} onClick={()=>window.scrollTo({top:"0", behavior:"smooth"})} >
        <div className="w-40 h-40">
        <img src={image} alt="" className="w-full h-full" />
        </div>
      <p class=" text-green-600 font-bold text-lg capitalize">
        {name}
      </p>
      <p class=" text-slate-600 font-medium text-sm">
        {category}
      </p>
      <p class=" text-green-700 font-bold text-xs">
        KES<span className="text-black"> {price}</span>
      </p>
      </Link>
      <div className="flex justify-center items-center m-2" onClick={handleSubmitToCart}>
        {<AddButton name={"Add to Cart"} />}
      </div>
     </>
     
     :
     <div className="flex justify-center items-center h-36">
        <p className="animate-pulse text-bold text-green-600 text-sm">{loading}</p>
        </div>
     }
    </motion.div>
  );
};

export default CardFeature;
