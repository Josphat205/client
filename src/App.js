import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import NewProduct from "./pages/newProduct";
import { Toaster } from "react-hot-toast";
import SingleProduct from "./pages/singleProduct";
import Cart from "./pages/Cart";
import PrivateRoute from "./pages/privateRoute/PrivateRoute";
import Success from "./pages/success";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <div className="App bg-slate-300 min-h-[100vh] ">
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
