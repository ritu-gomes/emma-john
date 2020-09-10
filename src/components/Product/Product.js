import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    console.log(props);
    const {img,name,seller,key,price,stock} = props.product;
    return (
        <div className="product">
            <div className="image">
                <img src={img} alt=""/>
            </div>
            <div className="others">
                <h5><Link to={"/product/"+key}>{name}</Link></h5>
                <p>by: {seller}</p>
                <p><small>prize- ${price}</small></p>
                <p><small>only {stock} left in stock-buy now</small></p>
                {props.showButton && <button className="cart-btn" onClick={() => {props.addCart(props.product)}}><FontAwesomeIcon icon={faCartPlus} /> add to card</button>}
            </div>
        </div>
                    
    );
};

export default Product;