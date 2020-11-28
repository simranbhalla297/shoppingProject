import React, { useState } from "react";
import firebase from "./Firebase.js";

function Contact() {
  const [value, setValue] = useState();
  function handleClick() {
    console.log("contact");
    let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    let number = value;
    console.log(number);

    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then(function (e) {
        let code = prompt("enter the otp");
        if (code == null) return;
        e.confirm(code)
          .then(function (result) {
            console.log(result.user, "user");
            alert(result.user.phoneNumber + "number verified");
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  return (
    <>
      <h1>Contact</h1>
      <div id="recaptcha-container"></div>
      <input
        type="text"
        placeholder="Phone number"
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleClick}>click me</button>
    </>
  );
}
export default Contact;
