import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productAction";

const Products = (props) => {
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  console.log("proooo", products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  return (
    <ul className="products">
      {products &&
        products.map((product) => (
          <li key={product._id}>
            <div className="product">
              <Link to={"/product/" + product._id}>
                <img
                  className="product-image"
                  src={product.image}
                  alt="product"
                />
              </Link>
              <div className="product-name">
                <Link to={"/product/" + product._id}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-rating">
                {/* <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  /> */}
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};
export default Products;
