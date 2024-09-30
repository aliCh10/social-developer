"use client"; // Ensure this component runs on the client

import React, { useEffect } from 'react';import './css/style.css'
import './css/feather.css'
import './css/themify-icons.css'
import feather from 'feather-icons'; // Ensure you have feather-icons installed

function NavBarComponet() {
    useEffect(() => {
        feather.replace(); // Replace <i data-feather="..."> with actual SVGs
      }, []);
      return (
        <div className="nav-header bg-white shadow-xs border-0">
          <div className="nav-top">
            <a href="index.html">
              <i data-feather="zap"  className="text-success display1-size me-2 ms-0"></i>
              <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala.</span>
            </a>
            <a href="#" className="mob-menu ms-auto me-2 chat-active-btn">
              <i data-feather="message-circle" className="text-grey-900 font-sm btn-round-md bg-greylight"></i>
            </a>
            <a href="default-video.html" className="mob-menu me-2">
              <i data-feather="video" className="text-grey-900 font-sm btn-round-md bg-greylight"></i>
            </a>
            <a href="#" className="me-2 menu-search-icon mob-menu">
              <i data-feather="search" className="text-grey-900 font-sm btn-round-md bg-greylight"></i>
            </a>
            <button className="nav-menu me-0 ms-2"></button>
          </div>
          
          <form action="#" className="float-left header-search">
            <div className="form-group mb-0 icon-input">
              <i className="feather-search font-sm text-grey-400"></i>
              <input 
                type="text" 
                placeholder="Start typing to search.." 
                className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg" 
              />
            </div>
          </form>
    
          <a href="default.html" className="p-2 text-center ms-3 menu-icon center-menu-icon">
            <i data-feather="home"  className="font-lg alert-primary btn-round-lg theme-dark-bg text-current"></i>
          </a>
          <a href="default-storie.html" className="p-2 text-center ms-0 menu-icon center-menu-icon">
            <i data-feather="zap" className="font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500"></i>
            
          </a>
          <a href="default-video.html" className="p-2 text-center ms-0 menu-icon center-menu-icon">
            <i data-feather="video" className="font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500"></i>
          </a>
          <a href="default-group.html" className="p-2 text-center ms-0 menu-icon center-menu-icon">
            <i data-feather="user" className="font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500"></i>
          </a>
          <a href="shop-2.html" className="p-2 text-center ms-0 menu-icon center-menu-icon">
            <i data-feather="shopping-bag" className="font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500"></i>
          </a>
    
          <a href="#" className="p-2 text-center ms-auto menu-icon" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">
            <span className="dot-count bg-warning"></span>
            <i data-feather="bell" className="font-xl text-current"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-end p-4 rounded-3 border-0 shadow-lg" aria-labelledby="dropdownMenu3">
            <h4 className="fw-700 font-xss mb-4">Notification</h4>
            {/* Notification items here */}
            <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
              <img src="/images/user-8.png" alt="user" className="w40 position-absolute left-0" />
              <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Hendrix Stamp <span className="text-grey-400 font-xsssss fw-600 float-right mt-1"> 3 min</span></h5>
              <h6 className="text-grey-500 fw-500 font-xssss lh-4">There are many variations of pass..</h6>
            </div>
            {/* More notifications here */}
          </div>
    
          <a href="#" className="p-2 text-center ms-3 menu-icon chat-active-btn">
            <i data-feather="message-square" className="font-xl text-current"></i>
          </a>
    
          <div className="p-2 text-center ms-3 position-relative dropdown-menu-icon menu-icon cursor-pointer">
            <i data-feather="settings" className="animation-spin d-inline-block font-xl text-current"></i>
            <div className="dropdown-menu-settings switchcolor-wrap">
              <h4 className="fw-700 font-sm mb-4">Settings</h4>
              <h6 className="font-xssss text-grey-500 fw-700 mb-3 d-block">Choose Color Theme</h6>
              <ul>
                {/* Color theme options here */}
              </ul>
              {/* Additional settings */}
            </div>
          </div>
    
          <a href="default-settings.html" className="p-0 ms-3 menu-icon">
            <img src="/images/profile-4.png" alt="user" className="w40 mt--1" />
          </a>
        </div>
      );
}

export default NavBarComponet
