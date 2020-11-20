import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import style from "./Signin.module.css";
function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userData);
  const { loading, userInfo, error, success } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (success) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  return (
    <div className={style.form}>
      <form onSubmit={submitHandler} className={style.form_inside}>
        <ul className={style.ul}>
          <li className={style.li}>
            <h2>Create Account</h2>
          </li>
          <li className={style.li}>{loading && <div>Loading...</div>}</li>
          <li className={style.li}>
            <label htmlFor="name" className={style.label}>
              Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              className={style.input}
            ></input>
          </li>
          <li className={style.li}>
            <label htmlFor="email" className={style.label}>
              Email
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
            <label htmlFor="password" className={style.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className={style.input}
            ></input>
          </li>
          <li className={style.li}>
            <label htmlFor="rePassword" className={style.label}>
              Re-Enter Password
            </label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
              className={style.input}
            ></input>
          </li>
          <li className={style.li}>
            <button type="submit" className="button primary">
              Register
            </button>
          </li>
          <li className={style.li}>
            Already have an account?
            <Link
              to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
              className="button secondary text-center"
            >
              Create your amazona account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default RegisterScreen;
