import React, { useState, useEffect } from "react";
import { signin } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import style from "./Signin.module.css";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [pss, setPass] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(signin(email, pss));
  };
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  console.log(query, " queryyyyy");
  const { userInfo, loading, error, success } = useSelector(
    (state) => state.userData
  );
  console.log(userInfo, "sig infpoooo");

  let c = success
    ? query.get("id")
      ? props.history.push(`cart/${query.get("id")}?qty=${query.get("qty")}`)
      : props.history.push("")
    : 1;

  return (
    <div className={style.form}>
      <form onSubmit={submitHandler} className={style.form_inside}>
        <ul className={style.ul}>
          <li className={style.li}>
            {" "}
            <h2>Login</h2>{" "}
          </li>
          <li className={style.li}>{loading && <div>Loading...</div>}</li>

          <li className={style.li}>
            <label htmlFor="email" className={style.label}>
              Email{" "}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className={style.input}
            ></input>
          </li>

          <li className={style.li}>
            {" "}
            <label htmlFor="password" className={style.label}>
              Password{" "}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPass(e.target.value)}
              className={style.input}
            ></input>
          </li>
          <li className={style.li}>
            <button type="submit">login</button>{" "}
          </li>
          <li className={style.li}>
            {" "}
            {error && error.password && <div>{error.password}</div>}
          </li>
          <li className={style.li}>
            {error && error.email && <div>{error.email}</div>}
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SignIn;
