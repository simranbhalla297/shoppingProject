import React, { useState } from "react";
import firebase from "./Firebase.js";
function Forgotpassword() {
  const [value, setValue] = useState();

  function passwordHandler() {
    var email = value.toString();
    if (email != "") {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function () {
          alert("Email has been sent to you, Please check and verify");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please write your email first");
    }
  }

  return (
    <div>
      <div
        className="forgot_box"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="input" style={{ margin: "20px" }}>
          <h3>Forgot password ?</h3>
          <p>
            please enter your email address below and we'll send you information
            to recover your password
          </p>
          <input
            type="text"
            placeholder="Email Address"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button
            type="button"
            class="btn btn-dark"
            style={{ margin: "20px" }}
            onClick={passwordHandler}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Forgotpassword;
