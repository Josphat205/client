import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton
} from "@material-tailwind/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo2.png";
import { BsCartFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
const data = [
  {
    name: "Home",
    link: "/"
  },
  {
    name: "About",
    link: "#"
  },
  {
    name: "Contact",
    link: "#"
  }
];
export default function Navbars() {
  const [openNav, setOpenNav] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const profile = window.localStorage.getItem("image");

  const cartItems = useSelector(state => state.products.cartItems);
  const logout = () => {
    setCookie("token", "");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("image");
    window.localStorage.removeItem("token");
    navigate("/login");
  };
  const handleShowNav = () => {
    setShowNav(prev => !prev);
  };
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="mb-4 mt-0 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 p-2 md:bg-green-400 bg-slate-800 text-slate-50 hover:text-white font-semibold hover:font-bold z-40 rounded-xl">
      {data.map((item, index) =>
        <Typography
          as="li"
          variant="small"
          onClick={() => setOpenNav(false)}
          className="p-1text-slate-50 hover:text-white font-bold"
          key={index}
        >
          <NavLink
            to={item.link}
            className={({ isActive }) =>
              isActive
                ? "active font-bold text-white flex text-base items-center"
                : "inactive flex text-base text-white font-normal items-center"}
          >
            {item.name}
          </NavLink>
        </Typography>
      )}
      <div onClick={() => setOpenNav(false)} className="relative">
        <NavLink to={"/cart"}>
          <BsCartFill  className={({ isActive }) =>
              isActive
                ? "active font-bold text-white flex items-center text-2xl  md:text-2xl "
                : "inactive flex text-white font-normal items-center text-2xl  md:text-2xl" }/>
          <div className="absolute md:-top-1 left-4 -top-1 md:-right-2 bg-red-600 w-4 h-4 text-white rounded-full flex items-center justify-center">
            <span className="text-xs">
              {cartItems ? cartItems.length : 0}
            </span>
          </div>
        </NavLink>
      </div>
      <div className="relative">
        {profile
          ? <img
              src={profile}
              alt="profile"
              className="w-8 h-8 rounded-full"
              onClick={handleShowNav}
            />
          : <BiUserCircle
              className="md:text-slate-600 text-3xl text-slate-200 hover:text-slate-50 md:hover:text-black"
              onClick={handleShowNav}
            />}
        {showNav &&
          <div
            className="absolute -right-2 md:top-10  bg-white md:-right-10 px-2 py-2 shadow z-40 drop-shadow-md flex flex-col  rounded-md"
            onClick={() => setOpenNav(false)}
          >
            <div
              onClick={handleShowNav}
              className="flex flex-col max-h-16 rounded-md z-40 "
            >
             
              {cookies.token
                ? <>
                <Link
                to={"/new-product"}
                className="cursor-pointer whitespace-nowrap text-black text-lg hover:text-red-400 mb-2"
              >
                new Product
              </Link>
                <button
                    onClick={logout}
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Logout
                  </button>
                </>
                : <Link to={"/login"} className="py-2">
                    <p className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                      Login
                    </p>
                  </Link>}
            </div>
          </div>}
      </div>
    </ul>
  );

  return (
    <Navbar className="px-4 drop-shadow-md h-16 md:h-20 sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <Typography
            as="a"
            href="#"
            variant="small"
            className="mr-4 cursor-pointer py-1.5 font-normal w-16 h-16 md:h-20 md:w-20 flex flex-row items-center gap-1"
          >
            <img src={Logo} alt="logo" className="w-full h-full rounded-lg" />
            <div className="name">
              <h3 className="text-green-500 font-bold">SHALET'S</h3>
              <h4 className="text-green-500 font-bold">BOUTIQUE</h4>
            </div>
          </Typography>
        </Link>

        <div className="hidden lg:block">
          {navList}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 flex justify-center items-center z-50 text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav
            ? <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            : <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto z-50 bg-red-600">
          {navList}
        </div>
      </MobileNav>
    </Navbar>
  );
}
