import React, { useState, useEffect, useContext } from "react";

import firebase from "./Firebase.js";
import { AuthContext } from "./auth/Auth";
import { v4 as uuidv4 } from "uuid";
//import image from "./img3.jpeg";
function Profile() {
  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [number, setNumber] = useState();
  const [about, setAbout] = useState();
  const [image, setImage] = useState();
  const [imageurl, setImageurl] = useState();

  const types = ["image/png", "image/jpg"];
  var imageRef = React.createRef();
  //currentuser uid

  var uid = firebase.auth().currentUser.uid;
  console.log(uid);
  const ref = firebase.firestore().collection("users").doc(uid);
  console.log(ref);

  function getUsersdetails() {
    ref
      .get()
      .then((snap) => {
        var userData = snap.data();

        if (userData) {
          setName(userData.name || "");
          setAge(userData.age || "");
          setNumber(userData.number || "");
          setAbout(userData.about || "");
          setImageurl(userData.picture);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getUsersdetails();
    console.log("useeffect profile");
  }, []);

  //set profile
  async function updateProfile() {
    console.log("profile update");

    let downloadUrl = null;
    if (image) {
      let uuid = uuidv4();
      let storageImageRef = firebase
        .storage()
        .ref(`users/${uid}/profileImages/${uuid}`);
      let taskSnapshot = await storageImageRef.put(image);
      downloadUrl = await taskSnapshot.ref.getDownloadURL();
    }

    var UserProfile = {
      picture: downloadUrl,
      name: name,
      id: uid,
      age: parseInt(age),
      number: parseInt(number),
      about: about,
    };
    ref.set(UserProfile);
  }

  function onImageSelected(e) {
    console.log("onImageSelected");
    //var selected = e.target.files[0];
    //if (selected && types.includes(selected.types)) {
    //var selected = e.target.files[0];
    //setImage(selected);
    //} else {
    //setImage(null);
    //}
    setImage(imageRef.current.files[0]);
  }

  return (
    <div className="profilepage">
      <h1 style={{ textAlign: "center", padding: "10px" }}>
        Add Profile details
      </h1>
      <div className="Form_box">
        <div className="form_container">
          <div className="imgBox">
            <div className="image_container">
              <img src={imageurl} alt="image" className="imgStyle" />
            </div>
            <input type="file" ref={imageRef} onChange={onImageSelected} />
          </div>

          <label for="name">
            <b>Name</b>
          </label>
          <input
            type="text"
            placeholder="user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label for="age">
            <b>Age</b>
          </label>
          <input
            type="number"
            placeholder="user age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label for="number">
            <b>Number</b>
          </label>
          <input
            type="number"
            placeholder="Contact Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <label for="about">
            <b>About me</b>
          </label>
          <input
            type="text"
            placeholder="About me"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <button className="clickbtn" onClick={() => updateProfile()}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
