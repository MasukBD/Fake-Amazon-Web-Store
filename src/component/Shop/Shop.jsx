/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const savedCartItem = [];
        //step 1 get cart item from local storage 
        const existedCart = getShoppingCart();
        //step 2 get product by id 
        for (const id in existedCart) {
            const existedProductInCart = products.find(product => product.id === id);
            if (existedProductInCart) {
                //step 3 get and set quantity 
                const quantity = existedCart[id];
                existedProductInCart.quantity = quantity;
                //step 4 make new array of saved item from local storage  
                savedCartItem.push(existedProductInCart);
            }
        }
        //step 5 set cart item from localstorage
        setCart(savedCartItem);
    }, [products])

    const handleAddToCart = product => {
        let newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }


    // clear all cart function 
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }


    return (
        <div>
            <div className='shop-container'>
                <div className="products">
                    <h3>Your Produts Are Here!!</h3>
                    <div className='products-container'>
                        {
                            products.map(p => <Product
                                key={p.id}
                                product={p}
                                handleCart={handleAddToCart}
                            ></Product>)
                        }
                    </div>
                </div>
                <div className="cart-container">
                    <Cart handleClearCart={handleClearCart} cart={cart}>
                        <Link className='proceed-link' to="/order">
                            <button className='check-out-btn'>
                                <span>Review Order</span>
                                <span> <FontAwesomeIcon icon={faCalendarCheck} /></span>
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;