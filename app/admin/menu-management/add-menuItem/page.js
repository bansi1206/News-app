'use client'
// MenuItemCreate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuItemCreate = () => {
    const [menuItemTitle, setMenuItemTitle] = useState('');
    const [menuList, setMenuList] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState('');

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getMenu');
                setMenuList(response.data);
            } catch (error) {
                console.log('Error fetching menu data:', error);
            }
        };

        fetchMenu();
    }, []);

    const handleCreateMenuItem = async () => {
        try {
            const response = await axios.post('http://localhost:3001/createMenuItem', {
                title: menuItemTitle,
                menuId: selectedMenu
            });
            // TODO: Handle success create
            console.log('Menu item created successfully');
            console.log('Menu Item ID:', response.data.menuItemId);
        } catch (error) {
            console.log('Error creating menu item:', error);
        }
    };

    const handleMenuSelect = (event) => {
        event.preventDefault();
        setSelectedMenu(event.target.value);
    };

    return (
        <div>
            <h2>Create Menu Item</h2>
            <label htmlFor="menuItemTitle">Menu Item Title</label>
            <input
                type="text"
                id="menuItemTitle"
                value={menuItemTitle}
                onChange={(e) => setMenuItemTitle(e.target.value)}
            />
            <label htmlFor="menuSelect">Menu</label>
            <select id="menuSelect" value={selectedMenu} onChange={handleMenuSelect}>
                {menuList.map((menu) => (
                    <option key={menu._id} value={menu._id}>
                        {menu.title}
                    </option>
                ))}
            </select>
            <button onClick={handleCreateMenuItem}>Create</button>
        </div>
    );
};

export default MenuItemCreate;

