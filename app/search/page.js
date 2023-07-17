'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from 'next/navigation'
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/search.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchPosts = () => {
    const [posts, setPosts] = useState([])
    const [keyword, setKeyword] = useState('');
    const [shouldReload, setShouldReload] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3001/post");
                const fetchedPosts = response.data;
                setPosts(fetchedPosts);
            } catch (error) {
                console.log("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const handleSearch = async (searchValue) => {
            try {
                const response = await axios.get("http://localhost:3001/searchPosts", {
                    params: {
                        searchValue,
                    },
                });
                const fetchedPosts = response.data;
                const filteredPosts = fetchedPosts.filter((post) => post.status === 'published');
                setPosts(filteredPosts);
            } catch (error) {
                console.log("Error searching posts:", error);
            }
        };

        if (keyword && posts.length > 0) {
            handleSearch(keyword);
            setShouldReload(true);
        }
    }, [keyword, posts]);

    useEffect(() => {
        const currentKeyword = searchParams.get('searchValue');
        if (currentKeyword) {
            setKeyword(currentKeyword);
            if (shouldReload) {
                setShouldReload(false);
                window.location.reload();
            }
        }
    }, [searchParams]);



    return (
        <div className="search-page">
            <Header />
            <div className="search-container">
                <div className='breadcrumb-wrapper'>
                    <div className='container'>
                        <nav aria-label='breadcrumb'>
                            <ol className='breadcrumb d-flex align-items-center mt-4'>
                                <li><a href='/'>Home</a></li>
                                <li><span className='dash'>/</span><span className='menu-name'>You searched for {keyword}</span><span className='dash'></span></li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className='banner'>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col-lg-12'>
                                <h2>Search results for "{keyword}"</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='post-searched'>
                    <div className='container'>
                        <div className='row d-flex'>
                            <div className='col-lg-8'>
                                <div className='row d-flex grid row-gap-3'>
                                    {posts.length !== 0 ? (
                                        posts.map((post) => (
                                            <div className="post-container d-flex" key={post._id}>
                                                <div className='post-cover'>
                                                    <a href={`/postDetail/${post._id}`}>
                                                        <span>
                                                            <img src={`${post.cover}`} />
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className='post-menu ms-2'>
                                                    <div className='postCat-group'>
                                                        <a className='post-cat cat-btn text-white' href={`/postByMenu/${post.menu_item_id}`}>{post.menu}</a>
                                                    </div>
                                                    <div className='post-title'>
                                                        <h3 className='post-title'><a href={`/postDetail/${post._id}`}>{post.title}</a></h3>
                                                    </div>
                                                    <div className='post-metas'>
                                                        <p className='post-author'>By {post.author}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (<div>No posts found</div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchPosts;
