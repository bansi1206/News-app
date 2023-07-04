'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '../../styles/postByMenu.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const postByMenu = ({ params }) => {
    const [posts, setPosts] = useState([]);
    const [menuTitle, setMenuTitle] = useState('');
    const { menuItemId } = params;
    console.log(menuItemId)


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const responseMenu = await axios.get('http://localhost:3001/getMenu');
                const responseMenuItem = await axios.get('http://localhost:3001/getMenuItem');

                const menu = responseMenu.data.find(item => item._id === menuItemId);
                const menuItem = responseMenuItem.data.find(item => item._id === menuItemId);

                let menuTitle = '';

                if (menu) {
                    menuTitle = menu.title;
                } else {
                    menuTitle = menuItem.title;
                }

                setMenuTitle(menuTitle);

                const responsePosts = await axios.get(`http://localhost:3001/postByMenu/${menuItemId}`);
                const fetchedPosts = responsePosts.data;
                setPosts(fetchedPosts.reverse());
            } catch (error) {
                console.log('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [menuItemId]);





    if (posts.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className='postByMenu-container'>
                <div className='breadcrumb-wrapper'>
                    <div className='container'>
                        <nav aria-label='breadcrumb'>
                            <ol className='breadcrumb d-flex align-items-center mt-4'>
                                <li><a href='/'>Home</a></li>
                                <li><span className='dash'>/</span><span className='menu-name'>{menuTitle}</span><span className='dash'></span></li>

                            </ol>
                        </nav>
                    </div>
                </div>
                <div className='banner'>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col-lg-12'>
                                <h2>{menuTitle}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='postByMenu'>
                    <div className='container'>
                        <div className='row d-flex'>
                            <div className='col-lg-8'>
                                <div className='row d-flex grid row-gap-3'>
                                    {posts.map((post) => (
                                        <div className="post-container d-flex" key={post._id}>
                                            <div className='post-cover'>
                                                <a href={`/postDetail/${post._id}`}>
                                                    <span>
                                                        <img src={`${post.cover}`} />
                                                    </span>
                                                </a>
                                            </div>
                                            <div className='post-menu ms-2'>
                                                <div className='post-cat-group m-b-xs-10'>
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
                                    ))}
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

export default postByMenu;
