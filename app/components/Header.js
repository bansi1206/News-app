'use client'
import '../styles/header.css'
import Link from 'next/link';
import Menu from './Menu';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faRightFromBracket, faRightToBracket, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';




const Header = () => {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const [user, setUser] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const router = useRouter();


    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');

            if (userId) {
                const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                setUser(response.data);
            }
        };

        fetchUserData();
    }, []);

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/search?searchValue=${keyword}`);
    };

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };



    return (
        <header className="page-header">
            <div className='header-top bg-dark text-white'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-md'>
                            <ul className='header-top-nav d-flex list-inline justify-content-center justify-content-md-start'>
                                <li className='current-date p-2'>{formattedDate}</li>
                                <li className='new p-2'><a href='/'>News</a></li>
                                <li className='about p-2'><a href='/about'>About</a></li>
                                <li className='contact p-2'><a href='/contact'>Contact</a></li>
                            </ul>
                        </div>
                        <div className='col-md-auto'>
                            <ul className='ml-2 social-share header-top__social-share list-inline d-flex'>
                                <li className='facebook p-2'><a href='#'><FontAwesomeIcon icon={faFacebookF} /></a></li>
                                <li className='twitter p-2'><a href='#'><FontAwesomeIcon icon={faTwitter} /></a></li>
                                <li className='instagram p-2'><a href='#'><FontAwesomeIcon icon={faInstagram} /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <nav className='navbar bg-white border-bottom'>
                <div className='container'>
                    <div className='navbar-inner d-flex'>
                        <div className={`brand-logo-container p-2 ${isSearchOpen ? 'hidden' : ''}`}><a href='/'><img src='/vercel.svg' /></a></div>
                        <div className={`main-nav-wrapper p-2 ${isSearchOpen ? 'hidden' : ''}`}>
                            <Menu />
                        </div>
                        <div className='navbar-extra-features ml-auto p-2'>
                            <form
                                action='/search'
                                method="get"
                                onSubmit={handleSearch}
                                className={`navbar-search d-flex ${isSearchOpen ? 'active' : ''}`}
                                style={{
                                    visibility: isSearchOpen ? 'visible' : 'hidden',
                                    opacity: isSearchOpen ? 1 : 0
                                }}
                            >
                                <div className='search-field'>
                                    <input type='text' className='navbar-search-field p-2' placeholder='Search Here...'
                                        name="keyword"
                                        value={keyword}
                                        onChange={handleInputChange} />
                                    <button onClick={handleSearch} className='navbar-search-btn' type='button'>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                </div>
                                <span className='navbar-search-close' onClick={handleSearchToggle}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </form>
                            <div className='extra-function'>
                                <ul>
                                    <li>
                                        <button
                                            className={`nav-search-field-toggler ${isSearchOpen ? 'hidden' : ''}`}
                                            onClick={handleSearchToggle}
                                        >
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                    </li>
                                    <li>
                                        {user ? (
                                            <div>
                                                <a href='/profile' className={`user-avatar ${isSearchOpen ? 'hidden' : ''}`}>
                                                    <img src={user.avatar} alt="User Avatar" />
                                                </a>
                                                <a className={`logout ${isSearchOpen ? 'hidden' : ''}`} href='/logout'>
                                                    <FontAwesomeIcon className='icon' icon={faRightFromBracket} />
                                                </a>
                                            </div>
                                        ) : (
                                            <a className={`login ${isSearchOpen ? 'hidden' : ''}`} href='/login'>
                                                <FontAwesomeIcon className='icon' icon={faRightToBracket} />
                                            </a>
                                        )}
                                    </li>
                                </ul>
                            </div>



                        </div>
                    </div>
                </div>

                <style jsx>{`
        .hidden {
          display: none;
        }
      `}</style>
            </nav>
        </header>
    );
};

export default Header;
