import React from 'react';
import "../Product/product.css";

const Cart = (props) => {
    const total = props.cart.reduce((total,prd)=>total + prd.price * prd.count ,0);
    debugger;
    let shipping =0;
    if(total > 35){
        shipping = 0;
    }
    else if(total >15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    const tax = (total/10).toFixed(2);
    const grandTotal = Math.round(total + shipping + Number(tax));
    return (
        <div>
            <h4>order summery</h4>
            <h5>items ordered:{props.cart.length}</h5>
            <p><small>product price: {total}</small></p>
            <p><small>shipping cost: {shipping}</small></p>
            <p><small>tax + vat: {tax}</small></p>
            <p>total price: {grandTotal}</p>
            {props.children}
        </div>
    );
};

export default Cart;