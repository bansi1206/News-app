'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from '@/app/components/Comment';
import CommentSection from '@/app/components/Comment';

const PostDetail = ({ params }) => {
    const { postId } = params;
    console.log(postId)
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
            <img src={post.cover} style={{ width: '250px', height: '250px' }} />
            <h2>{post.title}</h2>
            <p>By {post.author}</p>
            <p>{post.published_at}</p>
            <p>{post.content}</p>
            <CommentSection postId={postId} />
        </div>
    );
};

export default PostDetail;
