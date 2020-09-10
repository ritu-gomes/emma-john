import React, { useState, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser,setNewUser] = useState(false);
  const [user,setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handlebtn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName,photoURL,email} = res.user;
      const signedIn = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedIn);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }
  const handleSignOut = () => {
    firebase.auth().signOut().then(res => {
      const singOut = {
        isSignIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        error: '',
        success: false
      }
      setUser(singOut);
    })
  }
  const [loggedInUser,setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const handlesubmit = (e) => {
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updatUserInfo(user.name);
        console.log(user.name);
        debugger;
      })
      .catch(error => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        setUser(newUserInfo);
      });
      
    }
    
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        console.log(res.user);
      })
      .catch(error => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        setUser(newUserInfo);
      });
    }
    e.preventDefault();
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
  const changeHandle = (event) => {
    let isValid = true;
    if(event.target.name === 'email'){
      isValid = /\S+@\S+\.\S+/.test(event.target.value);
      
    }
    else if(event.target.name === 'password'){
      const validPass = event.target.value.length > 6;
      const numberVali = /\d{1}/.test(event.target.value);
      isValid = validPass && numberVali;
    }
    if(isValid){
      const newUser = {...user};
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
    }
  }
  return (
    <div className="App">
        {
          user.isSignIn ? <button onClick={() => handleSignOut}>sign out</button> : <button onClick={() => handlebtn()}>sign in</button>
        }
        {
          user.isSignIn && <p>welcome! {user.name}</p>
        }
        <form onSubmit={handlesubmit}>
          <input type="checkbox" onChange={() => setNewUser(!newUser)} name="new User" id="check"/> 
          <label htmlFor="new user">New User</label><br/>
          {newUser && <input onBlur={changeHandle} type="text" placeholder="your Name" name="name" required id="name"/>} <br/>
          <input onBlur={changeHandle} type="email" name="email" id="mail" placeholder="enter your mail" required/> <br/>
          <input type="password" onBlur={changeHandle} name="password" placeholder="password" id="password" required/> <br/>
          <input type="submit" value="sign up"/>
        </form>
        <p><small style={{color: "red"}}>{user.error}</small></p>
        {user.success && <p style={{color:"green"}}>{newUser ? 'signed up' : 'logged in'}  successfully</p>}
    </div>
  );
}

export default Login;
