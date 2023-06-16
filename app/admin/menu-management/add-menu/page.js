'use client'
import React, { useState } from 'react';
import axios from 'axios';

const MenuCreate = () => {
    const [menuTitle, setMenuTitle] = useState('');

    const handleCreateMenu = async () => {
        try {
            const response = await axios.post('http://localhost:3001/createMenu', { title: menuTitle });
            // TODO: Handle success create
            console.log('Menu created successfully');
            console.log('Menu ID:', response.data.menuId);
        } catch (error) {
            console.log('Error creating menu:', error);
        }
    };

    return (
        <div>
            <h2>Create Menu</h2>
            <label htmlFor="menuTitle">Menu Title</label>
            <input
                type="text"
                id="menuTitle"
                value={menuTitle}
                onChange={(e) => setMenuTitle(e.target.value)}
            />
            <button onClick={handleCreateMenu}>Create</button>
        </div>
    );
};

export default MenuCreate;