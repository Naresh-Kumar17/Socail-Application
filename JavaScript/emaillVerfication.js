let Email = document.getElementById("Email");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user)
    if (user.emailVerified) {
      window.location.assign("./../pages/home.html");
    } else {
      // window.location.assign("./../pages/emailVerfication.html");
      Email.innerHTML = user.email;
    }
  } else {
    window.location.assign("./pages/login.html");
  }
});
let message = document.getElementById("message");
function ResendEmail() {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      message.innerHTML = "Email verification sent successfully!";
      message.style.color = "green";
    })
    .catch((error) => {
      message.innerHTML = error.message;
      message.style.color = "red";
    });
}
function Reload(){
    location.reload();
}
