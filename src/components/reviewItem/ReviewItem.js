import React from 'react';

const ReviewItem = (props) => {
    const {name,count,key,price} = props.product;
    const st = {
        padding: "30px",
        borderBottom:"2px solid lightgray"
    }
    return (
        <div style={st}>
            <h1>{name}</h1>
            <h2>quantity: {count}</h2>
            <p><small>$ {price}</small></p>
            <button onClick={() => props.handleRemove(key)} className="cart-btn">remove</button>
        </div>
    );
};

export default ReviewItem;