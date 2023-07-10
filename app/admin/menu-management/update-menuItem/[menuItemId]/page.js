'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../../../styles/admin-update-menuItem.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';
import AdminAccessDenied from '@/app/components/Admin-access-denied';
import { useRouter } from 'next/navigation';

const MenuItemEdit = ({ params }) => {
    const { menuItemId } = params;
    const [menuItem, setMenuItem] = useState(null);
    const [menuItemTitle, setMenuItemTitle] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('');
    const [menu, setMenu] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            // Lấy user_id từ localStorage
            const userId = localStorage.getItem('user_id');

            // Kiểm tra nếu user_id tồn tại
            if (userId) {
                try {
                    // Gọi API endpoint để lấy thông tin người dùng từ server
                    const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                    setUser(response.data);
                    setLoading(false);
                } catch (error) {
                    console.log('Error fetching user:', error);
                    router.push('/admin/login'); // Chuyển hướng đến trang login khi có lỗi
                }
            } else {
                router.push('/admin/login'); // Chuyển hướng đến trang login nếu không có user_id
            }
        };

        fetchUserData();
    }, []);

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
            {!isLoading ? (<>
                <AdminHeader />
                <div className='d-flex'>
                    <Sidebar />
                    {user.role === 'admin' ? (<div className='add-user-content-container'>
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
                    </div>) : (<AdminAccessDenied />)}
                </div>
            </>) : (<></>)}
        </div>
    );
};

export default MenuItemEdit;

