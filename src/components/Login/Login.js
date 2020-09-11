import React, { useState, useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initilizeAuth, handlebtn, handleSignOut, signUpWithMail, logInWithMail } from './LoginManage';

function Login() {
  const [newUser,setNewUser] = useState(false);
  const [user,setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: ''
  })
  initilizeAuth();
  
  const [loggedInUser,setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handlegooglebtn = () => {
    handlebtn()
    .then(res =>{
        setUser(res);
        setLoggedInUser(res);
    })
  }
  const signOut = () => {
      handleSignOut()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);
      })
  }
  const handlesubmit = (e) => {
    if(newUser && user.email && user.password){
      signUpWithMail(user.name,user.email,user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }
    
    if(!newUser && user.email && user.password){
      logInWithMail(user.email,user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }
    e.preventDefault();
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
          user.isSignIn ? <button onClick={() => signOut}>sign out</button> : <button onClick={() => handlegooglebtn()}>sign in with google</button>
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
