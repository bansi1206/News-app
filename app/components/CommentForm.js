'use client'
import { useState } from "react";
const CommentForm = () => {
    const [text, setText] = useState("");
    const isTextareDisabled = text.length === 0;

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(text)
        setText("");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <textarea className="write-comment" type="text" placeholder="write a comment" value={text} onChange={(e) => setText(e.target.value)} />
                <button type="submit" className="post-comment" disabled={isTextareDisabled}>Post</button>
            </form>
        </div>
    );
}

export default CommentForm;