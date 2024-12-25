'use client';

import { useState } from 'react';
import NavBarComponent from './NavBarComponet';
import SideBar from './SideBar';
import { Edit3, Image, Send } from 'react-feather';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken'; // For decoding token
import axios from 'axios'; // For API requests
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function HomeComponet() {
    const router = useRouter();
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/Login');
    };

    // Handle text change
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file); 
        }
    };

    // Handle post creation
    const handleSendClick = async () => {
        const token = localStorage.getItem('token');
        let userId = null;
        if (token) {
            const decodedToken = jwt.decode(token);
            if (decodedToken) {
                userId = decodedToken.id;
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
            
            // Show success toast
            toast.success('Post created successfully!', {
                autoClose: 2000, // Auto-close after 3 seconds
            });

            setText(''); // Clear the text input
            setImage(null); // Clear the image input
            
        } catch (error) {
            console.error('Error creating post:', error);
            
            // Show error toast
            toast.error('Failed to create post. Please try again.', {
                autoClose: 2000,
            });
        }
    };

    return (
        <div className="main-wrapper">
            <NavBarComponent />
            <SideBar />
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
}

export default HomeComponet;
