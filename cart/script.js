let productsEndpoint = "https://fakestoreapi.com/products";
var data = null;
async function fetchProducts() {
  try {
    let response = await fetch(productsEndpoint);
    data = await response.json();
    //console.log(data);
    //appendAllProductsOntoUI(data);
  } catch (err) {
    alert("some error while making network call", err);
  }
}
fetchProducts();
let checkout = document.getElementById("checkout-btn");
function checkoutFunctionality() {
  let cartItems = [];
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  cartItemsContainer.innerHTML = `<p>No items added!!</p>`;
  billContainer.innerHTML = "";
  let totalDiv = `<div class="total-card"><span>Total: </span><span>${
    "₹" + 0.0
  }</span></div>`;
  billContainer.innerHTML += totalDiv;
}
checkout.addEventListener("click", checkoutFunctionality);
//console.log(checkout);
let cartProductsImgLink = JSON.parse(localStorage.getItem("cartItems"));
//console.log(cartProductsImgLink);
let cartItemsContainer = document.getElementById("cart-products");
let billContainer = document.getElementById("cart-bill");

function appendProductsInCartUI() {
  cartItemsContainer = document.getElementById("cart-products");
  billContainer = document.getElementById("cart-bill");
  cartItemsContainer.innerHTML = "";
  cartProductsImgLink = JSON.parse(localStorage.getItem("cartItems"));
  let x = 1;
  let totalPrice = 0;
  cartProductsImgLink.forEach((item) => {
    let elem = null;
    if (
      (elem = data.find((ele) => {
        return ele.image === item;
      }))
    ) {
      var eachItem = `<div class="item">
                    <img src="${elem.image}" alt="Item" />
                    <p>${elem.title}</p>
                    <div class="info">
                      <div class="row">
                        <div class="price">₹${elem.price}</div>
                        <div class="sized">S,M,L</div>
                      </div>
                      <div class="colors">
                        Colors:
                        <div class="row">
                          <div class="circle" style="background-color: #000"></div>
                          <div class="circle" style="background-color: #4938af"></div>
                          <div class="circle" style="background-color: #203d3e"></div>
                        </div>
                      </div>
                      <div class="row">Rating: ${elem.rating.rate}</div>
                    </div>
                    <button id="addBtn">Remove from cart</button>
                    </div>`;

      let eachBill = `<div class="checkout-data">
        <span>${x + ". " + " " + elem.title}</span>
        <span>${"₹" + elem.price}</span>
      </div>`;
      totalPrice += elem.price;
      x++;
      cartItemsContainer.innerHTML += eachItem;
      billContainer.innerHTML += eachBill;
    }
  });
  totalPrice = parseFloat(totalPrice).toFixed(2);
  let totalDiv = `<div class="total-card"><span>Total: </span><span>${
    "₹" + totalPrice
  }</span></div>`;
  billContainer.innerHTML += totalDiv;
}
setTimeout(appendProductsInCartUI, 1000);
