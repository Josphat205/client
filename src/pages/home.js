import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProducts } from "../features/products/productsSlice.js";
import Car from "../assets/car.png";
import axios from "axios";
import HomeCard from "../components/HomeCard.js";
import CardFeature from "../components/CardFeature.js";
import { GrNext, GrPrevious } from "react-icons/gr";
import AllProducts from "../components/AllProducts.js";
import Footer from "../components/Footer.js";
import Url from "../components/Url.js";
const Home = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector(state => state.products.products);
  const homeProducts = allProducts.slice(-5);
  const jeansProducts = allProducts.filter(
    product => product.category === "Jeans"
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFill = new Array(10).fill(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${Url}/products`);
      dispatch(addProducts(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const userefTarget = useRef();
  const next = () => {
    userefTarget.current.scrollLeft += 190;
  };
  const prev = () => {
    userefTarget.current.scrollLeft -= 190;
  };

  return (
    <div className="p-2 md:p-4 ">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2 p-4">
          <div className="flex gap-2 bg-slate-500 w-44 rounded-full px-2 items-center">
            <h4 className="text-xs font-bold text-white">Car Delivery</h4>
            <img src={Car} alt="delivery" className="h-7" />
          </div>
          <h2 className="text-4xl md:text-7xl py-2 font-bold">
            The Fastest Delivery service
            <span className="text-green-600"> in the country</span>
          </h2>
          <p className="text-gray-600 text-sm  md:text-base py-3 font-bold leading-10">
            I am excited to introduce to you our first featured online store,
            <span className="text-green-600 font-bold">SHELET'S Boutique</span>
            Fashions are up to date and even ahead of what is in style, This
            online boutique offers customers the opportunity to shop by
            category, making it easy to navigate and find what you need or what
            you simply must have. those in the know of fashion need to know
            about this site!{" "}
            <span className="text-green-600 font-bold">
              SHELET'S Boutique
            </span>{" "}
            has a storefront location in ELDORET Town, as well as has an online
            store at www.shopshaletboutique.com
          </p>
          <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-green-800 text-slate-800 text-lg rounded-full hover:bg-gradient-to-b hover:from-green-700 hover:to-green-400 hover:text-gray-100 focus:border-4 focus:border-green-300">
            Order Now!!
          </button>
        </div>
        <div className="md:w-1/2 gap-3 mt-3 p-4 md:flex flex-wrap justify-center">
          {homeProducts[0]
            ? homeProducts.map(product =>
                <HomeCard
                  key={product._id}
                  id={product._id}
                  category={product.category}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  className="md:w-1/2"
                />
              )
            : loadingArray.map((_, index) => {
                return <HomeCard key={index} loading={"Loading......"} />;
              })}
        </div>
      </div>
      <div className="">
        <div className="flex w-full items-center">
          <div>
            <h2 className="text-2xl text-bold text-slate-900">Jeans</h2>
            <hr className="border-2 border-red-700 w-18" />
          </div>
          <div className="ml-auto flex gap-4">
            <button
              className="bg-slate-400 hover:bg-slate-500 rounded text-lg p-1"
              onClick={prev}
            >
              <GrPrevious />
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 rounded text-lg p-1"
              onClick={next}
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex items-center mt-4 gap-3 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={userefTarget}
        >
          {jeansProducts[0]
            ? jeansProducts.map(product =>
                <CardFeature
                  key={product._id}
                  id={product._id}
                  category={product.category}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  className="md:w-1/2"
                />
              )
            : loadingArrayFill.map((_, index) => {
                return <CardFeature key={index} loading={"Loading......"} />;
              })}
        </div>
      </div>
      <AllProducts title1={"All"} title2={"Products"} width={32} />
      <Footer/>
    </div>
  );
};

export default Home;
