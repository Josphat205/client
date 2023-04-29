import React from "react";
import {motion} from "framer-motion";
import { Link } from "react-router-dom";
const HomeCard = ({ name, category, price, image, loading, id }) => {
  return (
    <motion.div animate={name && {
      scale: [0, 1],
      rotate: [0, 0, 30, 30, 0],
    }}
    transition={name && { duration: 1 }} class="" >
      <div class="min-w-[150px] min-h-[180px] scale-90 hover:scale-100 ease-out duration-1000 max-w-xs my-auto mx-auto bg-gradient-to-r from-gray-100 to-gray-50 p-1 rounded shadow drop-shadow m-4 ">
        {name ? <Link to={`product/${id}`} ><>
          <div className="md:w-40 md:h-40 h-82 ">
           <img src={image} alt="" class="rounded-sm mx-auto w-full h-full" />
         </div>
        <p class="text-center text-green-600 font-bold text-lg capitalize">
          {name}
        </p>
        <p class="text-center text-slate-600 font-medium text-sm">
          {category}
        </p>
        <p class="text-center text-green-700 font-bold text-xs">
          KES<span className="text-black"> {price}</span>
        </p>
        </>
        </Link>
        :
        <div className="flex justify-center items-center h-36">
        <p className="animate-pulse text-bold text-green-600 text-xl">{loading}</p>
        </div>
        }
      </div>
    </motion.div>
  );
};

export default HomeCard;
