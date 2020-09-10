import React, { useState, useEffect } from 'react';
import fakeData from './../../fakeData/index';
import './shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProduct] = useState(first10);
    const [cart,setCart] = useState([]);
    useEffect(() => {
        const reviewCart = getDatabaseCart();
        const info = Object.keys(reviewCart);
        const cartList = info.map( key => {
            const products = fakeData.find(pk => pk.key === key);
            products.count = reviewCart[key];
            return products;
        })
        setCart(cartList);
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