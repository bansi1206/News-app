'use client'
import '../styles/header.css'
import Link from 'next/link';
import Menu from './Menu';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Header = () => {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            // Lấy user_id từ localStorage
            const userId = localStorage.getItem('user_id');

            // Kiểm tra nếu user_id tồn tại
            if (userId) {
                // Gọi API endpoint để lấy thông tin người dùng từ server
                const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                setUser(response.data);
            }
        };

        fetchUserData();
    }, []);

    return (
        <header className="header">
            <div className="header__top">
                <p className="header__date">{formattedDate}</p>
                <div className='header__top__right'>
                    <div>Search</div>
                    {user ? (
                        <div>
                            <p>Welcome, {user.username}</p>
                            <a href='/logout' className="header__logout">
                                Logout
                            </a>
                        </div>
                    ) : (
                        <Link href="/login" className="header__login">
                            Login
                        </Link>
                    )}
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
                            <Link href="/">
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
            <Menu />
        </header>
    );
};

export default Header;
