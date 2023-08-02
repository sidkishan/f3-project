// Write your script here
const fnamePara = document.getElementById("fname");
const lnamePara = document.getElementById("lname");
const fname = document.getElementById("firstname");
const lname = document.getElementById("lastname");
const editNameBtn = document.getElementById("change-name");

const oldPassInput = document.getElementById("old-pass");
const newPassInput = document.getElementById("new-pass");
const confirmNewPassInput = document.getElementById("confirm-new-pass");
const changePassBtn = document.getElementById("change-password");
let currentLoggedInUser = JSON.parse(
  sessionStorage.getItem("currentLoggedInUser")
);
function updateNameOnUI() {
  currentLoggedInUser = JSON.parse(
    sessionStorage.getItem("currentLoggedInUser")
  );
  fnamePara.innerText = "First Name: " + currentLoggedInUser.firstName;
  lnamePara.innerText = "Last Name: " + currentLoggedInUser.lastName;
}
updateNameOnUI();

editNameBtn.addEventListener("click", (event) => {
  currentLoggedInUser.firstName = fname.value.trim();
  currentLoggedInUser.lastName = lname.value.trim();
  sessionStorage.setItem(
    "currentLoggedInUser",
    JSON.stringify(currentLoggedInUser)
  );
  fname.value = "";
  lname.value = "";
  updateNameOnUI();
});

//change password logic

function changePassword(old, new1, new2) {
  if (
    old.value.trim() === "" ||
    new1.value.trim() === "" ||
    new2.value.trim() === ""
  ) {
    alert("Please give a valid password");
  } else if (old.value.trim() !== currentLoggedInUser.password) {
    alert("Please give correct old password!!");
  } else {
    if (new1.value.trim() === new2.value.trim()) {
      currentLoggedInUser.password = new1.value.trim();
      sessionStorage.setItem(
        "currentLoggedInUser",
        JSON.stringify(currentLoggedInUser)
      );
      let users = JSON.parse(localStorage.getItem("users"));
      users.forEach((user) => {
        if (user.email === currentLoggedInUser.email) {
          user.password = currentLoggedInUser.password;
          localStorage.setItem("users", JSON.stringify(users));
          return;
        }
      });
    }
  }
}
changePassBtn.addEventListener("click", (event) => {
  changePassword(oldPassInput, newPassInput, confirmNewPassInput);
});
