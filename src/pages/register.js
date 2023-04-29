import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import UserIcon from "../assets/user-icon.webp";
import { encodeImageFileAsURL } from "../utility/ImageToBase64";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../features/users/usersSlice";
import Url from "../components/Url";
const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
    image: ""
  });
  const handlePassShow = () => {
    setShowPassword(prev => !prev);
  };
  const handlePassCShow = () => {
    setShowCPassword(prev => !prev);
  };

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
    setData(prev => {
      return {
        ...prev,
        image: dataImg
      };
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const { firstname, lastname, email, password, cpassword, image } = data;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !cpassword ||
      !image
    ) {
      toast.error("All fields are required");
    } else if (password !== cpassword) {
      toast.error("Password and Confirm Password must be same");
    } else {
      const res = await axios.post(`${Url}/users/signup`, {
        ...data
      });
      const userData = await res.data;
      if (userData.error) {
        toast.error(userData.error);
      } else {
        toast.success(userData.message);
        dispatch(addUser(userData.data));
        if (userData.message) return navigate("/login");
        setData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          cpassword: "",
          image: ""
        });
      }
    }
  };

  return (
    <div className="relative mt-3 flex flex-col min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <div className=" flex justify-center items-center">
          <div className="text-3xl font-semibold  bg-green-400 w-24 h-24 text-center rounded-full flex items-center justify-center relative overflow-hidden">
            <img
              src={data.image ? data.image : UserIcon}
              alt="img"
              className="h-20 rounded-full"
            />
            {!data.image &&
              <label htmlFor="uploadImage">
                <div className="absolute text-center text-base left-0 bottom-0 h-1/3 bg-slate-500 w-full cursor-pointer">
                  <p className="text-slate-200 font-bold hover:text-slate-50">
                    Upload
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
              for="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Firstname
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="firstname"
              value={data.firstname}
              onChange={handleOnchange}
            />
          </div>
          <div className="mb-2">
            <label
              for="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Lastname
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="lastname"
              value={data.lastname}
              onChange={handleOnchange}
            />
          </div>
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              name="email"
              value={data.email}
              onChange={handleOnchange}
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="password"
                value={data.password}
                onChange={handleOnchange}
              />
              <span className="absolute top-3 right-2" onClick={handlePassShow}>
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showCPassword ? "text" : "password"}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="cpassword"
                value={data.cpassword}
                onChange={handleOnchange}
              />
              <span
                className="absolute top-3 right-2"
                onClick={handlePassCShow}
              >
                {showCPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}You have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-purple-600 hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
