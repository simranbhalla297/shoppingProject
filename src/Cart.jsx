import React, { useState, useEffect } from "react";
import firebase from "./Firebase.js";
import Cartitem from "./Cartitem";
import Carttotal from "./Carttotal";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
function Cart(props) {
  const history = useHistory();
  console.log(history);
  const [cart, setCart] = useState([]);
  const [totalitems, setTotalItems] = useState();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  console.log(location);
  //get list
  function getCartList() {
    setLoading(true);
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase
      .firestore()
      .collection("cartlist")
      .where("uid", "==", uid);
    ref.get().then((data) => {
      console.log(data.docs);
      var item = data.docs.map((doc) => doc.data());
      console.log(item);
      setCart(item);
      getTotalItem();
      setLoading(false);
    });
  }
  useEffect(() => {
    getCartList();
  }, []);

  useEffect(() => {
    getTotalItem();
  }, [cart.length]);

  //get total items in cart callback app.js
  function getTotalItem() {
    var totalitems = 0;
    cart.forEach((item) => {
      totalitems += item.quantity;
    });
    setTotalItems(totalitems);
    props.cart(totalitems);
  }
  //omIncrement
  function onIncrement(id) {
    setCart((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          element.quantity++;
        }
        return element;
      })
    );
    getTotalItem();
  }

  //on decrement
  function onDecrement(id) {
    setCart((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          element.quantity--;
        }
        return element;
      })
    );
    getTotalItem();
  }

  function removeItemfromlist(id) {
    console.log("here callback");
    const newref = firebase.firestore().collection("cartlist").doc(id);
    newref
      .delete()
      .then(() => {
        setCart((prev) => prev.filter((element) => element.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //redirect to homepage

  function redirectToHome() {
    history.push("/");
  }

  return (
    <div className=" container box">
      {loading ? (
        <div class="d-flex justify-content-center">
          <div
            class="spinner-border"
            role="status"
            style={{ textAlign: "center" }}
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}
      <div className="cart_wrapper">
        <div className="cart_item">
          <div className="show_products">
            <h2 style={{ lineHeight: "1", fontSize: "2rem", color: "#264653" }}>
              Cart
            </h2>
            <div className="cart_box">
              <p style={{ textTransform: "capitalize", fontSize: "1rem" }}>
                Items in your cart {totalitems}
              </p>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th className="product_remove">&nbsp;</th>
                  <th className="product_image">&nbsp;</th>
                  <th className="product_name">Product</th>
                  <th className="product_price">Price</th>
                  <th className="product_quantity">Quantity</th>
                  <th className="product_subtotal">Subtotal</th>
                </tr>
              </thead>

              {cart.map((cartItem) => {
                return (
                  <Cartitem
                    data={cartItem}
                    Itemremove={removeItemfromlist}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                  />
                );
              })}
            </table>
          </div>
        </div>
        <div className="clearfix">
          <div className="cart_total">
            <table class="table table-bordered Totaltable">
              <h4>Cart Total</h4>
              <tbody>
                <tr>
                  <td>
                    {" "}
                    <h5>
                      Subtotal: ({totalitems}
                      {totalitems < 2 ? "item" : "items"})
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Carttotal cart={cart} />
                  </td>
                </tr>
              </tbody>
            </table>
            {totalitems ? (
              <Link onClick={redirectToHome}>
                <button type="button" class="btn  widthbutton">
                  return to home
                </button>
              </Link>
            ) : null}
            <button type="button" class="btn widthbutton">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
