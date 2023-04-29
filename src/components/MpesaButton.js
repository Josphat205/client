import React from "react";
import { Link } from "react-router-dom";
import MpesaImg from "../assets/mpesa.png";
const MpesaButton = () => {
  return (
    <Link to="/m-pesa" className="w-full">
      <button
        type="button"
        class="text-white flex justify-center gap-2 items-center w-full bg-green-600 hover:bg-green-400 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
      >
        <span>
          <img
            src={MpesaImg}
            alt=""
            className="h-5 w-5 rounded-full scale-105"
          />
        </span>
        Pay with M-pesa
      </button>
    </Link>
  );
};

export default MpesaButton;
