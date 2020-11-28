import React, { useState, useEffect } from "react";
import firebase from "./Firebase.js";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Home(props) {
  const history = useHistory();
  console.log(history);
  var selectedCategory = props.categoryValue;
  console.log(selectedCategory);
  const [itemlist, setItemlist] = useState([]);
  var ref = firebase.firestore().collection("products");
  if (selectedCategory) {
    ref = ref.where("category", "==", selectedCategory);
  }
  function getposts() {
    ref.get().then((data) => {
      console.log(data.docs);
      const item = data.docs.map((doc) => doc.data());
      console.log(item);
      console.log("get item");
      setItemlist(item);
      //setImageurl(item.picture);
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
    <div
      style={{
        backgroundColor: "#f5f7f9	",
      }}
    >
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
        {itemlist.map((item) => {
          return (
            <div
              style={{
                margin: "20px",
                border: "1px solid black",
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
                    view more
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
