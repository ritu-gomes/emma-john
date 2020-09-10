import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from './../../fakeData/index';
import Product from './../Product/Product';

const ProductDetail = () => {
    const {productkey} = useParams();
    const pro = fakeData.find(id => id.key === productkey);
    return (
        <div>
            <h2>yoooooo {productkey}</h2>
            <div>
                <Product showButton={false} product={pro}></Product>
            </div>
        </div>
    );
};

export default ProductDetail;