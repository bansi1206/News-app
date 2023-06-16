'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const MenuTable = () => {
    const [menu, setMenu] = useState([]);
    const [menuItem, setMenuItem] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getMenu');
                setMenu(response.data);
            } catch (error) {
                console.log('Error fetching menu data:', error);
            }
        };

        const fetchMenuItem = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getMenuItem');
                setMenuItem(response.data);
            } catch (error) {
                console.log('Error fetching menu item data:', error);
            }
        };

        fetchMenu();
        fetchMenuItem();
    }, []);



    const handleDeleteMenu = async (menuId) => {
        try {
            await axios.delete(`http://localhost:3001/deleteMenu/${menuId}`);
            // TODO: Handle success delete
            console.log('Menu deleted successfully');
            // Update the menu state after deletion
            setMenu(menu.filter((item) => item._id !== menuId));
        } catch (error) {
            console.log('Error deleting menu:', error);
        }
    };

    const handleDeleteMenuItem = async (menuItem) => {
        try {
            // TODO: Handle delete menu item logic
            console.log('Delete menu item:', menuItem);

            // Delete the menu item from the database
            await axios.delete(`http://localhost:3001/deleteMenuItem/${menuItem._id}`);

            // Update the menuItem state by filtering out the deleted menu item
            setMenuItem((prevMenuItem) => prevMenuItem.filter((item) => item._id !== menuItem._id));

            console.log('Menu item deleted successfully');
        } catch (error) {
            console.log('Error deleting menu item:', error);
        }
    };


    return (
        <div>
            <h2>Menu</h2>
            <table>
                <thead>
                    <tr>
                        <th>Menu Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map((menu) => (
                        <tr key={menu._id}>
                            <td>
                                <Link href={`/admin/menu-management/updte-menu/${menu._id}`}>{menu.title}</Link>
                            </td>
                            <td>
                                <a href={`/admin/menu-management/update-menu/${menu._id}`}>Edit</a>
                                <button onClick={() => handleDeleteMenu(menu._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Menu Item</h2>
            <table>
                <thead>
                    <tr>
                        <th>Menu Item Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItem.map((menuItem) => (
                        <tr key={menuItem._id}>
                            <td>
                                <Link href={`/admin/menu-management/update-menuItem/${menuItem._id}`}>{menuItem.title}</Link>
                            </td>
                            <td>
                                <a href={`/admin/menu-management/update-menuItem/${menuItem._id}`}>Edit</a>
                                <button onClick={() => handleDeleteMenuItem(menuItem)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MenuTable;
