import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.comfig";
import { useState } from "react";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [user, setUser] = useState({});
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();
  var yhProvider = new firebase.auth.OAuthProvider("yahoo.com");
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };
  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log("fb user", user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };
  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(ghProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
        console.log("Gh user");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };
  const handleYahooSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(yhProvider)
      .then((result) => {
        const credential = result.credential;
        var accessToken = credential.accessToken;
        var user = result.user;
        console.log('Yahoo',user)
        setUser(user)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign In using Google</button>
      <br />
      <button onClick={handleFacebookSignIn}>Sign In using Facebook</button>
      <br />
      <button onClick={handleGithubSignIn}>Sign In using Github</button>
      <br />
      <button onClick={handleYahooSignIn}>Sign In using Yahoo</button>
      <h4>{user.displayName}</h4>
      <p>Your Email: {user.email}</p>
      <p>
        <small>Your Profile Image</small>
      </p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
