import '../styles/header.css'
import React from 'react';
import Link from 'next/link';
const Header = () => {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);



    return (
        <header className="header">
            <div className="header__top">
                <p className="header__date">{formattedDate}</p>
                <div className='header__top__right'>
                    <div>Search</div>
                    <a href='/login' className="header__login">Login</a>
                </div>
            </div>
            <nav className="navbar">
                <div className="container">
                    <Link href="/">
                        Logo
                    </Link>
                    <ul className="navbar__menu">
                        <li className="navbar__menu-item">
                            <Link href="/">
                                Home
                            </Link>
                        </li>
                        <li className="navbar__menu-item">
                            <Link href="/categories">
                                Categories
                            </Link>
                        </li>
                        <li className="navbar__menu-item">
                            <Link href="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header