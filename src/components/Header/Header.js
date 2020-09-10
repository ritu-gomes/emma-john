import React from 'react';
import logo from '../../images/logo.png';
import './header.css';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">shop</Link>
                <Link to="/review">order reviewing</Link>
                <Link to="/manage">manage inventory</Link>
            </nav>
        </div>
    );
};

export default Header;