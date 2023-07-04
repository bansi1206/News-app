import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import AccessDenied from './Access-denied';
import '../styles/comment.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Comment({ comment, userAvatar, user }) {
    const [replyText, setReplyText] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState('');
    const [isReplyFocused, setReplyFocused] = useState(false);
    const [isEditFocused, setEditFocused] = useState(false);

    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    const commentStyle = {
        marginLeft: comment.depth * 20 + 'px',
        paddingLeft: '10px',
    };

    console.log(userAvatar)


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

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/comments/${comment._id}`);
            comment.fetchComments();
        } catch (error) {
            console.log('Error deleting comment:', error);
        }
    };

    return (
        <div style={commentStyle}>
            {comment.avatar && (
                <div className="avatar"><img src={comment.avatar} /></div>
            )}

            <p className='comment-time'>{comment.created_at}</p>
            {isEditing ? (
                <form onSubmit={handleUpdate}>
                    <div className={`form-group col-12 ${isEditFocused || editText ? 'focused' : ''}`}>
                        <label>Write a reply</label>
                        <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
                    </div>
                    <button className='btn btn-primary' type="submit">Save</button>
                </form>
            ) : (
                <div className='comment-content'>
                    <h4>{comment.user_name}</h4>
                    <p>{comment.content}</p>
                </div>
            )}
            {comment.user_id === localStorage.getItem('user_id') && (
                <>
                    {!isEditing && (
                        <button className='btn btn-primary' onClick={handleEdit}>Edit</button>
                    )}
                    <button className='btn btn-primary' onClick={handleDelete}>Delete</button>
                </>
            )}
            {localStorage.getItem('user_id') ? (
                <button className='btn btn-primary' onClick={() => setShowReplyForm(!showReplyForm)}>Reply</button>
            ) : (<div></div>)}
            {showReplyForm && (
                <form className='comment-form row no-gutters' onSubmit={handleReplySubmit}>
                    <div className="avatar"><img src={userAvatar} /></div>
                    <div className={`form-group col-12 ${isReplyFocused || replyText ? 'focused' : ''}`}>
                        <label>Write a reply</label>
                        <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} onFocus={() => setReplyFocused(true)}
                            onBlur={() => setReplyFocused(false)} />
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-primary' type="submit">Post</button>
                    </div>
                </form>
            )}
            {comment.children && comment.children.map((childComment) => (
                <Comment key={childComment._id} comment={childComment} fetchComments={comment.fetchComments} userAvatar={userAvatar} />
            ))}
        </div>
    );
}

function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const fetchUserData = async () => {
            // Lấy user_id từ localStorage
            const userId = localStorage.getItem('user_id');

            // Kiểm tra nếu user_id tồn tại
            if (userId) {
                try {
                    // Gọi API endpoint để lấy thông tin người dùng từ server
                    const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                    setUser(response.data);
                    setUserLoaded(true);
                    setIsLoading(false);

                } catch (error) {
                    console.log('Error fetching user:', error);
                }
            }
        };
        fetchUserData();
    }, []);
    console.log(user)

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
        if (userLoaded) {
            fetchComments();
        } else {
            fetchComments();
        }
    }, [userLoaded, postId]);

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

    const userAvatar = user ? user.avatar : 'fallback-avatar-url';

    return (
        <div className='comment-section-wrapper'>
            <div className='container'>
                <div className='comment-section'>
                    <div className='container'>
                        <h2>Leave A Reply</h2>
                        {!isLoading ? (
                            <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} fetchComments={fetchComments} userAvatar={userAvatar} />
                        ) : (
                            <AccessDenied />
                        )}
                        {commentTree.map((comment) => (
                            <Comment key={comment._id} comment={comment} fetchComments={fetchComments} userAvatar={userAvatar} user={user} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentSection;
