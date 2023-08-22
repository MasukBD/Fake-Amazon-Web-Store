/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './orderProductPreview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const OrderProductPreview = ({ product, handleCart }) => {
    const { img, name, quantity, price, shipping, id } = product;
    return (
        <div className='order-product-details'>
            <div className='element-details'>
                <img src={img} alt="" />
                <div className='detais-info'>
                    <h5>{name}</h5>
                    <p>Price: {price}</p>
                    <p>Quantity: {quantity}</p>
                    <p>Shipping cost: {shipping}</p>
                </div>
            </div>
            <span onClick={() => handleCart(id)} className='tras-can'>
                <FontAwesomeIcon icon={faTrashCan} />
            </span>
        </div>
    );
};

export default OrderProductPreview;