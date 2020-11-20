import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";
import Cookie from "js-cookie";

const listProducts = (
  category = "",
  searchKeyword = "",
  sortOrder = ""
) => async (dispatch, getState) => {
  try {
    console.log(category, "category");
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      "http://localhost:2000/api/products?category=" + category
    );
    console.log(data, "proudddddd");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    const userInfo = Cookie.getJSON("userInfo") || null;
    const cartItems =
      Cookie.getJSON(`cartItems+${userInfo ? userInfo._id : 0}`) || [];
    console.log("list cart", cartItems);
    let newCart = [];
    if (cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        let x = data.find((value) => {
          console.log(value, "valueee", i);
          return value._id == item.product;
        });
        if (x) {
          item.countInStock = x.countInStock;
          if (item.qty > x.countInStock) {
            item.qty = x.countInStock;
          }
          newCart.push(item);
        }
      }
    }
    console.log("carttt", newCart, "xxxxxxxxxx");
    console.log(newCart, "list update");
    dispatch({ type: "UPDATE", payload: newCart });
    Cookie.set(`cartItems+${userInfo ? userInfo._id : 0}`, newCart);
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(
      "http://localhost:2000/api/products/" + productId
    );
    console.log(data, "proudddddd");
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userData: { userInfo },
    } = getState();
    if (!product._id) {
      console.log("here");
      const { data } = await axios.post(
        "http://localhost:2000/api/products",
        product,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      console.log("savee", data);
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(
        "http://localhost:2000/api/products/" + product._id,
        product,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      console.log("savee", data);
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};
const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const {
      userData: { userInfo },
    } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete(
      "http://localhost:2000/api/products/" + productId,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export {
  listProducts,
  detailsProduct,
  saveProduct,
  deleteProduct,
  // saveProductReview,
};
