import React, { useState, useEffect } from 'react';
import './shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProduct] = useState([]);
    const [cart,setCart] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/products")
        .then(res => res.json())
        .then(data => setProduct(data))
    },[])
    useEffect(() => {
        const reviewCart = getDatabaseCart();
        const info = Object.keys(reviewCart);
        fetch("http://localhost:5000/review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    },[])
    const addTocart = (product) => {
        const pro = cart.find(pro => pro.key=== product.key);
        let count = 1;
        let newCart;
        if(pro){
            count = product.count + 1;
            product.count = count;
            const others = cart.filter(pro => pro.key !== product.key);
            newCart = [...others,pro];
        }
        else{
            product.count = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                    {
                        products.map(pro => <Product 
                            showButton ={true}
                            product={pro}
                            key={pro.key}
                            addCart = {addTocart}
                            ></Product>)
                    }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className="cart-btn">review cart</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;