import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
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

        fetch("http://localhost:5000/review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(data => setReview(data))
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