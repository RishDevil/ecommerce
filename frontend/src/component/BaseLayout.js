import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar";

const openMenu = () => {
  document.querySelector(".sidebar").classList.add("open");
};

const BaseLayout = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems.length, "lennnn");
  const len = cartItems.length;

  return (
    <div className="grid-container">
      <div className="header">
        <button onClick={openMenu} className="sidebar-button">
          &#9776;
        </button>

        <div className="name">
          <Link to={"/"}>ecommerce</Link>
        </div>

        <div className="cart-icon">
          <Link to="/cart2/">
            cart <sup>{len}</sup>
          </Link>
        </div>
      </div>
      <Sidebar />
      <div className="main">{props.children}</div>
    </div>
  );
};
export default BaseLayout;
