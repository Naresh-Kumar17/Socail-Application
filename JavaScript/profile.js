let profileinfo = document.getElementById("twobuttons");
let profiledata = document.getElementById("profiledata");
profiledata.style.display = "block";
let Userprofile = document.getElementById("Userprofilebutto");
profileinfo.appendChild(Userprofile);

let currentuserpostbuton = document.getElementById("currentuserpost");
profileinfo.appendChild(currentuserpostbuton);
let logineduserpost = document.getElementById("logineduserpost");
logineduserpost.style.display = "none";

currentuserpostbuton.addEventListener("click", () => {
  profiledata.style.display = "none";
  logineduserpost.style.display = "block";
  currentuserpostbuton.style.backgroundColor = "#0000ff";
  currentuserpostbuton.style.color = "white";
  Userprofile.style.backgroundColor = "white";
  Userprofile.style.color = "#0000ff";
});
Userprofile.addEventListener("click", () => {
  profiledata.style.display = "block";
  logineduserpost.style.display = "none";
  Userprofile.style.backgroundColor = "#0000ff";
  Userprofile.style.color = "white";
  currentuserpostbuton.style.backgroundColor = "white";
  currentuserpostbuton.style.color = "#0000ff";
});

//*<div id="container-inner-child">
{
  /* <div>
    <img src="./../icons/user (3).png" alt="user profile" id="userProfile">
</div>
<div>
    <input type="text" id="" placeholder="What's on your mind,">
</div>
</div> */
}

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let MobileNumber = document.getElementById("MobileNumber");
let email = document.getElementById("email");
let password = document.getElementById("password");
let message = document.getElementById("message");
let profileimage = document.getElementById("profileimage");
let coverImages = document.getElementById("coverImages");
let discriptionbox = document.getElementById("discriptionbox");
var uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log(user);
    uid = user.uid;
    if (user.emailVerified) {
      firebase
        .firestore()
        .collection("users/")
        .doc(uid)
        .get()
        .then((res) => {
          let currentUserData = res.data();
          console.log(currentUserData);
          firstName.setAttribute("value", currentUserData.firstName);
          lastName.setAttribute("value", currentUserData.lastName);
          MobileNumber.setAttribute("value", currentUserData.MobileNumber);
          email.setAttribute("value", currentUserData.email);
          password.setAttribute("value", currentUserData.password);
          profileimage.setAttribute(
            "src",
            currentUserData.profileImagePath === ""
              ? "./../icons/user (3).png"
              : currentUserData.profileImagePath
          );
          coverImages.setAttribute(
            "src",
            currentUserData.coverImagePath === ""
              ? "./../icons/cover-image.png"
              : currentUserData.coverImagePath
          );
          //target user posts
          let topusepic = document.createElement("img");
          topusepic.setAttribute(
            "src",
            currentUserData.coverImagePath === ""
              ? "./../icons/cover-image.png"
              : currentUserData.coverImagePath
          );

          firebase
            .firestore()
            .collection("posts/")
            .onSnapshot((userspost) => {
              if (userspost.size === 0) {
                let h1 = document.createElement("h1");
                h1.innerHTML = "no data available";
                h1.setAttribute("id", "h1");
                h1.style.display = "block";
              } else {
                userspost.forEach((loginedpost) => {
                  if (loginedpost.data().uid === user.uid) {
                    // var filetype = userspost.data().FileType;
                    // var filesrc = userspost.data().fileURl;
                    // loop
                    for (
                      var postIndex = 0;
                      postIndex < loginedpost.length;
                      postIndex++
                    ) {
                      let likeArray = loginedpost[postIndex].like;
                      let dislikeArray = loginedpost[postIndex].dislike;
                      let commentArray = loginedpost[postIndex].comment;
                      console.log(loginedpost.data().postValue);
                      // show post details
                      var post = document.createElement("div");
                      logineduserpost.appendChild(post);
                      post.setAttribute("class", "post");
                      // post header
                      var postHeader = document.createElement("div");
                      post.appendChild(postHeader);
                      postHeader.setAttribute("class", "postHeader");
                      // user profile
                      let userProfile = document.createElement("img");
                      postHeader.appendChild(userProfile);
                      userProfile.setAttribute("class", "postProfile");

                      //main input with profile

                      let containerInner =
                        document.getElementById("container-inner");
                      containerInner.appendChild(postHeader);
                      let containerinnerchild = document.createElement("div");
                      containerInner.appendChild(containerinnerchild);
                      let divforprofile = document.createElement("div");
                      containerinnerchild.appendChild(divforprofile);
                      let inputdiv = document.createElement("div");
                      containerinnerchild.appendChild(inputdiv);
                      let inputmain = document.createElement("input");
                      inputmain.setAttribute("id", "Postinput");


                      
                      // user name

                      let usernameAnddate = document.createElement("div");
                      postHeader.appendChild(usernameAnddate);

                      var userName = document.createElement("p");
                      usernameAnddate.appendChild(userName);
                      userName.setAttribute("id", "username");
                      // get user data
                      firebase
                        .firestore()
                        .collection("users/")
                        .doc(loginedpost[postIndex].uid)
                        .get()
                        .then((userData) => {
                          userProfile.setAttribute(
                            "src",
                            userData.data().profileImagePath === ""
                              ? "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png"
                              : userData.data().profileImagePath
                          );

                          let userNameText = document.createTextNode(
                            `${userData.data().firstName} ${
                              userData.data().lastName
                            }`
                          );
                          inputmain.setAttribute(
                            "placeholder",
                            `What's on your mind ${userNameText}`
                          );
                          userName.appendChild(userNameText);
                          // let inputValue=document.getElementById("inputValue");
                          // inputValue:placeholder
                        });
                      // created date

                      var createdDate = document.createElement("p");
                      usernameAnddate.appendChild(createdDate);
                      let createdDateText =
                        document.createTextNode("10, 08, 2022");
                      createdDate.appendChild(createdDateText);

                      // post details

                      var postDetails = document.createElement("p");
                      post.appendChild(postDetails);
                      let postDetailsText = document.createTextNode(
                        loginedpost[postIndex].postValue
                      );
                      postDetails.appendChild(postDetailsText);

                      // image or videos
                      if (loginedpost[postIndex].fileURl !== "") {
                        // image
                        if (
                          loginedpost[postIndex].fileType === "image/png" ||
                          loginedpost[postIndex].fileType === "image/jpeg" ||
                          loginedpost[postIndex].fileType === "image/jpg"
                        ) {
                          let postImage = document.createElement("img");
                          post.appendChild(postImage);
                          postImage.setAttribute("class", "postImage");
                          postImage.setAttribute(
                            "src",
                            loginedpost[postIndex].fileURl
                          );
                        } else {
                          // video
                          let video = document.createElement("video");
                          post.appendChild(video);
                          video.setAttribute("controls", "true");
                          video.setAttribute("class", "postVideo");
                          let source = document.createElement("source");
                          video.appendChild(source);
                          source.setAttribute(
                            "src",
                            loginedpost[postIndex].fileURl
                          );
                          source.setAttribute("type", "video/mp4");
                        }
                      }
                      // post footer
                      let footerMain = document.createElement("div");
                      post.appendChild(footerMain);
                      footerMain.setAttribute("class", "footerMain");
                      let reactiondiv = document.createElement("div");
                      footerMain.appendChild(reactiondiv);
                      reactiondiv.setAttribute("id", "reactiondiv");
                      // like button
                      let likeButton = document.createElement("button");
                      reactiondiv.appendChild(likeButton);
                      likeButton.setAttribute("id", "likebutonreaction");
                      var likeicons = document.createElement("i");
                      likeButton.appendChild(likeicons);
                      likeicons.setAttribute(
                        "class",
                        "fa-regular fa-thumbs-up"
                      );

                      let likeletter = document.createElement("span");
                      likeButton.appendChild(likeletter);
                      likeletter.innerHTML = `like (${likeArray.length})`;

                      likeButton.setAttribute("id", postIndex);
                      if (likeArray.length === 0) {
                        likeButton.style.color = "black";
                      } else {
                        for (
                          let checkLikeIndex = 0;
                          checkLikeIndex < likeArray.length;
                          checkLikeIndex++
                        ) {
                          if (likeArray[checkLikeIndex] === uid) {
                            likeButton.style.color = "blue";
                          } else {
                            likeButton.style.color = "black";
                          }
                        }
                      }
                      // dislike button
                      let dislikeButton = document.createElement("button");

                      reactiondiv.appendChild(dislikeButton);
                      var dislikeicon = document.createElement("i");
                      dislikeButton.appendChild(dislikeicon);
                      dislikeicon.setAttribute(
                        "class",
                        "fa-regular fa-thumbs-down"
                      );

                      let dislikeletter = document.createElement("span");
                      dislikeButton.appendChild(dislikeletter);
                      dislikeletter.innerHTML = `Dislike (${dislikeArray.length})`;
                      // // dislikeButton.innerHTML = `Dislike ${dislikeArray.length}`;
                      dislikeButton.setAttribute("id", postIndex);
                      if (dislikeArray.length === 0) {
                        dislikeButton.style.color = "black";
                      } else {
                        for (
                          let checkDislikeIndex = 0;
                          checkDislikeIndex < dislikeArray.length;
                          checkDislikeIndex++
                        ) {
                          if (dislikeArray[checkDislikeIndex] === uid) {
                            dislikeButton.style.color = "blue";
                          } else {
                            dislikeButton.style.color = "black";
                          }
                        }
                      }
                      // comment button
                      let commentButton = document.createElement("button");
                      reactiondiv.appendChild(commentButton);
                      //<i class="fa-solid fa-messages"></i>
                      let commenticon = document.createElement("i");
                      commentButton.appendChild(commenticon);
                      commenticon.setAttribute(
                        "class",
                        "fa-regular fa-messages"
                      );

                      let commentletter = document.createElement("span");
                      commentButton.appendChild(commentletter);
                      commentletter.innerHTML = `Comment (${commentArray.length})`;

                      // commentButton.innerHTML = `Comment (${commentArray.length})`;
                      {
                        // show comment
                        if (commentArray.length !== 0) {
                          let showCommentMain = document.createElement("div");
                          post.appendChild(showCommentMain);
                          // comment
                          for (var i = 0; i < commentArray.length; i++) {
                            let comment = document.createElement("div");
                            showCommentMain.appendChild(comment);
                            comment.setAttribute("class", "comment");
                            // comment profile
                            let commentprofieldiv =
                              document.createElement("div");
                            comment.appendChild(commentprofieldiv);

                            let comentProfile = document.createElement("img");
                            commentprofieldiv.appendChild(comentProfile);
                            comentProfile.setAttribute(
                              "class",
                              "comentProfile"
                            );
                            // comment user name
                            let commentuserdiv = document.createElement("div");
                            commentuserdiv.setAttribute("id", "commentuserdiv");
                            comment.appendChild(commentuserdiv);
                            let commentUserName = document.createElement("p");
                            commentUserName.setAttribute(
                              "id",
                              "commentusername"
                            );
                            commentuserdiv.appendChild(commentUserName);
                            // get user data
                            console.log("all comments", commentArray[i]);
                            firebase
                              .firestore()
                              .collection("users/")
                              .doc(commentArray[i].uid)
                              .get()
                              .then((commentUserData) => {
                                console.log(commentUserData.data());
                                comentProfile.setAttribute(
                                  "src",
                                  commentUserData.data().profileImagePath === ""
                                    ? "https://image.shutterstock.com/image-vector/human-head-vector-isolated-260nw-147002768.jpg"
                                    : commentUserData.data().profileImagePath
                                );

                                let commentUserNamerText =
                                  document.createTextNode(
                                    `${commentUserData.data().firstName} ${
                                      commentUserData.data().lastName
                                    }`
                                  );
                                commentUserName.appendChild(
                                  commentUserNamerText
                                );
                              });

                            // comment details
                            let commnetDetails = document.createElement("p");
                            commentuserdiv.appendChild(commnetDetails);
                            let commnetDetailsText = document.createTextNode(
                              commentArray[i].commentValue
                            );
                            commnetDetails.appendChild(commnetDetailsText);
                          }
                        }
                      }
                      // write comment
                      var writeCommentMain = document.createElement("div");
                      post.appendChild(writeCommentMain);
                      var textarea = document.createElement("input");
                      textarea.setAttribute("placeholder", "write comment");
                      writeCommentMain.appendChild(textarea);
                      textarea.setAttribute("class", "commentinput");
                      textarea.setAttribute("id", `textarea${postIndex}`);
                      // add commnet
                      let addcommentButton = document.createElement("button");
                      addcommentButton.setAttribute(
                        "class",
                        "commentbuttonicon"
                      );
                      writeCommentMain.appendChild(addcommentButton);
                      let commentIcon = document.createElement("img");
                      addcommentButton.appendChild(commentIcon);
                      commentIcon.setAttribute(
                        "src",
                        "./../icons/paper-plane.png"
                      );
                      commentIcon.setAttribute("class", "commenticon");
                      addcommentButton.setAttribute("id", postIndex);
                      // like function
                      likeButton.addEventListener("click", () => {
                        let like = false;
                        for (
                          let likeIndex = 0;
                          likeIndex < likeArray.length;
                          likeIndex++
                        ) {
                          if (likeArray[likeIndex] === uid) {
                            like = true;
                            likeArray.splice(likeIndex, 1);
                          }
                        }
                        if (!like) {
                          likeArray.push(uid);
                        }
                        // update like
                        firebase
                          .firestore()
                          .collection("posts/")
                          .doc(loginedpost[likeButton.id].id)
                          .update({
                            like: likeArray,
                          });
                      });
                      // dislike function
                      dislikeButton.addEventListener("click", () => {
                        let dislike = false;
                        for (
                          let dislikeIndex = 0;
                          dislikeIndex < dislikeArray.length;
                          dislikeIndex++
                        ) {
                          if (dislikeArray[dislikeIndex] === uid) {
                            dislike = true;
                            dislikeArray.splice(dislikeIndex, 1);
                          }
                        }
                        if (!dislike) {
                          dislikeArray.push(uid);
                        }
                        //
                        firebase
                          .firestore()
                          .collection("posts/")
                          .doc(loginedpost[dislikeButton.id].id)
                          .update({
                            dislike: dislikeArray,
                          });
                      });
                      // comment function
                      addcommentButton.addEventListener("click", () => {
                        let targetTextarea = document.getElementById(
                          `textarea${addcommentButton.id}`
                        );
                        if (targetTextarea.value === "") {
                          alert("type something...");
                        } else {
                          let commentData = {
                            commentValue: targetTextarea.value,
                            uid: uid,
                          };
                          commentArray.push(commentData);
                          // comment update
                          firebase
                            .firestore()
                            .collection("posts/")
                            .doc(loginedpost[addcommentButton.id].id)
                            .update({
                              comment: commentArray,
                            });
                        }
                      });
                    }
                  }
                });
              }
            });
        });
    } else {
      window.location.assign("./../pages/emailVerification.html");
    }
  } else {
    window.location.assign("./../pages/login.html");
  }
});

//update
let updateProfileDetails = () => {
  let updateProfileDetails = {
    firstName: firstName.value,
    lastName: lastName.value,
    MobileNumber: MobileNumber.value,
    password: password.value,
    discriptionbox: discriptionbox.value,
  };
  firebase
    .firestore()
    .collection("users/")
    .doc(uid)
    .update(updateProfileDetails)
    .then(() => {
      //   alert("Profile Deatils has been updated")
      message.innerHTML = "Profile Deatils has been updated";
      message.style.color = "green";
      message.style.display = "block";

      setTimeout(() => {
        message.style.display = "none";
      }, 2000);
    });
};

//upload pic
let profilepic = (event) => {
  var coverimagepath = event.target.files[0];
  var storageRef = firebase.storage().ref();
  // var prfileImage = storageRef.child(`profileImage/${coverimagepath.name}`);
  // prfileImage.put(coverimagepath).then((snapshot) => {
  //   console.log("Uploaded");
  // });
  var progressDiv = document.getElementById("progress");
  var progressBar = document.getElementById("progressBar");
  var uploadTask = storageRef.child(`profileImage/${uid}`).put(coverimagepath);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      progressDiv.style.display = "block";
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      var uploadedPercentage = Math.round(progress);
      progressBar.style.width = `${uploadedPercentage}%`;
      progressBar.innerHTML = `${uploadedPercentage}%`;
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        profileimage.setAttribute("src", downloadURL);
        firebase
          .firestore()
          .collection("users/")
          .doc(uid)
          .update({ profileImagePath: downloadURL })
          .then(() => {
            progressDiv.style.display = "none";
          });
      });
    }
  );
};

let coverpicture = (event) => {
  var coverimagepath = event.target.files[0];
  var storageRef = firebase.storage().ref();
  // var prfileImage = storageRef.child(`profileImage/${coverimagepath.name}`);
  // prfileImage.put(coverimagepath).then((snapshot) => {
  //   console.log("Uploaded");
  // });
  var progressDiv = document.getElementById("progress");
  var progressBar = document.getElementById("progressBar");
  var uploadTask = storageRef.child(`coverImage/${uid}`).put(coverimagepath);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      progressDiv.style.display = "block";
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      var uploadedPercentage = Math.round(progress);
      progressBar.style.width = `${uploadedPercentage}%`;
      progressBar.innerHTML = `${uploadedPercentage}%`;
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        coverImages.setAttribute("src", downloadURL);
        firebase
          .firestore()
          .collection("users/")
          .doc(uid)
          .update({ coverImagePath: downloadURL })
          .then(() => {
            progressDiv.style.display = "none";
          });
      });
    }
  );
};
