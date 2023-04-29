import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import AllProducts from "../components/AllProducts";
import { GrClose } from "react-icons/gr";
import { addCartItems } from "../features/products/productsSlice.js";
const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allProducts = useSelector(state => state.products.products);
  const product = allProducts.find(product => product._id === id);
  const { category, name, price, image, description } = product;
  const dispatch = useDispatch();

  const handleSubmitToCart = () => {
    dispatch(addCartItems({ category, name, price, description, image, id }));
  };

  return (
    <div>
      <motion.div
        animate={{
          scale: [0, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 1
        }}
        className="flex h-auto md:h-96 md:max-w-3xl mx-auto mt-5 flex-col items-center bg-white border border-gray-200 rounded-lg shadow drop-shadow-full md:flex-row max-h-auto  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 overflow-hidden relative"
      >
        <div className="w-1/2 flex justify-center items-center h-80 md:h-96 md:max-w-3xl overflow-hidden">
          <img
            className="object-fit w-full rounded-t-lg h-52 md:h-full md:w-full md:rounded-none md:rounded-l-lg p-2 hover:scale-105 transition duration-300 ease-in-out"
            src={product && product.image}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center items-center  p-4 w-1/2">
          <p class=" text-green-600 font-bold text-lg uppercase">
            {product && product.name}
          </p>
          <hr className="w-full border-2 text-green-500 font-semibold" />
          <p class=" text-slate-800 font-medium text-sm">
            {product && product.category}
          </p>
          <p class=" text-slate-800 font-medium text-sm">
            {product && product.description}
          </p>
          <p class=" text-green-700 font-bold text-xs">
            KES<span className="text-black"> {product && product.price}</span>
          </p>
          <div className=" m-2 flex gap-3 ">
            <motion.button
              animate={{
                scale: [0, 1]
              }}
              transition={{ duration: 1 }}
              onClick={handleSubmitToCart}
              className="md:scale-90  text-xs md:py-2 md:px-4   hover:scale-100   text-green-100 rounded bg-gradient-to-r from-green-600 to-green-400  dark:hover:bg-gray-900"
            >
              Add to cart
            </motion.button>
            <motion.button
              animate={{
                scale: [0, 1]
              }}
              transition={{ duration: 1 }}
              className="scale-90 text-xs py-2 px-4 hover:scale-100   text-green-100 rounded bg-gradient-to-r from-yellow-600 to-yellow-400  dark:hover:bg-gray-900 disabled"
            >
              Buy Now
            </motion.button>
          </div>
        </div>
        <div
          className="absolute top-3 right-3 rounded-full p-1 bg-red-400 hover:bg-red-700 text-1xl font-bold"
          onClick={() => navigate(-1)}
        >
          <GrClose />
        </div>
      </motion.div>
      <AllProducts title1={"Related"} title2={"Products"} width={44} />
    </div>
  );
};

export default SingleProduct;
