'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';
import '../../styles/admin-post.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import AdminAccessDenied from '@/app/components/Admin-access-denied';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');


            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                    setUser(response.data);
                    setLoading(false);
                } catch (error) {
                    console.log('Error fetching user:', error);
                    router.push('/admin/login');
                }
            } else {
                router.push('/admin/login');
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/post');
                const fetchedPosts = response.data;
                setPosts(fetchedPosts.reverse());
            } catch (error) {
                console.log('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`http://localhost:3001/post/${postId}`);
            setPosts(posts.filter(post => post._id !== postId));
            toast.success('Post deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.log('Error deleting post:', error);
        }
    };

    const handlePublishPost = async (postId) => {
        try {
            await axios.put(`http://localhost:3001/posts/${postId}/publish`);
            setPosts(prevPosts =>
                prevPosts.map(post => {
                    if (post._id === postId) {
                        return { ...post, status: 'published' };
                    }
                    return post;
                })
            );
            toast.success('Post published successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.log('Error publishing post:', error);
        }
    };


    if (posts.length === 0) {
        return <div>Loading...</div>;
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = [...Array(totalPages).keys()].map((pageNumber) => (
        <li key={pageNumber} className={currentPage === pageNumber + 1 ? 'page-active' : ''}>
            <button
                className={currentPage === pageNumber + 1 ? 'button-active' : 'button-inactive'}
                onClick={() => handlePageChange(pageNumber + 1)}
            >
                {pageNumber + 1}
            </button>
        </li>
    ));

    return (
        <div>
            {!isLoading ? (<>
                <AdminHeader />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <ToastContainer />
                <div className="d-flex">
                    <Sidebar />
                    {user.role === 'admin' || user.role === 'writer' ? (
                        <div className='post-content-container'>
                            <div className='header-container d-flex'>
                                <h4>Posts</h4>
                                <a className='add-new-post' href='/admin/post/add-post'>Add New</a>
                            </div>
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Published Date</th>
                                            <th>Author</th>
                                            <th><FontAwesomeIcon icon={faMessage} /></th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentPosts.map((post) => (
                                            <tr key={post._id}>
                                                <td>
                                                    <Link href={`/admin/post/update-post/${post._id}`}>
                                                        {post.title}
                                                    </Link>
                                                </td>
                                                <td>{post.menu}</td>
                                                <td>{post.published_at}</td>
                                                <td>{post.author}</td>
                                                <td>
                                                    <div className="comment-icon-container">
                                                        <FontAwesomeIcon className='icon-message' icon={faMessage} />
                                                        <span className="comment-count">{post.commentCount}</span>
                                                    </div>
                                                </td>
                                                <td><p className={post.status === 'published' ? 'published' : 'pending'}>{post.status}</p></td>
                                                <td>
                                                    <Link href={`/admin/post/update-post/${post._id}`}>
                                                        <button className='btn btn-primary'>Edit</button>
                                                    </Link>
                                                    <button className='btn btn-danger' onClick={() => handleDeletePost(post._id)}>Delete</button>
                                                    {!isLoading ? user.role === 'admin' && post.status === 'pending' && (
                                                        <button className='btn btn-success' onClick={() => handlePublishPost(post._id)}>Publish</button>
                                                    ) : (<div></div>)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="pagination d-flex justify-content-center">
                                    <ul className='d-flex'>
                                        {renderPageNumbers}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (<AdminAccessDenied />)}
                </div>
            </>) : (<></>)}
        </div>
    );
};

export default Post;












