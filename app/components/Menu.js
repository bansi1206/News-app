'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/header.css'



const Menu = () => {
    const [menuData, setMenuData] = useState(null);
    const [hoveredMenu, setHoveredMenu] = useState(null);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/menu');
                const fetchedMenuData = response.data;
                setMenuData(fetchedMenuData);
            } catch (error) {
                console.log('Error fetching menu data:', error);
            }
        };

        fetchMenuData();
    }, []);

    if (!menuData) {
        return <div>Loading...</div>;
    }

    const handleMenuMouseEnter = (menuId) => {
        setHoveredMenu(menuId);
    };

    const handleMenuMouseLeave = () => {
        setHoveredMenu(null);
    };

    const isMenuDescendantHovered = (menu) => {
        if (!menu.children) {
            return false;
        }

        for (const childMenu of menu.children) {
            if (childMenu._id === hoveredMenu) {
                return true;
            }

            if (isMenuDescendantHovered(childMenu)) {
                return true;
            }
        }

        return false;
    };

    const renderMenuItems = (menuItems) => {
        return (
            <ul className="navbar-nav">
                {menuItems.map((menuItem) => {
                    const hasChildren = menuItem.children && menuItem.children.length > 0;
                    const isHovered = menuItem._id === hoveredMenu;

                    return (
                        <li
                            key={menuItem._id}
                            onMouseEnter={() => handleMenuMouseEnter(menuItem._id)}
                            onMouseLeave={handleMenuMouseLeave}
                            className={`nav-item ${isHovered ? 'active' : ''}`}
                        >
                            <a className="nav-link" href={`/postByMenu/${menuItem._id}`}>
                                {menuItem.title}
                            </a>
                            {hasChildren && (isHovered || isMenuDescendantHovered(menuItem)) && (
                                <ul className="submenu">{renderMenuItems(menuItem.children)}</ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <nav className="navbar navbar-expand-lg text-black bg-transparent">
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {renderMenuItems(menuData)}
                </div>
            </div>
        </nav>
    );
};


export default Menu;



