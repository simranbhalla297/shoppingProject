import React from "react";
import firebase from "./Firebase.js";
function Signin(props) {
  const login = () => {
    console.log(props.email);
    firebase
      .auth()
      .signInWithEmailAndPassword(props.email, props.password)
      .then(() => {
        console.log("logged in");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn-lg m-3"
        onClick={login}
      >
        sign in
      </button>
      <h6 style={{ textTransform: "capitalize" }}>
        Don't have account ?<span onClick={props.onClick}>Sign up</span>
      </h6>
    </div>
  );
}
export default Signin;
