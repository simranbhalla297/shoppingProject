import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Home from "./Home";
import Products from "./Products";
import Navbar from "./Navbar";
import Cart from "./Cart";
import Contact from "./Contact";
import Footer from "./Footer";
import ItemDetail from "./ItemDetail";
import Login from "./Login";
function App() {
  const [category, setCategory] = useState();

  function categoryHandler(newcategory) {
    setCategory(newcategory);
    console.log("category handler called in parent");
  }

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Navbar categoryCallback={categoryHandler} />
          <Home categoryValue={category} /> <Footer />
        </Route>
        <Route exact path="/product">
          <Navbar /> <Products /> <Footer />
        </Route>
        <Route exact path="/cart">
          <Navbar /> <Cart /> <Footer />
        </Route>
        <Route exact path="/itemdetail">
          <Navbar /> <ItemDetail /> <Footer />
        </Route>
        <Route exact path="/contact">
          <Navbar /> <Contact /> <Footer />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
