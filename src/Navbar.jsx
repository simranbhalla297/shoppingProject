import React, { useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { NavLink, useHistory } from "react-router-dom";
import firebase from "./Firebase.js";
function Navbar(props) {
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
    <div
      className="container-fluid p-4 "
      style={{
        borderBottom: "1px solid black",
      }}
    >
      <nav
        className=" container navbar navbar-expand-lg navbar-light  p-1 d-flex  justify-content-center"
        style={{ backgroundColor: "white" }}
      >
        <NavLink className="navbar-brand " to="#">
          <ShoppingCartIcon style={{ fontSize: "30px" }} />
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
          className="  collapse navbar-collapse d-flex justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li class="nav-item dropdown">
              <label>Select Category</label>
              <select
                onChange={handleChange}
                style={{ width: "120px" }}
                value={SelecteCategory}
              >
                <option value="All">all</option>
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
              <NavLink to="/contact" className="nav-link">
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" onClick={logOut} className="nav-link">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;