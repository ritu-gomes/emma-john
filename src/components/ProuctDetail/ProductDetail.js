import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from './../Product/Product';

const ProductDetail = () => {
    const {productkey} = useParams();
    const [product,setProduct] = useState({});
    useEffect(() => {
        fetch("http://localhost:5000/products/"+ productkey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productkey]);
    return (
        <div>
            <h2>yoooooo {productkey}</h2>
            <div>
                <Product showButton={false} product={product}></Product>
            </div>
        </div>
    );
};

export default ProductDetail;