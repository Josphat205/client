import React, { useState } from "react";
import UserIcon from "../assets/upload.jpeg";
import { encodeImageFileAsURL } from "../utility/ImageToBase64";
import Url from "../components/Url";
import axios from "axios";
import toast from "react-hot-toast";
const NewProduct = () => {
  const [data, setData] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    image: "",
    quantity: ""
  });
  const [img, setImg] = useState("");
  const { category, name, description, price, image, quantity } = data;
  const options = [
    "Jeans",
    "Hoodies",
    "T-shirt",
    "Skirt",
    "Shirt",
    "Polo-shirt",
    "Sweater",
    "Tank-top",
    "Suits",
    "Dress",
    "Jacket",
    "Coat",
    "Underwear",
    "Socks",
    "Bags",
    "Underwear",
    "Shoes",
    "Bags",
    "Accessories"
  ];
  const handleOnchange = e => {
    const { name, value } = e.target;
    setData(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  const handleImage = async e => {
    const dataImg = await encodeImageFileAsURL(e.target.files[0]);
    const myImg = e.target.files[0];
    setImg(dataImg);
    setData(prev => {
      return {
        ...prev,
        image: myImg
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (category && name && description && price && image && quantity) {
      try {
        axios
          .post(`${Url}/products`, data)
          .then(res => {
            toast.success(res.data.message);
          })
          .catch(err => {
            console.log(err);
            toast.error(err.message);
          });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
      setData({
        category: "",
        name: "",
        description: "",
        price: "",
        image: "",
        quantity: ""
      });
    } else {
      toast.error("Please Enter all Fields");
    }
  };
  return (
    <div className="relative mt-1 flex flex-col min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <div className=" flex justify-center items-center">
          <div className="text-3xl font-semibold  bg-green-400 w-56 rounded-xl h-48 text-center flex items-center justify-center relative overflow-hidden">
            <img
              src={img ? img : UserIcon}
              alt=""
              className="h-46 w-52 rounded-xl"
            />
            {!data.image &&
              <label htmlFor="uploadImage">
                <div className="absolute text-center text-base left-0 bottom-0 h-1/3 bg-slate-500 w-full cursor-pointer">
                  <p className="text-slate-200 font-bold hover:text-slate-50 flex justify-center items-center">
                    Upload product
                  </p>
                  <input
                    type="file"
                    id="uploadImage"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImage}
                  />
                </div>
              </label>}
          </div>
        </div>
        <form className="mt-1 text-left" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-800"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              className="block w-full px-4 py-2 mt-2 text-slate-900 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleOnchange}
            >
              <option value="">Select category</option>
              {options.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-2">
            <label
              for="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Product Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="name"
              value={data.name}
              onChange={handleOnchange}
            />
          </div>
          <div className="mb-2">
            <label
              for="description"
              className="block text-sm font-semibold text-gray-800"
            >
              Description
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="description"
              value={data.description}
              onChange={handleOnchange}
            />
          </div>
          <div className="mb-2">
            <label
              for="price"
              className="block text-sm font-semibold text-gray-800"
            >
              Price
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="price"
              value={data.price}
              onChange={handleOnchange}
            />
          </div>
          <div className="mb-2">
            <label
              for="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Quantity
            </label>
            <input
              type="number"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="quantity"
              value={data.quantity}
              onChange={handleOnchange}
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-purple-600">
              Add product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
