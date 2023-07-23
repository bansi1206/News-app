'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../styles/admin-add-menu.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';
import AdminAccessDenied from '@/app/components/Admin-access-denied';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MenuCreate = () => {
    const [menuTitle, setMenuTitle] = useState('');
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');

            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                    setUser(response.data);
                    setLoading(false);
                } catch (error) {
                    console.log('Error fetching user:', error);
                    router.push('/admin/login');
                }
            } else {
                router.push('/admin/login');
            }
        };

        fetchUserData();
    }, []);

    const handleCreateMenu = async () => {
        try {
            const response = await axios.post('http://localhost:3001/createMenu', { title: menuTitle });
            toast.success('Menu created successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log('Menu ID:', response.data.menuId);
        } catch (error) {
            console.log('Error creating menu:', error);
        }
    };

    return (
        <div>
            {!isLoading ? (<>
                <AdminHeader />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <ToastContainer />
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