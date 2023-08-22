/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../../images/google.png';
import { AuthSender } from '../ContextProvider/ContextProvider';
import { updateProfile } from 'firebase/auth';

const SignUp = () => {
    const [error, setError] = useState('');
    const { createUser } = useContext(AuthSender);

    const handleSignUp = (event) => {
        event.preventDefault();
        setError('');
        const from = event.target;
        const email = from.email.value;
        const name = from.name.value;
        const password = from.password.value;
        if (password.length < 6) {
            setError('Error: Password should be more than 6 charectar including numbers!!');
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)) {
            setError('Error: Password should include atlest one decimal number!')
            return;
        }
        createUser(email, password)
            .then(result => {
                const newUser = result.user;
                updateProfile(newUser, { displayName: name })
                    .then(() => {
                        alert('Welcome to AmaZon Garder!!')
                    })
                    .catch(error => {
                        setError(error.message);
                    })
                console.log(newUser);
                from.reset();
            })
            .catch(error => {
                setError(error.message);
            })
    }
    return (
        <div className='from-page'>
            <div className='from-container'>
                <h2 className='from-title'>Please SignUp</h2>
                <form onSubmit={handleSignUp}>
                    <div className="from-control">
                        <label htmlFor="name">Full Name</label><br />
                        <input type="text" name="name" required placeholder='Your Name' id="name" />
                    </div>
                    <div className="from-control">
                        <label htmlFor="email">Email</label><br />
                        <input type="email" name="email" required placeholder='Your Email' id="email" />
                    </div>
                    <div className="from-control">
                        <label htmlFor="password">Password</label><br />
                        <input type="password" name="password" required placeholder='Your Password' id="password" />
                    </div>
                    <div className="from-control submit-btn">
                        <button className='form-submit'>SignUp</button>
                    </div>
                </form>
                <p>Already have an account? <Link to="/login">Log In</Link></p>
                <div className='option'><span className='hr-line'><hr /></span> <span>or</span> <span className='hr-line'><hr /></span></div>
                <button className='google-sign-in'><img src={icon} alt="" />Continue With Google</button>
                <p className='warning'>{error}</p>
            </div>
        </div>
    );
};

export default SignUp;