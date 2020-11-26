import React, { useState, useEffect } from "react";
import firebase from "./Firebase.js";
import { v4 as uuidv4 } from "uuid";

function Products() {
  const [itemname, SetItemName] = useState();
  const [itemprice, SetItemPrice] = useState();
  const [itemcategory, SetItemCategory] = useState("");
  const [itemdescription, SetItemDescription] = useState();
  const [image, setImage] = useState();
  //const [imageurl, setImageurl] = useState();
  const [products, setProducts] = useState([]);
  var imageRef = React.createRef();
  //here we are going to create collection of products

  async function ProductCollection() {
    var Productid = uuidv4();
    let downloadUrl = null;
    if (image) {
      let storageImageRef = firebase.storage().ref(Productid);
      let taskSnapshot = await storageImageRef.put(image);
      downloadUrl = await taskSnapshot.ref.getDownloadURL();
    }

    var productItems = {
      picture: downloadUrl,
      id: Productid,
      category: itemcategory,
      name: itemname,
      price: parseInt(itemprice),
      description: itemdescription,
    };

    const ref = firebase.firestore().collection("products").doc(Productid);
    ref
      .set(productItems)
      .then(() => {
        setProducts((prev) => [productItems, ...prev]);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(products);
  }

  //get products

  function getProducts() {
    const newref = firebase.firestore().collection("products");
    newref.get().then((data) => {
      const items = data.docs.map((doc) => doc.data());
      setProducts(items);
      //setImageurl(items);
    });
  }
  useEffect(() => {
    getProducts();
    console.log("useeffect");
  }, []);

  //set category

  function handleChange(event) {
    var selectvalue = event.target.value;
    SetItemCategory(selectvalue);
    console.log(selectvalue);
  }

  function ImageSelected(e) {
    console.log("ImageSelected");
    setImage(imageRef.current.files[0]);
  }

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#f5f7f9	",
      }}
    >
      <div className=" container  ">
        <div className="wrapper ">
          <div className="wrapperForm">
            <div className="boxInput">
              <h1
                style={{
                  textAlign: "center",

                  textTransform: "capitalize",
                }}
              >
                add product
              </h1>
              <div className="imputForm">
                <div className="imageContainer"></div>
                <input type="file" ref={imageRef} onChange={ImageSelected} />
                <label>Select Category</label>
                <select
                  value={itemcategory}
                  onChange={handleChange}
                  style={{ width: "120px" }}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Home and furniture">Home and furniture</option>
                  <option value="clothing">clothing</option>
                  <option value="Books">Books</option>
                </select>

                <label>Item Name</label>
                <input
                  type="text"
                  placeholder="Type Here..."
                  onChange={(e) => SetItemName(e.target.value)}
                />
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Type Here..."
                  onChange={(e) => SetItemPrice(e.target.value)}
                />
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Type Here..."
                  onChange={(e) => SetItemDescription(e.target.value)}
                />
              </div>

              <p style={{ textAlign: "center", marginTop: "30px" }}>
                <button
                  className="btn  btn-smp-2 "
                  style={{ backgroundColor: "#343a40", color: "white" }}
                  onClick={() => ProductCollection()}
                >
                  Add to Cart
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;
