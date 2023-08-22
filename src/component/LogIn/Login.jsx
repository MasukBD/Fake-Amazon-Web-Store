/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import './LogIn.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import icon from '../../images/google.png'
import { AuthSender } from '../ContextProvider/ContextProvider';

const Login = () => {
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const { loginUser, createUserByGoogle } = useContext(AuthSender);
    const navigate = useNavigate();
    const location = useLocation();
    // After login redirect the correct pages 
    const setLocation = location.state?.from?.pathname || "/";
    console.log(setLocation);


    const handleLogIn = (event) => {
        event.preventDefault();
        const from = event.target;
        const email = from.email.value;
        const password = from.password.value;
        setError('');
        loginUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                from.reset();
                navigate(setLocation)
            })
            .catch(error => {
                setError(error.message);
            })
        console.log(email, password)
    }

    const handleGoogleLogin = () => {
        createUserByGoogle()
            .then(result => {
                const loggedUser = result.user;
                navigate(setLocation);
                console.log(loggedUser);
            })
            .catch(error => {
                setError(error.message);
            })
    }

    return (
        <div className='from-page'>
            <div className='from-container'>
                <h2 className='from-title'>Please Login</h2>
                <form onSubmit={handleLogIn}>
                    <div className="from-control">
                        <label htmlFor="email">Email</label><br />
                        <input type="email" name="email" required placeholder='Your Email' id="email" />
                    </div>
                    <div className="from-control">
                        <label htmlFor="password">Password</label><br />
                        <input type={show ? "password" : "text"} name="password" required placeholder='Your Password' id="password" />
                        <p style={{ margin: '0px 2px' }} onClick={() => setShow(!show)}>{show ? <small>show password</small> : <small>Hide password</small>}</p>
                    </div>

                    <div className="from-control submit-btn">
                        <button className='form-submit'>LogIn</button>
                    </div>
                </form>
                <p>Don&apos;t have an account? <Link to="/signup">Sign Up</Link></p>

                <div className='option'><span className='hr-line'><hr /></span> <span>or</span> <span className='hr-line'><hr /></span></div>
                <button onClick={handleGoogleLogin} className='google-sign-in'><img src={icon} alt="" />Continue With Google</button>
                <p className='warning'>{error}</p>
            </div>
        </div>
    );
};

export default Login;