import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrder } from "../actions/orderActions";

const AllOrder = (props) => {
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.myOrderList);
  useEffect(() => {
    dispatch(listOrder());
  }, []);
  console.log(orders);
  return <div>ALlorder</div>;
};

export default AllOrder;
