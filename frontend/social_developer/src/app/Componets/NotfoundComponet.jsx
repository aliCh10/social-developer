import React from 'react'
import './css/style.css'
import './css/feather.css'
import './css/themify-icons.css'
function NotfoundComponet() {
    return (
        <div className="main-content pt-0 bg-white ps-0 pe-0">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 text-center default-page vh-100 align-items-center d-flex">
                <div className="card border-0 text-center d-block p-0">
                  <img 
                    src="/images/bg-43.png" 
                    alt="icon" 
                    className="w200 mb-4 ms-auto me-auto pt-md-5"
                  />
                  <h1 className="fw-700 text-grey-900 display3-size display4-md-size">
                    Oops! It looks like you're lost.
                  </h1>
                  <p className="text-grey-500 font-xsss">
                    The page you're looking for isn't available. Try to search again or use the go to.
                  </p>
                  <a 
                    href="index.html" 
                    className="p-3 w175 bg-current text-white d-inline-block text-center fw-600 font-xssss rounded-3 text-uppercase ls-3"
                  >
                    Home Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default NotfoundComponet
