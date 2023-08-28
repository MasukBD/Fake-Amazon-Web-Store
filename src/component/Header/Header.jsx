/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.png';
import { Link, NavLink } from 'react-router-dom';
import { AuthSender } from '../ContextProvider/ContextProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthSender);
    const handleLogOut = () => {
        logOut()
            .then(() => {
                alert('User logged Out successfully');
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className='header'>
            <Link to="/"><img src={logo} alt="" /></Link>
            {
                user && <span className='welcome-message'>Welcome {user.displayName}</span>
            }
            <div>
                <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/">Shop</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/order">Order</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/inventory">Inventory</NavLink>
                {
                    !user && <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/login">Login</NavLink>
                }
                <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/signup">SignUp</NavLink>
                {
                    user && <NavLink onClick={handleLogOut} className={({ isActive }) => (isActive ? '' : 'active')}>Log Out</NavLink>
                }
            </div>
        </div>
    );
};

export default Header;