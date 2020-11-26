import React, { useState, useEffect } from "react";
import firebase from "./Firebase.js";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  console.log(history);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasaccount, sethasAccount] = useState(false);

  //console.log(currentUser);
  const onSubmit = () => {
    console.log("google log in");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log(error);
        // ...
      });
  };
  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        resetInput();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resetInput();
        console.log("logged in");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const resetInput = () => {
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    var listner = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(" user log in");
        history.push("/");
      } else {
        console.log(" user not logged in");
      }
    });

    return () => {
      listner();
      console.log("clean up function");
    };
  });

  return (
    <div className="login_wrapper">
      <div className="login_container">
        <div className="center">
          <h1>Login</h1>

          <div className="inputBox">
            <h3 className="heading">Login/Register</h3>

            <div className="form">
              <label for="email">
                <b>Email</b>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
              <label for="email">
                <b>Password</b>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />

              {hasaccount ? (
                <>
                  <button className="clickbtn" onClick={login}>
                    {" "}
                    sign in
                  </button>
                  <p>
                    Don't have account ?
                    <span onClick={() => sethasAccount(!hasaccount)}>
                      Sign up
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <button className="clickbtn" onClick={register}>
                    sign Up
                  </button>
                  <p>
                    {" "}
                    have an account ?
                    <span onClick={() => sethasAccount(!hasaccount)}>
                      Sign in
                    </span>
                  </p>
                </>
              )}

              <button className="clickbtn" onClick={() => onSubmit()}>
                Sign in with google account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
