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
  const [loading, setLoading] = useState(false);

  function getItemId() {
    console.log("hi");
    var search = location.search;
    console.log(search);
    var ItemId = search.substring(4);
    console.log(ItemId);
    setLoading(true);
    const itemRef = firebase.firestore().collection("products").doc(ItemId);
    itemRef.get().then((snap) => {
      var details = snap.data();
      setItemDetail(details);
      console.log(details);
    });
    setLoading(false);
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
    <>
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
      <div>
        <div className="Itemwrapper ">
          <div
            className="itemDetail"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "5%",
            }}
          >
            <div
              className="card shadow  bg-white rounded "
              style={{ width: "40%" }}
            >
              <img
                src={itemdetail.picture}
                alt="image"
                className="img_contain"
              />
              <div
                className="card-body"
                style={{ textTransform: "capitalize" }}
              >
                <h2>Item detail</h2>
                <h5 className="card-title">Category : {itemdetail.category}</h5>

                <p className="card-text">Item : {itemdetail.name}</p>
                <p className="card-text">Price : {itemdetail.price}</p>
                <p className="card-text">
                  description : {itemdetail.description}
                </p>

                <button
                  type="button"
                  class="btn btn-primary"
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
                    Go to cart
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ItemDetail;
