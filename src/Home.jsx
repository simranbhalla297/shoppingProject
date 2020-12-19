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
    <div style={{ backgroundColor: "#f5f5f5", paddingBottom: "2%" }}>
      <div>
        <div className="ItemHeading">
          <h2
            style={{
              lineHeight: "1",
              fontSize: " 2.5rem",
              display: "block",
              textAlign: "center",
              marginBottom: "25px",
              paddingTop: "6%",
              color: "#5A595F",
            }}
          >
            Product Items...
          </h2>
        </div>
        <div
          className="imgWrapper"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "70%",
            margin: "  auto",
          }}
        >
          {loading ? (
            <Loader type="Oval" color="black" height={80} width={80} />
          ) : null}

          {itemlist.map((item) => {
            return (
              <div
                style={{
                  boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.2)",

                  margin: "10px",
                  backgroundColor: "white",
                }}
              >
                <div className="img_container">
                  <img
                    src={item.picture}
                    style={{ width: "250px", height: "250px" }}
                  />
                  <div
                    className="card-body"
                    style={{
                      textTransform: "capitalize",
                      color: "#212121",
                      fontWeight: "400",
                    }}
                  >
                    <h4 style={{ marginBottom: "8px", color: "#264653" }}>
                      Item: {item.name}
                    </h4>
                    <p>Price: {item.price}</p>
                    <p style={{ marginTop: "10px" }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{
                          padding: "5px",
                          backgroundColor: "#640921",
                          color: "#cebdaf",
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Home;
