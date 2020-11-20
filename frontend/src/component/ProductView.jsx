import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./ProductView.module.css";
import { useSelector, useDispatch } from "react-redux";

import {
  saveProduct,
  listProducts,
  deleteProduct,
} from "../actions/productAction";
const ProductView = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const productSave = useSelector((state) => state.productSave);
  const { userInfo } = useSelector((state) => state.userData);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo.isAdmin) {
      props.history.push("");
    }
  }, []);

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    axios
      .post("http://localhost:2000/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("pic");
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  return (
    <div className={style.content_margined}>
      <div className={style.product_header}>
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className={style.form}>
          <form onSubmit={submitHandler} className={style.form_inside}>
            <ul className={style.ul}>
              <li className={style.li}>
                <h2>Create Product</h2>
              </li>
              <li className={style.li}>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li className={style.li}>
                <label htmlFor="name" className={style.label}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  className={style.input}
                ></input>
              </li>
              <li className={style.li}>
                <label htmlFor="price" className={style.label}>
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  className={style.input}
                ></input>
              </li>
              <li className={style.li}>
                <label htmlFor="image" className={style.label}>
                  Image
                </label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                  className={style.input}
                ></input>
              </li>{" "}
              <li className={style.li}>
                <input
                  type="file"
                  onChange={uploadFileHandler}
                  className={style.input}
                ></input>

                {uploading && <div>Uploading...</div>}
              </li>
              <li className={style.li}>
                <label htmlFor="brand" className={style.label}>
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                  className={style.input}
                ></input>
              </li>
              <li className={style.li}>
                <label htmlFor="countInStock" className={style.label}>
                  CountInStock
                </label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                  className={style.input}
                ></input>
              </li>
              <li className={style.li}>
                <label htmlFor="name" className={style.label}>
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                  className={style.input}
                ></input>
              </li>
              <li className={style.li}>
                <label htmlFor="description" className={style.label}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  className={style.input}
                ></textarea>
              </li>
              <li className={style.li}>
                <button type="submit" className="button primary">
                  {id ? "Update" : "Create"}
                </button>
              </li>
              <li className={style.li}>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className={style.product_list}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!error &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      className="button"
                      onClick={() => openModal(product)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="button"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <img src={image} />
    </div>
  );
};

export default ProductView;
