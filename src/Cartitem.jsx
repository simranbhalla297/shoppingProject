import React, { useState } from "react";
import firebase from "./Firebase.js";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
function Cartitem(props) {
  const [count, setCount] = useState(props.data.quantity);

  // const [cart, setCart] = useState([]);
  function decrement() {
    var cartItemId = props.data.id;

    var ref = firebase.firestore().collection("cartlist").doc(cartItemId);
    console.log(ref);
    ref.update({ quantity: count - 1 }).catch((err) => {
      console.log(err);
    });
    if (count > 0) {
      setCount(count - 1);
    }
  }

  function increment() {
    var cartItemId = props.data.id;

    var ref = firebase.firestore().collection("cartlist").doc(cartItemId);
    console.log(ref);
    ref.update({ quantity: count + 1 }).catch((err) => {
      console.log(err);
    });
    setCount(count + 1);
  }

  //remove item from server

  function removeItem() {
    console.log("remove");
    var cartItemId = props.data.id;
    console.log(cartItemId);
    var ref = firebase.firestore().collection("cartlist").doc(cartItemId);

    ref.delete();
    var cartItemId = props.data.id;
    console.log(cartItemId);
    props.Itemremove(cartItemId);
  }

  return (
    <div>
      <div
        className="flex"
        style={{
          margin: "auto",
          backgroundColor: "pink",
        }}
      >
        <div
          className="cartDetails"
          style={{
            border: "1px solid black",
            display: "flex",
          }}
        >
          <img
            src={props.data.picture}
            style={{ width: "220px", height: "250px" }}
          />
          <div className="details" style={{ margin: "auto" }}>
            <p style={{ textAlign: "center" }}>{props.data.name}</p>
            <p style={{ textAlign: "center" }}>{props.data.description}</p>
            <p style={{ textAlign: "center" }}>{props.data.price}</p>
            <div className="button" style={{ textAlign: "center" }}>
              <button
                onClick={decrement}
                style={{
                  border: "none",
                  margin: "5px",
                }}
              >
                <RemoveCircleOutlineOutlinedIcon />
              </button>
              <span>{count}</span>
              <button
                onClick={increment}
                style={{ border: "none", margin: "5px" }}
              >
                <AddCircleOutlineIcon />
              </button>
            </div>
            <p style={{ textAlign: "center" }}>
              <button onClick={removeItem}>Remove</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cartitem;
