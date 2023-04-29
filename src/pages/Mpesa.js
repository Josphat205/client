import React from "react";
import { useSelector } from "react-redux";
import MpesaImg from "../assets/mpesa.png";
const Mpesa = () => {
  const cartItem = useSelector(state => state.products.cartItems);
  const totalP = cartItem.reduce((acc, item) => acc + parseInt(item.total), 0);
  console.log(totalP);
  return (
    <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
      <div
        className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
        style={{ maxWidth: "600px" }}
      >
        <div className="w-full pt-1 pb-5">
          <div className="bg-green-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
            <i className="mdi mdi-credit-card-outline text-3xl" />
            <img
              src={MpesaImg}
              alt=""
              className="w-12 h-9 rounded-md font-bold shadow-md"
            />
          </div>
        </div>
        <div className="mb-10">
          <h1 className="text-center font-bold text-xl uppercase">
            Secure payment info
          </h1>
        </div>
        <div className="mb-3">
          <label className="font-bold text-sm mb-2 ml-1">
            M-pesa number <span>(+254)</span>
          </label>
          <div>
            <input
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-500 transition-colors"
              placeholder="07xxxxxxxx"
              type="number"
              max={10}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="font-bold text-sm mb-2 ml-1">Amount to pay</label>
          <div>
            <input
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-500 transition-colors"
              placeholder="John Smith"
              type="number"
              value={totalP}
              readOnly
            />
          </div>
        </div>
        <div>
          <button className="block w-full max-w-xs mx-auto bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg px-3 py-3 font-semibold">
            <i className="mdi mdi-lock-outline mr-1" /> PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mpesa;
