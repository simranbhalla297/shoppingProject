import React, { useState, useEffect } from "react";
import firebase from "./Firebase.js";
import Cartitem from "./Cartitem";
import { useLocation } from "react-router-dom";
function Cart() {
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
  });

  //remove item from list

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

  //get total items in cart
  function getTotalItem() {
    var totalitems = 0;
    cart.forEach((item) => {
      totalitems += item.quantity;
    });
    setTotalItems(totalitems);
  }

  return (
    <div
      className="cartFlex"
      style={{
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "green",
      }}
    >
      <div
        className="cartWrapper"
        style={{ backgroundColor: "white", width: "40%" }}
      >
        <h1>View cart</h1>
        <h1>total items in cart{totalitems}</h1>
        <div className="cartitems"></div>
        {cart.map((cartItem) => {
          return (
            <div>
              <Cartitem data={cartItem} Itemremove={removeItemfromlist} />
            </div>
          );
        })}
      </div>
      <div className="price">
        <h1>Price</h1>
      </div>
    </div>
  );
}

export default Cart;
