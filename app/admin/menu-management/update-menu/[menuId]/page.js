'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../../../styles/admin-update-menu.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';

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
            <AdminHeader />
            <div className='d-flex'>
                <Sidebar />
                <div className='add-user-content-container'>
                    <div className='header-container d-flex'>
                        <h4>Edit Menu</h4>
                        <a className='go-back' href='/admin/menu-management'>Go Back</a>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <th colSpan={2}>Menu Infomation</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Menu Title</td>
                                    <td>
                                        <input
                                            type="text"
                                            id="menuTitle"
                                            value={menuTitle}
                                            onChange={(e) => setMenuTitle(e.target.value)}
                                        />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <button className='btn btn-submit btn-primary' onClick={handleUpdateMenu}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuEdit;
