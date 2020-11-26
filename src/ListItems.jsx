import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth/Auth";
import { v4 as uuidv4 } from "uuid";
import firebase from "./Firebase.js";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

function ListItems() {
  const { currentUser } = useContext(AuthContext);
  const [things, setthings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");

  const ref = firebase.firestore().collection("things");

  console.log(ref);

  //one time get function
  function getUsers() {
    setLoading(true);
    ref.get().then((data) => {
      const items = data.docs.map((doc) => doc.data());
      setthings(items);
      setLoading(false);
    });
  }
  useEffect(() => {
    getUsers();
    console.log("useeffect");
  }, []);

  //add things function

  function addthing() {
    var id = uuidv4();
    var newThing = {
      id: id,
      title: title,
      weight: parseInt(weight),
    };
    const newref = firebase.firestore().collection("things").doc(id);
    newref

      .set(newThing)
      .then(() => {
        setthings((prev) => [newThing, ...prev]);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //del functions

  function deleteThing(item) {
    const newref = firebase.firestore().collection("things").doc(item.id);
    newref
      .delete()

      .then(() => {
        setthings((prev) => prev.filter((element) => element.id !== item.id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //edit function

  function update(item) {
    console.log("function update" + item.id);
    const newref = firebase.firestore().collection("things").doc(item.id);
    var oldweight = item.weight;
    var newWeight = oldweight + 1;
    newref
      .update({
        weight: newWeight,
      })

      .then(() => {
        var newthings = things.map((task) => {
          if (task.id === item.id) {
            task.weight = newWeight;
          }
          return task;
        });
        console.log(newthings);
        setthings(newthings);

        console.log("updated");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  let display;
  if (currentUser) {
    display = (
      <div className="containerItem">
        <h1>things</h1>

        <div className="inputbox">
          <h3>Add new</h3>

          <input
            type="text"
            placeholder="Item"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            onChange={(e) => setWeight(e.target.value)}
          />
          <button
            style={{
              backgroundColor: "green",
              padding: "5px",
              width: "20%",
              color: "white",
              fontSize: "20px",
            }}
            onClick={() => addthing()}
          >
            Submit
          </button>
        </div>
        <div className="main">
          {loading ? <h1 className="load">Loading...</h1> : null}
          <ul>
            {things.map((item, index) => {
              return (
                <div className="box" key={index}>
                  <li> Item: {item.title}</li>
                  <li> Quantity: {item.weight}</li>
                  <div className="delete">
                    <button
                      style={{
                        margin: "5px",
                        padding: "2px",
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => deleteThing(item)}
                    >
                      <DeleteRoundedIcon />
                    </button>
                    <button
                      style={{
                        margin: "5px",
                        padding: "2px",
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => update(item)}
                    >
                      <AddBoxRoundedIcon />
                    </button>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    display = null;
  }
  return <div>{display}</div>;
}
export default ListItems;
