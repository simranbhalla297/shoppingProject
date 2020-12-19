import React, { useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { NavLink, useHistory } from "react-router-dom";

import firebase from "./Firebase.js";
function Navtransparent(props) {
  const [SelecteCategory, setSelecteCategory] = useState("categories");
  const history = useHistory();
  //console.log(history);

  function logOut() {
    firebase.auth().signOut();
    history.push("/login");
  }
  function handleChange(event) {
    var selectvalue = event.target.value;
    setSelecteCategory(selectvalue);
    props.categoryCallback(selectvalue);
    console.log(selectvalue);
  }

  return (
    <div className="container-fluid navStyle">
      <nav className=" container navbar navbar-expand-lg navbar-light  p-1 d-flex  justify-content-center navtext ">
        <NavLink className="navbar-brand " to="#">
          TrendGo
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="  collapse navbar-collapse d-flex justify-content-end  "
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <select
                onChange={handleChange}
                style={{ width: "120px", marginTop: "10px" }}
                value={SelecteCategory}
              >
                <option value="All">All</option>
                <option value="Electronics">Electronics</option>
                <option value="Home and furniture">Home and furniture</option>
                <option value="clothing">clothing</option>
                <option value="Books">Books</option>
              </select>
            </li>
            <li className="nav-item active">
              <NavLink to="/" className="nav-link">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/product" className="nav-link">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                Cart
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/login" onClick={logOut} className="nav-link">
                Logout
              </NavLink>
            </li>
            <li className="nav-item">
              <div className="cart" style={{ position: "relative" }}>
                <ShoppingCartIcon style={{ fontSize: "30px" }} />
                <p
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    left: "26px",
                  }}
                >
                  {props.item}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Navtransparent;
