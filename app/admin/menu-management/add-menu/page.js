'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../styles/admin-add-menu.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';
import AdminAccessDenied from '@/app/components/Admin-access-denied';
import { useRouter } from 'next/navigation';


const MenuCreate = () => {
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
            {!isLoading ? (<>
                <AdminHeader />
                <div className='d-flex'>
                    <Sidebar />
                    {user.role === 'admin' ? (
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
                    ) : (<AdminAccessDenied />)}
                </div>
            </>) : (<></>)}
        </div>
    );
};

export default MenuCreate;