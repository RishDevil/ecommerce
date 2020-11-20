import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";

const closeMenu = () => {
  document.querySelector(".sidebar").classList.remove("open");
};
const Sidebar = (props) => {
  const user = Cookie.getJSON("userInfo");
  return (
    <div className="sidebar">
      <div className="sidebar_info">
        <h3>Welcome {user ? user.name : ""} </h3>
        <h3>Shopping Categories</h3>

        <ul className="categories">
          <li>
            <Link to="/myorder">orders</Link>
          </li>

          <li>
            <Link to="/category/Shirts">Shirts</Link>
          </li>
        </ul>
      </div>
      <button className="sidebar-close-button" onClick={closeMenu}>
        x
      </button>
    </div>
  );
};

export default Sidebar;
