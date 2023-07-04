'use client'
import React, { useState } from 'react';
import axios from 'axios';
import "../../../styles/admin-add-menu.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';


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
            <AdminHeader />
            <div className='d-flex'>
                <Sidebar />
                <div className='add-user-content-container'>
                    <div className='header-container d-flex'>
                        <h4>Add New Menu</h4>
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
                                            placeholder='Enter menu title'
                                        />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <button className='btn btn-submit btn-primary' onClick={handleCreateMenu}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuCreate;