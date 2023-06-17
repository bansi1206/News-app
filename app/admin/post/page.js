'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const router = useRouter();

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
                setPosts(fetchedPosts);
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

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Published Date</th>
                    <th>Author</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post) => (
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
                            <Link href={`/admin/post/update-post/${post._id}`}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                            {user.role === 'admin' && post.status === 'pending' && (
                                <button onClick={() => handlePublishPost(post._id)}>Publish</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Post;












