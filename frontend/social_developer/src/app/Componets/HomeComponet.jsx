'use client';

import { useState, useEffect } from 'react';
import NavBarComponent from './NavBarComponet';
import SideBar from './SideBar';
import { Edit3, Image, Send } from 'react-feather';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icone utilisateur

function HomeComponet() {
    const router = useRouter();
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt.decode(token);
            if (decodedToken) {
                setCurrentUserId(decodedToken.id);
            }
        }

        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/posts');
                const filteredPosts = response.data.filter(post => post.user.id !== currentUserId);
                setPosts(filteredPosts);
            } catch (error) {
                console.error('Erreur lors de la récupération des posts:', error);
                toast.error('Échec du chargement des posts.');
            }
        };

        fetchPosts();
    }, [currentUserId]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/Login');
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSendClick = async () => {
        const token = localStorage.getItem('token');
        let userId = null;

        if (token) {
            const decodedToken = jwt.decode(token);
            if (decodedToken) {
                userId = decodedToken.id;
            } else {
                toast.error('Token invalide. Veuillez vous reconnecter.');
                return;
            }
        } else {
            toast.error('Vous devez être connecté pour publier.');
            return;
        }

        const formData = new FormData();
        formData.append('content', text);
        if (image) formData.append('image', image);
        if (userId) formData.append('userId', userId);

        try {
            const response = await axios.post('http://localhost:3000/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Post créé avec succès!');
            setText('');
            setImage(null);
        } catch (error) {
            toast.error('Échec de la création du post.');
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
                                <div className="card w-100 shadow-xl rounded-xxl border-0 mb-4 bg-gradient">
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center">
                                            <Edit3 className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-light" />
                                            <h5 className="mb-0">Créer un Post</h5>
                                        </div>
                                        <textarea
                                            name="message"
                                            className="h100 bor-0 w-100 rounded-xxl p-3 mt-3 font-xssss fw-500 border-light-md theme-white-bg"
                                            placeholder="Quoi de neuf ?"
                                            value={text}
                                            onChange={handleTextChange}
                                        />
                                        {image && (
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt="Image téléchargée"
                                                className="uploaded-image mt-3"
                                                style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
                                            />
                                        )}
                                        <div className="d-flex justify-content-between mt-3">
                                            <label htmlFor="fileInput" className="text-primary cursor-pointer">
                                                <Image className="feather-image me-2" /> Ajouter une Photo/Video
                                            </label>
                                            <Send className="font-md text-warning feather-send cursor-pointer" onClick={handleSendClick} />
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </div>

                                {/* Affichage des posts avec design amélioré */}
                                <div className="posts">
                                    {posts.length > 0 ? (
                                        posts.map((post) => (
                                            <div key={post.id} className="post-card mb-4">
                                                <div className="card shadow-xl rounded-xxl border-0">
                                                    <div className="card-header d-flex align-items-center">
                                                        <AccountCircleIcon className="me-2 text-primary" style={{ fontSize: '40px' }} />
                                                        <h6>{post.user.username}</h6>
                                                    </div>
                                                    <div className="card-body p-4">
                                                        <p>{post.content}</p>
                                                        {post.image && <img src={post.image} alt="Post Image" className="img-fluid rounded-xxl" />}
                                                    </div>
                                                    <div className="card-footer p-4">
                                                        <div className="comments">
                                                            {post.comments.length > 0 ? (
                                                                post.comments.map((comment) => (
                                                                    <div key={comment.id} className="comment mb-3 d-flex align-items-start">
                                                                        <AccountCircleIcon className="me-3 text-primary" style={{ fontSize: '30px' }} />
                                                                        <div>
                                                                            <strong>{comment.user.username}</strong>
                                                                            <p>{comment.content}</p>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p>Aucun commentaire pour ce post.</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Aucun post disponible.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default HomeComponet;
