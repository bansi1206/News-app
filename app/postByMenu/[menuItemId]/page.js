'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const postByMenu = ({ params }) => {
    const [posts, setPosts] = useState([]);
    const { menuItemId } = params;
    console.log(menuItemId)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/postByMenu/${menuItemId}`);
                const fetchedPosts = response.data;
                setPosts(fetchedPosts);
            } catch (error) {
                console.log('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [menuItemId]);

    if (posts.length === 0) {
        return <div>No posts found</div>;
    }

    return (
        <div>
            <h1>This is posts by menu page</h1>
            {posts.map((post) => (
                <div className="post" key={post._id}>
                    <Link href={`/postDetail/${post._id}`}>
                        <h2 className="post__title">{post.title}</h2>
                    </Link>
                    <p className="post__metadata">
                        <span className="post__menu">{post.menu}</span>
                        <span className="post__timestamp">Time</span>
                    </p>
                    <p className="post__author">By Author</p>
                    <div className="post__content">{post.content}</div>
                </div>
            ))}
        </div>
    );
};

export default postByMenu;
