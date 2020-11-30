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

  const location = useLocation();
  console.log(location);
  //get list
  function getCartList() {
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
    });
  }
  useEffect(() => {
    getCartList();
  }, []);

  useEffect(() => {
    getTotalItem();
  }, [cart.length]);

  //get total items in cart
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
    <div className="box">
      <div
        className="cartFlex"
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div
          className="cartWrapper"
          style={{ backgroundColor: "white", width: "40%" }}
        >
          <h2>View cart</h2>
          <h4 style={{ textTransform: "capitalize" }}>
            total items in cart {totalitems}
          </h4>
          <div className="cartitems"></div>
          {cart.map((cartItem) => {
            return (
              <div>
                <Cartitem
                  data={cartItem}
                  Itemremove={removeItemfromlist}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                />
              </div>
            );
          })}
        </div>
        <div className="cart_total" style={{ padding: "20px" }}>
          <h3>Cart Total</h3>
          <h4>
            Subtotal: ({totalitems}
            {totalitems < 2 ? "item" : "items"})
          </h4>
          <Carttotal cart={cart} />
        </div>
      </div>

      {totalitems ? (
        <p style={{ textAlign: "center" }}>
          <Link onClick={redirectToHome}>
            <button type="button" class="btn btn-dark">
              Back to
              <span>
                <HomeIcon style={{ marginBottom: "5px" }} />
              </span>
            </button>
          </Link>
        </p>
      ) : null}
    </div>
  );
}

export default Cart;
