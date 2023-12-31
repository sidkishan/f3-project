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
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
    amount: 100, // totalPriceFunc() * 100  Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
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
  billContainer.innerHTML = "";
  cartProductsImgLink = JSON.parse(localStorage.getItem("cartItems"));
  let x = 1;
  let totalPrice = 0;
  cartProductsImgLink.forEach((item) => {
    let elem = null;
    if (!data) window.location.reload;
    if (
      (elem = data.find((ele) => {
        // find me error hai
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
  removeProductFromCart();
}
setTimeout(appendProductsInCartUI, 1000);

function removalOfProductFromCart(event) {
  let btn = event.target;
  let div = btn.parentNode;
  cartItemsContainer = document.getElementById("cart-products");
  let removedItemImgLink =
    div.firstChild.nextElementSibling.getAttribute("src");
  cartItemsContainer.removeChild(div); // removed from ui
  // now remove from local storage
  // let removedItemImgLink =
  //   div.firstChild.nextElementSibling.getAttribute("src");
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i] === removedItemImgLink) {
      cartItems.splice(i, 1);
      break;
    }
  }
  //console.log(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  appendProductsInCartUI();
}
function removeProductFromCart() {
  let removeitemBtns = document.querySelectorAll("#addBtn");
  console.log(removeitemBtns);
  if (removeitemBtns != null) {
    removeitemBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", removalOfProductFromCart);
    });
  }
}
//removeProductFromCart();
//appendProductsInCartUI();
