// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     if (user.emailVerified) {
//       window.location.assign("./../pages/home.html");
//     } else {
//       window.location.assign("./../pages/emailVerfication.html");
//     }
//   } else {
//     window.location.assign("./../pages/login.html");
//   }
// });

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let MobileNumber = document.getElementById("MobileNumber");
let email = document.getElementById("email");
let password = document.getElementById("password");
let ReEnterPassword = document.getElementById("ReEnterPassword");
let message = document.getElementById("message");
function SignUp() {
  if (firstName.value === "") {
    message.innerHTML = "Please enter first name";
    message.style.color = "red";
    message.style.display = "block";
    firstName.focus();
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (lastName.value === "") {
    message.innerHTML = "Please enter last name";
    message.style.color = "red";
    message.style.display = "block";
    lastName.focus();
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (MobileNumber.value === "") {
    message.innerHTML = "Please enter Mobile Number";
    message.style.color = "red";
    message.style.display = "block";
    MobileNumber.focus();
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (MobileNumber.value.length < 11) {
    message.innerHTML = "Please enter 11 digits Mobile Number";
    message.style.color = "red";
    message.style.display = "block";
    MobileNumber.focus();
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (email.value === "") {
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
  } else if (ReEnterPassword.value === "") {
    message.innerHTML = "Please enter password again";
    message.style.color = "red";
    message.style.display = "block";
    ReEnterPassword.focus();
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (ReEnterPassword.value !== password.value) {
    message.innerHTML = "Password doesn't matched! Please enter same password";
    message.style.color = "red";
    message.style.display = "block";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else {
    let ary = {
      firstName: firstName.value,
      lastName: lastName.value,
      MobileNumber: MobileNumber.value,
      email: email.value,
      password: password.value,
      profileImagePath: "",
      coverImagePath:"",
      discriptionbox:""
    };
    // let userId = firebase.auth().currentUser.uid;
    firebase
      .auth()
      .createUserWithEmailAndPassword(ary.email, ary.password)
      .then((res) => {
        message.innerHTML = "Successfully SignUped";
        message.style.color = "green";
        var user = res.user;
        res.user.sendEmailVerification();
        setTimeout(() => {
          window.location.assign("./../pages/emailVerfication.html");
        }, 2000);

        
        firebase
        .firestore()
        .collection("users/")
        .doc(res.user.uid)
        .set(ary)
        .then((resolve) => {
          console.log(resolve)
        })
        .catch((err) => {
          message.innerHTML = err.message;
          message.style.color = "red";
        });
      })
      .catch((error) => {
        message.innerHTML = error.message;
        message.style.color = "red";
        message.style.display = "block";
        setTimeout(() => {
          message.style.display = "none";
        }, 2000);
      });
    console.log(ary);
    
  }
}
