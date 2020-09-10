import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from './../../fakeData/index';
import ReviewItem from '../reviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const history = useHistory();
    const [review,setReview] = useState([]);
    const [order,setOrder] = useState(false);
    const handleRemove = (prod => {
        const newCart = review.filter(pd => pd.key !== prod);
        setReview(newCart);
        removeFromDatabaseCart(prod);
    })

    const proceedHandle = () => {
        history.push("/Shipment");
    }
    useEffect(() => {
        const reviewCart = getDatabaseCart();
        const info = Object.keys(reviewCart);
        const cartList = info.map( key => {
            const products = fakeData.find(pk => pk.key === key);
            products.count = reviewCart[key];
            return products;
        })
        setReview(cartList);
    },[])
    let happy;
    if(order){
        happy = <img src={happyImg} alt=""/>;
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {review.map(pd => <ReviewItem handleRemove={handleRemove} key={pd.key} product={pd}></ReviewItem>)}
                {happy}
            </div>
            
            <div className="cart-container">
                <Cart cart={review}>
                    <button onClick={() => proceedHandle()} className="cart-btn">proceed checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;