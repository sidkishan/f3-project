//Login functionality
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (emailInput.value.trim() === "" || passInput.value.trim() === "") {
    alert("All fields are mandatory");
  } else {
    let users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      let currUser = users.find((user) => {
        return user.email === emailInput.value.trim();
      });
      if (currUser) {
        if (passInput.value.trim() === currUser.password) {
          sessionStorage.setItem(
            "currentLoggedInUser",
            JSON.stringify(currUser)
          );
          window.location.href = "../profile";
          alert("login Successfull");
        } else {
          alert("wrong password!!!");
        }
      } else {
        alert("You have not signed up!!");
      }
    } else {
      alert("You are not registered to this application");
    }
  }
});
