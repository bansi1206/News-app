'use client'
// pages/index.js
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostDetail = () => {
    const router = useRouter();
    const { postId } = router.query;
    const [post, setPost] = useState(null);

    useEffect(() => {
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
    }, [postId]);

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
