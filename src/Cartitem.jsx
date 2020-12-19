import React, { useState, useEffect } from "react";
import firebase from "./Firebase.js";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
function Cartitem(props) {
  const [count, setCount] = useState(props.data.quantity);
  const [isShown, setIsShown] = useState(false);
  const [subtotal, setSubtotal] = useState();
  var price = props.data.price;
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

  function subTotalItem() {
    var itemprice = price;
    console.log(itemprice);
    var Subtotal = price * count;
    setSubtotal(Subtotal);
  }
  useEffect(() => {
    subTotalItem();
  });

  return (
    <tbody
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <tr>
        <td className="product_remove">
          {isShown && (
            <p style={{ float: "right", cursor: "pointer" }}>
              <RemoveShoppingCartIcon onClick={removeItem} />
            </p>
          )}
        </td>
        <td className="product_image">
          <img
            src={props.data.picture}
            style={{ width: "32px", height: "40px" }}
          />
        </td>
        <td className="product_name"> {props.data.name}</td>
        <td className="product_price"> {props.data.price}</td>
        <td className="product_quantity">
          {count}

          <div className="button">
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
        </td>
        <td className="product_subtotal"> {subtotal}</td>
      </tr>
    </tbody>
  );
}
export default Cartitem;
