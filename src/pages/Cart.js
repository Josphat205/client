import React from "react";
import CartCard from "../components/CartCard";
import { useSelector } from "react-redux";
import EmptyImg  from "../assets/empty-cart.gif";
import PaymentButton from "../components/PaymentButton";
import MpesaButton from "../components/MpesaButton";
const Cart = () => {
  const cartItems = useSelector(state => state.products.cartItems);
  const totalP= cartItems.reduce((acc, item) => acc + parseInt(item.total), 0);
  const totalQuantityP = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const userId = window.localStorage.getItem("userId");
  return (
    <div className="h-auto min-h-screen bg-gray-100 pt-10">
      <h1 className="mb-4 text-center text-2xl font-bold uppercase">Cart Items</h1>
      <hr className="mb-4" />
      <>
      {cartItems[0] ? 
      <div className="mx-auto max-w-5xl justify-center px-3 md:flex xl:px-0">
      <div className="w-full">
      {
          cartItems[0] && cartItems.map((item) =>  <CartCard 
          key={item.id}
          id={item.id}
          category={item.category}
          description={item.description}
          name={item.name}
          price={item.price}
          image={item.image}
          quantity={item.quantity}
          total={item.total}
           /> )
          }
      </div>

      <div className="mt-2 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">{totalP}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Quantity</p>
          <p className="text-gray-700">{totalQuantityP}</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">{totalP}</p>
          </div>
        </div>
       <>
        <PaymentButton cartItems = {cartItems} userId ={userId} />
        <MpesaButton/>
       </>
      </div>
      </div>  
      :
          <div className="flex flex-col justify-center items-center mt-3 ">
            <img src={EmptyImg} alt="" className="h-52 w-52 rounded-full scale-125 mt-5" />
            <p className="animate-pulse text-bold text-green-600 text-base mt-7">No cart item...</p>
          </div>
      }  
      </>
    </div>
  );
};

export default Cart;
