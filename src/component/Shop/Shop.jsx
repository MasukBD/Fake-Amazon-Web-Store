/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { key } from 'localforage';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);  //for pagination
    const [itemsPerPage, setItemsPerPage] = useState(12);  //for pagination

    // pagination works start here 
    // get total products numbers 
    const { totalProducts } = useLoaderData();

    const totalPage = Math.ceil(totalProducts / itemsPerPage);

    // For Page Numbers Option 1
    // const pageNumbers = [];
    // for (let i = 0; i <= totalPage; i++) {
    //     pageNumbers.push(i);
    // }

    // For Page Numbers Option 2
    const pageNumbers = [...Array(totalPage).keys()];

    const options = [6, 12, 24];
    const handleSelectNumber = event => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }

    // pagination works finish Here 

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage, itemsPerPage])

    useEffect(() => {
        const savedCartItem = [];
        //step 1 get cart item from local storage 
        const existedCart = getShoppingCart();
        const cartItems = Object.keys(existedCart);
        fetch('http://localhost:5000/cartProducts', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cartItems)
        })
            .then(res => res.json())
            .then(cartProducts => {
                //step 2 get product by id 
                for (const id in existedCart) {
                    const existedProductInCart = cartProducts.find(product => product._id === id);
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
            })

    }, [])

    const handleAddToCart = product => {
        let newCart = [...cart, product];
        setCart(newCart);
        addToDb(product._id);
    }


    // clear all cart function 
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }


    return (
        <>
            <div>
                <div className='shop-container'>
                    <div className="products">
                        <h3>Your Produts Are Here!!</h3>
                        <div className='products-container'>
                            {
                                products.map(p => <Product
                                    key={p._id}
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
            <div className="pagination">
                <div style={{ margin: '12px 0' }}>
                    <select value={itemsPerPage} onChange={handleSelectNumber}>
                        {
                            options.map(option => (
                                <option key={option} value={option}>Selct Per Pages: {option}</option>
                            ))
                        }
                    </select>
                </div>
                {
                    pageNumbers.map(page => <button className={currentPage == page ? 'selected' : ''} onClick={() => setCurrentPage(page)} key={page}>{page}</button>)
                }
            </div>
        </>
    );
};

export default Shop;