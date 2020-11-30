import React from "react";
import firebase from "./Firebase.js";
function Signup(props) {
  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(props.email, props.password)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn-lg m-3"
        onClick={register}
      >
        sign Up
      </button>
      <h6 style={{ textTransform: "capitalize" }}>
        have an account ?<span onClick={props.onClick}>Sign in</span>
      </h6>
    </div>
  );
}
export default Signup;
