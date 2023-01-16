firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      firebase
        .firestore()
        .collection("users")
        .onSnapshot((users) => {
          document.getElementById("loader").style.display = "none";
          users.forEach((usersdetail) => {
            var Name =   `${usersdetail.data().firstName} ${usersdetail.data().lastName}`;
            var user = document.getElementById("allusers");
            var userdetails = document.createElement("div");
            user.appendChild(userdetails);
            userdetails.setAttribute("id", "userdetailsdiv");

            var userimgmain = document.createElement("div");
            userdetails.appendChild(userimgmain);
            userimgmain.setAttribute("class", "userimg");

            var userimg = document.createElement("img");
            userimgmain.appendChild(userimg);
            userimg.setAttribute("src", "./../icons/user (3).png");
            if(usersdetail.data().profileImagePath !== ""){
              userimg.setAttribute("src" , usersdetail.data().profileImagePath)
            }
            userimg.setAttribute("class" , "profilepicture")
            


            var userdata = document.createElement("div");
            userdetails.appendChild(userdata);
            userdata.setAttribute("id", "data");

            var username = document.createElement("p");
            userdata.appendChild(username);
            username.setAttribute("class", "username");
            username.innerHTML = `${usersdetail.data().firstName} ${usersdetail.data().lastName}`;

            var postdate = document.createElement("p");
            userdata.appendChild(postdate);
            postdate.setAttribute("class", "postdate");
            postdate.innerHTML = "05-04-2015";

            var dropdown = document.createElement("div");
            userdetails.appendChild(dropdown);
            dropdown.setAttribute("id", "dropdown");

            var dropdownshow = document.createElement("i");
            dropdown.appendChild(dropdownshow);
            dropdownshow.setAttribute("class","fa-solid fa-angle-down dropdownbutton");
            dropdownshow.setAttribute("id", "dropdownshow");

            var hidedropdown = document.createElement("i");
            dropdown.appendChild(hidedropdown);
            hidedropdown.setAttribute("class","fa-solid fa-angle-up dropdownbutton");
            hidedropdown.setAttribute("id", "hidedropdown");

            var userprofile = document.createElement("div");
            user.appendChild(userprofile);
            userprofile.setAttribute("id", "userprofilemain");
            userprofile.style.marginBottom = "5px";

            var coverpicture = document.createElement("img");
            userprofile.appendChild(coverpicture);
            coverpicture.setAttribute("id", "coverpicture");
            // coverpicture.setAttribute("class" , "col-12")
            coverpicture.setAttribute("src","./../icons/cover-image.png");
            if(usersdetail.data().coverImagePath !== ""){
              coverpicture.setAttribute("src" , usersdetail.data().coverImagePath)
            }

            var profilepicture = document.createElement("img");
            userprofile.appendChild(profilepicture);
            profilepicture.setAttribute("id", "userprofilepicture");
            profilepicture.setAttribute("src" , "./../icons/user (3).png")
            if(usersdetail.data().profileImagePath !== ""){
              profilepicture.setAttribute("src" , usersdetail.data().profileImagePath)
            }
            profilepicture.setAttribute("class", "largeprofilepicture")

            var usernameondetails = document.createElement("p");
            userprofile.appendChild(usernameondetails);
            usernameondetails.setAttribute("class" , "username");
            usernameondetails.innerHTML =  `${usersdetail.data().firstName} ${usersdetail.data().lastName}`;;


            dropdownshow.addEventListener("click" ,()=>{
                hidedropdown.style.display = "block"
                dropdownshow.style.display = "none"
                userprofile.style.display = "flex"
                hidedropdown.style.width="100%"

            })

            hidedropdown.addEventListener("click" ,()=>{
                dropdownshow.style.display = "block"
                hidedropdown.style.display = "none"
                userprofile.style.display = "none";
                hidedropdown.style.width="100%"
            })
          });
        });
    } else {
      window.location.assign("./emailverified.html");
    }
  } else {
    window.location.assign("./Login.html");
  }
});
