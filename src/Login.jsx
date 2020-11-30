import React, { useState, useEffect } from "react";
import firebase from "./Firebase.js";
import { useHistory } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import "./Login.css";
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
    <div className="   login_wrapper   ">
      <div className="  login_container ">
        <div className="center">
          <div className="inputBox">
            <div className="text" style={{ paddingBottom: "30px" }}>
              <h3
                className="heading"
                style={{
                  fontWeight: "bold",
                }}
              >
                User Login
              </h3>
              <p>Enter your detail below to continue</p>
            </div>
            <div
              className="form"
              style={{ textAlign: "center", margin: "auto", padding: "5px" }}
            >
              <div className="email">
                <input
                  type="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="password">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>

            {hasaccount ? (
              <>
                <Signin
                  email={email}
                  password={password}
                  onClick={() => sethasAccount(!hasaccount)}
                />
                <button type="button" class="btn btn-primary btn-lg">
                  <Link
                    to="/forgotpassword"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Forgot Password
                  </Link>
                </button>
              </>
            ) : (
              <>
                <Signup
                  email={email}
                  password={password}
                  onClick={() => sethasAccount(!hasaccount)}
                />
              </>
            )}
            <div className="btn">
              <button
                type="button"
                className="googlebtn"
                onClick={() => onSubmit()}
              >
                <span style={{ margin: "5px" }}>
                  <FaGoogle color="#00749f" />
                </span>
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
