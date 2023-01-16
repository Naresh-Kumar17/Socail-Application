firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      window.location.assign("./../pages/home.html");
    } else {
      window.location.assign("./../pages/emailVerfication.html");
    }
  } else {
    // window.location.assign("./../pages/login.html");
  }
});

let email = document.getElementById("email");
let message = document.getElementById("message");
function PasswordReset() {
  if (email.value === "") {
    message.innerHTML = "Email is Required!";
    message.style.color = "red";
    message.style.display = "block";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else {
    firebase
      .auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        message.innerHTML = "Password reset email sent!";
        message.style.color = "green";
      })
      .catch((error) => {
        message.innerHTML = error.message;
        message.style.color = "red";
      });
  }
}
