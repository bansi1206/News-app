'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../styles/sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCaretLeft, faChartLine, faGear, faList, faPen, faUser } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('dashboard');

    useEffect(() => {
        const currentPath = window.location.pathname;

        if (currentPath === '/admin') {
            setActiveLink('dashboard');
        } else if (currentPath === '/admin/account' || currentPath === '/admin/account/add-user' || currentPath.startsWith('/admin/account/update-user/')) {
            setActiveLink('account');
        } else if (currentPath === '/admin/post' || currentPath === '/admin/post/add-post' || currentPath.startsWith('/admin/post/update-post')) {
            setActiveLink('post');
        } else if (currentPath === '/admin/menu-management' || currentPath === '/admin/menu-management/add-menu' || currentPath.startsWith('/admin/menu-management/update-menu')
            || currentPath === '/admin/menu-management/add-menuItem' || currentPath.startsWith('/admin/menu-management/update-menuItem')) {
            setActiveLink('menu');
        } else if (currentPath === '/admin/settings') {
            setActiveLink('settings');
        }
    }, []);

    return (
        <div className="sidebar">
            <div className='sidebar-wrapper'>
                <ul className="sidebar__menu">
                    <li className={activeLink === 'dashboard' ? 'active' : ''}>
                        <Link href="/admin">
                            <FontAwesomeIcon icon={faChartLine} /> Dashboard
                        </Link>
                    </li>
                    <li className={activeLink === 'account' ? 'active' : ''}>
                        <Link href="/admin/account">
                            <FontAwesomeIcon icon={faUser} /> Accounts
                        </Link>
                    </li>
                    <li className={activeLink === 'post' ? 'active' : ''}>
                        <Link href="/admin/post">
                            <FontAwesomeIcon icon={faPen} /> Posts
                        </Link>
                    </li>
                    <li className={activeLink === 'menu' ? 'active' : ''}>
                        <Link href="/admin/menu-management">
                            <FontAwesomeIcon icon={faList} /> Menu
                        </Link>
                    </li>
                    <li className={activeLink === 'settings' ? 'active' : ''}>
                        <Link href="/admin/settings">
                            <FontAwesomeIcon icon={faGear} /> Settings
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
