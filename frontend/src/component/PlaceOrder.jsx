import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";

const PlaceOrder = (props) => {
  const { cartItems, shipping, payment } = useSelector((state) => state.cart);

  const { loading, order, success, error } = useSelector(
    (state) => state.orderCreate
  );

  let price = 0;
  let totalprice = 0;
  let shippingprice = 0;

  const dispatch = useDispatch();
  cartItems.map((x) => {
    price += x.price * x.qty;
  });
  shippingprice = price > 500 ? 0 : 100;
  totalprice = price + shippingprice;
  let tax = price * 0.15;
  const placeOrder = () => {
    console.log("click");

    dispatch(
      createOrder({
        cartItems,
        shipping,
        payment,
        price,
        shippingprice,
        totalprice,
        tax,
      })
    );
  };

  useEffect(() => {
    if (!shipping.address) {
      props.history.push("../shipping?change=no");
    }
    if (success) {
      props.history.push("complete");
    }
  }, [success]);

  console.log(cartItems, " ", shipping, " ", payment);
  return (
    <div className="cart-detail">
      <h2>Shopping cart</h2>
      <div className="cart-container">
        <div className="cart-item">
          <ul>
            {cartItems.map((x) => (
              <li className="letChange">
                <Link to={"/product/" + x.product} className="cart-link">
                  <img src={x.image} />
                </Link>
                <div className="cart-des">
                  <ul>
                    <li>{x.name}</li>
                    <li> Qty :{x.qty}</li>
                    <li>price : {x.price}</li>
                    <li></li>
                  </ul>
                </div>{" "}
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length > 0 ? (
          <div className="cart-action">
            {" "}
            <ul>
              <li>Item Price : {price}</li>
              <li>Shipping Price : {shippingprice}</li>
              <li>Total Price : {totalprice}</li>
              <li>
                <button onClick={placeOrder}>Place Order</button>
              </li>
              <li>{error ? "not placed" : ""}</li>
            </ul>
          </div>
        ) : (
          ""
        )}
        <div className="cart-action">
          {" "}
          <ul>
            <li> Shipping</li>
            <li> {shipping.name}</li>
            <li> {shipping.address}</li>
            <li> {shipping.email}</li>
            <li> {shipping.number}</li>
            <li> {shipping.pin}</li>

            <li>{payment.pay}</li>
            <Link to={"shipping"}>
              {" "}
              <li>change address</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
