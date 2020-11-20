import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productAction";

const Product = (props) => {
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const addToCart = () => {
    props.history.push("/cart/" + id + "?qyt=" + qty);
  };
  useEffect(() => {
    dispatch(detailsProduct(id));

    return () => {
      //
    };
  }, []);
  console.log(product, "detlaall");

  return (
    <div>
      {loading ? (
        "loading...."
      ) : (
        <div className="product-detail">
          <div className="product-main">
            <img src={product.image} className="detail-image" />
            <div className="product-des">
              <ul>
                <li>{product.name}</li>
                <li>{product.brand}</li>
                <li>
                  price : <b>${product.price}</b>
                </li>
                <li>
                  <b>{product.description}</b>
                </li>
                <li>
                  {/* <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  /> */}
                </li>
              </ul>
            </div>
          </div>
          <div className="details-action">
            <ul>
              <li>
                price : <b>${product.price}</b>
              </li>
              <li>
                Status: {product.countInStock > 0 ? "In Stock" : "Unavailable."}
              </li>
              <li>
                Qty:{" "}
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {product.countInStock > 0
                    ? [...Array(product.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))
                    : 0}
                </select>
              </li>
              <li>
                {product.countInStock > 0 ? (
                  <button className="cart-button" onClick={addToCart}>
                    add cart
                  </button>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
          <div className="review">
            Review
            <ul>
              <li>ygggggggggggggg</li>
              <li>
                bad ugg euhffffffffff ideeeeeeeeeeee eihhhhhhhhhhhhhhhhhhhhhh
                jieffffffffffffffffffffffffffffffffff
              </li>
              <li>
                <h3>Write Comment</h3>
                <form>
                  <ul className="review-action">
                    <li>
                      <select
                        name="rating"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very Good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </li>
                    <li>
                      <label name="comment">Comment : </label>
                      <textarea
                        className="comment"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </li>
                    <li>
                      <button type="submit" className="button primary">
                        Submit
                      </button>
                    </li>
                  </ul>
                </form>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
