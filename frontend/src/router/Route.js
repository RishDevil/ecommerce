import React from "react";
import { Route } from "react-router-dom";
import Products from "../component/Products";
import Product from "../component/Product";
import Cart from "../component/Cart";
import Cart2 from "../component/Cart2";
import Register from "../component/Register";
import SignIn from "../component/Signin";
import Shipping from "../component/Shipping";
import PaymentSelect from "../component/PaymentSelect";
import Payment from "../component/PlaceOrder";
import ProductView from "../component/ProductView";
import CompleteOrder from "../component/CompleteOrder";
import MyOrder from "../component/MyOrder";
const Router = () => {
  return (
    <div>
      <Route exact path="/" component={Products} />
      <Route exact path="/product/:id" component={Product} />
      <Route exact path="/cart/:id" component={Cart} />
      <Route exact path="/category/:id" component={Products} />
      <Route exact path="/cart2/" component={Cart2} />
      <Route exact path="/register/" component={Register} />
      <Route exact path="/signin/" component={SignIn} />
      <Route exact path="/shipping" component={Shipping} />
      <Route exact path="/paymentSelect/" component={PaymentSelect} />
      <Route exact path="/payment/" component={Payment} />
      <Route exact path="/productView/" component={ProductView} />
      <Route exact path="/complete/" component={CompleteOrder} />
      <Route exact path="/myorder/" component={MyOrder} />
    </div>
  );
};
export default Router;
