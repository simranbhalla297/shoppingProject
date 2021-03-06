import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Home from "./Home";
import Products from "./Products";
import Navbar from "./Navbar";
import Cart from "./Cart";
import Navtransparent from "./Navtransparent";
import Footer from "./Footer";
import ItemDetail from "./ItemDetail";
import Login from "./Login";
import Forgotpassword from "./Forgotpassword";
import Header from "./Header";

function App() {
  const [category, setCategory] = useState();
  const [cartitem, setCartItem] = useState();

  function categoryHandler(newcategory) {
    setCategory(newcategory);
    console.log("category handler called in parent");
  }

  function carthandler(cartItem) {
    console.log("total items");
    setCartItem(cartItem);
  }

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Navtransparent categoryCallback={categoryHandler} />
          <Header />
          <Home categoryValue={category} /> <Footer />
        </Route>
        <Route exact path="/product">
          <Navbar /> <Products /> <Footer />
        </Route>
        <Route exact path="/cart">
          <Navbar item={cartitem} /> <Cart cart={carthandler} /> <Footer />
        </Route>
        <Route exact path="/itemdetail">
          <Navbar /> <ItemDetail /> <Footer />
        </Route>

        <Route exact path="/forgotpassword">
          <Forgotpassword />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
