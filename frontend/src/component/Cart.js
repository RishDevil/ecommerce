import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { addToCart, removeFromCart } from "../actions/cartActions";
const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userData);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const id = props.match.params.id;
  const removefromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };
  console.log(cartItems);
  let totalPrice = 0;
  if (cartItems) {
    cartItems.map((x) => {
      totalPrice += x.price * x.qty;
    });
  }
  useEffect(() => {
    if (userInfo) {
      if (id) dispatch(addToCart(id, qty));
    } else {
      props.history.push(`/signin?id=${id}&qty=${qty}`);
    }
  }, []);

  console.log(cartItems, "catttttt");
  return (
    <div className="cart-detail">
      <h2>Shopping cart</h2>
      <div className="cart-container">
        <div className="cart-item">
          <ul>
            {cartItems
              ? cartItems.map((x) => (
                  <li className="letChange">
                    <Link to={"/product/" + x.product} className="cart-link">
                      <img src={x.image} />
                    </Link>
                    <div className="cart-des">
                      <ul>
                        <li>{x.name}</li>
                        <li>
                          {" "}
                          Qty :{" "}
                          <select
                            value={
                              x.qty > x.countInStock ? x.countInStock : x.qty
                            }
                            onChange={(e) =>
                              dispatch(addToCart(x.product, e.target.value))
                            }
                          >
                            {[...Array(x.countInStock).keys()].map((x) => (
                              <option value={x + 1} key={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </li>
                        <li>price : {x.price}</li>
                        <li>
                          {" "}
                          <button onClick={() => removefromCart(x.product)}>
                            remove
                          </button>
                        </li>
                      </ul>
                    </div>{" "}
                  </li>
                ))
              : ""}
          </ul>
        </div>
        {cartItems.length > 0 ? (
          <div className="cart-action">
            {" "}
            <ul>
              <li> Place Order</li>

              <li>Total Price : {totalPrice}</li>
              <li>
                <button
                  onClick={() => {
                    props.history.push("../shipping");
                  }}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cart;
