'use client'
import React, { useState, useEffect } from 'react';

import axios from 'axios';

const MenuEdit = ({ params }) => {
    const { menuId } = params;
    const [menu, setMenu] = useState(null);
    const [menuTitle, setMenuTitle] = useState('');

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getMenu/${menuId}`);
                setMenu(response.data);
                setMenuTitle(response.data.title);
            } catch (error) {
                console.log('Error fetching menu data:', error);
            }
        };

        fetchMenu();
    }, [menuId]);

    const handleUpdateMenu = async () => {
        try {
            await axios.put(`http://localhost:3001/updateMenu/${menuId}`, { title: menuTitle });
            // TODO: Handle success update
            console.log('Menu updated successfully');
        } catch (error) {
            console.log('Error updating menu:', error);
        }
    };

    if (!menu) {
        return <div>Loading menu...</div>;
    }

    return (
        <div>
            <h2>Edit Menu</h2>
            <label htmlFor="menuTitle">Menu Title</label>
            <input
                type="text"
                id="menuTitle"
                value={menuTitle}
                onChange={(e) => setMenuTitle(e.target.value)}
            />
            <button onClick={handleUpdateMenu}>Update</button>
        </div>
    );
};

export default MenuEdit;
