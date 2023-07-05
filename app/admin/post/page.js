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

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUserData = async () => {
            // Lấy user_id từ localStorage
            const userId = localStorage.getItem('user_id');

            // Kiểm tra nếu user_id tồn tại
            if (userId) {
                try {
                    // Gọi API endpoint để lấy thông tin người dùng từ server
                    const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                    setUser(response.data);
                    setLoading(false);
                } catch (error) {
                    console.log('Error fetching user:', error);
                    router.push('/admin/login'); // Chuyển hướng đến trang login khi có lỗi
                }
            } else {
                router.push('/admin/login'); // Chuyển hướng đến trang login nếu không có user_id
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
            console.log('Post deleted successfully');
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
            console.log('Post published successfully');
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
                    ) : (<></>)}
                </div>
            </>) : (<></>)}
        </div>
    );
};

export default Post;












