import React, { useState } from "react";
import firebase from "./Firebase.js";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
function Cartitem(props) {
  const [count, setCount] = useState(props.data.quantity);
  const [isShown, setIsShown] = useState(false);

  // const [cart, setCart] = useState([]);
  function decrement() {
    var cartItemId = props.data.id;

    var ref = firebase.firestore().collection("cartlist").doc(cartItemId);
    console.log(ref);
    ref.update({ quantity: count - 1 }).catch((err) => {
      console.log(err);
    });
    if (count > 1) {
      setCount(count - 1);
    }
    props.onDecrement(cartItemId);
  }

  function increment() {
    var cartItemId = props.data.id;

    var ref = firebase.firestore().collection("cartlist").doc(cartItemId);
    console.log(ref);
    ref.update({ quantity: count + 1 }).catch((err) => {
      console.log(err);
    });
    setCount(count + 1);
    props.onIncrement(cartItemId);
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
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        style={{
          margin: " 15px auto",
          backgroundColor: "#f5f7f9	",
        }}
      >
        <div
          className="cartDetails"
          style={{
            border: "1px solid grey",
            display: "flex",
          }}
        >
          <img
            src={props.data.picture}
            style={{ width: "220px", height: "250px" }}
          />
          <div
            className="details"
            style={{
              margin: "auto",
              textTransform: "capitalize",
              color: "#5a595c",
            }}
          >
            <p style={{ textAlign: "center" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Item :
              </span>
              {props.data.name}
            </p>
            <p style={{ textAlign: "center" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Description :
              </span>{" "}
              {props.data.description}
            </p>
            <p style={{ textAlign: "center" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Price :
              </span>
              {props.data.price}
            </p>
            <div
              className="button"
              style={{
                textAlign: "center",

                padding: "5px",
              }}
            >
              <RemoveCircleOutlineOutlinedIcon
                onClick={decrement}
                style={{ marginRight: "5px" }}
              />

              <span>{count}</span>

              <AddCircleOutlineIcon
                onClick={increment}
                style={{ marginLeft: "5px" }}
              />
            </div>

            {isShown && (
              <p style={{ float: "right", cursor: "pointer" }}>
                <RemoveShoppingCartIcon onClick={removeItem} />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cartitem;
