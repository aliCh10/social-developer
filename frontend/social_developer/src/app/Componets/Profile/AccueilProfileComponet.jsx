'use client';

import React, { useEffect, useState } from 'react';
import '../css/style.css';
import '../css/feather.css';
import '../css/themify-icons.css';
import '../css/lightbox.css';
import ImageCovertureComponet from './ImageCovertureComponet';
import SideBarProfilComponet from './SideBarProfilComponet';
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

                            {/* Render the list of posts */}
                            {posts.map((post) => (
                                <div key={post._id} className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
                                    <div className="card-body p-0 d-flex">
                                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">{post.userId}</h4>
                                        <a href="#" className="ms-auto">
                                            <MoreHorizontal className="text-grey-900 btn-round-md bg-greylight font-xss" />
                                        </a>
                                    </div>
                                    <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                                        {post.imageUrl && (
                                            <img
                                                src={`http://localhost:3000/uploads/${post.imageUrl}`}
                                                alt="Post"
                                                className="w-100"
                                            />
                                        )}
                                    </div>
                                    <div className="card-body p-0">
                                        <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">{post.description}</p>
                                    </div>
                                    <div className="card-body d-flex p-0">
                                        <ThumbsUp className="text-white bg-primary-gradiant me-1 btn-round-xs font-xss" />
                                        <Heart className="text-white bg-red-gradiant me-2 btn-round-xs font-xss" />
                                        <MessageCircle className="text-dark text-grey-900 btn-round-sm font-lg" />
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
