import '../styles/post.css'
import React from 'react';

const Post = () => {
    return (
        <div className="post">
            <h2 className="post__title">Title</h2>
            <p className="post__metadata">
                <span className="post__category">Category</span>
                <span className="post__timestamp">Time</span>
            </p>
            <p className="post__author">By Author</p>
            <div className="post__content">Content</div>
        </div>
    );
};

export default Post;


