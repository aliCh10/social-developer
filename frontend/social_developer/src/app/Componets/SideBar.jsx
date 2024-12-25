import React from 'react';
import { Tv, Award, Globe, Zap, User, Inbox, Home, MapPin, Youtube, Settings, PieChart, MessageSquare } from 'react-feather';
import './css/style.css';

const SideBar = () => {
  return (
    <nav className="navigation scroll-bar">
      <div className="container ps-0 pe-0">
        <div className="nav-content">
          {/* Feeds Section */}
          <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              <span>New</span> Feeds
            </div>
            <ul className="mb-1 top-content">
              <li className="logo d-none d-xl-block d-lg-block"></li>
              <li>
                <a href="default.html" className="nav-content-bttn open-font">
                  <Tv size={50} className="me-3" style={{ backgroundColor: 'blue', borderRadius: '35%', padding: '5%' ,color:'white', }} />
                  <span>Newsfeed</span>
                </a>
              </li>
              <li>
                <a href="default-badge.html" className="nav-content-bttn open-font">
                  <Award size={50} className="me-3" style={{ backgroundColor: '#FF5733', borderRadius: '35%', padding: '5%' ,color:'white', }} />
                  <span>Badges</span>
                </a>
              </li>
              <li>
                <a href="default-storie.html" className="nav-content-bttn open-font">
                  <Globe size={50} className="me-3" style={{ backgroundColor: '#FFC107', borderRadius: '35%', padding: '5%' ,color:'white', }} />
                  <span>Explore Stories</span>
                </a>
              </li>
              <li>
                <a href="default-group.html" className="nav-content-bttn open-font">
                  <Zap size={50} className="me-3" style={{ backgroundColor: '#FF6347', borderRadius: '35%', padding: '5%' ,color:'white', }} />
                  <span>Popular Groups</span>
                </a>
              </li>
              <li>
                <a href="/profile" className="nav-content-bttn open-font">
                  <User size={50} className="me-3" style={{ backgroundColor: '#2196F3', borderRadius: '35%', padding: '5%' ,color:'white', }} />
                  <span>Author Profile</span>
                </a>
              </li>
            </ul>
          </div>

          {/* More Pages Section */}
          <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2">
            <div className="nav-caption fw-600 font-xssss text-grey-500">
              <span>More</span> Pages
            </div>
            <ul className="mb-3">
              <li>
                <a href="default-email-box.html" className="nav-content-bttn open-font">
                  <Inbox size={24} className="me-3" />
                  <span>Email Box</span>
                  <span className="circle-count bg-warning mt-1">584</span>
                </a>
              </li>
              <li>
                <a href="default-hotel.html" className="nav-content-bttn open-font">
                  <Home size={24} className="me-3" />
                  <span>Near Hotel</span>
                </a>
              </li>
              <li>
                <a href="default-event.html" className="nav-content-bttn open-font">
                  <MapPin size={24} className="me-3" />
                  <span>Latest Event</span>
                </a>
              </li>
              <li>
                <a href="default-live-stream.html" className="nav-content-bttn open-font">
                  <Youtube size={24} className="me-3" />
                  <span>Live Stream</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Account Section */}
          <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
            <div className="nav-caption fw-600 font-xssss text-grey-500">Account</div>
            <ul className="mb-1">
              <li className="logo d-none d-xl-block d-lg-block"></li>
              <li>
                <a href="default-settings.html" className="nav-content-bttn open-font h-auto pt-2 pb-2">
                  <Settings size={20} className="me-3 text-grey-500" />
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a href="default-analytics.html" className="nav-content-bttn open-font h-auto pt-2 pb-2">
                  <PieChart size={20} className="me-3 text-grey-500" />
                  <span>Analytics</span>
                </a>
              </li>
              <li>
                <a href="default-message.html" className="nav-content-bttn open-font h-auto pt-2 pb-2">
                  <MessageSquare size={20} className="me-3 text-grey-500" />
                  <span>Chat</span>
                  <span className="circle-count bg-warning mt-0">23</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
