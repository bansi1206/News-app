'use client'
import { useState } from "react";


const CommentForm = ({ postId, onCommentSubmit }) => {
    const [text, setText] = useState("");
    const isTextareaDisabled = text.length === 0;
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);




    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() !== '') {
            const newComment = {
                postId,
                content: text,
                user_id: localStorage.getItem('user_id'),
                created_at: formattedDate,
                parent_id: null
            };
            onCommentSubmit(newComment); // Gọi hàm callback để thông báo comment mới
            setText('');
        }
    };

    const isLoggedIn = localStorage.getItem("user_id");

    if (!isLoggedIn) {
        return <div>You must log in to use this function</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="write-comment"
                    type="text"
                    placeholder="write a comment"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ width: '100%', height: '50px' }}
                />
                <button type="submit" className="post-comment" disabled={isTextareaDisabled}>
                    Post
                </button>
            </form>
        </div>
    );
};

export default CommentForm;

