import React, { useEffect, useState } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import firebase from "./Firebase.js";
import { v4 as uuidv4 } from "uuid";
function ItemDetail(props) {
  const location = useLocation();
  console.log(location);
  //const [itemid, setItemId] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [itemdetail, setItemDetail] = useState("");

  function getItemId() {
    console.log("hi");
    var search = location.search;
    console.log(search);
    var ItemId = search.substring(4);
    console.log(ItemId);

    const itemRef = firebase.firestore().collection("products").doc(ItemId);
    itemRef.get().then((snap) => {
      var details = snap.data();
      setItemDetail(details);
      console.log(details);
    });
  }
  useEffect(() => {
    getItemId();
    //console.log(props);
    //console.log(props.location.search);
  }, []);

  //Items add to cart
  function AddtoCart() {
    let uuid = uuidv4();
    console.log("add in cart");
    var search = location.search;
    console.log(search);
    var ItemId = search.substring(4);
    console.log(ItemId);
    var uid = firebase.auth().currentUser.uid;
    const CartItemRef = firebase.firestore().collection("cartlist").doc(uuid);
    CartItemRef.set({ ...itemdetail, uid: uid, quantity: 1, id: uuid })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="table">
        <div
          className="tableContainer"
          style={{
            border: "2px solid black",

            width: "50%",
          }}
        >
          <h4>product details</h4>
          <div className="showImage">
            <img src={itemdetail.picture} alt="image" />
          </div>
          <div className="showDetails">
            <h4>{itemdetail.category}</h4>
            <p>{itemdetail.name}</p>
            <p>{itemdetail.price}</p>
            <p>{itemdetail.description}</p>
            <p
              style={{
                textAlign: "center",
                margin: "5px",
                padding: "5px",
              }}
            >
              <button
                style={{
                  padding: "5px",
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "capitalize",
                }}
                onClick={AddtoCart}
              >
                <Link
                  to={`/cart?id=${itemdetail.id}`}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    marginRight: "10px",
                  }}
                >
                  <span>
                    <AddShoppingCartIcon
                      style={{ fontSize: "30px", marginRight: "10px" }}
                    />
                  </span>
                  go to cart
                </Link>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ItemDetail;
