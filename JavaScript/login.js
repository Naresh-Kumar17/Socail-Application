firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      window.location.assign("./home.html");
    } else {
      window.location.assign("./pages/emailVerfication.html");
    }
  } else {
    // window.location.assign("./../pages/login.html");
  }
});

let email = document.getElementById("email");
let password = document.getElementById("password");
let message = document.getElementById("message");

function loginhandler() {
  if (email.value === "") {
    message.innerHTML = "Please enter email";
    message.style.color = "red";
    message.style.display = "block";
    email.focus();
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (password.value === "") {
    message.innerHTML = "Please enter password";
    message.style.color = "red";
    message.style.display = "block";
    password.focus();
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else {
    // console.log("Email :" + email.value, "Password" + password.value);
let ary={
    email:email.value,
    password:password.value,
}
    firebase
      .auth()
      .signInWithEmailAndPassword(ary.email, ary.password)
      .then((resolve) => {
        console.log(resolve);
        message.innerHTML = "Login Succeed";
        message.style.color = "green";
     
        setTimeout(() => {
          window.location.assign("./../pages/home.html");
        }, 2000);
      })
      .catch((reject) => {
        message.innerHTML = reject.message;
        message.style.color = "red";
        setTimeout(() => {
          message.style.display = "none";
        }, 2000);
      });
  }
}
