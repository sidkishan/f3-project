// const produts = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };
// Fetching data from api
let productsEndpoint = "https://fakestoreapi.com/products";

var data = null;
async function fetchProducts() {
  try {
    let response = await fetch(productsEndpoint);
    data = await response.json();
    //console.log(data);
    appendAllProductsOntoUI(data);
  } catch (err) {
    alert("some error while making network call", err);
  }
}
fetchProducts();
let cartItems = [];
let menProductsContainer = document.getElementById("men");
let womenProductsContainer = document.getElementById("women");
let jeweleryProductsContainer = document.getElementById("jewellery");
let electronicsProductsContainer = document.getElementById("electronics");
let filterMenBtn = document.getElementById("filter-men");
let filterWomenBtn = document.getElementById("filter-women");
let filterJewelleryBtn = document.getElementById("filter-jewellery");
let filterElectronicsBtn = document.getElementById("filter-electronics");
let filterAllBtn = document.getElementById("filter-all");
let searchBar = document.getElementById("search-bar");
let searchResultsContainer = document.getElementById("search-results");
let searchText = document.getElementById("search-text");

searchBar.addEventListener("keypress", appendProductsBySearchKey);
function addFunctionToButton() {
  setTimeout(() => {
    let btns = document.querySelectorAll("#addBtn");
    btns.forEach((btn1) => {
      btn1.addEventListener("click", addToCartFunctionality);
    });
  }, 1000);
}

function addToCartFunctionality(event) {
  alert("Product is added to cart!!");
  let btn = event.target;
  let div = btn.parentNode; //.getAttribute("src");
  let imgLink = div.firstChild.nextElementSibling.getAttribute("src");
  console.log(imgLink);
  cartItems.push(imgLink);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
function appendProductsBySearchKey() {
  searchResultsContainer.innerHTML = "";
  searchResultsContainer.className = "arrange";
  searchText.className = "";
  removeAllProductsFromUI();
  data.forEach((item) => {
    let x = item.title.toLowerCase().trim();
    let y = searchBar.value.trim().toLowerCase();
    if (x.includes(y)) {
      var eachItem = `<div class="item">
                    <img src="${item.image}" alt="Item" />
                    <div class="info">
                      <div class="row">
                        <div class="price">₹${item.price}</div>
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
                      <div class="row">Rating: ${item.rating.rate}</div>
                    </div>
                    <button id="addBtn">Add to Cart</button>
                    </div>`;
      searchResultsContainer.innerHTML += eachItem;
      addFunctionToButton();
    }
  });
}
function makeButtonActive(btn) {
  let categories = document.getElementsByClassName("filter");
  for (let i = 0; i < categories.length; i++) {
    categories[i].className = "filter";
  }
  btn.className = "filter active";
}
filterMenBtn.addEventListener("click", (event) => {
  removeAllProductsFromUI();
  appendMensItemsOntoUI(data);
  makeButtonActive(filterMenBtn);
});
filterWomenBtn.addEventListener("click", (event) => {
  removeAllProductsFromUI();
  appendWomensItemsOntoUI(data);
  makeButtonActive(filterWomenBtn);
});
filterJewelleryBtn.addEventListener("click", (event) => {
  removeAllProductsFromUI();
  appendJewelleryItemsOntoUI(data);
  makeButtonActive(filterJewelleryBtn);
});
filterElectronicsBtn.addEventListener("click", (event) => {
  removeAllProductsFromUI();
  appendElectronicsItemsOntoUI(data);
  makeButtonActive(filterElectronicsBtn);
});

filterAllBtn.addEventListener("click", (event) => {
  searchBar.value = "";
  searchText.className = "hidden";
  searchResultsContainer.className = "hidden arrange";
  appendAllProductsOntoUI(data);
  makeButtonActive(filterAllBtn);
});

function appendMensItemsOntoUI(data) {
  menProductsContainer.innerHTML = "";
  //For search functionality
  searchBar.value = "";
  searchText.className = "hidden";
  searchResultsContainer.className = "hidden arrange";
  data.forEach((item) => {
    var eachItem = `<div class="item">
                    <img src="${item.image}" alt="Item" />
                    <div class="info">
                      <div class="row">
                        <div class="price">₹${item.price}</div>
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
                      <div class="row">Rating: ${item.rating.rate}</div>
                    </div>
                    <button id="addBtn">Add to Cart</button>
                    </div>`;
    if (item.category === "men's clothing") {
      menProductsContainer.innerHTML += eachItem;
    }
  });
  addFunctionToButton();
}
function appendWomensItemsOntoUI(data) {
  womenProductsContainer.innerHTML = "";
  //For search functionality
  searchBar.value = "";
  searchText.className = "hidden";
  searchResultsContainer.className = "hidden arrange";
  data.forEach((item) => {
    var eachItem = `<div class="item">
                    <img src="${item.image}" alt="Item" />
                    <div class="info">
                      <div class="row">
                        <div class="price">₹${item.price}</div>
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
                      <div class="row">Rating: ${item.rating.rate}</div>
                    </div>
                    <button id="addBtn">Add to Cart</button>
                    </div>`;
    if (item.category === "women's clothing") {
      womenProductsContainer.innerHTML += eachItem;
    }
  });
  addFunctionToButton();
}
function appendJewelleryItemsOntoUI(data) {
  jeweleryProductsContainer.innerHTML = "";
  //For search functionality
  searchBar.value = "";
  searchText.className = "hidden";
  searchResultsContainer.className = "hidden arrange";
  data.forEach((item) => {
    var eachItem = `<div class="item">
                    <img src="${item.image}" alt="Item" />
                    <div class="info">
                      <div class="row">
                        <div class="price">₹${item.price}</div>
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
                      <div class="row">Rating: ${item.rating.rate}</div>
                    </div>
                    <button id="addBtn">Add to Cart</button>
                    </div>`;
    if (item.category === "jewelery") {
      jeweleryProductsContainer.innerHTML += eachItem;
    }
  });
  addFunctionToButton();
}
function appendElectronicsItemsOntoUI(data) {
  electronicsProductsContainer.innerHTML = "";
  //For search functionality
  searchBar.value = "";
  searchText.className = "hidden";
  searchResultsContainer.className = "hidden arrange";
  data.forEach((item) => {
    var eachItem = `<div class="item">
                    <img src="${item.image}" alt="Item" />
                    <div class="info">
                      <div class="row">
                        <div class="price">₹${item.price}</div>
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
                      <div class="row">Rating: ${item.rating.rate}</div>
                    </div>
                    <button id="addBtn">Add to Cart</button>
                    </div>`;
    if (item.category === "electronics") {
      electronicsProductsContainer.innerHTML += eachItem;
    }
  });
  addFunctionToButton();
}
function removeAllProductsFromUI() {
  menProductsContainer.innerHTML = "";
  womenProductsContainer.innerHTML = "";
  jeweleryProductsContainer.innerHTML = "";
  electronicsProductsContainer.innerHTML = "";
}
function appendAllProductsOntoUI(data) {
  appendMensItemsOntoUI(data);
  appendWomensItemsOntoUI(data);
  appendJewelleryItemsOntoUI(data);
  appendElectronicsItemsOntoUI(data);
}

// Fetching data from api
// let productsEndpoint = "https://fakestoreapi.com/products";
// var data = null;
// async function fetchProducts() {
//   try {
//     let response = await fetch(productsEndpoint);
//     data = await response.json();
//     //console.log(data);
//     appendAllProductsOntoUI(data);
//   } catch (err) {
//     alert("some error while making network call", err);
//   }
// }
// fetchProducts();
