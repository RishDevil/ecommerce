import Axios from "axios";
import Cookie from "js-cookie";

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from "../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    console.log("order request");
    dispatch({ type: ORDER_CREATE_REQUEST });
    const {
      userData: { userInfo },
    } = getState();

    const {
      data: { data: newOrder },
    } = await Axios.post("http://localhost:2000/api/order/", order, {
      headers: { Authorization: " Bearer " + userInfo.token },
    });
    console.log("neworder", newOrder);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

const myOrder = () => async (dispatch, getState) => {
  try {
    const {
      userData: { userInfo },
    } = getState();
    dispatch({ type: MY_ORDER_LIST_REQUEST });

    const { data: list } = await Axios.get(
      "http://localhost:2000/api/order/mine",
      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );
    console.log(list, "user data");
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: list.data });
  } catch (error) {
    console.log(error, "user error");
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
};

const cancelOrder = (id) => async (dispatch) => {
  dispatch({ type: ORDER_DELETE_REQUEST });
  try {
    console.log("in action delete");
    const { data } = await Axios.delete(
      "http://localhost:2000/api/order/delete/" + id
    );

    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error });
  }
};

export { createOrder, myOrder, cancelOrder };
