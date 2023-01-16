var uid;
let fileURl = "";
let fileType = "";

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log(user);
    if (user.emailVerified) {
      uid = user.uid;
      console.log("verified");
    } else {
      window.location.assign("./../pages/emailVerfication.html");
    }
  } else {
    window.location.assign("./../pages/login.html");
  }
});

//add textarea

let textarea = document.getElementById("textarea");
let message = document.getElementById("message");
let uploadPost = () => {
  // alert("helooo")
  let posts = {
    postValue: textarea.value,
    fileType: fileType,
    fileURl: fileURl,
    like: [],
    dislike: [],
    comment: [],
    uid: uid,
  };
  console.log(posts);

  // //add data in firestore
  firebase
    .firestore()
    .collection("posts/")
    .add(posts)
    .then((response) => {
      message.innerHTML = "Uploaded";
      message.style.color = "green";
      firebase
        .firestore()
        .collection("posts/")
        .doc(response.id)
        .update({
          id: response.id,
        })
        .then(() => {
          setTimeout(() => {
            location.reload();
          }, 2000);
        });
    })
    .catch((error) => {
      message.innerHTML = error.message;
      message.style.color = "red";
    });
};

//upload image or video
let uploadpost = (event) => {
  let postpic = event.target.files[0];
  var storageRef = firebase.storage().ref();
  fileType = postpic.type;
  var progressDiv = document.getElementById("progress");
  var progressBar = document.getElementById("progressBar");
  var uploadTask = storageRef.child(`Postfile/ ${postpic.name}`).put(postpic);

  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
      progressDiv.style.display = "block";
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      var uploadedPercentage = Math.round(progress);
      progressBar.style.width = `${uploadedPercentage}%`;
      progressBar.innerHTML = `${uploadedPercentage}%`;
    },
    (error) => {
      console.log(error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        // postpic.setAttribute("src", downloadURL);
        firebase
          .firestore()
          .collection("users/")
          .doc(uid)
          .update({ postpic: downloadURL })
          .then(() => {
            progressDiv.style.display = "none";
          });
      });
    }
  );
};
