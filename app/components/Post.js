'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import '../styles/post.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';


const Post = () => {
    const [posts, setPosts] = useState([]);
    const [topPosts, setTopPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/post');
                const fetchedPosts = response.data;
                const publishedPosts = fetchedPosts.filter((post) => post.status === 'published');
                setPosts(publishedPosts.reverse());
                const fetchedTopPosts = response.data;
                const publishedTopPosts = fetchedTopPosts.filter((post) => post.status === 'published');
                const sortedPosts = publishedTopPosts.sort((a, b) => b.viewCount - a.viewCount);
                const topSixPosts = sortedPosts.slice(0, 6);
                setTopPosts(topSixPosts);
            } catch (error) {
                console.log('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (posts.length === 0) {
        return <div>Loading...</div>;
    }



    return (
        <>
            <div className='banner'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-lg-12'>
                            <h2>Recent News</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className='row d-flex flex-row flex-wrap p-2 justify-content-center flex-grow-1'>
                    {currentPosts.map((post) => (
                        <div className="post-container col-lg-6 col-sm-12" key={post._id}>
                            <figure className='fig-container'>
                                <a href={`/postDetail/${post._id}`}>
                                    <span>
                                        <img src={`${post.cover}`} />
                                    </span>
                                </a>
                                <div className='post-cat-group'>
                                    <a className='post-cat cat-btn text-white' href={`/postByMenu/${post.menu_item_id}`}>{post.menu}</a>
                                </div>
                            </figure>
                            <div className='post-body'>
                                <h3 className='post-title d-flex'>
                                    <a href={`/postDetail/${post._id}`}>
                                        {post.title}
                                    </a>
                                </h3>
                                <div className='post-metas'>
                                    <ul className='list-inline d-flex'>
                                        <li>By {post.author}</li>
                                        <li>
                                            <i className='dot'>.</i>
                                            {post.published_at}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} currentPage={currentPage} paginate={paginate} />
            </div>
            <div className='banner'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-lg-12'>
                            <h2>Most Viewed</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className='row d-flex flex-row flex-wrap p-2 justify-content-center'>
                    {topPosts.map((post) => (
                        <div className="post-container col-lg-6 col-sm-12" key={post._id}>
                            <figure className='fig-container'>
                                <a href={`/postDetail/${post._id}`}>
                                    <span>
                                        <img src={`${post.cover}`} />
                                    </span>
                                </a>
                                <div className='post-cat-group'>
                                    <a className='post-cat cat-btn text-white' href={`/postByMenu/${post.menu_item_id}`}>{post.menu}</a>
                                </div>
                            </figure>
                            <div className='post-body'>
                                <h3 className='post-title d-flex'>
                                    <a href={`/postDetail/${post._id}`}>
                                        {post.title}
                                    </a>
                                </h3>
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
                    ))}
                </div>
            </div>
        </>
    );
};

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map((number) => (
                    <li
                        className={`page-item ${currentPage === number ? 'active' : ''}`}
                        key={number}
                        onClick={() => paginate(number)}
                    >
                        <a className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Post;
