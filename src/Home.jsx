import React, { useState, useEffect } from "react";
import firebase from "./Firebase.js";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
function Home(props) {
  const history = useHistory();
  console.log(history);
  var selectedCategory = props.categoryValue;
  console.log(selectedCategory);
  const [itemlist, setItemlist] = useState([]);
  const [loading, setLoading] = useState(false);
  var ref = firebase.firestore().collection("products");
  if (selectedCategory) {
    ref = ref.where("category", "==", selectedCategory);
  }
  if (selectedCategory == "All") {
    var ref = firebase.firestore().collection("products");
  }
  function getposts() {
    setLoading(true);
    setItemlist([]);
    ref
      .get()
      .then((data) => {
        console.log(data.docs);
        const item = data.docs.map((doc) => doc.data());
        console.log(item);
        console.log("get item");
        setItemlist(item);
        setLoading(false);

        //setImageurl(item.picture);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  useEffect(() => {
    if (firebase.auth().currentUser == null) {
      history.push("/login");
    } else {
      getposts();
    }
  }, [selectedCategory]);

  return (
    <div>
      <div
        className="imgWrapper"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "70%",
          margin: " auto",
        }}
      >
        {loading ? (
          <Loader type="Oval" color="black" height={80} width={80} />
        ) : null}
        {itemlist.map((item) => {
          return (
            <div
              className="shadow-sm p-1 mb-1 bg-white rounded"
              style={{
                margin: "20px",

                backgroundColor: "#f5f7f9",
              }}
            >
              <div className="img_container">
                <img
                  src={item.picture}
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
              <p
                style={{
                  textAlign: "center",
                  margin: "5px",
                  padding: "5px",
                }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    padding: "5px",
                    backgroundColor: "black",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  <Link
                    to={`/itemdetail?id=${item.id}`}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {" "}
                    Add to Cart
                  </Link>
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Home;
