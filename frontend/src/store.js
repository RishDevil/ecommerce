import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import { userDataReducer } from "./reducers/userReducers";
import {
  orderCreateReducer,
  myOrderListReducer,
  orderDeleteReducer,
} from "./reducers/orderReducers";
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  //   productReviewSaveReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducer";
//Cookie.remove("cartItems");
const userInfo = Cookie.getJSON("userInfo") || null;
const cartItems =
  Cookie.getJSON(`cartItems+${userInfo ? userInfo._id : 0}`) || [];

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userData: { userInfo },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userData: userDataReducer,

  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  //   productReviewSave: productReviewSaveReducer,
  orderCreate: orderCreateReducer,
  //   orderDetails: orderDetailsReducer,
  //   orderPay: orderPayReducer,
  //   userUpdate: userUpdateReducer,
  myOrderList: myOrderListReducer,
  //   orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
