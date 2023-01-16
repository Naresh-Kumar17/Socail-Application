setTimeout(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          window.location.assign("./pages/home.html");
        } else {
          window.location.assign("./pages/emailVerfication.html")
        }
      } else {
        window.location.assign("./pages/login.html");
      }
    });
  }, 1000);