import React, { useState, useEffect } from "react";
import { saveShipping } from "../actions/cartActions";
import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
const Shipping = (props) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [postalCode, setpin] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const dispatch = useDispatch();
  const { shipping } = useSelector((state) => state.cart);
  let query = useQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShipping({ name, address, email, number, city, postalCode, country })
    );
    props.history.push("/paymentSelect");
  };
  useEffect(() => {
    if (shipping.address) {
      console.log("setting");
      setname(shipping.name);
      setnumber(shipping.number);
      setpin(shipping.postalCode);
      setaddress(shipping.address);
      setemail(shipping.email);
    }
  }, [shipping]);

  return (
    <div className="Shipping">
      <ul>
        <li>Shipping</li>
        <li>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>{" "}
            <input
              className="Shipping-name"
              onChange={(e) => setname(e.target.value)}
              value={name}
            ></input>
            <label htmlFor="address">Address</label>{" "}
            <input
              className="Shipping-name"
              onChange={(e) => setaddress(e.target.value)}
              value={address}
            ></input>
            <label htmlFor="email">Email</label>{" "}
            <input
              className="Shipping-email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            ></input>
            <label htmlFor="number">Number</label>{" "}
            <input
              className="Shipping-number"
              onChange={(e) => setnumber(e.target.value)}
              value={number}
            ></input>
            <label htmlFor="pin">PIN CODE</label>{" "}
            <input
              className="Shipping-pin"
              onChange={(e) => setpin(e.target.value)}
              value={postalCode}
            ></input>
            <label htmlFor="country">country</label>{" "}
            <input
              className="Shipping-pin"
              onChange={(e) => setcountry(e.target.value)}
              value={country}
            ></input>
            <label htmlFor="city">city</label>{" "}
            <input
              className="Shipping-pin"
              onChange={(e) => setcity(e.target.value)}
              value={city}
            ></input>
            <button type="submit" value="done">
              dONE
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default Shipping;
