import React, { useState, useEffect } from "react";
import firebase from "./Firebase.js";
import { v4 as uuidv4 } from "uuid";
export default function Addpost() {
  const [post, setPost] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState();
  const [imageurl, setImageurl] = useState();
  //import { timestamp } from "./Firebase.js";
  //const ref = firebase.firestore().collection("posts");
  //const types = ["image/png", "image/jpg"];
  var imageRef = React.createRef();

  async function handleSubmit() {
    var id = uuidv4();

    console.log("profileuploaddone");

    let downloadUrl = null;
    if (image) {
      let storageImageRef = firebase
        .storage()
        .ref(`users/${id}/profileImages/${id}`);
      let taskSnapshot = await storageImageRef.put(image);
      downloadUrl = await taskSnapshot.ref.getDownloadURL();
    }
    console.log("postchanged");

    var Post = {
      picture: downloadUrl,
      id: id,
      name: name,
      email: email,
      description: description,
      timestamp: Date.now(),
    };
    //ref.set(Post);

    const Ref = firebase.firestore().collection("posts").doc(id);

    Ref.set(Post)
      .then(() => {
        setPost((prev) => [Post, ...prev]);
      })
      .catch((err) => {
        console.error(err);
      });

    setName("");
    setEmail("");
    setdescription("");
    setImageurl("");
  }

  function ImageSelected(e) {
    console.log("ImageSelected");
    setImage(imageRef.current.files[0]);
  }
  return (
    <div>
      <div className="post_fields">
        <div className="input_wrapper">
          <div className="post_box">
            <h1 style={{ textAlign: "center", marginTop: "30px" }}>
              Post Data
            </h1>

            <div className="imgBoxr">
              <input type="file" ref={imageRef} onChange={ImageSelected} />
            </div>

            <div className="fieldInput">
              <div className="name">
                <label for="name">
                  <b>Name</b>
                </label>
                <input
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="email">
                <label for="Email">
                  <b>Email</b>
                </label>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="description">
                <label for="Description">
                  <b>description</b>
                </label>
                <input
                  type="text"
                  value={description}
                  placeholder="write something here..."
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>

              <p style={{ textAlign: "center", marginTop: "20px" }}>
                <input
                  type="submit"
                  className="submitBtn"
                  onClick={() => handleSubmit()}
                />
              </p>
            </div>
          </div>
        </div>
        {/*<ul>
            {post.map((postItems, index) => {
              return (
                <div className="itembox" key={index}>
                  <li>name:{postItems.name}</li>
                  <li>Email:{postItems.email}</li>
                  <li>description:{postItems.description}</li>
                ll</div>
              );
            })}
          </ul>*/}
      </div>
    </div>
  );
}
