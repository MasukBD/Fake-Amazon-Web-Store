/* eslint-disable no-unused-vars */
import React from 'react';
import { useRouteError } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
    const errors = useRouteError();
    const { statusText, status, data } = errors;
    return (
        <div className='error-page'>
            <h1>{status}</h1>
            <h3>{statusText}</h3>
            <p>{data}</p>
        </div>
    );
};

export default ErrorPage;