'use client';  
import { useState, useEffect } from 'react';
import NavBarComponent from './NavBarComponet';
import SideBar from './SideBar';
import { Edit3, Image, Send, MessageCircle, Heart } from 'react-feather';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function HomeComponet() {
    const router = useRouter();
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [likedPosts, setLikedPosts] = useState({}); // To track liked posts
    const [likesCount, setLikesCount] = useState({}); // To track likes count for each post

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
                // Fetch all posts
                const response = await axios.get('http://localhost:3000/posts');
                const allPosts = response.data;
        
                // Initialize the like status and likes count for each post
                const updatedPosts = await Promise.all(allPosts.map(async (post) => {
                    try {
                        // Fetch the likes count for each post
                        const likesResponse = await axios.post(`http://localhost:3000/likes/count/${post.id}`);
                        const likesCount = likesResponse.data.likesCount !== null && likesResponse.data.likesCount !== undefined
                            ? likesResponse.data.likesCount 
                            : 0;
                        const likedByUser = post.likedByUser || false;  // Assuming post.likedByUser exists
        
                        // Return the post with updated likes count and likedByUser status
                        return { ...post, likesCount, likedByUser };
                    } catch (error) {
                        console.error(`Error fetching likes for post ${post.id}:`, error);
                        return post;  // Return the post without updating if there's an error
                    }
                }));
        
                // Update the posts with the new like information
                setPosts(updatedPosts);
        
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
            await axios.post('http://localhost:3000/posts', formData, {
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

    const handleLikeToggle = async (postId) => {
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
            toast.error('Vous devez être connecté pour aimer ce post.');
            return;
        }

        const isLiked = likedPosts[postId] || false; // Check if the post is already liked
        const action = isLiked ? 'remove' : 'add'; // Decide whether to add or remove the like

        try {
            // Update like status on server
            await axios.post(`http://localhost:3000/likes/${action}/${postId}/${userId}`);

            // Update local like status
            setLikedPosts((prevState) => ({
                ...prevState,
                [postId]: !isLiked, // Toggle the like status
            }));

            // Update likes count
            const updatedLikesCount = { ...likesCount };
            updatedLikesCount[postId] = isLiked ? updatedLikesCount[postId] - 1 : updatedLikesCount[postId] + 1;
            setLikesCount(updatedLikesCount);

        } catch (error) {
            console.error('Error while liking the post:', error);
            toast.error('Échec de l\'ajout du like.');
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

                                {/* Display each post with like count */}
                                <div className="posts">
                                    {posts.length > 0 ? (
                                        posts.map((post) => (
                                            <div
                                                key={post.id}
                                                className="post-card mb-4 p-3 rounded"
                                                style={{ backgroundColor: '#f0f0f0' }}
                                            >
                                                <div className="card shadow-sm rounded border-0">
                                                    <div className="card-header d-flex align-items-center">
                                                        <AccountCircleIcon
                                                            className="me-2 text-primary"
                                                            style={{ fontSize: '40px' }}
                                                        />
                                                        <strong>{post.user.username}</strong>
                                                    </div>
                                                    <div className="card-body p-4">
                                                        <p>{post.content}</p>
                                                        {post.image && (
                                                            <img
                                                                src={post.image}
                                                                alt="Post Image"
                                                                className="img-fluid rounded"
                                                                style={{ objectFit: 'cover' }}
                                                            />
                                                        )}
                                                        <div className="comments mt-4">
                                                            {post.comments.length > 0 ? (
                                                                post.comments.map((comment) => (
                                                                    <div
                                                                        key={comment.id}
                                                                        className="comment mb-2"
                                                                        style={{ backgroundColor: '#e9ecef', padding: '5px', borderRadius: '8px' }}
                                                                    >
                                                                        <div className="d-flex align-items-center">
                                                                            <AccountCircleIcon
                                                                                className="me-2 text-primary"
                                                                                style={{ fontSize: '30px' }}
                                                                            />
                                                                            <h5>{comment.user.username}</h5>
                                                                        </div>
                                                                        <p className="mb-0">{comment.content}</p>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p>Aucun commentaire.</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="card-footer d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <MessageCircle
                                                                className="me-2 text-primary cursor-pointer"
                                                                style={{ fontSize: '20px' }}
                                                            />
                                                            <span className="me-4">Commenter</span>
                                                            <Heart
                                                                className={`cursor-pointer ${likedPosts[post.id] ? 'text-danger' : ''}`}
                                                                style={{ fontSize: '20px' }}
                                                                onClick={() => handleLikeToggle(post.id)}
                                                            />
                                                            <span>{likesCount[post.id] || 0} Likes</span>
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
        </div>
    );
}

export default HomeComponet;
