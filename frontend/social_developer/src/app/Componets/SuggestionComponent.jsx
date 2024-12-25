'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

function SuggestionComponent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // Local state for userId
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    // Get the current user's ID from the JWT token
    const getUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwt.decode(token);
          if (decodedToken?.id) {
            setUserId(decodedToken.id);
            localStorage.setItem('userId', decodedToken.id);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID utilisateur:', error);
      }
    };
    getUserId();
  }, []);

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    // Fetch followers and following for the logged-in user
    const fetchFollowersAndFollowing = async () => {
      if (!userId) return; // Ensure userId is available
      try {
        const responseFollowing = await axios.get(`http://localhost:3000/user/${userId}/following`);
        setFollowing(responseFollowing.data.following || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs suivis:', error);
      }
    };
    fetchFollowersAndFollowing();
  }, [userId]);

  const handleFollow = async (currentUserId, targetUserId) => {
    try {
      await axios.post(`http://localhost:3000/user/${currentUserId}/follow/${targetUserId}`);
      setFollowing([...following, targetUserId]);
    } catch (error) {
      console.error('Erreur lors du suivi de l\'utilisateur:', error);
    }
  };

  const handleUnfollow = async (currentUserId, targetUserId) => {
    console.log(currentUserId,targetUserId);
    
      try {
       await axios.delete(`http://localhost:3000/user/${currentUserId}/unfollow/${targetUserId}`);
       setFollowing(following.filter((id) => id !== targetUserId));
     } catch (error) {
       console.error('Erreur lors du non-suivi de l\'utilisateur:', error);
     }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="main-content right-chat-active">
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left pe-0">
          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                <div className="card-body d-flex align-items-center p-0">
                  <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Group</h2>
                  <div className="search-form-2 ms-auto">
                    <i className="ti-search font-xss"></i>
                    <input
                      type="text"
                      className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                      placeholder="Search here."
                    />
                  </div>
                  <a href="#" className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3">
                    <i className="feather-filter font-xss text-grey-500"></i>
                  </a>
                </div>
              </div>

              <div className="row ps-2 pe-1">
                {users
                  .filter((user) => user.id !== userId) // Exclude the logged-in user
                  .map((user) => (
                    <div className="col-md-6 pe-2 ps-2" key={user._id}>
                      <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                        <div
                          className="card-body position-relative h100 bg-image-cover bg-image-center"
                          style={{ backgroundImage: 'url(images/bb-16.png)' }}
                        ></div>
                        <div className="card-body d-block w-100 pl-10 pe-4 pb-4 pt-0 text-left position-relative">
                          <figure
                            className="avatar position-absolute w75 z-index-1"
                            style={{ top: '-40px', left: '15px' }}
                          >
                            <img
                              src="images/user-12.png"
                              alt="image"
                              className="float-right p-1 bg-white rounded-circle w-100"
                            />
                          </figure>
                          <div className="clearfix"></div>
                          <h4 className="fw-700 font-xsss mt-3 mb-1">{user.username}</h4>
                          <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">{user.email}</p>
                          
                          {/* Display Follow and Unfollow buttons */}
                          {!following.includes(user.id) && (
                            <button
                              onClick={() => handleFollow(userId, user.id)}
                              className="btn btn-primary"
                            >
                              FOLLOW
                            </button>
                          )}
                          {following.includes(user.id) && (
                            <button
                              onClick={() => handleUnfollow(userId, user.id)}
                              className="btn btn-danger"
                            >
                              UNFOLLOW
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestionComponent;
