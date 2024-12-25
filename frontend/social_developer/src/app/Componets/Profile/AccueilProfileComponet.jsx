'use client';

import React, { useEffect, useState } from 'react';
import '../css/style.css';
import '../css/feather.css';
import '../css/themify-icons.css';
import '../css/lightbox.css';
import '../css/iconestyle.css';
import ImageCovertureComponet from './ImageCovertureComponet';
import SideBarProfilComponet from './SideBarProfilComponet';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
    Edit3, Video, Image, Camera, Send,
    ThumbsUp, Heart, MessageCircle, Share2, MoreHorizontal,
} from 'react-feather';
import axios from 'axios';
import jwt from 'jsonwebtoken'; // Import jwt for decoding token

const AccueilProfileComponet = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]); // Correct state name is 'posts'

    // Fetch posts from the API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                let userId = null;
                if (token) {
                    const decodedToken = jwt.decode(token);
                    if (decodedToken) {
                        userId = decodedToken.id;
                    }
                }

                const response = await axios.get(`http://localhost:3000/posts/user/${userId}`);
                setPosts(response.data); // Set the fetched posts
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);

            // Store the file to send to the backend
        }
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSendClick = async () => {
        console.log('Textarea value:', text);
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

        const formData = new FormData();
        formData.append('content', text);
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
            setPosts([response.data, ...posts]); // Update the posts state with the new post
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="main-content right-chat-active">
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="row">
                        <div className="col-lg-12"><ImageCovertureComponet /></div>
                        <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0"><SideBarProfilComponet /></div>
                        <div className="col-xl-8 col-xxl-9 col-lg-8">
                            <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                                <div className="card-body p-0">
                                    <a href="#" className="font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center">
                                        <Edit3 className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight" />
                                        Create Post
                                    </a>
                                </div>
                                <div className="card-body p-0 mt-3 position-relative">
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
                                            src={URL.createObjectURL(image)}
                                            alt="Uploaded"
                                            className="uploaded-image mt-3"
                                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                        />
                                    )}
                                </div>
                                <div className="card-body d-flex p-0 mt-0">
                                    <a
                                        href="#"
                                        className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                                        onClick={() => document.getElementById('fileInput')?.click()}
                                    >
                                        <Image className="font-md text-success feather-image me-2" />
                                        <span className="d-none-xs">Photo/Video</span>
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
                            {posts.map((post) => (
                                <div key={post._id || post.userId} className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                    <div className="card-body p-0 d-flex">
                                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                                            {post.user ? post.user.username : 'Unknown User'}
                                        </h4>
                                        <a href="#" className="ms-auto">
                                            <MoreHorizontal className="text-grey-900 btn-round-md bg-greylight font-xss" />
                                        </a>
                                    </div>
                                    <div className="card-body p-0">
                                        <h3 className="fw-500  ">{post.content}</h3>
                                    </div>
                                    <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                                        {post.image && (
                                            <img
                                                src={post.image}
                                                alt="Post"
                                                className="w-100"
                                            />
                                        )}
                                    </div>

                                    <div className="card-body d-flex p-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star me-2 icon-style" viewBox="0 0 16 16">
                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-star-fill me-2 icon-style" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-chat me-2 icon-style" viewBox="0 0 16 16">
                                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                                        </svg>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccueilProfileComponet;
