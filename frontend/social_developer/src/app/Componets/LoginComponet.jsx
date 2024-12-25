"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/style.css'
import './css/feather.css'
import './css/themify-icons.css'
import Link from 'next/link';

export const LoginComponet = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const [alert, setAlert] = useState({
        message: '',
        type: '',
        show: false
    });

    const [fieldErrors, setFieldErrors] = useState({
        email: false,
        password: false,
    });

    const validateFields = () => {
        let isValid = true;
        const errors = {
            email: !data.email,
            password: !data.password,
        };
        if (errors.email || errors.password) {
            isValid = false;
            setFieldErrors(errors);
            setAlert({ message: 'Email and password are required!', type: 'danger', show: true });
        }
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });

        setFieldErrors({ ...fieldErrors, [name]: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data submitted:', data);

        if (!validateFields()) {
            return;
        }

        const response = await axios.post("http://localhost:3000/auth/login", data);

        if (response.data.statusCode == 200) {
            console.log(response.data.token.access_token);

            localStorage.setItem('token', response.data.token.access_token);
            
            setAlert({ message: 'Login successful!', type: 'success', show: true });
            setTimeout(() => {
                window.location.href = '/Home';
            }, 1000);
        }

        console.log('Login successful:', response.data);
        if (response.data.statusCode == 401) {
            setAlert({ message: 'Invalid credentials! Please try again.', type: 'danger', show: true });
        }
    };

    const handleGoogleSignIn = () => {
        window.location.href = 'http://localhost:3000/auth/google?prompt=select_account'; // Force account selection
    };

    const handleFacebookSignIn = () => {
        window.location.href = 'http://localhost:3000/auth/facebook'; // Redirect to the Facebook OAuth flow
    };

    return (
        <div className="color-theme-blue">
            <div className="main-wrap">
                <div className="nav-header bg-transparent shadow-none border-0">
                    <div className="nav-top w-100">
                        <a href="index.html">
                            <i data-feather="zap" className="feather-zap text-success display1-size me-2 ms-0"></i>
                            <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                                Sociala.
                            </span>
                        </a>
                        <a href="#" className="mob-menu ms-auto me-2 chat-active-btn">
                            <i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight"></i>
                        </a>
                        <a href="default-video.html" className="mob-menu me-2">
                            <i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i>
                        </a>
                        <a href="#" className="me-2 menu-search-icon mob-menu">
                            <i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i>
                        </a>
                        {/* Login Button */}
                        <Link href="/login"
                            className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl">
                            Login
                        </Link>

                        {/* Register Button */}
                        <Link href="/Registre"
                            className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl">
                            Register
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div
                        className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        style={{ backgroundImage: 'url("/images/login-bg.jpg")' }}
                    ></div>
                    <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-3">
                                    Login into <br /> your account
                                </h2>

                                {alert.show && (
                                    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                                        {alert.message}
                                        <button type="button" className="btn-close" onClick={() => setAlert({ ...alert, show: false })} aria-label="Close"></button>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className={`form-group icon-input mb-3 ${fieldErrors.email ? 'border border-danger' : ''}`}>
                                        <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                        <input
                                            type="email"
                                            className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                            placeholder="Your Email Address"
                                            name="email"
                                            value={data.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className={`form-group icon-input mb-1 ${fieldErrors.password ? 'border border-danger' : ''}`}>
                                        <input
                                            type="password"
                                            className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                                            placeholder="Password"
                                            name="password"
                                            value={data.password}
                                            onChange={handleChange}
                                        />
                                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                    </div>

                                    <div className="form-check text-left mb-3">
                                        <input type="checkbox" className="form-check-input mt-2" id="exampleCheck5" />
                                        <label className="form-check-label font-xsss text-grey-500" htmlFor="exampleCheck5">
                                            Remember me
                                        </label>
                                        <Link href="/forgot" className="fw-600 font-xsss text-grey-700 mt-1 float-right">
                                            Forgot your Password?
                                        </Link>
                                    </div>

                                    <div className="col-sm-12 p-0 text-left">
                                        <div className="form-group mb-1">
                                            <button type="submit" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0">Login</button>
                                        </div>
                                        <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                                            Don't have an account? <Link href="/Registre" className="fw-700 ms-1">Register</Link>
                                        </h6>
                                    </div>
                                </form>

                                <div className="col-sm-12 p-0 text-center mt-2">
                                    <h6 className="mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3">
                                        Or, Sign in with your social account
                                    </h6>
                                    <div className="form-group mb-1">
                                        <button onClick={handleGoogleSignIn} className="form-control text-left style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2">
                                            <img src="/images/icon-1.png" alt="icon" className="ms-2 w40 mb-1 me-5" /> Sign in with Google
                                        </button>
                                    </div>
                                    <div className="form-group mb-1">
                                        <button onClick={handleFacebookSignIn} className="form-control text-left style2-input text-white fw-600 bg-twiiter border-0 p-0">
                                            <img src="/images/icon-3.png" alt="icon" className="ms-2 w40 mb-1 me-5" /> Sign in with Facebook
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};
