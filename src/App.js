import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import Notfound from './components/NotFound/Notfound';
import ProductDetail from './components/ProuctDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext(); 

function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Switch>
          <Route path='/shop'>
            <Shop></Shop>
          </Route>
          <Route path='/review'>
            <Review></Review>
          </Route>
          <PrivateRoute path='/manage'>
            <Manage></Manage>
          </PrivateRoute>
          <Route exact path='/'>
            <Shop></Shop>
          </Route>
          <Route path="/product/:productkey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="/Login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/Shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path='*'>
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
