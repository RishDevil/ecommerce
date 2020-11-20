import React, { useState } from "react";
import { savePayment } from "../actions/cartActions";
import { useDispatch } from "react-redux";

const PayementSelect = (props) => {
  const dispatch = useDispatch();
  const [paymentMethod, setpay] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push("/payment");
  };
  return (
    <div className="payment">
      <form onSubmit={handleSubmit}>
        <label>
          Cash on delivery{" "}
          <input
            type="radio"
            value="cash"
            name="pay"
            onChange={(e) => {
              setpay(e.target.value);
            }}
          />
        </label>

        <label>
          Paypal{" "}
          <input
            type="radio"
            value="paypal"
            name="pay"
            onChange={(e) => {
              setpay(e.target.value);
            }}
          />
        </label>
        <button type="submit">done</button>
      </form>
    </div>
  );
};

export default PayementSelect;
