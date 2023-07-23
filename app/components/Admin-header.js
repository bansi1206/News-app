'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/admin-header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';


const AdminHeader = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');


            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                    setUser(response.data);
                    setIsLoading(false);
                } catch (error) {
                    console.log('Error fetching user:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleAccountMouseEnter = () => {
        setIsAccountDropdownOpen(true);
    };

    const handleAccountMouseLeave = () => {
        setIsAccountDropdownOpen(false);
    };



    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };
    return (
        <div className="admin-header-container d-flex justify-content-between">
            <ul className='left-header d-flex align-items-center'>
                <li>
                    <a className='logo' href='/admin'>
                        <img src='/vercel-light.svg' />
                    </a>
                </li>
                <li>
                    <a className='visit-site d-flex align-items-center' href='/'>
                        <span><FontAwesomeIcon className='house-icon' icon={faHouse} /></span>
                        <span className='visit-site-text'>Visit Site</span>
                    </a>
                </li>
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <li>
                        <a className='add-post d-flex align-items-center' href='/admin/post/add-post'>
                            <span><FontAwesomeIcon className='plus-icon' icon={faPlus} /></span>
                            <span className='add-post-text'>Add New</span>
                        </a>
                        <div className={`add-dropdown ${isDropdownOpen ? 'hover' : ''}`}>
                            <ul>
                                <li>
                                    <a href='/admin/post/add-post'>Post</a>
                                </li>
                                <li>
                                    <a href='/admin/account/add-user'>User</a>
                                </li>
                                <li>
                                    <a href='/admin/menu-management/add-menu'>Menu</a>
                                </li>
                                <li>
                                    <a href='/admin/menu-management/add-menuItem'>Menu Item</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </div>
            </ul>
            <div className='account d-flex align-items-center' onMouseEnter={handleAccountMouseEnter} onMouseLeave={handleAccountMouseLeave}>
                {!isLoading ? (<div className='d-flex align-items-center'>
                    <span className='display-name'>Howdy, {user.username} </span>
                    <span className='display-avatar d-flex align-items-center'><img src={user.avatar} /></span>
                </div>) : (<div></div>)}
                <div className={`account-dropdown ${isAccountDropdownOpen ? 'hover' : ''}`}>
                    <ul>
                        <li>
                            <a href='/admin/logout'>Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default AdminHeader;
