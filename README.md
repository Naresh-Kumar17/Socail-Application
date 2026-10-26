# Social Application

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
</div>

A modern-style social media web application built with HTML, CSS, JavaScript, and Firebase. Users can sign up, log in, verify email, create posts, like/dislike content, add comments, view friends, watch videos, and manage their profile.

> This project is a front-end social application prototype that uses Firebase Authentication and Firestore for data storage.

---

## ✨ Features

- User registration and login
- Email verification flow
- Password recovery
- Home feed with posts
- Create post with image/video support
- Like and dislike reactions
- Commenting on posts
- Friends page
- Videos page
- User profile and settings
- Responsive dashboard-style layout

---

## 🧩 Tech Stack

- HTML5
- CSS3
- JavaScript
- Firebase Authentication
- Firebase Firestore
- Firebase Realtime Database

---

## 📁 Project Structure

```bash
Socail-Application/
├── index.html
├── MainCss/
│   └── main.css
├── JavaScript/
│   ├── create-post.js
│   ├── emaillVerfication.js
│   ├── friends.js
│   ├── home.js
│   ├── loader.js
│   ├── login.js
│   ├── passwordForgot.js
│   ├── profile.js
│   ├── signUp.js
│   └── videos.js
├── pages/
│   ├── create-post.html
│   ├── emailVerfication.html
│   ├── friends.html
│   ├── home.html
│   ├── login.html
│   ├── passwordForgot.html
│   ├── profile.html
│   ├── signUp.html
│   └── videos.html
├── style/
│   ├── create-post.css
│   ├── emailVerfication.css
│   ├── friends.css
│   ├── home.css
│   ├── login.css
│   ├── passwordForgot.css
│   ├── profile.css
│   ├── signUp.css
│   └── videos.css
├── icons/
└── README.md
```

---

## 🚀 Getting Started

### 1) Clone the repository

```bash
git clone <your-repository-url>
cd Socail-Application
```

### 2) Start a local web server

```bash
python3 -m http.server 8000
```

### 3) Open the app in your browser

```text
http://localhost:8000/index.html
```

You can also open pages directly from the `pages/` folder if needed, such as:

```text
http://localhost:8000/pages/login.html
```

---

## 🔐 Firebase Configuration

This app uses Firebase for authentication and database access. You must configure your own Firebase project before using it in a real environment.

Please update the Firebase config in the project files that initialize Firebase, especially:

- `index.html`
- `JavaScript/*.js`

Example structure:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGE_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Then initialize Firebase using:

```javascript
firebase.initializeApp(firebaseConfig);
```

---

## 🧪 Features Walkthrough

### Authentication
- New users can create an account
- Account creation stores user data in Firestore
- Email verification is sent automatically
- Login redirects to the feed after successful authentication

### Social Feed
- Posts appear in the home feed
- Each post supports reactions and comments
- Users can view profile images and user names dynamically

### Content Creation
- Users can create and publish posts
- Media uploads are supported for images and video files
- Posts are displayed with user metadata and timeline information

### Profile & Friends
- Personal details and media can be managed from the profile page
- Friends page provides social navigation
- Video feed is separated into a dedicated section

---

## ✅ Suggested Improvements

- Add full backend API support
- Improve validation and error handling
- Add dark mode
- Add real-time notifications
- Add post deletion/edit features
- Improve media upload security
- Add responsive mobile optimizations

---

## 🤝 Contributing

Contributions are welcome. Please read the full contribution guide in [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes.

If you want to improve the app:

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## 📜 License

This project is for educational and demo purposes. You can modify and extend it based on your project requirements.

---

## 💡 Notes

This is a frontend social application built as a learning/demo project. For production use, it is recommended to add:

- proper backend security
- better user session management
- production-grade Firebase rules
- route protection and admin controls

If you want, I can also help you add:

- a complete project logo
- a better landing page
- a dark mode version
- a professional screenshot section for this README
- a fully structured README in a more advanced portfolio style
