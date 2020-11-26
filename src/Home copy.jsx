import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./auth/Auth";
import firebase from "./Firebase.js";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
//import { v4 as uuidv4 } from "uuid";git rehttps://github.com/simranbhalla297/newProject.git

function Home(props) {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  console.log(history);
  const [postlist, setPostlist] = useState([]);
  const ref = firebase
    .firestore()
    .collection("posts")
    .orderBy("timestamp", "desc");
  //get posts
  function getposts(props) {
    ref.get().then((data) => {
      console.log(data.docs);
      const item = data.docs.map((doc) => doc.data());
      console.log(item);
      setPostlist(item);
      //setImageurl(item.picture);
    });
  }
  useEffect(() => {
    if (firebase.auth().currentUser == null) {
      props.history.push("/login");
    }
    getposts();
  }, []);

  //console.log(currentUser);
  return (
    <div>
      <div className="homepage ">
        <h1 className="text-center  mt-4 ">Picture Gallery</h1>

        <div className="container-fluid mb-5  ">
          <div className="row ">
            <div className="col-10 mx-auto mb-4 ">
              <div className="row ">
                {postlist.map((post) => {
                  return (
                    <div className="col-md-4 col-10 mx-auto mt-4 cardBox ">
                      <div
                        className="card"
                        style={{ boxShadow: " 0 8px 8px #e1eff4" }}
                      >
                        <img
                          src={post.picture}
                          className="card-img-top"
                          alt="..."
                          width="80px"
                          height="350px"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{post.name}</h5>
                          <h5 className="card-title">{post.email}</h5>

                          <button className="somebtn btn-primary">
                            <Link
                              to={`/postdetail?id=${post.id}`}
                              style={{ color: "white", textDecoration: "none" }}
                            >
                              Go somewhere
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
