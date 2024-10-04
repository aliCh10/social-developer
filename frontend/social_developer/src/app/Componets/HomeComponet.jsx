'use client';
import { useEffect } from 'react';
import React from 'react'
import NavBarComponent from './NavBarComponet'
import SideBar from './SideBar'
import { Edit3, Video, Image, Camera, Bookmark, AlertCircle, AlertOctagon, Lock,Send  } from 'react-feather';
import Script from 'next/script'; // Import Script component from Next.js

import './css/style.css'
import './css/feather.css'
import './css/themify-icons.css'
import './css/lightbox.css'


function HomeComponet() {
  // useEffect(() => {

  //   const script = document.createElement('script');
  //   script.src = '/js/scripts.js'; 
  //   script.async = true;
  //   document.body.appendChild(script);

  //   const lightboxScript = document.createElement('script');
  //   lightboxScript.src = '/js/lightbox.js';
  //   lightboxScript.async = true;
  //   document.body.appendChild(lightboxScript);

  //   return () => {
  //     document.body.removeChild(script);
  //     document.body.removeChild(lightboxScript);
  //   };
  // }, []);

  return (


    <div className="main-wrapper">
      <NavBarComponent />
      <SideBar />
      <div className="main-content right-chat-active">

        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="row ">
              <div className="col-xl-8 col-xxl-9 col-lg-8">

                <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                  <div className="card-body p-0">
                    <a href="#" className="font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center">

                      <Edit3 className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight" />

                      Create Post
                    </a>
                  </div>
                  <div className="card-body p-0 mt-3 position-relative">
                    <figure className="avatar position-absolute ms-2 mt-1 top-5">
                      <img src="/images/user-8.png" alt="user avatar" className="shadow-sm rounded-circle w30" />
                    </figure>
                    <textarea
                      name="message"
                      className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss  fw-500 border-light-md .theme-white-bg"
                      cols={30}
                      rows={10}
                      placeholder="What's on your mind?"
                      style={{ backgroundColor: 'white', color: 'black' }}

                    />
                  </div>
                  <div className="card-body d-flex p-0 mt-0">
                    <a href="#" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">

                      <Video className="font-md text-danger feather-video me-2" />

                      <span className="d-none-xs">Live Video</span>
                    </a>
                    <a href="#" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">

                      <Image className="font-md text-success feather-image me-2" />

                      <span className="d-none-xs">Photo/Video</span>
                    </a>
                    <a href="#" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">

                      <Camera className="font-md text-warning feather-camera me-2" />

                      <span className="d-none-xs">Feeling/Activity</span>
                    </a>
                    {/* <a href="#" className="ms-auto" id="dropdownMenu4" data-bs-toggle="dropdown" aria-expanded="false"> */}
                      {/* <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i> */}
                      
                      <Send className=" ms-auto font-md text-warning feather-send me-3" />

                     

                    {/* </a> */}
                    {/* <div className="dropdown-menu dropdown-menu-start p-4 rounded-xxl border-0 shadow-lg" aria-labelledby="dropdownMenu4">
                      <div className="card-body p-0 d-flex">
                        <i className="feather-bookmark text-grey-500 me-3 font-lg">
                          <Bookmark />
                        </i>
                        <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                          Save Link <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span>
                        </h4>
                      </div>
                      <div className="card-body p-0 d-flex mt-2">
                        <i className="feather-alert-circle text-grey-500 me-3 font-lg">
                          <AlertCircle />
                        </i>
                        <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                          Hide Post <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                        </h4>
                      </div>
                      <div className="card-body p-0 d-flex mt-2">
                        <i className="feather-alert-octagon text-grey-500 me-3 font-lg">
                          <AlertOctagon />
                        </i>
                        <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                          Hide all from Group <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                        </h4>
                      </div>
                      <div className="card-body p-0 d-flex mt-2">
                        <i className="feather-lock text-grey-500 me-3 font-lg">
                          <Lock />
                        </i>
                        <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">
                          Unfollow Group <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                        </h4>
                      </div>
                    </div> */}
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <Script src="/js/scripts.js" strategy="afterInteractive" />
      <Script src="/js/lightbox.js" strategy="afterInteractive" /> */}
    </div>
  );
}

export default HomeComponet
