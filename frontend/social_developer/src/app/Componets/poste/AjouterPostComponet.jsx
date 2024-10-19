import React, { useState } from 'react';
import { Edit3, Video, Image, Camera, Send } from 'react-feather';
import axios from 'axios';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

import '../css/style.css';
import '../css/feather.css';
import '../css/themify-icons.css';
import '../css/lightbox.css';

function AjouterPostComponet() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); // Store the file to send to the backend.
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSendClick = async () => {
    console.log('Textarea value:', text);

    // Decode token to get userId
    const token = localStorage.getItem('token');
    let userId = null;

    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        if (decodedToken) {
          userId = decodedToken.id;
          console.log('Decoded Token:', userId);
        }
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    }

    // Create FormData to send the text and image to the backend
    const formData = new FormData();
    formData.append('description', text);
    if (image) {
      formData.append('image', image);
    }
    if (userId) {
      formData.append('userId', userId);
    }

    try {
      const response = await axios.post('http://localhost:3000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post created successfully:', response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="main-content right-chat-active">
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="row">
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
                    className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss fw-500 border-light-md theme-white-bg"
                    cols={30}
                    rows={10}
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={handleTextChange}
                    style={{ backgroundColor: 'white', color: 'black' }}
                  />
                  {image && (
                    <img
                      src={URL.createObjectURL(image)} // Display the image before uploading
                      alt="Uploaded"
                      className="uploaded-image mt-3"
                      style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div className="card-body d-flex p-0 mt-0">
                  <a href="#" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
                    <Video className="font-md text-danger feather-video me-2" />
                    <span className="d-none-xs">Live Video</span>
                  </a>
                  <a
                    href="#"
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    <Image className="font-md text-success feather-image me-2" />
                    <span className="d-none-xs">Photo/Video</span>
                  </a>
                  <a href="#" className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4">
                    <Camera className="font-md text-warning feather-camera me-2" />
                    <span className="d-none-xs">Feeling/Activity</span>
                  </a>
                  <Send className="ms-auto font-md text-warning feather-send me-3" onClick={handleSendClick} />
                </div>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterPostComponet;
