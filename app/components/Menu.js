'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        return menuItems.map((menuItem) => {
            const hasChildren = menuItem.children && menuItem.children.length > 0;
            const isHovered = menuItem._id === hoveredMenu;

            return (
                <li
                    key={menuItem._id}
                    onMouseEnter={() => handleMenuMouseEnter(menuItem._id)}
                    onMouseLeave={handleMenuMouseLeave}
                >
                    <a href={`postByMenu/${menuItem._id}`}>{menuItem.title}</a>
                    {hasChildren && (isHovered || isMenuDescendantHovered(menuItem)) && (
                        <ul>{renderMenuItems(menuItem.children)}</ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div>
            <h2>Menu</h2>
            <ul>{renderMenuItems(menuData)}</ul>
        </div>
    );
};

export default Menu;



