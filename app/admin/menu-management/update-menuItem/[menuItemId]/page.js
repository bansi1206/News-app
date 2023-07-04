'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../../../styles/admin-update-menuItem.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';

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
            <AdminHeader />
            <div className='d-flex'>
                <Sidebar />
                <div className='add-user-content-container'>
                    <div className='header-container d-flex'>
                        <h4>Edit Menu Item</h4>
                        <a className='go-back' href='/admin/menu-management'>Go Back</a>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <th colSpan={2}>Menu Item Infomation</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Menu Item Title</td>
                                    <td>
                                        <input
                                            type="text"
                                            id="menuItemTitle"
                                            value={menuItemTitle}
                                            onChange={(e) => setMenuItemTitle(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Select Menu</td>
                                    <td>
                                        <select id="menuSelection" value={selectedMenu} onChange={handleMenuSelection}>
                                            {menu.map((menu) => (
                                                <option key={menu._id} value={menu._id}>
                                                    {menu.title}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <button className='btn btn-submit btn-primary' onClick={handleUpdateMenuItem}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuItemEdit;

