'use client';
import React, { useState } from 'react'

function ImageCovertureComponet() {
    const [activeTab, setActiveTab] = useState('navtabs1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
  return (
    
    <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
        <div className="card-body h250 p-0 rounded-xxl overflow-hidden m-3">
            <img src="/images/u-bg.jpg" alt="Background" />
        </div>
        <div className="card-body p-0 position-relative">
            <figure className="avatar position-absolute w100 z-index-1" style={{ top: '-40px', left: '30px' }}>
                <img src="/images/user-12.png" alt="User" className="float-right p-1 bg-white rounded-circle w-100" />
            </figure>
            <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
                Mohannad Zitoun
                <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">support@gmail.com</span>
            </h4>

        </div>

        <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
            <ul className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4" id="pills-tab" role="tablist">
                <li className={`list-inline-item me-5 ${activeTab === 'navtabs1' ? 'active' : ''}`}>
                    <a
                        className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                        href="#"
                        onClick={() => handleTabClick('navtabs1')}
                    >
                        About
                    </a>
                </li>
                <li className={`list-inline-item me-5 ${activeTab === 'navtabs2' ? 'active' : ''}`}>
                    <a
                        className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                        href="#"
                        onClick={() => handleTabClick('navtabs2')}
                    >
                        Membership
                    </a>
                </li>
                <li className={`list-inline-item me-5 ${activeTab === 'navtabs3' ? 'active' : ''}`}>
                    <a
                        className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                        href="#"
                        onClick={() => handleTabClick('navtabs3')}
                    >
                        Discussion
                    </a>
                </li>
                <li className={`list-inline-item me-5 ${activeTab === 'navtabs4' ? 'active' : ''}`}>
                    <a
                        className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                        href="#"
                        onClick={() => handleTabClick('navtabs4')}
                    >
                        Video
                    </a>
                </li>
                <li className={`list-inline-item me-5 ${activeTab === 'navtabs5' ? 'active' : ''}`}>
                    <a
                        className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                        href="#"
                        onClick={() => handleTabClick('navtabs5')}
                    >
                        Group
                    </a>
                </li>
                <li className={`list-inline-item me-5 ${activeTab === 'navtabs6' ? 'active' : ''}`}>
                    <a
                        className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                        href="#"
                        onClick={() => handleTabClick('navtabs6')}
                    >
                        Events
                    </a>
                </li>
                <li className={`list-inline-item me-5 ${activeTab === 'navtabs7' ? 'active' : ''}`}>
                    <a
                        className="fw-700 me-sm-5 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                        href="#"
                        onClick={() => handleTabClick('navtabs7')}
                    >
                        Media
                    </a>
                </li>
            </ul>
        </div>
    </div>

  )
}

export default ImageCovertureComponet