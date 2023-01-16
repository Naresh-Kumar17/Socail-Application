var uid;
let postheaderr = document.getElementById("postheader");
let loadar = document.getElementById("loadar");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    if (user.emailVerified) {
      console.log("verified");
      // get all posts
      firebase
        .firestore()
        .collection("posts/")
        .onSnapshot(async (querySnapshot) => {
          loadar.style.display = "none";
          postheaderr.style.display = "block";
          postheaderr.innerHTML = "";
          var allPosts = [];
          // querySnapshot.docChanges().forEach((change) => {
          //   console.log(change.doc.data());
          // });
          if (querySnapshot.size === 0) {
            var message = document.createElement("h1");
            postheaderr.appendChild(message);
            message.innerHTML = "no data available";
          } else {
            querySnapshot.forEach((res) => {
              allPosts.push(res.data());
            });
            // loop
            for (var postIndex = 0; postIndex < allPosts.length; postIndex++) {
              let likeArray = allPosts[postIndex].like;
              let dislikeArray = allPosts[postIndex].dislike;
              let commentArray = allPosts[postIndex].comment;
              // show post details
              var post = document.createElement("div");
              postheaderr.appendChild(post);
              post.setAttribute("class", "post");
              // post header
              var postHeader = document.createElement("div");
              post.appendChild(postHeader);
              postHeader.setAttribute("class", "postHeader");
              // user profile
              let userProfile = document.createElement("img");
              postHeader.appendChild(userProfile);
              userProfile.setAttribute("class", "postProfile");
              // user name
              let usernameAnddate = document.createElement("div");
              postHeader.appendChild(usernameAnddate);

              var userName = document.createElement("p");
              usernameAnddate.appendChild(userName);
              userName.setAttribute("id", "username");
              // get user data
              await firebase
                .firestore()
                .collection("users/")
                .doc(allPosts[postIndex].uid)
                .get()
                .then((userData) => {
                  userProfile.setAttribute(
                    "src",
                    userData.data().profileImagePath === ""
                      ? "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png"
                      : userData.data().profileImagePath
                  );
                  let userNameText = document.createTextNode(
                    `${userData.data().firstName} ${userData.data().lastName}`
                  );
                  userName.appendChild(userNameText);
                  // let inputValue=document.getElementById("inputValue");
                  // inputValue:placeholder
                });
              // created date

              var createdDate = document.createElement("p");
              usernameAnddate.appendChild(createdDate);
              let createdDateText = document.createTextNode("10, 08, 2022");
              createdDate.appendChild(createdDateText);

              // post details

              var postDetails = document.createElement("p");
              post.appendChild(postDetails);
              let postDetailsText = document.createTextNode(
                allPosts[postIndex].postValue
              );
              postDetails.appendChild(postDetailsText);

              // image or videos
              if (allPosts[postIndex].fileURl !== "") {
                // image
                if (
                  allPosts[postIndex].fileType === "image/png" ||
                  allPosts[postIndex].fileType === "image/jpeg" ||
                  allPosts[postIndex].fileType === "image/jpg"
                ) {
                  let postImage = document.createElement("img");
                  post.appendChild(postImage);
                  postImage.setAttribute("class", "postImage");
                  postImage.setAttribute("src", allPosts[postIndex].fileURl);
                } else {
                  // video
                  let video = document.createElement("video");
                  post.appendChild(video);
                  video.setAttribute("controls", "true");
                  video.setAttribute("class", "postVideo");
                  let source = document.createElement("source");
                  video.appendChild(source);
                  source.setAttribute("src", allPosts[postIndex].fileURl);
                  source.setAttribute("type", "video/mp4");
                }
              }
              // post footer
              let footerMain = document.createElement("div");
              post.appendChild(footerMain);
              footerMain.setAttribute("class", "footerMain");
              let reactiondiv=document.createElement("div");
              footerMain.appendChild(reactiondiv);
              reactiondiv.setAttribute("id","reactiondiv")
              // like button
              let likeButton = document.createElement("button");
              likeButton.style.backgroundColor="none"
              reactiondiv.appendChild(likeButton);
              likeButton.setAttribute("id","likebutonreaction")
              var likeicons = document.createElement("i");
              likeButton.appendChild(likeicons);
              likeicons.setAttribute("class", "fa-regular fa-thumbs-up");

              let likeletter=document.createElement("span");
              likeButton.appendChild(likeletter);
              likeletter.innerHTML=`like (${likeArray.length})`

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
              dislikeicon.setAttribute("class", "fa-regular fa-thumbs-down");

              let dislikeletter=document.createElement("span");
              dislikeButton.appendChild(dislikeletter);
              dislikeletter.innerHTML=`Dislike (${dislikeArray.length})`
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
              let commenticon=document.createElement("i");
              commentButton.appendChild(commenticon);
              commenticon.setAttribute("class","fa-regular fa-messages");

              let commentletter=document.createElement("span");
              commentButton.appendChild(commentletter);
              commentletter.innerHTML=`Comment (${commentArray.length})`

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
                    let commentprofieldiv = document.createElement("div");
                    comment.appendChild(commentprofieldiv);

                    let comentProfile = document.createElement("img");
                    commentprofieldiv.appendChild(comentProfile);
                    comentProfile.setAttribute("class", "comentProfile");
                    // comment user name
                    let commentuserdiv = document.createElement("div");
                    commentuserdiv.setAttribute("id", "commentuserdiv");
                    comment.appendChild(commentuserdiv);
                    let commentUserName = document.createElement("p");
                    commentUserName.setAttribute("id", "commentusername");
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

                        let commentUserNamerText = document.createTextNode(
                          `${commentUserData.data().firstName} ${
                            commentUserData.data().lastName
                          }`
                        );
                        commentUserName.appendChild(commentUserNamerText);
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
              addcommentButton.setAttribute("class", "commentbuttonicon");
              writeCommentMain.appendChild(addcommentButton);
              let commentIcon = document.createElement("img");
              addcommentButton.appendChild(commentIcon);
              commentIcon.setAttribute("src", "./../icons/paper-plane.png");
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
                  .doc(allPosts[likeButton.id].id)
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
                  .doc(allPosts[dislikeButton.id].id)
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
                    .doc(allPosts[addcommentButton.id].id)
                    .update({
                      comment: commentArray,
                    });
                }
              });
            }
          }
        });
    } else {
      window.location.assign("./email-verification.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});

let Logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("./../pages/login.html");
    });
};
