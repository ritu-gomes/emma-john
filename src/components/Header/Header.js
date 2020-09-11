import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './header.css';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">shop</Link>
                <Link to="/review">order reviewing</Link>
                <Link to="/manage">manage inventory</Link>
                <button onClick={() => setLoggedInUser({})}>sign out</button>
            </nav>
        </div>
    );
};

export default Header;