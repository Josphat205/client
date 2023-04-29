import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import Url from "../components/Url";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [_, setCookie] = useCookies(["token"]);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const handlePassShow = () => {
    setShowPassword(prev => !prev);
  };

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = data;
    const user = { email, password };
    if (!email || !password) return toast.error("Please fill all the fields");
    try {
      const res = await axios.post(`${Url}/users/login`, user);
      toast.success(res.data.message);
      setCookie("token", res.data.token);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("image", res.data.image);
      localStorage.setItem("email", res.data.email);
      navigate("/");
      setData({
        email: "",
        password: ""
      });
    } catch (err) {
      console.log(err);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="relative flex flex-col mt-6 min-h-screen overflow-hidden">
      <div className="w-full p-6 mx-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-green-500 underline">
          Sign in
        </h1>
        <form className="mt-3 text-left" onSubmit={handleSubmit}>
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
              onChange={e => setData({ ...data, email: e.target.value })}
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
                onChange={e => setData({ ...data, password: e.target.value })}
              />
              <span className="absolute top-3 right-2" onClick={handlePassShow}>
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-purple-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
