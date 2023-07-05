'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import CommentSection from '@/app/components/Comment';
import '../../styles/postDetail.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';


const PostDetail = ({ params }) => {
    const { postId } = params;
    console.log(postId)
    const [post, setPost] = useState(null);


    useEffect(() => {
        const increaseViewCount = async () => {
            try {
                await axios.post(`http://localhost:3001/post/${postId}/increaseViewCount`);
            } catch (error) {
                console.log('Error increasing view count:', error);
            }
        };

        increaseViewCount();
    }, [postId]);

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
            <Header />
            <div className='postDetail-container'>
                <div className='breadcrumb-wrapper'>
                    <div className='container'>
                        <nav aria-label='breadcrumb'>
                            <ol className='breadcrumb d-flex align-items-center mt-4'>
                                <li className='home'><a href='/'>Home</a></li>
                                <li className='menu-item'><a href={`/postByMenu/${post.menu_item_id}`}><span className='dash'>/</span>{post.menu}<span className='dash'>/</span></a></li>
                                <li className='postDetail-title'>{post.title}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className='banner d-flex'>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col-lg-6'>
                                <div className='post-title-wrapper'>
                                    <div className='post-cat-group m-b-xs-10'>
                                        <a className='post-cat cat-btn text-white' href={`/postByMenu/${post.menu_item_id}`}>{post.menu}</a>
                                    </div>
                                    <h2 className='post-title'>{post.title}</h2>
                                    <div className='post-metas'>
                                        <ul className='list-inline d-flex'>
                                            <li>By {post.author}</li>
                                            <li>
                                                <i className='dot'>.</i>
                                                <FontAwesomeIcon icon={faEye} /> {post.viewCount} Views
                                            </li>
                                            <li>
                                                <i className='dot'>.</i>
                                                {post.published_at}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <a className='banner-img' href={`/postDetail/${post._id}`}>
                                    <span>
                                        <img src={`${post.cover}`} />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='post-content-wrapper'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-8'>
                                <div className='post-content'>
                                    <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                                </div>
                            </div>
                            <div className='col-lg-4'></div>
                        </div>
                    </div>
                </div>
                <CommentSection postId={postId} />
            </div>
            <Footer />
        </div>
    );
};

export default PostDetail;
