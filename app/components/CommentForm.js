'use client'
import { useState, useEffect } from "react";
import '../styles/comment.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const CommentForm = ({ postId, onCommentSubmit, userAvatar }) => {
    const [text, setText] = useState("");
    const [isCommentFocused, setCommentFocused] = useState(false);
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
        return <div>You must <a className="text-decoration-none text-danger" href="/login">log in</a> to use this function</div>;
    }

    return (
        <div>
            <form className="comment-form row no-gutters" onSubmit={handleSubmit}>
                <div className="avatar"><img src={userAvatar} /></div>
                <div className={`form-group col-12 ${isCommentFocused || text ? 'focused' : ''}`}>
                    <div><label>write a comment</label>
                        <textarea
                            className="write-comment"
                            type="textarea"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={1}
                            onFocus={() => setCommentFocused(true)}
                            onBlur={() => setCommentFocused(false)}
                        /></div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-secondary" disabled={isTextareaDisabled}>
                        Post
                    </button>

                </div>

            </form>
        </div>
    );
};

export default CommentForm;

