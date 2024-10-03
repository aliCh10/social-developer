'use client'
import React, { useState } from 'react';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/style.css';
import './css/feather.css';
import './css/themify-icons.css';
import Link from 'next/link';

export default function RegistreComponent() {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState({
    message: '',
    type: '',
    show: false,
  });

  const [fieldErrors, setFieldErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    if (!validateFields()) {
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/auth/register', data);
      console.log(response.data);
      toast.success('Registration successful!');
      setData({ 
        username: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
      });
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      setAlert({
        message: error.response?.data?.message || 'Registration failed! Please try again.',
        type: 'danger',
        show: true,
      });
    }
  };
  

  const validateFields = () => {
    const { username, email, password, confirmPassword } = data;
    let isValid = true;
    const errors = { username: false, email: false, password: false, confirmPassword: false };
  
    if (!username) {
      errors.username = true;
      isValid = false;
    }
  
    if (!email) {
      errors.email = true;
      isValid = false;
    }
  
    if (password.length < 8) {
      errors.password = true;
      isValid = false;
    }
  
    if (password !== confirmPassword) {
      errors.confirmPassword = true;
      isValid = false;
    }
  
    setFieldErrors(errors);
    return isValid;
  };
  

  return (
    <div className="color-theme-blue">
      <div className="main-wrap">
        <div className="nav-header bg-transparent shadow-none border-0"></div>
        <div className="row">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{ backgroundImage: 'url("/images/login-bg.jpg")' }}
          >
          </div>
          
          <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
            <div className="card shadow-none border-0 ms-auto me-auto login-card">
              <div className="card-body rounded-0 text-left">
                <h2 className="fw-700 display1-size display2-md-size mb-3">
                  Create <br /> your account
                </h2>

                {alert.show && (
                  <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.message}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setAlert({ ...alert, show: false })}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className={`form-group icon-input mb-3 ${fieldErrors.username? 'border border-danger' : ''}`}>
                    <i className="font-sm ti-email text-grey-500 pe-0"></i>
                    <input
                      type="text"
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your Username"
                      name="username"
                      value={data.username}
                      onChange={handleChange}
                    />
                  </div>
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

                  <div className={`form-group icon-input mb-1 ${fieldErrors.confirmPassword ? 'border border-danger' : ''}`}>
                    <input
                      type="password"
                      className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={data.confirmPassword}
                      onChange={handleChange}
                    />
                    <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                  </div>

                  <div className="form-group mb-1">
                    <button type="submit" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0">
                      Register
                    </button>
                  </div>
                </form>

                <div className="col-sm-12 p-0 text-center mt-2">
                  <h6 className="mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3">
                    Or, Sign in with your social account
                  </h6>
                  <div className="form-group mb-1">
                    <a href="#" className="form-control text-left style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2">
                      <img src="/images/icon-1.png" alt="icon" className="ms-2 w40 mb-1 me-5" /> Sign in with Google
                    </a>
                  </div>
                  <div className="form-group mb-1">
                    <a href="#" className="form-control text-left style2-input text-white fw-600 bg-twiiter border-0 p-0">
                      <img src="/images/icon-3.png" alt="icon" className="ms-2 w40 mb-1 me-5" /> Sign in with Facebook
                    </a>
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
}
