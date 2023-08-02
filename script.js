// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmpassword");
const signUpBtn = document.getElementById("signup-btn");

function checkIfUserExists(email) {
  let users = JSON.parse(localStorage.getItem("users"));
  //users will be array of objects
  const isUserExists = users.find((user) => {
    return user.email === email;
  });
  if (isUserExists) return true;
  else return false;
}

function saveUser(fname, lname, emailInput, passwordInput) {
  let userObj = {
    firstName: fname,
    lastName: lname,
    email: emailInput,
    password: passwordInput,
  };
  let users = JSON.parse(localStorage.getItem("users"));
  if (users == null) {
    users = [];
  }
  users.push(userObj);
  localStorage.setItem("users", JSON.stringify(users));
  //write logic for that the current user is logged in till this tab is open
  sessionStorage.setItem("currentLoggedInUser", JSON.stringify(userObj));
  //clearing the input fields
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  alert("user logged in successfully!!");
  //redirect to user's profile page
  window.location.href = "./profile/index.html";
}

signUpBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (firstName.value.trim() === "") {
    alert("all fields are mandatory");
  } else {
    if (password.value.trim() !== confirmPassword.value.trim()) {
      alert("password and confirm Password should match!!!");
      password.value = "";
      confirmPassword.value = "";
    } else {
      //if the user is already registered or not
      if (localStorage.getItem("users")) {
        if (checkIfUserExists(email.value)) {
          alert("email is already registered!!");
        } else {
          saveUser(
            firstName.value,
            lastName.value,
            email.value,
            password.value
          );
        }
      } else {
        saveUser(firstName.value, lastName.value, email.value, password.value);
      }
    }
  }
});
