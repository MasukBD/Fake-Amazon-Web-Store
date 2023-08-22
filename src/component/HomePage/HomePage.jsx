/* eslint-disable no-unused-vars */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import './HomePage.css'
import Footer from '../Footer/Footer';

const HomePage = () => {
    return (
        <div className='home-page'>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomePage;