'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';


const Post = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/post');
                const fetchedPosts = response.data;
                const publishedPosts = fetchedPosts.filter((post) => post.status === 'published');
                setPosts(publishedPosts);
            } catch (error) {
                console.log('Error fetching posts:', error);
            }
        };


        fetchPosts();
    }, []);




    if (posts.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {posts.map((post) => (
                <div className="post" key={post._id}>
                    <Link href={`/postDetail/${post._id}`}>
                        <h2 className="post__title">{post.title}</h2>
                    </Link>
                    <p className="post__metadata">
                        <span className="post__category">{post.menu}</span>
                        <span className="post__timestamp">{post.published_at}</span>
                    </p>
                    <p className="post__author">By {post.author}</p>
                    <div className="post__content">{post.content}</div>
                </div>
            ))}
        </div>
    );
};

export default Post;

