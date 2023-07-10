'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../../../styles/admin-update-menu.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';
import AdminAccessDenied from '@/app/components/Admin-access-denied';
import { useRouter } from 'next/navigation';

const MenuEdit = ({ params }) => {
    const { menuId } = params;
    const [menu, setMenu] = useState(null);
    const [menuTitle, setMenuTitle] = useState('');
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

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
            {!isLoading ? (
                <>
                    <AdminHeader />
                    <div className='d-flex'>
                        <Sidebar />
                        {user.role === 'admin' ? (
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
                        ) : (<AdminAccessDenied />)}
                    </div>
                </>
            ) : (<></>)}
        </div>
    );
};

export default MenuEdit;
