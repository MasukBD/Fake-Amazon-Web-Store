/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

const Cart = (props) => {
    // const cart = props.cart; //option 1
    const { cart, handleClearCart, children } = props;   //option 2

    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for (const product of cart) {
        if (product.quantity === 0) {
            product.quantity = 1;
        }
        // product.quantity = product.quantity || 1;
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping * product.quantity;
        quantity = quantity + product.quantity;
    }

    let tax = totalPrice * (5 / 100);
    let taxAmount = tax.toFixed(2);

    let grandTotal = totalPrice + totalShipping + parseFloat(taxAmount);
    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <h5>Selected Items: {quantity}</h5>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping: ${totalShipping} </p>
            <p>Tax: ${taxAmount}</p>
            <h5>Grand Total: ${grandTotal}</h5>
            <button onClick={handleClearCart} className='clearCartBtn'>
                <span>Clear Cart</span>
                <span> <FontAwesomeIcon icon={faTrashCan} /></span>
            </button>
            {children}
        </div>
    );
};

export default Cart;