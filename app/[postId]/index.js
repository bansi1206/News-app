'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostDetail = () => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('postId');

        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/post/${postId}`);
                const fetchedPost = response.data;
                setPost(fetchedPost);
            } catch (error) {
                console.log('Error fetching post:', error);
            }
        };

        if (postId) {
            fetchPost();
        }
    }, []);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    );
};

export default PostDetail;
