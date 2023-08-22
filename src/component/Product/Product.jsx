/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faSmile } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const { name, img, seller, price, ratings } = props.product;
    const handleCartItem = props.handleCart;
    return (
        <div className='product'>
            <div className="product-info">
                <img src={img} alt="" />
                <h4 className='product-heading'>{name}</h4>
                <h5 className='product-price'>Price: ${price}</h5>
                <p className='seller'>Manufacturer: {seller}</p>
                <p className='ratings'>Ratings: {ratings} <FontAwesomeIcon icon={faSmile} /></p>
            </div>
            <button onClick={() => { handleCartItem(props.product) }} className='cart-button'>Add To Cart <FontAwesomeIcon icon={faShoppingCart} /></button>
        </div>
    );
};

export default Product;