import React, { useState, useEffect } from "react";

function Carttotal({ cart }) {
  const [totalprice, settotalprice] = useState();

  console.log(cart);

  function getItemPrice() {
    var totalprice = 0;
    var quantity = 0;
    cart.forEach((item) => {
      quantity = item.quantity;
      totalprice += item.price * quantity;
    });
    settotalprice(totalprice);
  }

  useEffect(() => {
    getItemPrice();
  });

  var total = totalprice;
  console.log(total);

  return (
    <div>
      <p>{total}</p>
    </div>
  );
}
export default Carttotal;
