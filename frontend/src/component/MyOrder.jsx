import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrder, cancelOrder } from "../actions/orderActions";
import style from "./MyOrderView.module.css";

const MyOrder = (props) => {
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.myOrderList);
  const { success } = useSelector((state) => state.orderDelete);
  useEffect(() => {
    dispatch(myOrder());
  }, [success]);

  const cancel = (id) => {
    console.log("cancelOrder");
    dispatch(cancelOrder(id));
  };
  return (
    <div className={style.container}>
      {" "}
      {!loading && orders
        ? orders.map((x) => (
            <div className={style.card}>
              <img src={x.orderItems.image} className={style.img} />
              <ul className={style.ul}>
                <li className={style.li}>Order Id :{" " + x._id}</li>
                <li className={style.li}>{x.isDelivered}</li>
                <li className={style.li}>
                  Ordered On {x.createdAt.substring(0, 10)}
                </li>
                <li className={style.li}>{x.orderItems.name}</li>
                <li className={style.li}>
                  {x.isDelivered ? "Delivered" : "Yet to Deliver"}
                </li>
              </ul>
              <button className={style.button} onClick={() => cancel(x._id)}>
                Cancel
              </button>
            </div>
          ))
        : "loading...."}
    </div>
  );
};

export default MyOrder;
