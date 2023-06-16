'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuItemEdit = ({ params }) => {
    const { menuItemId } = params;
    const [menuItem, setMenuItem] = useState(null);
    const [menuItemTitle, setMenuItemTitle] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('');
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getMenuItem/${menuItemId}`);
                setMenuItem(response.data);
                setMenuItemTitle(response.data.title);
                setSelectedMenu(response.data.menu_id);
            } catch (error) {
                console.log('Error fetching menu item data:', error);
            }
        };

        const fetchMenu = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getMenu');
                setMenu(response.data);
            } catch (error) {
                console.log('Error fetching menu data:', error);
            }
        };

        fetchMenuItem();
        fetchMenu();
    }, [menuItemId]);

    const handleUpdateMenuItem = async () => {
        try {
            await axios.put(`http://localhost:3001/updateMenuItem/${menuItemId}`, { title: menuItemTitle, menu_id: selectedMenu });
            // TODO: Handle success update
            console.log('Menu item updated successfully');
        } catch (error) {
            console.log('Error updating menu item:', error);
        }
    };

    const handleMenuSelection = (event) => {
        setSelectedMenu(event.target.value);
    };

    if (!menuItem || !menu) {
        return <div>Loading menu item...</div>;
    }

    return (
        <div>
            <h2>Edit Menu Item</h2>
            <label htmlFor="menuItemTitle">Menu Item Title</label>
            <input
                type="text"
                id="menuItemTitle"
                value={menuItemTitle}
                onChange={(e) => setMenuItemTitle(e.target.value)}
            />

            <label htmlFor="menuSelection">Select Menu</label>
            <select id="menuSelection" value={selectedMenu} onChange={handleMenuSelection}>
                {menu.map((menu) => (
                    <option key={menu._id} value={menu._id}>
                        {menu.title}
                    </option>
                ))}
            </select>

            <button onClick={handleUpdateMenuItem}>Update</button>
        </div>
    );
};

export default MenuItemEdit;

