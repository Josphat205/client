import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterProducts from "../components/FilterProducts.js";
import { motion } from "framer-motion";
import CardFeature from "../components/CardFeature.js";
const AllProducts = ({ title1, title2, width }) => {
  const allProducts = useSelector(state => state.products.products);
  const category = [...new Set(allProducts.map(product => product.category))];

  //all products
  const [filterdProducts, setFilterdProducts] = useState([]);
  const arrayLoading = new Array(8).fill(null);
  const arrayLoadingFill = new Array(10).fill(null);

  const handleFilteredProducts = category => {
    const products = allProducts.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
    setFilterdProducts(() => {
      return [...products];
    });
  };

  useEffect(
    () => {
      setFilterdProducts(() => {
        return [...allProducts];
      });
    },
    [allProducts]
  );
  return (
    <div>
      <div div className="my-5">
        <h2 className="text-2xl text-bold text-slate-900">
          {title1}
          <span className="text-green-700 text-bold">
            {" "}{title2}
          </span>
        </h2>
        <hr className={`border-1 border-red-700 w-${width}`} />
        <div className="flex gap-5 mt-4 justify-center overflow-scroll scrollbar-none">
          {category[0]
            ? category.map((cat, index) =>
                <FilterProducts
                  key={index}
                  category={cat}
                  onClick={() => handleFilteredProducts(cat)}
                />
              )
            : arrayLoading.map((_, index) =>
                <FilterProducts key={index} loading={"Loading......"} />
              )}
        </div>
      </div>
      <motion.div
        animate={{
          scale: [0, 1]
        }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2 md:gap-3"
      >
        {filterdProducts[0]
          ? filterdProducts.map(product =>
              <CardFeature
                key={product._id}
                id={product._id}
                category={product.category}
                name={product.name}
                price={product.price}
                image={product.image}
                className="md:w-1/2"
              />
            )
          : arrayLoadingFill.map((_, index) => {
              return <CardFeature key={index} loading={"Loading......"} />;
            })}
      </motion.div>
    </div>
  );
};

export default AllProducts;
