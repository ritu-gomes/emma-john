import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

export const initilizeAuth = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handlebtn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
    const {displayName,photoURL,email} = res.user;
    const signedIn = {
      isSignIn: true,
      name: displayName,
      email: email,
      photo: photoURL,
      success: true
    }
    return signedIn;
  })
  .catch(err => {
    console.log(err);
    console.log(err.message);
  })
}

export const handleSignOut = () => {
    return firebase.auth().signOut().then(res => {
      const singOut = {
        isSignIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        error: '',
        success: false
      }
      return singOut;
    })
  }

  export const signUpWithMail = (name,email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updatUserInfo(name);
      return newUserInfo;
    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      return newUserInfo;
    });
  }

  export const logInWithMail = (email,password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      return newUserInfo;
    });
  }

  const updatUserInfo = (name) => {
    var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name,
      }).then((res) => {
        console.log("updated");
      }).catch(error => {
        console.log(error);
      });
  }