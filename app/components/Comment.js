import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';

function Comment({ comment }) {
    const [replyText, setReplyText] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState('');
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    const commentStyle = {
        marginLeft: comment.depth * 20 + 'px', // Lùi thẻ con dựa trên độ sâu
        borderLeft: '1px solid #ccc', // Đường viền trái cho thẻ con
        paddingLeft: '10px', // Padding bên trái cho thẻ con
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();

        const newComment = {
            content: replyText,
            postId: comment.post_id,
            parentId: comment._id,
            created_at: formattedDate,
            user_id: localStorage.getItem('user_id'),
        };

        try {
            await axios.post('http://localhost:3001/comments', newComment);
            setShowReplyForm(false);
            setReplyText('');
            comment.fetchComments();
        } catch (error) {
            console.log('Error submitting reply:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditText(comment.content);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedComment = {
            content: editText,
            created_at: formattedDate,
        };

        try {
            await axios.put(`http://localhost:3001/comments/${comment._id}`, updatedComment);
            setIsEditing(false);
            comment.fetchComments();
        } catch (error) {
            console.log('Error updating comment:', error);
        }
    };

    return (
        <div style={commentStyle}>
            <p>{comment.user_name}</p>
            <p>{comment.created_at}</p>
            {isEditing ? (
                <form onSubmit={handleUpdate}>
                    <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
                    <button type="submit">Save</button>
                </form>
            ) : (
                <p>{comment.content}</p>
            )}
            {comment.user_id === localStorage.getItem('user_id') && (
                <>
                    {!isEditing && (
                        <button onClick={handleEdit}>Edit</button>
                    )}
                </>
            )}
            <button onClick={() => setShowReplyForm(!showReplyForm)}>Reply</button>
            {showReplyForm && (
                <form onSubmit={handleReplySubmit}>
                    <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply" />
                    <button type="submit">Post</button>
                </form>
            )}
            {comment.children && comment.children.map((childComment) => (
                <Comment key={childComment._id} comment={childComment} fetchComments={comment.fetchComments} />
            ))}
        </div>
    );
}

function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/comments/${postId}`);
            const fetchedComments = response.data;
            setComments(fetchedComments);
        } catch (error) {
            console.log('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleCommentSubmit = async (newComment) => {
        try {
            await axios.post(`http://localhost:3001/comments`, newComment);
            fetchComments();
        } catch (error) {
            console.log('Error submitting comment:', error);
        }
    };

    function buildCommentTree(comments, parentId = null, depth = 0) {
        const commentTree = [];
        for (const comment of comments) {
            if (comment.parentId === parentId) {
                comment.depth = depth;
                const nestedComments = buildCommentTree(comments, comment._id, depth + 1);
                if (nestedComments.length) {
                    comment.children = nestedComments;
                }
                comment.fetchComments = fetchComments;
                commentTree.push(comment);
            }
        }
        return commentTree;
    }

    const sortedComments = comments.sort((a, b) => a.created_at - b.created_at);
    const commentTree = buildCommentTree(sortedComments);

    return (
        <div>
            <h3>Comments</h3>
            <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} fetchComments={fetchComments} />
            <div>Comment Sections</div>
            {commentTree.map((comment) => (
                <Comment key={comment._id} comment={comment} fetchComments={fetchComments} />
            ))}
        </div>
    );
}

export default CommentSection;
